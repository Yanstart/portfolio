'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Shuffle, SkipForward } from 'lucide-react';

// Western Ambient Music Generator - plays instantly while YouTube loads
class WesternAmbientMusic {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  // Western pentatonic scale (A minor pentatonic - classic western feel)
  private readonly notes = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33];

  init() {
    if (this.audioContext) return;
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.audioContext.destination);
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  start() {
    if (this.isPlaying || !this.audioContext || !this.masterGain) {
      this.init();
      if (!this.audioContext || !this.masterGain) return;
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;

    // Fade in
    const now = this.audioContext.currentTime;
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.15, now + 1);

    // Start ambient drone (low humming like wind through canyon)
    this.startDrone();

    // Start melody loop
    this.startMelody();
  }

  private startDrone() {
    if (!this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;

    // Low drone note
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 110; // Low A

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.3;

    // Add slight vibrato
    const vibrato = ctx.createOscillator();
    vibrato.type = 'sine';
    vibrato.frequency.value = 0.5;
    const vibratoGain = ctx.createGain();
    vibratoGain.gain.value = 2;
    vibrato.connect(vibratoGain);
    vibratoGain.connect(drone.frequency);

    // Filter for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    drone.connect(droneGain);
    droneGain.connect(filter);
    filter.connect(this.masterGain);

    drone.start();
    vibrato.start();

    this.oscillators.push(drone, vibrato);
  }

  private startMelody() {
    if (!this.audioContext || !this.masterGain) return;

    let noteIndex = 0;

    // Play a note every 800-1500ms (random for natural feel)
    const playNote = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return;

      const ctx = this.audioContext;
      const now = ctx.currentTime;

      // Pick a note from the scale
      const freq = this.notes[noteIndex % this.notes.length];
      noteIndex++;

      // Create harmonica-like sound (multiple oscillators)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.value = freq;
      osc2.frequency.value = freq * 2.01; // Slight detune for richness

      // Envelope
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.4, now + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.01, now + 2);

      // Vibrato for harmonica feel
      const noteVibrato = ctx.createOscillator();
      noteVibrato.type = 'sine';
      noteVibrato.frequency.value = 5;
      const noteVibratoGain = ctx.createGain();
      noteVibratoGain.gain.value = 3;
      noteVibrato.connect(noteVibratoGain);
      noteVibratoGain.connect(osc1.frequency);

      // Filter
      const noteFilter = ctx.createBiquadFilter();
      noteFilter.type = 'lowpass';
      noteFilter.frequency.value = 2000;

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(noteFilter);
      noteFilter.connect(this.masterGain!);

      osc1.start(now);
      osc2.start(now);
      noteVibrato.start(now);

      osc1.stop(now + 2.5);
      osc2.stop(now + 2.5);
      noteVibrato.stop(now + 2.5);

      // Schedule next note
      const nextDelay = 800 + Math.random() * 700;
      this.intervalId = setTimeout(playNote, nextDelay);
    };

    // Start first note after short delay
    this.intervalId = setTimeout(playNote, 500);
  }

  fadeOut(duration = 2) {
    if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

    const now = this.audioContext.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + duration);

    // Stop after fade
    setTimeout(() => this.stop(), duration * 1000 + 100);
  }

  stop() {
    this.isPlaying = false;

    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }

    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.oscillators = [];
  }

  destroy() {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
  }
}

// Extensive list of famous themes - movies, TV, games, anime
const FAMOUS_THEMES = [
  // MOVIES - Action/Adventure
  { id: 'SKRVqrOp-Uk', title: 'Wakanda Origins', artist: 'Ludwig Göransson', category: 'Movie' },
  { id: 'vbttZVTSJRU', title: 'Interstellar Main Theme', artist: 'Hans Zimmer', category: 'Movie' },
  { id: 'ASj81daun5Q', title: 'Pirates of the Caribbean', artist: 'Hans Zimmer', category: 'Movie' },
  { id: 'XYKUeZQbMF0', title: 'Star Wars Main Theme', artist: 'John Williams', category: 'Movie' },
  { id: 'm3zvVGJrTP8', title: 'Avengers Theme', artist: 'Alan Silvestri', category: 'Movie' },
  { id: '1gpXMGit4P8', title: 'The Dark Knight', artist: 'Hans Zimmer', category: 'Movie' },
  { id: 'afa-5HQHiAs', title: 'Inception - Time', artist: 'Hans Zimmer', category: 'Movie' },
  { id: 'e8X3ACToii0', title: 'Gladiator - Now We Are Free', artist: 'Hans Zimmer', category: 'Movie' },
  { id: 'RgKAFK5djSk', title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth', category: 'Movie' },

  // MOVIES - Cult Classics
  { id: 'HCjNJDNzw8Y', title: 'Bad Boys - Shake Ya Tailfeather', artist: 'Nelly', category: 'Movie' },
  { id: 'sRhTeaa_B98', title: 'The Godfather Theme', artist: 'Nino Rota', category: 'Movie' },
  { id: 'cWc7vYjgnTs', title: 'The Wolf of Wall Street', artist: 'Various', category: 'Movie' },
  { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor (Rocky)', category: 'Movie' },
  { id: 'YkADj0TPrJA', title: 'Requiem for a Dream', artist: 'Clint Mansell', category: 'Movie' },
  { id: '2H5uWRjFsGc', title: 'Schindler\'s List Theme', artist: 'John Williams', category: 'Movie' },
  { id: 'vCadcBR95oU', title: 'Pulp Fiction Theme', artist: 'Dick Dale', category: 'Movie' },
  { id: 'dfe8tCcHnKY', title: 'Kill Bill - Battle Without Honor', artist: 'Tomoyasu Hotei', category: 'Movie' },
  { id: '6Whgn_iE5uc', title: 'Drive - Nightcall', artist: 'Kavinsky', category: 'Movie' },
  { id: 'yKNxeF4KMsY', title: 'Skyfall', artist: 'Adele', category: 'Movie' },

  // TV SERIES
  { id: 'EG3sLpzKr6g', title: 'Game of Thrones', artist: 'Ramin Djawadi', category: 'TV' },
  { id: 'Vyu_IYHuBhE', title: 'Tron Legacy', artist: 'Daft Punk', category: 'Movie' },
  { id: 'AOAtz8xWM0w', title: 'Stranger Things', artist: 'Kyle Dixon', category: 'TV' },
  { id: '0J2QdDbelmY', title: 'Narcos', artist: 'Rodrigo Amarante', category: 'TV' },
  { id: 'rY-FJvRqK0E', title: 'Breaking Bad Theme', artist: 'Dave Porter', category: 'TV' },
  { id: 'F9hagVL-__c', title: 'Peaky Blinders - Red Right Hand', artist: 'Nick Cave', category: 'TV' },
  { id: 'oQwNN-0AgWc', title: 'The Last of Us', artist: 'Gustavo Santaolalla', category: 'Game' },
  { id: 's7L2PVdrb_8', title: 'House of the Dragon', artist: 'Ramin Djawadi', category: 'TV' },
  { id: 'TfadJj4d5K4', title: 'Succession Theme', artist: 'Nicholas Britell', category: 'TV' },
  { id: 'Eni9PPPPBpg', title: 'Squid Game', artist: 'Jung Jae-il', category: 'TV' },
  { id: 'WfZu4bMWq-8', title: 'Money Heist - My Life Is Going On', artist: 'Cecilia Krull', category: 'TV' },
  { id: 'LIDe-yTxda0', title: 'Vikings Theme', artist: 'Fever Ray', category: 'TV' },

  // ANIME
  { id: 'IcrbM1l_BoI', title: 'Attack on Titan', artist: 'Hiroyuki Sawano', category: 'Anime' },
  { id: 'psuRGfAaju4', title: 'One Punch Man', artist: 'JAM Project', category: 'Anime' },
  { id: 'd2hRTLdvdnk', title: 'Demon Slayer - Gurenge', artist: 'LiSA', category: 'Anime' },
  { id: 'HRaoYuRKBaA', title: 'Naruto - Sadness and Sorrow', artist: 'Toshio Masuda', category: 'Anime' },
  { id: 'nlLhw1mtCFA', title: 'Death Note Opening', artist: 'Nightmare', category: 'Anime' },
  { id: '2uq34TeWEdQ', title: 'Tokyo Ghoul - Unravel', artist: 'TK', category: 'Anime' },
  { id: 'MGRxAas-Mzw', title: 'Jujutsu Kaisen OP', artist: 'Eve', category: 'Anime' },
  { id: '7aMOurgDB-o', title: 'Mob Psycho 100', artist: 'MOB CHOIR', category: 'Anime' },
  { id: '0YF8vecQWYs', title: 'My Hero Academia - You Say Run', artist: 'Yuki Hayashi', category: 'Anime' },
  { id: 'vyGFM5CGnoo', title: 'One Piece - We Are', artist: 'Hiroshi Kitadani', category: 'Anime' },
  { id: 'nU21rCWkuJw', title: 'Chainsaw Man - KICK BACK', artist: 'Kenshi Yonezu', category: 'Anime' },
  { id: 'fhBA6ynorvc', title: 'Spy x Family OP', artist: 'Official HIGE DANdism', category: 'Anime' },
  { id: 'tLxi3UJPrFc', title: 'Vinland Saga - Mukanjyo', artist: 'Survive Said The Prophet', category: 'Anime' },
  { id: '1lsn2tT5yTc', title: 'Hunter x Hunter - Departure', artist: 'Masatoshi Ono', category: 'Anime' },
  { id: 'FtutLA63Cp8', title: 'Cowboy Bebop - Tank!', artist: 'Seatbelts', category: 'Anime' },

  // VIDEO GAMES
  { id: 'KpmgYmHDLVs', title: 'Skyrim Main Theme', artist: 'Jeremy Soule', category: 'Game' },
  { id: 'Y-I_Y9agnUc', title: 'The Witcher 3 - Geralt of Rivia', artist: 'Marcin Przybyłowicz', category: 'Game' },
  { id: 'ktvTqknDobU', title: 'Halo Theme', artist: 'Martin O\'Donnell', category: 'Game' },
  { id: 'NmCCQxVBfyM', title: 'God of War Theme', artist: 'Bear McCreary', category: 'Game' },
  { id: 'Jvvt_i9T90U', title: 'Red Dead Redemption 2', artist: 'Woody Jackson', category: 'Game' },
  { id: 'GSbHSsfOlhM', title: 'Dark Souls - Nameless Song', artist: 'Motoi Sakuraba', category: 'Game' },
  { id: 'oLA0vB9LCTM', title: 'Minecraft - Sweden', artist: 'C418', category: 'Game' },
  { id: 'yWh9l8RSkPk', title: 'Cyberpunk 2077 - V Theme', artist: 'Various', category: 'Game' },
  { id: 'GDflVhOpS4E', title: 'Doom Eternal - BFG Division', artist: 'Mick Gordon', category: 'Game' },
  { id: 'ihOpNtqnPi8', title: 'Hollow Knight - City of Tears', artist: 'Christopher Larkin', category: 'Game' },
  { id: 'ypNgvc6c6Cc', title: 'Undertale - Megalovania', artist: 'Toby Fox', category: 'Game' },
  { id: 'Z9dNrmGD7mU', title: 'Elden Ring Theme', artist: 'Tsukasa Saitoh', category: 'Game' },
];

const getRandomTheme = () => FAMOUS_THEMES[Math.floor(Math.random() * FAMOUS_THEMES.length)];

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars: Record<string, number | string>;
          events: {
            onReady: (event: { target: YTPlayer }) => void;
            onStateChange: (event: { data: number }) => void;
            onError: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        BUFFERING: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (config: { videoId: string; startSeconds: number }) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
  getPlayerState: () => number;
}

// Check localStorage directly (synchronous read for SSR safety)
const getSoundPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('portfolio-sound-enabled') === 'true';
};

export default function YouTubeAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(30);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => getRandomTheme());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastErrorTimeRef = useRef<number>(0);
  const soundEnabledRef = useRef<boolean>(false);
  const ambientMusicRef = useRef<WesternAmbientMusic | null>(null);

  // Initialize ambient music
  useEffect(() => {
    ambientMusicRef.current = new WesternAmbientMusic();
    return () => {
      ambientMusicRef.current?.destroy();
    };
  }, []);

  // Check localStorage for sound preference and start ambient music immediately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const enabled = getSoundPreference();
      setSoundEnabled(enabled);
      soundEnabledRef.current = enabled;
      if (enabled) {
        setHasInteracted(true);
        setShowPrompt(false);
        // Start ambient music IMMEDIATELY
        ambientMusicRef.current?.start();
        setAmbientPlaying(true);
      }
    }
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    // Small delay to ensure localStorage is read first
    const initTimeout = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initPlayer;
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initPlayer = () => {
    if (!containerRef.current) return;
    if (playerRef.current) return; // Prevent double init

    // Read preference directly from localStorage to avoid stale closure
    const shouldAutoPlay = getSoundPreference();

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: currentTheme.id,
      playerVars: {
        autoplay: shouldAutoPlay ? 1 : 0, // Auto-play if sound enabled
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        loop: 1,
        playlist: currentTheme.id,
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(volume);
          setIsReady(true);
          // Double-check and auto-play if sound was enabled in loader
          const soundPref = getSoundPreference();
          if (soundPref) {
            setHasInteracted(true);
            setShowPrompt(false);
            // Force play after a short delay
            setTimeout(() => {
              try {
                event.target.playVideo();
              } catch (e) {
                console.warn('Auto-play failed:', e);
              }
            }, 500);
          }
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setErrorCount(0);
            // Fade out ambient music when YouTube starts
            if (ambientMusicRef.current) {
              ambientMusicRef.current.fadeOut(2);
              setAmbientPlaying(false);
            }
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
        onError: (event) => {
          console.warn('YouTube player error:', event.data, '- Skipping to next track');
          handleVideoError();
        },
      },
    });
  };

  // Handle video errors by skipping to next track
  const handleVideoError = useCallback(() => {
    const now = Date.now();
    // Prevent rapid error loops
    if (now - lastErrorTimeRef.current < 2000) {
      return;
    }
    lastErrorTimeRef.current = now;

    setErrorCount(prev => {
      const newCount = prev + 1;
      // If too many errors, stop trying
      if (newCount > 5) {
        console.warn('Too many video errors, stopping playback');
        return newCount;
      }
      // Skip to next track
      shuffleTrack();
      return newCount;
    });
  }, []);

  // Shuffle to next random track
  const shuffleTrack = useCallback(() => {
    if (!playerRef.current) return;

    let newTheme = getRandomTheme();
    let attempts = 0;
    while (newTheme.id === currentTheme.id && FAMOUS_THEMES.length > 1 && attempts < 10) {
      newTheme = getRandomTheme();
      attempts++;
    }
    setCurrentTheme(newTheme);

    playerRef.current.loadVideoById({
      videoId: newTheme.id,
      startSeconds: 0,
    });
  }, [currentTheme.id]);

  // Skip to next track
  const skipTrack = useCallback(() => {
    shuffleTrack();
  }, [shuffleTrack]);

  // Hide prompt after 20 seconds
  useEffect(() => {
    if (!soundEnabled) {
      const timer = setTimeout(() => setShowPrompt(false), 20000);
      return () => clearTimeout(timer);
    }
  }, [soundEnabled]);

  // Update volume
  useEffect(() => {
    if (playerRef.current) {
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

  // Don't render if sound is disabled
  if (!soundEnabled && !hasInteracted && typeof window !== 'undefined') {
    // Still render but hidden if user hasn't interacted
  }

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
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[10px] border-transparent border-l-[var(--tech-blue)]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main player container */}
          <motion.div
            className={`flex items-center gap-4 bg-[var(--card-bg)]/98 backdrop-blur-md border-3 border-[var(--western-brown)] shadow-[5px_5px_0_var(--western-brown-dark)] px-5 py-4 transition-all group relative overflow-hidden ${!isReady && !ambientPlaying ? 'opacity-70' : ''}`}
            style={{
              borderColor: isPlaying ? '#FF0000' : ambientPlaying ? 'var(--western-gold)' : undefined,
              boxShadow: isPlaying
                ? '5px 5px 0 var(--western-brown-dark), 0 0 20px #FF000040'
                : ambientPlaying
                  ? '5px 5px 0 var(--western-brown-dark), 0 0 15px rgba(218, 165, 32, 0.4)'
                  : undefined,
            }}
            whileHover={{ scale: isReady ? 1.02 : 1 }}
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
            {(isPlaying || ambientPlaying) && (
              <motion.div
                className={`absolute inset-0 ${
                  isPlaying
                    ? 'bg-gradient-to-r from-[#FF0000]/10 via-[var(--western-gold)]/10 to-[#FF0000]/10'
                    : 'bg-gradient-to-r from-[var(--western-gold)]/10 via-[var(--western-brown)]/10 to-[var(--western-gold)]/10'
                }`}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: isPlaying ? 3 : 5, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Play/Pause button */}
            <motion.button
              onClick={togglePlay}
              disabled={!isReady && !ambientPlaying}
              className="relative z-10 p-2 rounded-full cursor-pointer disabled:cursor-not-allowed"
              style={{
                backgroundColor: isPlaying
                  ? '#FF0000'
                  : ambientPlaying
                    ? 'var(--western-gold)'
                    : isReady
                      ? 'var(--western-rust)'
                      : 'var(--western-brown-light)'
              }}
              animate={(isPlaying || ambientPlaying) ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : ambientPlaying ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </motion.button>

            {/* Music info */}
            <button
              onClick={togglePlay}
              disabled={!isReady && !ambientPlaying}
              className="relative z-10 text-left min-w-0 max-w-[120px] cursor-pointer disabled:cursor-not-allowed bg-transparent border-none"
            >
              <p
                className="text-sm font-bold transition-colors truncate"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: isPlaying || ambientPlaying ? '#FF0000' : 'var(--text-primary)',
                }}
                title={ambientPlaying && !isPlaying ? 'Western Ambient' : currentTheme.title}
              >
                {ambientPlaying && !isPlaying ? '🎸 Western Ambient' : currentTheme.title}
              </p>
              <p className="text-xs text-[var(--text-muted)] truncate" style={{ fontFamily: "'Special Elite', monospace" }} title={currentTheme.artist}>
                {ambientPlaying && !isPlaying
                  ? (isReady ? 'YouTube prêt...' : 'Chargement YouTube...')
                  : (!isReady ? 'Chargement...' : isPlaying ? currentTheme.artist : 'Cliquez pour jouer')}
              </p>
              {!ambientPlaying && currentTheme.category && (
                <span className="text-[10px] text-[var(--western-rust)] opacity-70">{currentTheme.category}</span>
              )}
            </button>

            {/* Skip button */}
            <motion.button
              onClick={skipTrack}
              disabled={!isReady}
              className="relative z-10 p-2 hover:bg-[var(--western-brown)]/20 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Piste suivante"
              aria-label="Skip track"
            >
              <SkipForward className="w-4 h-4 text-[var(--text-muted)] hover:text-[#FF0000]" />
            </motion.button>

            {/* Shuffle button */}
            <motion.button
              onClick={shuffleTrack}
              disabled={!isReady}
              className="relative z-10 p-2 hover:bg-[var(--western-brown)]/20 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              title="Musique aléatoire"
              aria-label="Shuffle track"
            >
              <Shuffle className="w-4 h-4 text-[var(--text-muted)] hover:text-[#FF0000]" />
            </motion.button>

            {/* Sound wave animation when playing (YouTube or Ambient) */}
            {(isPlaying || ambientPlaying) && (
              <div className="relative z-10 flex items-end gap-1 h-6 ml-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-1 rounded-full ${ambientPlaying && !isPlaying ? 'bg-[var(--western-gold)]' : 'bg-[#FF0000]'}`}
                    animate={{ height: ['40%', '100%', '40%'] }}
                    transition={{
                      duration: ambientPlaying && !isPlaying ? 0.8 : 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Volume control */}
            <div className="relative z-10 flex items-center gap-2 ml-1 pl-3 border-l border-[var(--western-brown-light)]">
              <button
                onClick={() => {
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
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
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
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-16 h-2 bg-[var(--western-brown-light)] rounded-none appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FF0000 0%, #FF0000 ${volume}%, var(--western-brown-light) ${volume}%, var(--western-brown-light) 100%)`
                }}
                aria-label="Volume"
              />
            </div>

            {/* YouTube logo */}
            <div className="relative z-10 ml-1">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF0000] fill-current" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
