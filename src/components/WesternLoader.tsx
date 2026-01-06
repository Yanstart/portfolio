'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WesternLoaderProps {
  onLoadingComplete?: (soundEnabled: boolean) => void;
}

interface BulletHole {
  id: number;
  x: number;
  y: number;
}

// Famous Western movie quotes and saloon references
const WESTERN_QUOTES = [
  { quote: "This town ain't big enough for the both of us.", film: "Western Classic" },
  { quote: "Go ahead, make my day.", film: "Dirty Harry" },
  { quote: "I'll be your Huckleberry.", film: "Tombstone" },
  { quote: "You gonna pull those pistols or whistle Dixie?", film: "The Outlaw Josey Wales" },
  { quote: "When you have to shoot, shoot. Don't talk.", film: "The Good, the Bad and the Ugly" },
  { quote: "Fill your hands, you son of a bitch!", film: "True Grit" },
  { quote: "I'm your huckleberry.", film: "Tombstone" },
  { quote: "Dying ain't much of a living, boy.", film: "The Outlaw Josey Wales" },
  { quote: "There's two kinds of people in this world...", film: "The Good, the Bad and the Ugly" },
  { quote: "You see, in this world there's two kinds of people, my friend.", film: "The Good, the Bad and the Ugly" },
  { quote: "The name's Blondie.", film: "The Good, the Bad and the Ugly" },
  { quote: "Get three coffins ready.", film: "A Fistful of Dollars" },
  { quote: "You called down the thunder, well now you've got it!", film: "Tombstone" },
  { quote: "I'm afraid the strain was more than he could bear.", film: "Tombstone" },
  { quote: "I have not yet begun to defile myself.", film: "Tombstone" },
];

// Web Audio API sound generator
class WesternSoundEngine {
  private audioContext: AudioContext | null = null;
  private windNode: AudioBufferSourceNode | null = null;
  private windGain: GainNode | null = null;
  private lfoNode: OscillatorNode | null = null;

  init() {
    if (this.audioContext) return;
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  resume() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playGunshot() {
    if (!this.audioContext) this.init();
    if (!this.audioContext) return;
    this.resume();

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Noise buffer for gunshot crack
    const bufferSize = Math.floor(ctx.sampleRate * 0.4);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.pow(1 - i / bufferSize, 2.5);
      output[i] = (Math.random() * 2 - 1) * decay;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    // Bandpass for gunshot character
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(2000, now);
    bandpass.Q.value = 0.5;

    // Main gain
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    // Low thump
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.15);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    // Connect
    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  startWind() {
    if (!this.audioContext) this.init();
    if (!this.audioContext || this.windNode) return;
    this.resume();

    const ctx = this.audioContext;

    // Brownian noise for wind
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 500;

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 40;

    // LFO for modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.2;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 150;

    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);

    this.windGain = ctx.createGain();
    this.windGain.gain.value = 0.2;

    noise.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(this.windGain);
    this.windGain.connect(ctx.destination);

    this.windNode = noise;
    this.lfoNode = lfo;
    noise.start();
    lfo.start();
  }

  stopWind() {
    if (this.windGain && this.audioContext) {
      const now = this.audioContext.currentTime;
      this.windGain.gain.setValueAtTime(this.windGain.gain.value, now);
      this.windGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      setTimeout(() => {
        try {
          this.windNode?.stop();
          this.lfoNode?.stop();
        } catch {}
        this.windNode = null;
        this.windGain = null;
        this.lfoNode = null;
      }, 900);
    }
  }

  destroy() {
    this.stopWind();
    setTimeout(() => {
      if (this.audioContext) {
        this.audioContext.close().catch(() => {});
        this.audioContext = null;
      }
    }, 1000);
  }
}

export default function WesternLoader({ onLoadingComplete }: WesternLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);
  const [bulletCount, setBulletCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEngineRef = useRef<WesternSoundEngine | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Random western quote
  const randomQuote = useMemo(() =>
    WESTERN_QUOTES[Math.floor(Math.random() * WESTERN_QUOTES.length)],
  []);

  useEffect(() => {
    soundEngineRef.current = new WesternSoundEngine();
    // Clear the loader-completed flag on mount so it's fresh for this session
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolio-loader-completed');
    }
    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
      soundEngineRef.current?.destroy();
    };
  }, []);

  const addBulletHole = useCallback((withSound: boolean) => {
    if (bulletCount >= 4) return;

    if (withSound) {
      soundEngineRef.current?.playGunshot();
    }

    const newHole: BulletHole = {
      id: Date.now() + Math.random(),
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70,
    };

    setBulletHoles(prev => [...prev, newHole]);
    setBulletCount(prev => prev + 1);
  }, [bulletCount]);

  const startExperience = useCallback((withSound: boolean) => {
    if (hasStarted) return;
    setHasStarted(true);
    setSoundEnabled(withSound);

    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-sound-enabled', withSound ? 'true' : 'false');
    }

    if (withSound) {
      soundEngineRef.current?.startWind();
    }

    timersRef.current.push(setTimeout(() => setShowSign(true), 400));
    timersRef.current.push(setTimeout(() => addBulletHole(withSound), 1000));
    timersRef.current.push(setTimeout(() => addBulletHole(withSound), 1400));
    timersRef.current.push(setTimeout(() => addBulletHole(withSound), 1900));
    timersRef.current.push(setTimeout(() => addBulletHole(withSound), 2300));
    timersRef.current.push(setTimeout(() => setIsReady(true), 2800));
  }, [hasStarted, addBulletHole]);

  const handleEnter = () => {
    if (soundEnabled) {
      soundEngineRef.current?.stopWind();
    }
    // Set flag so YouTubeAudio knows loader completed - triggers Godfather theme
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-loader-completed', 'true');
    }
    setIsLoading(false);
    onLoadingComplete?.(soundEnabled);
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Click to start overlay */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Saloon doors background effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f00] via-[#2d1a0a] to-[#1a0f00]" />

                {/* Wooden frame */}
                <div className="absolute inset-4 md:inset-12 border-8 border-[#4a3020] rounded-lg opacity-40" />
                <div className="absolute inset-6 md:inset-14 border-4 border-[#6b4530] rounded-lg opacity-30" />

                {/* Content */}
                <motion.div
                  className="relative z-10 text-center px-6 max-w-2xl"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  {/* Saloon sign */}
                  <motion.div
                    className="mb-8"
                    animate={{ rotate: [-1, 1, -1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="inline-block bg-gradient-to-b from-[#8B4513] to-[#5D3A1A] px-8 py-4 border-4 border-[#3d2010] shadow-2xl"
                      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)' }}
                    >
                      <h1
                        className="text-3xl md:text-5xl text-[#FFD700]"
                        style={{ fontFamily: "'Rye', serif", textShadow: '3px 3px 0 #2d1a0a' }}
                      >
                        🍺 SALOON 🍺
                      </h1>
                    </div>
                    {/* Hanging chains */}
                    <div className="flex justify-center gap-32 -mt-1">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#666] to-[#333]" />
                      <div className="w-1 h-8 bg-gradient-to-b from-[#666] to-[#333]" />
                    </div>
                  </motion.div>

                  {/* Western quote */}
                  <motion.div
                    className="mb-8 p-4 bg-black/40 backdrop-blur-sm border border-[#8B4513]/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p
                      className="text-xl md:text-2xl text-[#E8D4B8] italic mb-2"
                      style={{ fontFamily: "'IM Fell English', serif" }}
                    >
                      &ldquo;{randomQuote.quote}&rdquo;
                    </p>
                    <p
                      className="text-sm text-[#8B7355]"
                      style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                      — {randomQuote.film}
                    </p>
                  </motion.div>

                  {/* Two buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* With sound button */}
                    <motion.button
                      onClick={() => startExperience(true)}
                      className="group relative px-8 py-4 min-w-[200px]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#8B4513] via-[#A0522D] to-[#654321] border-2 border-[#FFD700] shadow-lg"
                        style={{ boxShadow: '0 4px 15px rgba(255,215,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)' }}
                      />
                      <div className="relative flex items-center justify-center gap-2">
                        <span className="text-2xl">🔊</span>
                        <span
                          className="text-lg text-[#FFD700] uppercase tracking-wider"
                          style={{ fontFamily: "'Rye', serif" }}
                        >
                          Avec Son
                        </span>
                      </div>
                      <p className="relative text-xs text-[#E8D4B8] mt-1 opacity-80" style={{ fontFamily: "'Special Elite', monospace" }}>
                        Ambiance western complète
                      </p>
                    </motion.button>

                    {/* Without sound button */}
                    <motion.button
                      onClick={() => startExperience(false)}
                      className="group relative px-8 py-4 min-w-[200px]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#3d3d3d] via-[#2a2a2a] to-[#1a1a1a] border-2 border-[#666] shadow-lg" />
                      <div className="relative flex items-center justify-center gap-2">
                        <span className="text-2xl">🔇</span>
                        <span
                          className="text-lg text-[#ccc] uppercase tracking-wider"
                          style={{ fontFamily: "'Rye', serif" }}
                        >
                          Sans Son
                        </span>
                      </div>
                      <p className="relative text-xs text-[#888] mt-1" style={{ fontFamily: "'Special Elite', monospace" }}>
                        Mode silencieux, partner
                      </p>
                    </motion.button>
                  </div>

                  {/* Bottom quote */}
                  <motion.p
                    className="mt-8 text-sm text-[#6b5540]"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌵 Bienvenue dans le Far West du code 🌵
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sky gradient - visible when animation starts */}
          <div className={`absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#F4A460] to-[#DEB887] transition-opacity duration-500 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
            {/* Sun with rays */}
            <motion.div
              className="absolute top-8 right-12 md:right-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative">
                {/* Sun rays */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-32 h-1 bg-gradient-to-r from-yellow-300 to-transparent origin-left"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500 relative z-10" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 30px 15px rgba(255,200,50,0.4)",
                      "0 0 50px 25px rgba(255,200,50,0.6)",
                      "0 0 30px 15px rgba(255,200,50,0.4)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Clouds */}
            <motion.div
              className="absolute top-16 left-[10%] w-24 h-8 bg-white/30 rounded-full blur-sm"
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-24 left-[30%] w-32 h-10 bg-white/20 rounded-full blur-sm"
              animate={{ x: [0, -30, 0] }}
              transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Distant mountains - layered */}
            <svg className="absolute bottom-28 left-0 w-full h-32 opacity-20" viewBox="0 0 1440 128" preserveAspectRatio="none">
              <path d="M0,128 L80,70 L180,100 L300,30 L450,80 L600,10 L750,60 L900,25 L1050,75 L1200,20 L1350,65 L1440,40 L1440,128 Z" fill="#6B4423" />
            </svg>
            <svg className="absolute bottom-24 left-0 w-full h-28 opacity-30" viewBox="0 0 1440 112" preserveAspectRatio="none">
              <path d="M0,112 L100,60 L200,90 L350,35 L500,75 L650,15 L800,55 L950,30 L1100,70 L1250,25 L1440,60 L1440,112 Z" fill="#8B4513" />
            </svg>

            {/* Mesa/plateaus */}
            <div className="absolute bottom-20 left-[8%] w-28 h-14 bg-gradient-to-t from-[#A0522D] to-[#CD853F] opacity-50"
              style={{ clipPath: 'polygon(15% 100%, 0% 0%, 100% 0%, 85% 100%)' }} />
            <div className="absolute bottom-20 right-[12%] w-20 h-10 bg-gradient-to-t from-[#8B4513] to-[#D2691E] opacity-40"
              style={{ clipPath: 'polygon(10% 100%, 0% 0%, 100% 0%, 90% 100%)' }} />
            <div className="absolute bottom-24 left-[45%] w-16 h-8 bg-gradient-to-t from-[#A0522D] to-[#CD853F] opacity-30"
              style={{ clipPath: 'polygon(20% 100%, 0% 0%, 100% 0%, 80% 100%)' }} />
          </div>

          {/* Cactus silhouettes - more detailed */}
          {hasStarted && (
            <>
              <div className="absolute bottom-16 left-[3%] opacity-70 z-10">
                <svg width="50" height="100" viewBox="0 0 50 100">
                  <path d="M25,100 L25,35 M25,55 L12,55 L12,42 M25,45 L38,45 L38,32" stroke="#1a3a1a" strokeWidth="8" strokeLinecap="round" fill="none"/>
                  <path d="M25,100 L25,35 M25,55 L12,55 L12,42 M25,45 L38,45 L38,32" stroke="#2d5a2d" strokeWidth="5" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-16 right-[5%] opacity-60 z-10">
                <svg width="60" height="120" viewBox="0 0 60 120">
                  <path d="M30,120 L30,30 M30,60 L12,60 L12,45 M30,50 L48,50 L48,35 M30,75 L42,75 L42,60" stroke="#1a3a1a" strokeWidth="9" strokeLinecap="round" fill="none"/>
                  <path d="M30,120 L30,30 M30,60 L12,60 L12,45 M30,50 L48,50 L48,35 M30,75 L42,75 L42,60" stroke="#2d5a2d" strokeWidth="6" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div className="absolute bottom-14 left-[22%] opacity-50 z-10">
                <svg width="35" height="70" viewBox="0 0 35 70">
                  <path d="M17,70 L17,25 M17,40 L8,40 L8,32" stroke="#1a3a1a" strokeWidth="6" strokeLinecap="round" fill="none"/>
                  <path d="M17,70 L17,25 M17,40 L8,40 L8,32" stroke="#2d5a2d" strokeWidth="4" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              {/* Skull decoration */}
              <div className="absolute bottom-14 left-[15%] text-3xl opacity-40">💀</div>
            </>
          )}

          {/* Ground with texture */}
          <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#B8860B] via-[#D2B48C] to-[#DEB887] transition-opacity ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 opacity-30">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-[#8B4513]"
                  style={{
                    left: `${(i * 3.3) + Math.random() * 2}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${15 + Math.random() * 40}px`,
                    transform: `rotate(${-3 + Math.random() * 6}deg)`,
                  }}
                />
              ))}
            </div>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#8B7355]"
                style={{
                  left: `${(i * 6.5) + Math.random() * 3}%`,
                  top: `${30 + Math.random() * 50}%`,
                  width: `${4 + Math.random() * 8}px`,
                  height: `${3 + Math.random() * 5}px`,
                  opacity: 0.5 + Math.random() * 0.3,
                }}
              />
            ))}
          </div>

          {/* Dust particles */}
          {hasStarted && [...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#D2B48C]"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${16 + Math.random() * 35}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
              animate={{
                x: [0, 40, -30, 50],
                y: [0, -50, -30, -70],
                opacity: [0.4, 0.7, 0.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}

          {/* Tumbleweeds */}
          {hasStarted && (
            <>
              <motion.div
                className="absolute bottom-14 z-10"
                initial={{ x: "-100px", rotate: 0 }}
                animate={{ x: "calc(100vw + 100px)", rotate: 1080 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              >
                <svg width="60" height="60" viewBox="0 0 100 100">
                  <defs>
                    <radialGradient id="tw1" cx="40%" cy="40%">
                      <stop offset="0%" stopColor="#A08060" />
                      <stop offset="100%" stopColor="#5D4E37" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="30" fill="url(#tw1)" opacity="0.9"/>
                  {[...Array(14)].map((_, i) => {
                    const angle = (i * 25.7) * Math.PI / 180;
                    return (
                      <line key={i} x1={50 + 12 * Math.cos(angle)} y1={50 + 12 * Math.sin(angle)}
                        x2={50 + 35 * Math.cos(angle)} y2={50 + 35 * Math.sin(angle)}
                        stroke="#4A3C2A" strokeWidth="2" opacity="0.7"/>
                    );
                  })}
                </svg>
              </motion.div>
              <motion.div
                className="absolute bottom-12 z-10 opacity-70"
                initial={{ x: "-60px", rotate: 0 }}
                animate={{ x: "calc(100vw + 60px)", rotate: -900 }}
                transition={{ duration: 11, ease: "linear", repeat: Infinity, delay: 3 }}
              >
                <svg width="40" height="40" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="30" fill="#8A7A6A" opacity="0.8"/>
                </svg>
              </motion.div>
            </>
          )}

          {/* Western Wooden Sign */}
          <AnimatePresence>
            {showSign && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 px-4"
                initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 100 }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
              >
                <div className="relative">
                  {/* Sign posts with rope */}
                  <div className="absolute -bottom-20 left-6 w-5 h-24 bg-gradient-to-r from-[#5D4037] to-[#4E342E] rounded-sm" />
                  <div className="absolute -bottom-20 right-6 w-5 h-24 bg-gradient-to-r from-[#5D4037] to-[#4E342E] rounded-sm" />

                  {/* Rope details */}
                  <div className="absolute -top-3 left-4 w-8 h-3 border-2 border-[#8B7355] rounded-full opacity-60" />
                  <div className="absolute -top-3 right-4 w-8 h-3 border-2 border-[#8B7355] rounded-full opacity-60" />

                  {/* Main Wooden Plank */}
                  <motion.div
                    className="relative bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#6B3E26] px-8 py-6 md:px-12 md:py-8 rounded-sm"
                    style={{
                      boxShadow: `
                        inset 0 3px 6px rgba(255,255,255,0.15),
                        inset 0 -4px 8px rgba(0,0,0,0.4),
                        0 10px 30px rgba(0,0,0,0.6),
                        6px 6px 0 #3E2723
                      `,
                    }}
                    animate={{ rotate: [-0.5, 0.5, -0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Wood grain */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)`,
                      }}
                    />

                    {/* Nails */}
                    {[[10, 10], [10, 'calc(100% - 10px)'], ['calc(100% - 10px)', 10], ['calc(100% - 10px)', 'calc(100% - 10px)']].map(([top, left], i) => (
                      <div key={i} className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-inner"
                        style={{ top: top as string, left: left as string }} />
                    ))}

                    {/* Bullet holes */}
                    {bulletHoles.map((hole, index) => (
                      <motion.div
                        key={hole.id}
                        className="absolute pointer-events-none"
                        style={{ left: `${hole.x}%`, top: `${hole.y}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <motion.div
                          className="relative"
                          initial={{ scale: 2.5 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.08 }}
                        >
                          <div className="absolute -inset-3 opacity-50">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute bg-[#5D4037]"
                                style={{
                                  width: `${6 + Math.random() * 6}px`,
                                  height: '2px',
                                  left: '50%',
                                  top: '50%',
                                  transform: `rotate(${i * 45}deg) translateX(5px)`,
                                  transformOrigin: 'left center',
                                }}
                              />
                            ))}
                          </div>
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#000] shadow-inner border-2 border-[#3E2723]" />
                          <motion.div
                            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-400/80"
                            initial={{ opacity: 0.9, scale: 0.3, y: 0 }}
                            animate={{ opacity: 0, scale: 2.5, y: -25 }}
                            transition={{ duration: 0.6, delay: index * 0.03 }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}

                    {/* Sign Text */}
                    <div className="text-center space-y-3 relative z-10">
                      <motion.h1
                        className="text-3xl md:text-5xl font-bold tracking-wider"
                        style={{
                          fontFamily: "'Rye', serif",
                          color: '#1C1208',
                          textShadow: '2px 2px 0 rgba(255,255,255,0.1)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        YO ETRANJE
                      </motion.h1>

                      <motion.p
                        className="text-base md:text-lg"
                        style={{ fontFamily: "'Special Elite', monospace", color: '#2C1810' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        t&apos;es sur mon terr&apos;toir 🌵
                      </motion.p>

                      <motion.div
                        className="py-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <p className="text-sm md:text-base" style={{ fontFamily: "'IM Fell English', serif", color: '#3E2723' }}>
                          ici on kode kom on tire
                        </p>
                        <p className="text-xs md:text-sm" style={{ fontFamily: "'Special Elite', monospace", color: '#5D4037' }}>
                          vite & sal 💀
                        </p>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-center gap-3 pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <span className="text-xl">🔫</span>
                        <span className="text-xs md:text-sm uppercase" style={{ fontFamily: "'Rye', serif", color: '#8B0000' }}>
                          Kolt.js charge
                        </span>
                        <span className="text-xl">🔫</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enter Button */}
          <AnimatePresence>
            {isReady && (
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.button
                  onClick={handleEnter}
                  className="group relative px-10 py-5 cursor-pointer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-[#654321] via-[#8B4513] to-[#4A3728] rounded-sm border-2 border-[#8B4513]"
                    style={{
                      boxShadow: `inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.4), 0 6px 20px rgba(0,0,0,0.5), 4px 4px 0 #2C1810`,
                    }}
                  />
                  <div className="relative flex items-center gap-4">
                    <motion.span className="text-2xl" animate={{ x: [0, 6, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
                      👆
                    </motion.span>
                    <span
                      className="text-base md:text-lg uppercase tracking-widest text-[#E8D4B8] group-hover:text-[#FFD700] transition-colors"
                      style={{ fontFamily: "'Rye', serif", textShadow: '2px 2px 3px rgba(0,0,0,0.6)' }}
                    >
                      Entre Cowboi
                    </span>
                    <motion.span className="text-xl" animate={{ rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                      🤠
                    </motion.span>
                  </div>
                </motion.button>
                <motion.p
                  className="text-center mt-3 text-sm text-[#5D4037]"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {soundEnabled ? '🔊' : '🔇'} clik ou degaj 🌵
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading animation when started but not ready */}
          {hasStarted && !isReady && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 0.15, 0.3].map((delay, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-[#8B4513]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
