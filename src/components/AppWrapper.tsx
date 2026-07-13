'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Crosshair, X } from 'lucide-react';

interface AppWrapperProps {
  children: ReactNode;
}

/**
 * Direct entry: no blocking gate.
 * A dismissible saloon challenge invites the visitor to the duel, once.
 */
export default function AppWrapper({ children }: AppWrapperProps) {
  const t = useTranslations('duel');
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('duel-invited')) return;
    const timer = setTimeout(() => setShowChallenge(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem('duel-invited', '1');
    setShowChallenge(false);
  };

  const accept = () => {
    dismiss();
    window.dispatchEvent(new Event('open-duel'));
  };

  return (
    <>
      {children}
      {showChallenge && (
        <div
          className="fixed bottom-6 left-6 z-[90] max-w-xs bg-[var(--western-parchment)] dark:bg-[var(--card-bg)] border-4 border-double border-[var(--western-brown)] shadow-[6px_6px_0_var(--western-brown-dark)] p-4"
          role="dialog"
          aria-live="polite"
        >
          <button
            onClick={dismiss}
            className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label={t('close')}
          >
            <X className="w-4 h-4" />
          </button>
          <p
            className="text-sm mb-3 pr-4 text-[var(--text-secondary)]"
            style={{ fontFamily: "'IM Fell English', serif" }}
          >
            {t('intro').split('.')[0]}.
          </p>
          <button
            onClick={accept}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--western-rust)] text-[var(--western-cream)] text-xs uppercase tracking-widest border-2 border-[var(--western-brown-dark)] hover:bg-[var(--western-brown-dark)] transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <Crosshair className="w-4 h-4" />
            {t('start')}
          </button>
        </div>
      )}
    </>
  );
}
