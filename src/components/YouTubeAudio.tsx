'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Shuffle, SkipForward } from 'lucide-react';

// The Godfather Theme Generator - plays instantly while YouTube loads
class GodfatherTheme {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private timeouts: NodeJS.Timeout[] = [];

  // The Godfather main theme melody (simplified) - in D minor
  // Notes: D4, F4, A4, D5, C5, Bb4, A4, G4, F4, E4, D4
  private readonly melody: Array<{ freq: number; duration: number; delay: number }> = [
    // Opening phrase - "Speak softly love"
    { freq: 293.66, duration: 0.8, delay: 0 },      // D4
    { freq: 349.23, duration: 0.6, delay: 0.9 },    // F4
    { freq: 440.00, duration: 0.8, delay: 1.6 },    // A4
    { freq: 587.33, duration: 1.2, delay: 2.5 },    // D5 (hold)
    { freq: 523.25, duration: 0.6, delay: 3.8 },    // C5
    { freq: 466.16, duration: 0.8, delay: 4.5 },    // Bb4
    { freq: 440.00, duration: 0.6, delay: 5.4 },    // A4
    { freq: 392.00, duration: 0.8, delay: 6.1 },    // G4
    { freq: 349.23, duration: 1.0, delay: 7.0 },    // F4
    { freq: 329.63, duration: 0.6, delay: 8.1 },    // E4
    { freq: 293.66, duration: 1.5, delay: 8.8 },    // D4 (resolve)
    // Second phrase
    { freq: 349.23, duration: 0.8, delay: 10.5 },   // F4
    { freq: 440.00, duration: 0.6, delay: 11.4 },   // A4
    { freq: 523.25, duration: 1.0, delay: 12.1 },   // C5
    { freq: 587.33, duration: 1.4, delay: 13.2 },   // D5 (hold)
    { freq: 523.25, duration: 0.5, delay: 14.7 },   // C5
    { freq: 466.16, duration: 0.5, delay: 15.3 },   // Bb4
    { freq: 440.00, duration: 1.2, delay: 15.9 },   // A4 (hold)
  ];

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
    this.init();
    if (!this.audioContext || !this.masterGain) return;
    if (this.isPlaying) return;

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;

    // Fade in master
    const now = this.audioContext.currentTime;
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.25, now + 0.5);

    // Play the melody
    this.playMelody();
  }

  private playMelody() {
    if (!this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;
    const startTime = ctx.currentTime;

    this.melody.forEach((note) => {
      const timeout = setTimeout(() => {
        if (!this.isPlaying || !this.audioContext || !this.masterGain) return;

        const noteTime = this.audioContext.currentTime;

        // Create trumpet/horn-like sound (Godfather uses trumpet)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();

        // Main tone
        osc1.type = 'sine';
        osc1.frequency.value = note.freq;

        // Harmonics for richness
        osc2.type = 'sine';
        osc2.frequency.value = note.freq * 2; // Octave

        osc3.type = 'sine';
        osc3.frequency.value = note.freq * 3; // Fifth harmonic

        // Vibrato for expressiveness
        const vibrato = ctx.createOscillator();
        vibrato.type = 'sine';
        vibrato.frequency.value = 5.5;
        const vibratoGain = ctx.createGain();
        vibratoGain.gain.value = 4;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc1.frequency);

        // Gain nodes
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        const gain3 = ctx.createGain();

        // ADSR-like envelope
        gain1.gain.setValueAtTime(0, noteTime);
        gain1.gain.linearRampToValueAtTime(0.5, noteTime + 0.08);
        gain1.gain.linearRampToValueAtTime(0.35, noteTime + 0.15);
        gain1.gain.linearRampToValueAtTime(0.3, noteTime + note.duration * 0.7);
        gain1.gain.exponentialRampToValueAtTime(0.01, noteTime + note.duration);

        gain2.gain.setValueAtTime(0, noteTime);
        gain2.gain.linearRampToValueAtTime(0.15, noteTime + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, noteTime + note.duration * 0.8);

        gain3.gain.setValueAtTime(0, noteTime);
        gain3.gain.linearRampToValueAtTime(0.08, noteTime + 0.1);
        gain3.gain.exponentialRampToValueAtTime(0.01, noteTime + note.duration * 0.6);

        // Filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 2500;
        filter.Q.value = 1;

        // Connect
        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        gain1.connect(filter);
        gain2.connect(filter);
        gain3.connect(filter);
        filter.connect(this.masterGain!);

        // Start and stop
        const stopTime = noteTime + note.duration + 0.1;
        osc1.start(noteTime);
        osc2.start(noteTime);
        osc3.start(noteTime);
        vibrato.start(noteTime);

        osc1.stop(stopTime);
        osc2.stop(stopTime);
        osc3.stop(stopTime);
        vibrato.stop(stopTime);

      }, note.delay * 1000);

      this.timeouts.push(timeout);
    });

    // Loop the melody
    const totalDuration = 17.5 * 1000; // Total melody duration
    const loopTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.playMelody();
      }
    }, totalDuration);
    this.timeouts.push(loopTimeout);
  }

  fadeOut(duration = 2) {
    if (!this.audioContext || !this.masterGain || !this.isPlaying) return;

    const now = this.audioContext.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + duration);

    setTimeout(() => this.stop(), duration * 1000 + 100);
  }

  stop() {
    this.isPlaying = false;
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];
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
  const [godfatherPlaying, setGodfatherPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastErrorTimeRef = useRef<number>(0);
  const soundEnabledRef = useRef<boolean>(false);
  const godfatherThemeRef = useRef<GodfatherTheme | null>(null);

  // Initialize Godfather theme
  useEffect(() => {
    godfatherThemeRef.current = new GodfatherTheme();
    return () => {
      godfatherThemeRef.current?.destroy();
    };
  }, []);

  // Check localStorage for sound preference
  // Godfather theme starts ONLY after loader completes (checks for loader-completed flag)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const enabled = getSoundPreference();
      setSoundEnabled(enabled);
      soundEnabledRef.current = enabled;

      if (enabled) {
        setHasInteracted(true);
        setShowPrompt(false);

        // Check if loader has completed (flag set by WesternLoader on "Entre Cowboi" click)
        const loaderCompleted = localStorage.getItem('portfolio-loader-completed') === 'true';

        if (loaderCompleted) {
          // Start Godfather theme immediately after entering
          godfatherThemeRef.current?.start();
          setGodfatherPlaying(true);
        }
      }

      // Listen for storage changes (when loader sets the completed flag)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'portfolio-loader-completed' && e.newValue === 'true') {
          const soundPref = getSoundPreference();
          if (soundPref && !godfatherThemeRef.current) return;
          if (soundPref) {
            godfatherThemeRef.current?.start();
            setGodfatherPlaying(true);
          }
        }
      };

      // Also poll for the flag (storage events don't fire for same-window changes)
      let godfatherStarted = false;
      let youtubeStarted = false;
      const pollInterval = setInterval(() => {
        const loaderDone = localStorage.getItem('portfolio-loader-completed') === 'true';
        const soundPref = getSoundPreference();

        if (loaderDone && soundPref) {
          // Start Godfather theme (only once)
          if (!godfatherStarted && godfatherThemeRef.current) {
            godfatherThemeRef.current.start();
            setGodfatherPlaying(true);
            godfatherStarted = true;
          }

          // Keep trying to play YouTube until it works
          if (!youtubeStarted && playerRef.current) {
            try {
              const state = playerRef.current.getPlayerState?.();
              // -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = cued
              if (state === 1) {
                // Already playing, we're done
                youtubeStarted = true;
              } else if (state !== undefined) {
                // Player is ready, try to play
                playerRef.current.playVideo();
              }
            } catch {
              // Player not ready yet, keep polling
            }
          }

          // Stop polling only when YouTube is playing
          if (godfatherStarted && youtubeStarted) {
            clearInterval(pollInterval);
          }
        }
      }, 300);

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(pollInterval);
      };
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
          const loaderCompleted = localStorage.getItem('portfolio-loader-completed') === 'true';

          if (soundPref && loaderCompleted) {
            setHasInteracted(true);
            setShowPrompt(false);
            // Force play after a short delay - this will trigger Godfather fadeout
            setTimeout(() => {
              try {
                event.target.playVideo();
              } catch (e) {
                console.warn('Auto-play failed:', e);
              }
            }, 800);
          }
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setErrorCount(0);
            // Fade out Godfather theme when YouTube starts
            if (godfatherThemeRef.current) {
              godfatherThemeRef.current.fadeOut(2);
              setGodfatherPlaying(false);
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
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <div className="relative">
          {/* Prompt bubble - hidden on mobile */}
          <AnimatePresence>
            {showPrompt && !hasInteracted && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-gradient-to-r from-[#FF0000] to-[var(--tech-blue)] text-white px-3 py-2 shadow-lg flex items-center gap-2 text-sm"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Musique!</span>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-transparent border-l-[var(--tech-blue)]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main player container - Compact on mobile */}
          <motion.div
            className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-[var(--card-bg)]/98 backdrop-blur-md border-2 border-[var(--western-brown)] shadow-[3px_3px_0_var(--western-brown-dark)] px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 transition-all group relative overflow-hidden ${!isReady && !godfatherPlaying ? 'opacity-70' : ''}`}
            style={{
              borderColor: isPlaying ? '#FF0000' : godfatherPlaying ? 'var(--western-gold)' : undefined,
              boxShadow: isPlaying
                ? '3px 3px 0 var(--western-brown-dark), 0 0 15px #FF000040'
                : godfatherPlaying
                  ? '3px 3px 0 var(--western-brown-dark), 0 0 10px rgba(218, 165, 32, 0.4)'
                  : undefined,
            }}
            whileHover={{ scale: isReady ? 1.02 : 1 }}
          >
            {/* Animated background when playing */}
            {(isPlaying || godfatherPlaying) && (
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
              disabled={!isReady && !godfatherPlaying}
              className="relative z-10 p-1.5 sm:p-2 rounded-full cursor-pointer disabled:cursor-not-allowed"
              style={{
                backgroundColor: isPlaying
                  ? '#FF0000'
                  : godfatherPlaying
                    ? 'var(--western-gold)'
                    : isReady
                      ? 'var(--western-rust)'
                      : 'var(--western-brown-light)'
              }}
              animate={(isPlaying || godfatherPlaying) ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              whileTap={{ scale: 0.9 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              ) : godfatherPlaying ? (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5" />
              )}
            </motion.button>

            {/* Music info - hidden on very small screens */}
            <button
              onClick={togglePlay}
              disabled={!isReady && !godfatherPlaying}
              className="hidden xs:block relative z-10 text-left min-w-0 max-w-[80px] sm:max-w-[100px] cursor-pointer disabled:cursor-not-allowed bg-transparent border-none"
            >
              <p
                className="text-[11px] sm:text-xs font-bold transition-colors truncate"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: isPlaying || godfatherPlaying ? '#FF0000' : 'var(--text-primary)',
                }}
                title={godfatherPlaying && !isPlaying ? 'The Godfather Theme' : currentTheme.title}
              >
                {godfatherPlaying && !isPlaying ? '🎺 Godfather' : currentTheme.title}
              </p>
              <p className="text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate" style={{ fontFamily: "'Special Elite', monospace" }}>
                {godfatherPlaying && !isPlaying
                  ? (isReady ? 'Prêt' : '...')
                  : (!isReady ? '...' : isPlaying ? currentTheme.category : 'Play')}
              </p>
            </button>

            {/* Skip button */}
            <motion.button
              onClick={skipTrack}
              disabled={!isReady}
              className="relative z-10 p-1 sm:p-1.5 hover:bg-[var(--western-brown)]/20 transition-colors disabled:opacity-50"
              whileTap={{ scale: 0.9 }}
              title="Piste suivante"
              aria-label="Skip track"
            >
              <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--text-muted)]" />
            </motion.button>

            {/* Shuffle button - hidden on mobile */}
            <motion.button
              onClick={shuffleTrack}
              disabled={!isReady}
              className="hidden sm:block relative z-10 p-1.5 hover:bg-[var(--western-brown)]/20 transition-colors disabled:opacity-50"
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              title="Musique aléatoire"
              aria-label="Shuffle track"
            >
              <Shuffle className="w-4 h-4 text-[var(--text-muted)]" />
            </motion.button>

            {/* Sound wave animation - smaller, hidden on mobile */}
            {(isPlaying || godfatherPlaying) && (
              <div className="hidden sm:flex relative z-10 items-end gap-0.5 h-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-0.5 rounded-full ${godfatherPlaying && !isPlaying ? 'bg-[var(--western-gold)]' : 'bg-[#FF0000]'}`}
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

            {/* Volume control - simplified on mobile */}
            <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 pl-1.5 sm:pl-2 border-l border-[var(--western-brown-light)]">
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
                className="p-0.5 sm:p-1 hover:bg-[var(--western-brown)]/20 transition-colors"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
              >
                {volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--text-muted)]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF0000]" />
                )}
              </button>
              {/* Volume slider - hidden on mobile */}
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="hidden sm:block w-12 md:w-14 h-1.5 bg-[var(--western-brown-light)] rounded-none appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FF0000 0%, #FF0000 ${volume}%, var(--western-brown-light) ${volume}%, var(--western-brown-light) 100%)`
                }}
                aria-label="Volume"
              />
            </div>

            {/* YouTube logo - smaller */}
            <div className="relative z-10">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF0000] fill-current" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
