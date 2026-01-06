'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X, ExternalLink, Volume2, Play } from 'lucide-react';

// Wakanda by Ludwig Göransson (Black Panther OST)
const SPOTIFY_TRACK_ID = '7t0XeK1IEV9YM8wOqOGCGQ';

export default function SpotifyPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Show prompt for 10 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-[var(--card-bg)]/98 backdrop-blur-md border-3 border-[var(--western-brown)] shadow-[6px_6px_0_var(--western-brown-dark)] p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-dashed border-[var(--western-brown-light)]">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="p-2 bg-[#1DB954]/20 border border-[#1DB954] rounded-full"
                >
                  <Music className="w-5 h-5 text-[#1DB954]" />
                </motion.div>
                <div>
                  <p className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Cinzel', serif" }}>
                    Wakanda Origins
                  </p>
                  <p className="text-sm text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
                    Ludwig Göransson
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-[var(--western-brown)]/20 transition-colors border border-[var(--western-brown-light)]"
                aria-label="Minimize player"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Spotify Embed */}
            <div className="border-2 border-[var(--western-brown-light)]">
              <iframe
                src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator&theme=0`}
                width="320"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: 0, display: 'block' }}
              />
            </div>

            {/* Instructions */}
            <div className="mt-3 p-3 bg-[#1DB954]/10 border border-[#1DB954]/30">
              <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2" style={{ fontFamily: "'Special Elite', monospace" }}>
                <Play className="w-4 h-4 text-[#1DB954]" />
                Cliquez sur Play pour lancer la musique
              </p>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-3 border-t border-dashed border-[var(--western-brown-light)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
                Black Panther OST
              </span>
              <a
                href={`https://open.spotify.com/track/${SPOTIFY_TRACK_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DB954] hover:underline flex items-center gap-1 text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Ouvrir Spotify
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
          >
            {/* Pulse prompt */}
            <AnimatePresence>
              {showPrompt && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                  <div className="bg-[#1DB954] text-white px-4 py-2 text-sm font-medium shadow-lg flex items-center gap-2" style={{ fontFamily: "'Special Elite', monospace" }}>
                    <Volume2 className="w-4 h-4" />
                    Cliquez pour la musique!
                    <motion.div
                      className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-[#1DB954]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-3 bg-[var(--card-bg)]/98 backdrop-blur-md border-3 border-[var(--western-brown)] shadow-[4px_4px_0_var(--western-brown-dark)] px-4 py-3 hover:border-[#1DB954] transition-all group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={showPrompt ? {
                boxShadow: ['4px 4px 0 var(--western-brown-dark)', '4px 4px 20px #1DB95480', '4px 4px 0 var(--western-brown-dark)'],
              } : {}}
              transition={showPrompt ? { duration: 1.5, repeat: Infinity } : {}}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1DB954]/0 via-[#1DB954]/20 to-[#1DB954]/0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <Music className="w-6 h-6 text-[#1DB954]" />
              </motion.div>

              <div className="relative z-10 text-left">
                <p className="text-base font-bold text-[var(--text-primary)] group-hover:text-[#1DB954] transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
                  Wakanda
                </p>
                <p className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
                  Ambiance musicale
                </p>
              </div>

              {/* Spotify logo */}
              <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center relative z-10 ml-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-black fill-current">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
