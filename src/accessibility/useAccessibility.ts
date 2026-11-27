'use client';

import { useContext } from 'react';
import { AccessibilityContext } from './AccessibilityProvider';

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used inside <AccessibilityProvider>.');
  }
  return context;
}
