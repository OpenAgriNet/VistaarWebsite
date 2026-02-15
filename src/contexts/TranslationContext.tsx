import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

export interface Language {
  name: string;
  code: string;
}

export const languages: Language[] = [
  { name: 'English', code: 'en' },
  { name: 'Assamese (অসমীয়া)', code: 'as' },
  { name: 'Bengali (বাংলা)', code: 'bn' },
  { name: 'Bodo (बड़ो)', code: 'brx' },
  { name: 'Dogri (डोगरी)', code: 'doi' },
  { name: 'Goan Konkani (गोवा कोंकणी)', code: 'gom' },
  { name: 'Gujarati (ગુજરાતી)', code: 'gu' },
  { name: 'Hindi (हिन्दी)', code: 'hi' },
  { name: 'Kannada (ಕನ್ನಡ)', code: 'kn' },
  { name: 'Kashmiri (کٲشُر)', code: 'ks' },
  { name: 'Maithili (मैथिली)', code: 'mai' },
  { name: 'Malayalam (മലയാളം)', code: 'ml' },
  { name: 'Manipuri (মণিপুরী)', code: 'mni' },
  { name: 'Marathi (मराठी)', code: 'mr' },
  { name: 'Nepali (नेपाली)', code: 'ne' },
  { name: 'Odia (ଓଡ଼ିଆ)', code: 'or' },
  { name: 'Punjabi (ਪੰਜਾਬੀ)', code: 'pa' },
  { name: 'Sanskrit (संस्कृत)', code: 'sa' },
  { name: 'Santali (संताली)', code: 'sat' },
  { name: 'Sindhi (سنڌي)', code: 'sd' },
  { name: 'Tamil (தமிழ்)', code: 'ta' },
  { name: 'Telugu (తెలుగు)', code: 'te' },
  { name: 'Urdu (اردو)', code: 'ur' },
];

interface TranslationContextType {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  translations: Record<string, string>;
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
  translate: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

const LANGUAGE_STORAGE_KEY = 'vistaar_selected_language';

// Load language from localStorage
const loadLanguageFromStorage = (): Language => {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const found = languages.find(lang => lang.code === parsed.code);
      if (found) {
        return found;
      }
    }
  } catch (error) {
    console.error('Error loading language from storage:', error);
  }
  return languages[0]; // Default to English
};

// Save language to localStorage
const saveLanguageToStorage = (lang: Language) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify({ code: lang.code, name: lang.name }));
  } catch (error) {
    console.error('Error saving language to storage:', error);
  }
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const initialLanguage = loadLanguageFromStorage();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const translationsRef = React.useRef<Record<string, string>>({});
  const observerRef = React.useRef<MutationObserver | null>(null);
  const previousLanguageRef = React.useRef<string>(initialLanguage.code);
  const isInitialMount = React.useRef<boolean>(true);
  const completeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const translate = React.useCallback((key: string): string => {
    if (currentLanguage.code === 'en') {
      return key;
    }
    return translations[key] || key;
  }, [currentLanguage.code, translations]);

  // Wrapper for setCurrentLanguage that also saves to localStorage
  const handleSetCurrentLanguage = React.useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    saveLanguageToStorage(lang);
  }, []);

  // Apply translations to DOM - improved to handle all text nodes including nested ones
  const applyTranslations = React.useCallback((translationMap: Record<string, string>) => {
    if (Object.keys(translationMap).length === 0) return;
    
    const allTextNodes: Text[] = [];
    
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          // Skip script, style, and elements marked to not translate
          if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.hasAttribute('data-no-translate')) {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip iframes and their content
          if (parent.closest('iframe')) {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip language selector to avoid translating it
          if (parent.closest('[data-no-translate]')) {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.textContent?.trim();
          if (text && text.length > 0 && text.length < 500) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        allTextNodes.push(node as Text);
      }
    }

    // Apply translations - improved to handle all cases
    allTextNodes.forEach((textNode) => {
      const currentText = textNode.textContent?.trim();
      if (!currentText || currentText.length === 0) return;
      
      const parent = textNode.parentElement;
      if (!parent) return;
      
      const storedOriginal = parent.getAttribute('data-original-text');
      
      // If parent has stored original, use it for lookup
      const textToLookup = storedOriginal || currentText;
      
      // Try exact match first
      if (translationMap[textToLookup]) {
        if (!storedOriginal) {
          // Store original text if not already stored
          parent.setAttribute('data-original-text', currentText);
        }
        textNode.textContent = translationMap[textToLookup];
        parent.setAttribute('data-translated', 'true');
      } else if (!storedOriginal) {
        // No stored original and no exact match, try normalized whitespace
        const normalizedText = currentText.replace(/\s+/g, ' ').trim();
        if (translationMap[normalizedText]) {
          parent.setAttribute('data-original-text', normalizedText);
          textNode.textContent = translationMap[normalizedText];
          parent.setAttribute('data-translated', 'true');
        }
      } else if (!translationMap[storedOriginal]) {
        // Has stored original but no translation found - might be from old language
        // Try matching current text (which might be English now)
        if (translationMap[currentText]) {
          // Update stored original to current (which is now English)
          parent.setAttribute('data-original-text', currentText);
          textNode.textContent = translationMap[currentText];
          parent.setAttribute('data-translated', 'true');
        }
      }
    });
    
  }, []);

  // Restore original English text - improved to handle nested text nodes
  const restoreOriginalText = React.useCallback(() => {
    // First, get all elements with stored original text
    const elements = document.querySelectorAll('[data-original-text]');
    
    elements.forEach((el) => {
      const originalText = el.getAttribute('data-original-text');
      if (originalText) {
        // Find all text nodes in this element
        const walker = document.createTreeWalker(
          el,
          NodeFilter.SHOW_TEXT,
          null
        );
        
        const textNodes: Text[] = [];
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node as Text);
          }
        }
        
        // Restore text to first text node, clear others
        if (textNodes.length > 0) {
          if (textNodes[0]) {
            textNodes[0].textContent = originalText;
            // Clear other text nodes
            for (let i = 1; i < textNodes.length; i++) {
              textNodes[i].textContent = '';
            }
          }
        } else {
          // No text nodes found, try to set text content directly
          // This handles cases where element might have been modified
          if (el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE) {
            el.firstChild.textContent = originalText;
          } else {
            // Create a text node if none exists
            const textNode = document.createTextNode(originalText);
            el.textContent = '';
            el.appendChild(textNode);
          }
        }
        
        el.removeAttribute('data-original-text');
      }
      el.removeAttribute('data-translated');
    });
    
    // Also clear any remaining translation markers
    document.querySelectorAll('[data-translated]').forEach(el => {
      el.removeAttribute('data-translated');
    });
    
    // Also check if there are any translated texts that we need to restore
    // by checking against the current translations map
    if (Object.keys(translationsRef.current).length > 0) {
      const allTextNodes: Text[] = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest('iframe') || parent.closest('[data-no-translate]')) {
              return NodeFilter.FILTER_REJECT;
            }
            const text = node.textContent?.trim();
            if (text && text.length > 0 && text.length < 500) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );

      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeType === Node.TEXT_NODE) {
          allTextNodes.push(node as Text);
        }
      }

      // Check if any text node contains translated text and restore it
      const translationMap = translationsRef.current;
      allTextNodes.forEach((textNode) => {
        const currentText = textNode.textContent?.trim();
        if (!currentText) return;
        
        // Check if this text is a translation (exists as a value in translation map)
        const originalKey = Object.keys(translationMap).find(key => translationMap[key] === currentText);
        if (originalKey) {
          // This is translated text, restore original
          const parent = textNode.parentElement;
          if (parent && !parent.hasAttribute('data-original-text')) {
            textNode.textContent = originalKey;
            parent.setAttribute('data-original-text', originalKey);
          }
        }
      });
    }
  }, []);

  // Set up MutationObserver to re-apply translations when DOM changes
  React.useEffect(() => {
    if (currentLanguage.code === 'en' || Object.keys(translationsRef.current).length === 0) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    // Create observer to watch for DOM changes and re-apply translations
    let timeoutId: ReturnType<typeof setTimeout>;
    observerRef.current = new MutationObserver(() => {
      // Debounce to avoid too many calls
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Object.keys(translationsRef.current).length > 0) {
          applyTranslations(translationsRef.current);
        }
      }, 200);
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [currentLanguage.code, applyTranslations]);

  useEffect(() => {
    // Clear previous completion state
    setIsComplete(false);
    setError(null);
    
    // Clear any existing timeout
    if (completeTimeoutRef.current) {
      clearTimeout(completeTimeoutRef.current);
    }

    // Skip on initial mount if English (no translation needed)
    if (isInitialMount.current && currentLanguage.code === 'en') {
      isInitialMount.current = false;
      return;
    }
    
    isInitialMount.current = false;

    // If language changed, first restore original English text
    if (previousLanguageRef.current !== currentLanguage.code) {
      // Store current translations before clearing (needed for restoration)
      const previousTranslations = { ...translationsRef.current };
      
      // Restore original text using the previous translation map
      if (Object.keys(previousTranslations).length > 0) {
        // Temporarily set translationsRef so restoreOriginalText can use it
        const tempRef = translationsRef.current;
        translationsRef.current = previousTranslations;
        restoreOriginalText();
        translationsRef.current = tempRef;
      } else {
        restoreOriginalText();
      }
      
      // Clear translation refs
      translationsRef.current = {};
      setTranslations({});
      previousLanguageRef.current = currentLanguage.code;
    }

    if (currentLanguage.code === 'en') {
      setTranslations({});
      translationsRef.current = {};
      // Ensure all text is in English
      restoreOriginalText();
      setIsComplete(true);
      completeTimeoutRef.current = setTimeout(() => setIsComplete(false), 3000);
      return;
    }

    const fetchTranslations = async () => {
      setIsLoading(true);
      setIsComplete(false);
      setError(null);
      
      try {
        // Wait for React to finish rendering and text to be restored
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Restore original text again to ensure everything is in English
        restoreOriginalText();
        
        // Wait a bit more for DOM to update
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Extract texts after restoring original English
        const allTexts = extractAllTexts();
        const uniqueTexts = Array.from(new Set(allTexts)).filter(text => text.trim().length > 0 && text.length < 500);
        
        if (uniqueTexts.length === 0) {
          setIsLoading(false);
          return;
        }


        // Split into chunks of 25
        const chunks: string[][] = [];
        for (let i = 0; i < uniqueTexts.length; i += 25) {
          chunks.push(uniqueTexts.slice(i, i + 25));
        }

        // Call API for all chunks in parallel
        const allTranslations: Record<string, string> = {};
        const translationPromises = chunks.map(async (chunk) => {
          try {
            const response = await fetch('https://translation-plugin.bhashini.co.in/v2/translate-text', {
              method: 'POST',
              headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9,en-IN;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                targetLanguage: currentLanguage.code,
                textData: chunk,
                sourceLanguage: 'en'
              })
            });

            if (response.ok) {
              const data = await response.json();
              if (Array.isArray(data)) {
                return data;
              }
            } else {
              throw new Error(`Translation API error: ${response.status}`);
            }
          } catch (err) {
            console.error('Translation chunk error:', err);
            return [];
          }
        });

        // Wait for all parallel requests to complete
        const results = await Promise.all(translationPromises);
        
        // Combine all results
        results.forEach((chunkResults) => {
          if (Array.isArray(chunkResults)) {
            chunkResults.forEach((item: { source: string; target: string }) => {
              allTranslations[item.source] = item.target;
            });
          }
        });

        translationsRef.current = allTranslations;
        setTranslations(allTranslations);
        
        
        // Apply translations multiple times to catch all nodes
        // React might render nodes at different times
        const applyWithDelay = async () => {
          // First application
          applyTranslations(allTranslations);
          
          // Wait and apply again
          await new Promise(resolve => setTimeout(resolve, 300));
          applyTranslations(allTranslations);
          
          // Wait and apply again
          await new Promise(resolve => setTimeout(resolve, 500));
          applyTranslations(allTranslations);
          
          // Final application
          await new Promise(resolve => setTimeout(resolve, 700));
          applyTranslations(allTranslations);
          
          // One more after a longer delay to catch any late-rendering elements
          await new Promise(resolve => setTimeout(resolve, 1000));
          applyTranslations(allTranslations);
          
          setIsComplete(true);
          completeTimeoutRef.current = setTimeout(() => setIsComplete(false), 3000);
        };
        
        applyWithDelay();
      } catch (err) {
        console.error('Translation error:', err);
        setError(err instanceof Error ? err.message : 'Translation failed');
        setIsComplete(false);
        completeTimeoutRef.current = setTimeout(() => setError(null), 5000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [currentLanguage.code, applyTranslations, restoreOriginalText]);

  const contextValue = useMemo(() => ({
    currentLanguage,
    setCurrentLanguage: handleSetCurrentLanguage,
    translations,
    isLoading,
    isComplete,
    error,
    translate,
  }), [currentLanguage, handleSetCurrentLanguage, translations, isLoading, isComplete, error, translate]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Function to extract all text content from the DOM
const extractAllTexts = (): string[] => {
  const texts: string[] = [];
  const seen = new Set<string>();
  
  // Use tree walker to get all individual text nodes first
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        // Skip script, style, and iframe elements
        if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest('iframe')) {
          return NodeFilter.FILTER_REJECT;
        }
        // Skip elements marked to not translate
        if (parent.hasAttribute('data-no-translate') || parent.closest('[data-no-translate]')) {
          return NodeFilter.FILTER_REJECT;
        }
        // Only get text nodes that have meaningful content
        const text = node.textContent?.trim();
        if (text && text.length > 0 && text.length < 500) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    }
  );

  // Collect all individual text nodes
  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim();
    if (text && text.length > 0 && text.length < 500 && !seen.has(text)) {
      texts.push(text);
      seen.add(text);
    }
  }
  
  // Now get all elements and extract their full text content
  // This captures text that spans across multiple nodes (like "Flexibility by Design: Organisations...")
  const allElements = document.querySelectorAll('*:not(script):not(style):not(iframe):not([data-no-translate]):not([data-no-translate] *)');
  
  allElements.forEach((el) => {
    // Skip if element is inside an iframe or marked to not translate
    if (el.closest('iframe') || el.closest('[data-no-translate]')) {
      return;
    }
    
    // Skip if it's a text node parent (we already got those above)
    if (el.childNodes.length === 1 && el.firstChild?.nodeType === Node.TEXT_NODE) {
      return;
    }
    
    // Get the full text content of the element (including all nested text)
    const fullText = el.textContent?.trim();
    if (fullText && fullText.length > 0 && fullText.length < 500 && !seen.has(fullText)) {
      texts.push(fullText);
      seen.add(fullText);
    }
    
    // Also get text that appears after child elements (like text after a span)
    // This captures cases like: <p><span>Prefix:</span> Rest of text</p>
    const childNodes = Array.from(el.childNodes);
    for (const currentNode of childNodes) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const textAfterElement = currentNode.textContent?.trim();
        if (textAfterElement && textAfterElement.length > 0 && textAfterElement.length < 500 && !seen.has(textAfterElement)) {
          texts.push(textAfterElement);
          seen.add(textAfterElement);
        }
      }
    }
  });

  // Fallback: Extract text from paragraphs that might contain split text
  const paragraphs = document.querySelectorAll('p');
  for (const p of paragraphs) {
    const pText = p.textContent?.trim();
    if (pText && pText.includes('Organisations can play') && !seen.has(pText)) {
      // Extract the part after colon if it exists
      const afterColon = pText.split(':').slice(1).join(':').trim();
      if (afterColon && !seen.has(afterColon)) {
        texts.push(afterColon);
        seen.add(afterColon);
      }
      // Add full text
      texts.push(pText);
      seen.add(pText);
    }
  }

  return texts;
};

