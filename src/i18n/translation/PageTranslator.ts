import { defaultLocale, type Locale } from '../config';
import { translateTexts } from '@/services/translation.service';
import { getCache, saveCache } from './translationCache';
import { translationConfig } from './translation.config';

/** Attributes whose text is read out or shown to visitors. */
const TRANSLATED_ATTRIBUTES = ['alt', 'title', 'aria-label', 'placeholder'] as const;
type TranslatedAttribute = (typeof TRANSLATED_ATTRIBUTES)[number];

/** Elements whose content is never visitor-facing text, or is typed by the visitor. */
const SKIPPED_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'TEMPLATE',
  'CODE',
  'PRE',
  'TEXTAREA',
]);

/**
 * Opt-out for content that must stay as written (brand names, language names, numbers):
 * `translate="no"` (the HTML standard) or the `notranslate` class.
 */
const OPT_OUT_SELECTOR = '[translate="no"], .notranslate';

/** Only text with at least one letter is worth sending (skips "140M+", "|", "1 / 3"…). */
const HAS_LETTERS = /\p{L}/u;

export type TranslationStatus = 'idle' | 'translating' | 'error';

/**
 * Translates the rendered page in place, like the Bhashini plugin on vistaar.da.gov.in:
 *
 * 1. Collect visible text nodes and text attributes, remembering each English original.
 * 2. Send unique strings that are not cached yet to Bhashini, in batches.
 * 3. Write the translations into the DOM (keeping surrounding whitespace).
 * 4. Watch the DOM: anything React adds or changes later (carousels, pop-ups, menus,
 *    form errors) is translated as it appears.
 *
 * Switching back to English restores every original, so no reload is needed.
 * React keeps working because only text values change, never the element structure.
 */
export class PageTranslator {
  private lang: Locale = defaultLocale;
  private generation = 0;
  private abort: AbortController | null = null;
  private observer: MutationObserver | null = null;
  private pending = new Set<Node>();
  private timer: ReturnType<typeof setTimeout> | null = null;

  private textNodes = new Set<Text>();
  private textOriginal = new WeakMap<Text, string>();
  private textApplied = new WeakMap<Text, string>();

  private elements = new Set<Element>();
  private attrOriginal = new WeakMap<Element, Map<TranslatedAttribute, string>>();
  private attrApplied = new WeakMap<Element, Map<TranslatedAttribute, string>>();

  constructor(
    private readonly root: HTMLElement,
    private readonly onStatus: (status: TranslationStatus) => void,
  ) {}

  async setLanguage(lang: Locale) {
    const previous = this.lang;
    this.lang = lang;
    this.generation += 1;
    this.abort?.abort();
    this.abort = null;

    if (lang === defaultLocale) {
      this.stopObserving();
      this.restoreOriginals();
      this.setStatus('idle');
      return;
    }

    this.resyncOriginals();
    // Switching between two translations: show English while the new one loads, rather than
    // leaving the previous language on screen.
    if (previous !== defaultLocale && previous !== lang) this.restoreOriginals();
    this.startObserving();
    await this.translate([this.root], true);
  }

  /**
   * While the page is in English nothing is watched, so React may have changed text since it
   * was recorded. Anything that no longer shows what we last wrote is the new original.
   */
  private resyncOriginals() {
    this.prune();
    this.textNodes.forEach((node) => {
      if (node.nodeValue !== this.textApplied.get(node)) {
        this.textOriginal.set(node, node.nodeValue ?? '');
      }
    });
    this.elements.forEach((element) => {
      const originals = this.attrOriginal.get(element);
      const applied = this.attrApplied.get(element);
      originals?.forEach((_, name) => {
        const value = element.getAttribute(name);
        if (value === null) originals.delete(name);
        else if (value !== applied?.get(name)) originals.set(name, value);
      });
    });
  }

  private status: TranslationStatus = 'idle';

  private setStatus(status: TranslationStatus) {
    this.status = status;
    this.onStatus(status);
  }

  destroy() {
    this.abort?.abort();
    this.stopObserving();
  }

  // ── Collect ────────────────────────────────────────────────────────────────

  /** Non-HTML (SVG) or a skipped tag. */
  private static isExcludedTag(element: Element) {
    return (
      SKIPPED_TAGS.has(element.tagName) ||
      element.namespaceURI !== element.ownerDocument.documentElement.namespaceURI
    );
  }

  private isSkipped(element: Element | null): boolean {
    if (!element) return true;
    if (PageTranslator.isExcludedTag(element)) return true;
    return element.closest(OPT_OUT_SELECTOR) !== null;
  }

  private registerText(node: Text) {
    if (!this.textOriginal.has(node)) this.textOriginal.set(node, node.nodeValue ?? '');
    this.textNodes.add(node);
  }

  private registerAttribute(element: Element, name: TranslatedAttribute) {
    const value = element.getAttribute(name);
    if (value === null) return;
    let originals = this.attrOriginal.get(element);
    if (!originals) {
      originals = new Map();
      this.attrOriginal.set(element, originals);
    }
    if (!originals.has(name)) originals.set(name, value);
    this.elements.add(element);
  }

  /** A textarea's typed content is skipped, but its placeholder/label still need translating. */
  private collectFieldAttributes(element: Element) {
    if (element.tagName !== 'TEXTAREA' || element.closest(OPT_OUT_SELECTOR)) return;
    TRANSLATED_ATTRIBUTES.forEach((name) => this.registerAttribute(element, name));
  }

  private collect(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!this.isSkipped(node.parentElement)) this.registerText(node as Text);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const element = node as Element;
    if (this.isSkipped(element)) {
      this.collectFieldAttributes(element);
      return;
    }

    const walker = element.ownerDocument.createTreeWalker(
      element,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      {
        acceptNode: (current) => {
          if (current.nodeType === Node.ELEMENT_NODE) {
            const el = current as Element;
            if (PageTranslator.isExcludedTag(el) || el.matches(OPT_OUT_SELECTOR)) {
              this.collectFieldAttributes(el);
              return NodeFilter.FILTER_REJECT;
            }
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    for (let current: Node | null = walker.currentNode; current; current = walker.nextNode()) {
      if (current.nodeType === Node.TEXT_NODE) {
        this.registerText(current as Text);
      } else {
        TRANSLATED_ATTRIBUTES.forEach((name) => this.registerAttribute(current as Element, name));
      }
    }
  }

  // ── Translate ──────────────────────────────────────────────────────────────

  private sourcesToTranslate(): string[] {
    const sources = new Set<string>();
    const add = (value: string | undefined) => {
      const text = value?.trim();
      if (text && HAS_LETTERS.test(text)) sources.add(text);
    };
    this.textNodes.forEach((node) => add(this.textOriginal.get(node)));
    this.elements.forEach((element) => this.attrOriginal.get(element)?.forEach(add));
    return [...sources];
  }

  private async translate(roots: Node[], announce: boolean) {
    const generation = this.generation;
    const lang = this.lang;
    roots.forEach((root) => this.collect(root));

    const cache = getCache(lang);
    const missing = this.sourcesToTranslate().filter((source) => !cache.has(source));

    // Show what is already cached straight away.
    this.applyTranslations(cache);
    if (missing.length === 0) {
      if (announce || this.status === 'error') this.setStatus('idle');
      return;
    }

    if (announce) this.setStatus('translating');
    this.abort ??= new AbortController();
    const { translations, failed } = await translateTexts(missing, lang, this.abort.signal);
    if (generation !== this.generation) return; // Language changed meanwhile.

    saveCache(lang, translations);
    this.applyTranslations(getCache(lang));
    // A first pass reports its result; a later background pass reports a failure, or clears
    // an earlier failure once everything it needed has arrived.
    if (failed) this.setStatus('error');
    else if (announce || this.status === 'error') this.setStatus('idle');
  }

  // ── Apply / restore ────────────────────────────────────────────────────────

  private applyTranslations(dictionary: Map<string, string>) {
    this.prune();
    this.textNodes.forEach((node) => {
      const original = this.textOriginal.get(node) ?? '';
      const core = original.trim();
      const translated = dictionary.get(core);
      if (!translated) return;
      const start = original.indexOf(core);
      const value = original.slice(0, start) + translated + original.slice(start + core.length);
      this.writeText(node, value);
    });

    this.elements.forEach((element) => {
      this.attrOriginal.get(element)?.forEach((original, name) => {
        const translated = dictionary.get(original.trim());
        if (translated) this.writeAttribute(element, name, translated);
      });
    });
  }

  private restoreOriginals() {
    this.prune();
    this.textNodes.forEach((node) => {
      const original = this.textOriginal.get(node);
      if (original !== undefined) this.writeText(node, original);
    });
    this.elements.forEach((element) => {
      this.attrOriginal.get(element)?.forEach((original, name) => {
        this.writeAttribute(element, name, original);
      });
    });
  }

  private writeText(node: Text, value: string) {
    this.textApplied.set(node, value);
    if (node.nodeValue !== value) node.nodeValue = value;
  }

  private writeAttribute(element: Element, name: TranslatedAttribute, value: string) {
    let applied = this.attrApplied.get(element);
    if (!applied) {
      applied = new Map();
      this.attrApplied.set(element, applied);
    }
    applied.set(name, value);
    if (element.getAttribute(name) !== value) element.setAttribute(name, value);
  }

  /** Forget nodes React has removed from the page. */
  private prune() {
    this.textNodes.forEach((node) => {
      if (!node.isConnected) this.textNodes.delete(node);
    });
    this.elements.forEach((element) => {
      if (!element.isConnected) this.elements.delete(element);
    });
  }

  // ── Watch for changes ──────────────────────────────────────────────────────

  private startObserving() {
    if (this.observer) return;
    this.observer = new MutationObserver((records) => this.onMutations(records));
    this.observer.observe(this.root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...TRANSLATED_ATTRIBUTES],
    });
  }

  private stopObserving() {
    this.observer?.disconnect();
    this.observer = null;
    this.pending.clear();
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  private onMutations(records: MutationRecord[]) {
    records.forEach((record) => {
      if (record.type === 'childList') {
        record.addedNodes.forEach((node) => this.pending.add(node));
        return;
      }

      if (record.type === 'characterData') {
        const node = record.target as Text;
        // Our own write: nothing to do. Otherwise React put new English text here.
        if (node.nodeValue === this.textApplied.get(node)) return;
        this.textOriginal.set(node, node.nodeValue ?? '');
        this.pending.add(node);
        return;
      }

      const element = record.target as Element;
      const name = record.attributeName as TranslatedAttribute;
      const value = element.getAttribute(name);
      if (value === null || value === this.attrApplied.get(element)?.get(name)) return;
      this.attrOriginal.get(element)?.set(name, value);
      this.pending.add(element);
    });

    if (this.pending.size === 0 || this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      const nodes = [...this.pending];
      this.pending.clear();
      void this.translate(nodes, false);
    }, translationConfig.mutationDebounceMs);
  }
}
