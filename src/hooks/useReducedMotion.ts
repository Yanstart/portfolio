'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has enabled "reduce motion" in their OS settings
 * or if running on mobile (for performance)
 */
export function useReducedMotion(): boolean {
  // Default to true for SSR to avoid animation flash
  const [shouldReduce, setShouldReduce] = useState(true);

  useEffect(() => {
    // Check OS preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = mediaQuery.matches;

    setShouldReduce(prefersReduced);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduce(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return shouldReduce;
}

/**
 * Hook to detect if user prefers reduced motion OR is on mobile
 * Use this for heavy animations that impact performance
 */
export function useReducedAnimations(): boolean {
  const [shouldReduce, setShouldReduce] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldReduce(isMobile || prefersReduced);

    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      const prefersReducedNow = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShouldReduce(isMobileNow || prefersReducedNow);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return shouldReduce;
}
