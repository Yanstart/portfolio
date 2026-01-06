'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WesternLoaderProps {
  onLoadingComplete?: () => void;
}

interface BulletHole {
  id: number;
  x: number;
  y: number;
}

export default function WesternLoader({
  onLoadingComplete,
}: WesternLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSign, setShowSign] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);
  const [bulletCount, setBulletCount] = useState(0);

  // Add bullet holes with gunshot sound effect simulation
  const addBulletHole = useCallback(() => {
    if (bulletCount >= 4) return;

    const newHole: BulletHole = {
      id: Date.now(),
      x: 15 + Math.random() * 70, // Random position on sign
      y: 15 + Math.random() * 70,
    };

    setBulletHoles(prev => [...prev, newHole]);
    setBulletCount(prev => prev + 1);
  }, [bulletCount]);

  useEffect(() => {
    const signTimer = setTimeout(() => setShowSign(true), 600);

    // Add bullet holes after sign appears
    const bulletTimers = [
      setTimeout(() => addBulletHole(), 1200),
      setTimeout(() => addBulletHole(), 1600),
      setTimeout(() => addBulletHole(), 2100),
      setTimeout(() => addBulletHole(), 2500),
    ];

    const readyTimer = setTimeout(() => setIsReady(true), 3000);

    return () => {
      clearTimeout(signTimer);
      clearTimeout(readyTimer);
      bulletTimers.forEach(t => clearTimeout(t));
    };
  }, [addBulletHole]);

  const handleEnter = () => {
    setIsLoading(false);
    onLoadingComplete?.();
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
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#F4A460] to-[#DEB887]">
            {/* Sun with rays */}
            <motion.div
              className="absolute top-12 right-16 md:right-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 40px 20px rgba(255,200,50,0.3)",
                      "0 0 60px 30px rgba(255,200,50,0.5)",
                      "0 0 40px 20px rgba(255,200,50,0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Distant mountains */}
            <svg className="absolute bottom-32 left-0 w-full h-40 opacity-30" viewBox="0 0 1440 160" preserveAspectRatio="none">
              <path d="M0,160 L100,80 L200,120 L350,40 L500,100 L650,20 L800,90 L950,50 L1100,110 L1250,30 L1440,100 L1440,160 Z" fill="#8B4513" />
            </svg>

            {/* Mesa/plateau */}
            <div className="absolute bottom-24 left-[10%] w-32 h-16 bg-gradient-to-t from-[#A0522D] to-[#CD853F] opacity-40" style={{ clipPath: 'polygon(10% 100%, 0% 0%, 100% 0%, 90% 100%)' }} />
            <div className="absolute bottom-24 right-[15%] w-24 h-12 bg-gradient-to-t from-[#8B4513] to-[#D2691E] opacity-35" style={{ clipPath: 'polygon(15% 100%, 0% 0%, 100% 0%, 85% 100%)' }} />
          </div>

          {/* Cactus silhouettes */}
          <div className="absolute bottom-20 left-[5%] opacity-60">
            <svg width="40" height="80" viewBox="0 0 40 80">
              <path d="M18,80 L18,30 M18,45 L8,45 L8,35 M18,35 L28,35 L28,25" stroke="#2F4F2F" strokeWidth="6" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-[8%] opacity-50">
            <svg width="50" height="100" viewBox="0 0 50 100">
              <path d="M25,100 L25,25 M25,50 L10,50 L10,35 M25,40 L40,40 L40,30 M25,60 L35,60 L35,50" stroke="#3D5C3D" strokeWidth="7" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-16 left-[25%] opacity-40">
            <svg width="30" height="60" viewBox="0 0 30 60">
              <path d="M15,60 L15,20 M15,35 L5,35 L5,28" stroke="#4A6741" strokeWidth="5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          {/* Ground with texture */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#C19A6B] via-[#D2B48C] to-[#DEB887]">
            {/* Ground texture lines */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-[#8B4513]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${20 + Math.random() * 60}px`,
                    transform: `rotate(${-5 + Math.random() * 10}deg)`,
                  }}
                />
              ))}
            </div>
            {/* Small rocks */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#8B7355]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${20 + Math.random() * 60}%`,
                  width: `${3 + Math.random() * 6}px`,
                  height: `${2 + Math.random() * 4}px`,
                  opacity: 0.4 + Math.random() * 0.3,
                }}
              />
            ))}
          </div>

          {/* Dust particles floating */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#D2B48C]"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${20 + Math.random() * 40}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
              }}
              animate={{
                x: [0, 30, -20, 40],
                y: [0, -40, -20, -60],
                opacity: [0.3, 0.6, 0.4, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Realistic Tumbleweed 1 */}
          <motion.div
            className="absolute bottom-16 z-10"
            initial={{ x: "-120px", rotate: 0 }}
            animate={{ x: "calc(100vw + 120px)", rotate: 1080 }}
            transition={{ duration: 7, ease: "linear", repeat: Infinity }}
          >
            <svg width="70" height="70" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="tw1" cx="40%" cy="40%">
                  <stop offset="0%" stopColor="#A08060" />
                  <stop offset="100%" stopColor="#5D4E37" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="35" fill="url(#tw1)" opacity="0.85"/>
              {[...Array(16)].map((_, i) => {
                const angle = (i * 22.5) * Math.PI / 180;
                const r1 = 15, r2 = 38 + Math.random() * 8;
                return (
                  <line key={i} x1={50 + r1 * Math.cos(angle)} y1={50 + r1 * Math.sin(angle)}
                    x2={50 + r2 * Math.cos(angle + 0.1)} y2={50 + r2 * Math.sin(angle + 0.1)}
                    stroke="#4A3C2A" strokeWidth="1.5" opacity="0.7"/>
                );
              })}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 + 20) * Math.PI / 180;
                return <circle key={i} cx={50 + 22 * Math.cos(angle)} cy={50 + 22 * Math.sin(angle)} r="4" fill="none" stroke="#6B5B4A" strokeWidth="1" opacity="0.5"/>;
              })}
            </svg>
          </motion.div>

          {/* Realistic Tumbleweed 2 (smaller, slower) */}
          <motion.div
            className="absolute bottom-14 z-10 opacity-70"
            initial={{ x: "-80px", rotate: 0 }}
            animate={{ x: "calc(100vw + 80px)", rotate: -900 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, delay: 2.5 }}
          >
            <svg width="45" height="45" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="tw2" cx="35%" cy="35%">
                  <stop offset="0%" stopColor="#B8A080" />
                  <stop offset="100%" stopColor="#6B5D4A" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="35" fill="url(#tw2)" opacity="0.8"/>
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                return (
                  <line key={i} x1={50 + 12 * Math.cos(angle)} y1={50 + 12 * Math.sin(angle)}
                    x2={50 + 40 * Math.cos(angle)} y2={50 + 40 * Math.sin(angle)}
                    stroke="#5D4E37" strokeWidth="1.2" opacity="0.6"/>
                );
              })}
            </svg>
          </motion.div>

          {/* Third tumbleweed in background */}
          <motion.div
            className="absolute bottom-24 z-5 opacity-40"
            initial={{ x: "-60px", rotate: 0 }}
            animate={{ x: "calc(100vw + 60px)", rotate: 720 }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity, delay: 5 }}
          >
            <svg width="30" height="30" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" fill="#7A6B5A" opacity="0.7"/>
            </svg>
          </motion.div>

          {/* Western Wooden Sign with Bullet Holes */}
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
                  {/* Sign posts */}
                  <div className="absolute -bottom-16 left-8 w-4 h-20 bg-gradient-to-r from-[#5D4037] to-[#4E342E] rounded-sm" />
                  <div className="absolute -bottom-16 right-8 w-4 h-20 bg-gradient-to-r from-[#5D4037] to-[#4E342E] rounded-sm" />

                  {/* Main Wooden Plank */}
                  <motion.div
                    className="relative bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#6B3E26] px-6 py-5 md:px-10 md:py-6 rounded-sm"
                    style={{
                      boxShadow: `
                        inset 0 2px 4px rgba(255,255,255,0.15),
                        inset 0 -3px 6px rgba(0,0,0,0.4),
                        0 8px 25px rgba(0,0,0,0.6),
                        5px 5px 0 #3E2723
                      `,
                    }}
                    animate={{ rotate: [-0.5, 0.5, -0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Wood grain texture */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`,
                      }}
                    />

                    {/* Nails */}
                    {[[8, 8], [8, 'calc(100% - 8px)'], ['calc(100% - 8px)', 8], ['calc(100% - 8px)', 'calc(100% - 8px)']].map(([top, left], i) => (
                      <div key={i} className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner"
                        style={{ top: top as string, left: left as string }} />
                    ))}

                    {/* BULLET HOLES */}
                    {bulletHoles.map((hole, index) => (
                      <motion.div
                        key={hole.id}
                        className="absolute pointer-events-none"
                        style={{ left: `${hole.x}%`, top: `${hole.y}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        {/* Bullet hole */}
                        <motion.div
                          className="relative"
                          initial={{ scale: 2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.1 }}
                        >
                          {/* Splintered wood around hole */}
                          <div className="absolute -inset-2 opacity-60">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute bg-[#5D4037]"
                                style={{
                                  width: '8px',
                                  height: '2px',
                                  left: '50%',
                                  top: '50%',
                                  transform: `rotate(${i * 60}deg) translateX(6px)`,
                                  transformOrigin: 'left center',
                                }}
                              />
                            ))}
                          </div>
                          {/* Dark hole center */}
                          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#000] shadow-inner border border-[#3E2723]" />
                          {/* Smoke puff */}
                          <motion.div
                            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-400"
                            initial={{ opacity: 0.8, scale: 0.5, y: 0 }}
                            animate={{ opacity: 0, scale: 2, y: -20 }}
                            transition={{ duration: 0.8, delay: index * 0.05 }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}

                    {/* Sign Text - TRASH STYLE */}
                    <div className="text-center space-y-2 relative z-10">
                      <motion.h1
                        className="text-2xl md:text-4xl font-bold tracking-wider"
                        style={{
                          fontFamily: "'Rye', serif",
                          color: '#1C1208',
                          textShadow: '1px 1px 0 rgba(255,255,255,0.1)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        YO ETRANJE
                      </motion.h1>

                      <motion.p
                        className="text-sm md:text-base"
                        style={{ fontFamily: "'Special Elite', monospace", color: '#2C1810' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        t&apos;es sur mon terr&apos;toir 🌵
                      </motion.p>

                      <motion.div
                        className="py-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <p className="text-xs md:text-sm" style={{ fontFamily: "'IM Fell English', serif", color: '#3E2723' }}>
                          ici on kode kom on tire
                        </p>
                        <p className="text-[10px] md:text-xs" style={{ fontFamily: "'Special Elite', monospace", color: '#5D4037' }}>
                          vite & sal 💀
                        </p>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-center gap-2 pt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <span>🔫</span>
                        <span className="text-[10px] md:text-xs uppercase" style={{ fontFamily: "'Rye', serif", color: '#8B0000' }}>
                          Kolt.js charge
                        </span>
                        <span>🔫</span>
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
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.button
                  onClick={handleEnter}
                  className="group relative px-8 py-4 cursor-pointer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-[#654321] via-[#8B4513] to-[#4A3728] rounded-sm"
                    style={{
                      boxShadow: `inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.4), 0 4px 15px rgba(0,0,0,0.5), 3px 3px 0 #2C1810`,
                    }}
                  />
                  <div className="relative flex items-center gap-3">
                    <motion.span className="text-xl" animate={{ x: [0, 5, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
                      👆
                    </motion.span>
                    <span
                      className="text-sm md:text-base uppercase tracking-widest text-[#E8D4B8] group-hover:text-[#FFD700] transition-colors"
                      style={{ fontFamily: "'Rye', serif", textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                    >
                      Entre Cowboi
                    </span>
                    <motion.span className="text-lg" animate={{ rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                      🤠
                    </motion.span>
                  </div>
                </motion.button>
                <motion.p
                  className="text-center mt-2 text-xs text-[#5D4037]"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  clik ou degaj 🌵
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading dots */}
          {!isReady && (
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#8B4513]"
                  animate={{ scale: [1, 1.5, 1] }}
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
