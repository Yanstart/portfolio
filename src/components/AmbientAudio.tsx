'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Hide prompt after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);
    setShowPrompt(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/wakanda-ambient.mp3"
        loop
        preload="auto"
      />

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <div className="relative">
          {/* Prompt bubble */}
          <AnimatePresence>
            {showPrompt && !hasInteracted && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-gradient-to-r from-[#1DB954] to-[var(--tech-blue)] text-white px-5 py-3 shadow-lg flex items-center gap-3"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.div>
                  <span className="text-base font-medium">Cliquez pour la musique!</span>
                  {/* Arrow */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[10px] border-transparent border-l-[var(--tech-blue)]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main player button */}
          <motion.button
            onClick={togglePlay}
            className="flex items-center gap-4 bg-[var(--card-bg)]/98 backdrop-blur-md border-3 border-[var(--western-brown)] shadow-[5px_5px_0_var(--western-brown-dark)] px-5 py-4 transition-all group relative overflow-hidden"
            style={{
              borderColor: isPlaying ? '#1DB954' : undefined,
              boxShadow: isPlaying ? '5px 5px 0 var(--western-brown-dark), 0 0 20px #1DB95440' : undefined,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={!hasInteracted && showPrompt ? {
              boxShadow: [
                '5px 5px 0 var(--western-brown-dark)',
                '5px 5px 25px #1DB95460',
                '5px 5px 0 var(--western-brown-dark)',
              ],
            } : {}}
            transition={!hasInteracted ? { duration: 1.5, repeat: Infinity } : {}}
          >
            {/* Animated background when playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1DB954]/10 via-[var(--tech-blue)]/10 to-[#1DB954]/10"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Play/Pause icon */}
            <motion.div
              className="relative z-10 p-2 rounded-full"
              style={{ backgroundColor: isPlaying ? '#1DB954' : 'var(--western-brown-light)' }}
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </motion.div>

            {/* Music info */}
            <div className="relative z-10 text-left">
              <p
                className="text-lg font-bold transition-colors"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: isPlaying ? '#1DB954' : 'var(--text-primary)',
                }}
              >
                Wakanda Origins
              </p>
              <p className="text-sm text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
                {isPlaying ? 'En lecture...' : 'Cliquez pour jouer'}
              </p>
            </div>

            {/* Sound wave animation when playing */}
            {isPlaying && (
              <div className="relative z-10 flex items-end gap-1 h-6 ml-2">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#1DB954] rounded-full"
                    animate={{ height: ['40%', '100%', '40%'] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Volume control */}
            <div className="relative z-10 flex items-center gap-2 ml-2 pl-3 border-l border-[var(--western-brown-light)]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setVolume(volume === 0 ? 0.15 : 0);
                }}
                className="p-1 hover:bg-[var(--western-brown)]/20 transition-colors"
              >
                {volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-[var(--text-muted)]" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[#1DB954]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  e.stopPropagation();
                  setVolume(parseFloat(e.target.value));
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-20 h-2 bg-[var(--western-brown-light)] rounded-none appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(volume / 0.5) * 100}%, var(--western-brown-light) ${(volume / 0.5) * 100}%, var(--western-brown-light) 100%)`
                }}
              />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
