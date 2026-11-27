'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from '@mui/material/styles';
import type { Accessibility } from 'accessibility';
import { accessibilityOptions, MAX_TEXT_SIZE_STEPS } from './accessibility.config';

export interface AccessibilityContextValue {
  /** True once the package has loaded in the browser. */
  ready: boolean;
  darkContrast: boolean;
  invert: boolean;
  /** 0 = default; positive = larger; negative = smaller. */
  textSizeSteps: number;
  toggleDarkContrast: () => void;
  toggleInvert: () => void;
  increaseText: () => void;
  decreaseText: () => void;
}

export const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

/**
 * Loads the `accessibility` package in the browser only, after the page has painted,
 * so it adds nothing to the first load. It cannot run during the static build because
 * it uses `window`/`document`.
 */
/**
 * The package always checks browser support for its speech features and logs
 * "Accessibility: speech to text isn't supported …" (on http, and in Firefox even on https),
 * although both features are switched off in our options. Hide only those two warnings,
 * only while the package starts up; every other console message is untouched.
 */
const UNUSED_FEATURE_WARNING = /^Accessibility: (speech to text|text to speech) isn't supported/;

function withoutUnusedFeatureWarnings<T>(create: () => T): T {
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && UNUSED_FEATURE_WARNING.test(args[0])) return;
    warn(...args);
  };
  try {
    return create();
  } finally {
    console.warn = warn;
  }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const instanceRef = useRef<Accessibility | null>(null);
  const [ready, setReady] = useState(false);
  const [invert, setInvert] = useState(false);
  const [textSizeSteps, setTextSizeSteps] = useState(0);
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { Accessibility: AccessibilityLib } = await import('accessibility');
      if (cancelled) return;
      const instance = withoutUnusedFeatureWarnings(
        () => new AccessibilityLib(accessibilityOptions),
      );
      instanceRef.current = instance;
      // The package restores the previous session (invert / text size) on build.
      setInvert(Boolean(instance.sessionState.invertColors));
      setTextSizeSteps(instance.sessionState.textSize ?? 0);
      setReady(true);
    };

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    idle(() => void load());

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  const toggleInvert = useCallback(() => {
    const instance = instanceRef.current;
    if (!instance) return;
    instance.menuInterface.invertColors();
    setInvert(Boolean(instance.sessionState.invertColors));
  }, []);

  const changeText = useCallback((increase: boolean) => {
    const instance = instanceRef.current;
    if (!instance) return;
    const current = instance.sessionState.textSize ?? 0;
    if (increase && current >= MAX_TEXT_SIZE_STEPS) return;
    if (!increase && current <= -MAX_TEXT_SIZE_STEPS) return;
    if (increase) instance.menuInterface.increaseText();
    else instance.menuInterface.decreaseText();
    setTextSizeSteps(instance.sessionState.textSize ?? 0);
  }, []);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ready,
      darkContrast: mode === 'dark',
      invert,
      textSizeSteps,
      toggleDarkContrast: () => setMode(mode === 'dark' ? 'light' : 'dark'),
      toggleInvert,
      increaseText: () => changeText(true),
      decreaseText: () => changeText(false),
    }),
    [ready, mode, setMode, invert, textSizeSteps, toggleInvert, changeText],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}
