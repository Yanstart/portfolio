'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Shuffle } from 'lucide-react';

// Famous movie/TV/game themes - completely random selection
const FAMOUS_THEMES = [
  { id: 'SKRVqrOp-Uk', title: 'Wakanda Origins', artist: 'Ludwig Göransson' },
  { id: 'vbttZVTSJRU', title: 'Interstellar Main Theme', artist: 'Hans Zimmer' },
  { id: 'ASj81daun5Q', title: 'Pirates of the Caribbean', artist: 'Hans Zimmer' },
  { id: 'XYKUeZQbMF0', title: 'Star Wars Main Theme', artist: 'John Williams' },
  { id: 'm3zvVGJrTP8', title: 'Avengers Theme', artist: 'Alan Silvestri' },
  { id: 'EG3sLpzKr6g', title: 'Game of Thrones', artist: 'Ramin Djawadi' },
  { id: '1gpXMGit4P8', title: 'The Dark Knight', artist: 'Hans Zimmer' },
  { id: 'afa-5HQHiAs', title: 'Inception - Time', artist: 'Hans Zimmer' },
  { id: 'Vyu_IYHuBhE', title: 'Daft Punk - Tron Legacy', artist: 'Daft Punk' },
  { id: 'e8X3ACToii0', title: 'Gladiator - Now We Are Free', artist: 'Hans Zimmer' },
  { id: 'RgKAFK5djSk', title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth' },
  { id: '2bosouX_d8Y', title: 'The Last of Us', artist: 'Gustavo Santaolalla' },
  { id: 'KpmgYmHDLVs', title: 'Skyrim Main Theme', artist: 'Jeremy Soule' },
  { id: 'cWA_JBrLnT4', title: 'The Witcher 3 - Geralt of Rivia', artist: 'Marcin Przybyłowicz' },
  { id: 'AOAtz8xWM0w', title: 'Stranger Things', artist: 'Kyle Dixon & Michael Stein' },
  { id: '0J2QdDbelmY', title: 'Narcos', artist: 'Rodrigo Amarante' },
  { id: 'csL-usHr4FI', title: 'Money Heist - Bella Ciao', artist: 'Manu Pilas' },
  { id: 'IcrbM1l_BoI', title: 'Attack on Titan', artist: 'Hiroyuki Sawano' },
  { id: 'psuRGfAaju4', title: 'One Punch Man', artist: 'JAM Project' },
  { id: 'd2hRTLdvdnk', title: 'Demon Slayer - Gurenge', artist: 'LiSA' },
];

// Pick a random theme on component mount
const getRandomTheme = () => FAMOUS_THEMES[Math.floor(Math.random() * FAMOUS_THEMES.length)];

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YouTubeAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(30);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => getRandomTheme());
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Load the API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initPlayer;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initPlayer = () => {
    if (!containerRef.current) return;

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: currentTheme.id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        loop: 1,
        playlist: currentTheme.id, // Required for loop to work
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(volume);
          setIsReady(true);
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
      },
    });
  };

  // Shuffle to next random track
  const shuffleTrack = () => {
    if (!playerRef.current) return;

    let newTheme = getRandomTheme();
    // Ensure we get a different track
    while (newTheme.id === currentTheme.id && FAMOUS_THEMES.length > 1) {
      newTheme = getRandomTheme();
    }
    setCurrentTheme(newTheme);

    // Load and play new video
    playerRef.current.loadVideoById({
      videoId: newTheme.id,
      startSeconds: 0,
    });
  };

  // Hide prompt after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  // Update volume
  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;

    setHasInteracted(true);
    setShowPrompt(false);

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div ref={containerRef} className="hidden">
        <div id="youtube-player" />
      </div>

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
                  className="bg-gradient-to-r from-[#FF0000] to-[var(--tech-blue)] text-white px-5 py-3 shadow-lg flex items-center gap-3"
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
            disabled={!isReady}
            className="flex items-center gap-4 bg-[var(--card-bg)]/98 backdrop-blur-md border-3 border-[var(--western-brown)] shadow-[5px_5px_0_var(--western-brown-dark)] px-5 py-4 transition-all group relative overflow-hidden disabled:opacity-70"
            style={{
              borderColor: isPlaying ? '#FF0000' : undefined,
              boxShadow: isPlaying ? '5px 5px 0 var(--western-brown-dark), 0 0 20px #FF000040' : undefined,
            }}
            whileHover={{ scale: isReady ? 1.05 : 1 }}
            whileTap={{ scale: isReady ? 0.95 : 1 }}
            animate={!hasInteracted && showPrompt && isReady ? {
              boxShadow: [
                '5px 5px 0 var(--western-brown-dark)',
                '5px 5px 25px #FF000060',
                '5px 5px 0 var(--western-brown-dark)',
              ],
            } : {}}
            transition={!hasInteracted ? { duration: 1.5, repeat: Infinity } : {}}
          >
            {/* Animated background when playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 via-[var(--western-gold)]/10 to-[#FF0000]/10"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Play/Pause icon */}
            <motion.div
              className="relative z-10 p-2 rounded-full"
              style={{ backgroundColor: isPlaying ? '#FF0000' : isReady ? 'var(--western-rust)' : 'var(--western-brown-light)' }}
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
            <div className="relative z-10 text-left min-w-0 max-w-[140px]">
              <p
                className="text-sm font-bold transition-colors truncate"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: isPlaying ? '#FF0000' : 'var(--text-primary)',
                }}
                title={currentTheme.title}
              >
                {currentTheme.title}
              </p>
              <p className="text-xs text-[var(--text-muted)] truncate" style={{ fontFamily: "'Special Elite', monospace" }} title={currentTheme.artist}>
                {!isReady ? 'Chargement...' : isPlaying ? currentTheme.artist : 'Cliquez pour jouer'}
              </p>
            </div>

            {/* Shuffle button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                shuffleTrack();
              }}
              className="relative z-10 p-2 hover:bg-[var(--western-brown)]/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              title="Musique aléatoire"
            >
              <Shuffle className="w-4 h-4 text-[var(--text-muted)] hover:text-[#FF0000]" />
            </motion.button>

            {/* Sound wave animation when playing */}
            {isPlaying && (
              <div className="relative z-10 flex items-end gap-1 h-6 ml-2">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#FF0000] rounded-full"
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
                  if (playerRef.current) {
                    if (volume === 0) {
                      setVolume(30);
                      playerRef.current.unMute();
                    } else {
                      setVolume(0);
                      playerRef.current.mute();
                    }
                  }
                }}
                className="p-1 hover:bg-[var(--western-brown)]/20 transition-colors"
              >
                {volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-[var(--text-muted)]" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[#FF0000]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={volume}
                onChange={(e) => {
                  e.stopPropagation();
                  setVolume(parseInt(e.target.value));
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-20 h-2 bg-[var(--western-brown-light)] rounded-none appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FF0000 0%, #FF0000 ${volume}%, var(--western-brown-light) ${volume}%, var(--western-brown-light) 100%)`
                }}
              />
            </div>

            {/* YouTube logo */}
            <div className="relative z-10 ml-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FF0000] fill-current">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
