'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crosshair, Trophy, Skull, Bell, Mail } from 'lucide-react';

/**
 * Quick-draw duel game.
 * Open it from anywhere: window.dispatchEvent(new Event('open-duel'))
 */

type Phase = 'intro' | 'steady' | 'draw' | 'roundWon' | 'roundLost' | 'falseStart' | 'victory' | 'defeat';

interface Opponent {
  key: 'opp1' | 'opp2' | 'opp3';
  reactionMs: number;
  emojiArt: string;
}

const OPPONENTS: Opponent[] = [
  { key: 'opp1', reactionMs: 420, emojiArt: '🐛' },
  { key: 'opp2', reactionMs: 340, emojiArt: '⏰' },
  { key: 'opp3', reactionMs: 270, emojiArt: '💾' },
];

/* Minimal western sound engine (bell + gunshot) */
class DuelSounds {
  private ctx: AudioContext | null = null;

  private ensure() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        /* no audio */
      }
    }
    if (this.ctx?.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  bell() {
    const ctx = this.ensure();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.4);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.2);
  }

  gunshot() {
    const ctx = this.ensure();
    if (!ctx) return;
    const now = ctx.currentTime;
    const size = Math.floor(ctx.sampleRate * 0.3);
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / size, 2.5);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(now);
  }
}

const sounds = typeof window !== 'undefined' ? new DuelSounds() : null;

export default function DuelGame() {
  const t = useTranslations('duel');
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('intro');
  const [round, setRound] = useState(0);
  const [wins, setWins] = useState(0);
  const [playerMs, setPlayerMs] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const drawAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('duel-best');
    if (stored) setBest(Number(stored));
    const onOpen = () => {
      setOpen(true);
      setPhase('intro');
      setRound(0);
      setWins(0);
    };
    window.addEventListener('open-duel', onOpen);
    return () => window.removeEventListener('open-duel', onOpen);
  }, []);

  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const startRound = useCallback(() => {
    setPhase('steady');
    const delay = 1200 + Math.random() * 2800;
    timer.current = setTimeout(() => {
      drawAt.current = performance.now();
      sounds?.bell();
      setPhase('draw');
    }, delay);
  }, []);

  const opponent = OPPONENTS[Math.min(round, OPPONENTS.length - 1)];

  const handleShot = useCallback(() => {
    if (phase === 'steady') {
      // false start
      if (timer.current) clearTimeout(timer.current);
      setPhase('falseStart');
      return;
    }
    if (phase !== 'draw') return;
    const ms = Math.round(performance.now() - drawAt.current);
    sounds?.gunshot();
    setPlayerMs(ms);
    if (best === null || ms < best) {
      setBest(ms);
      localStorage.setItem('duel-best', String(ms));
    }
    if (ms <= opponent.reactionMs) {
      const newWins = wins + 1;
      setWins(newWins);
      if (round === OPPONENTS.length - 1) {
        setPhase('victory');
      } else {
        setPhase('roundWon');
      }
    } else {
      setPhase('roundLost');
    }
  }, [phase, best, opponent, wins, round]);

  const nextRound = useCallback(() => {
    setRound((r) => r + 1);
    startRound();
  }, [startRound]);

  const restart = useCallback(() => {
    setRound(0);
    setWins(0);
    setPhase('intro');
  }, []);

  if (!open) return null;

  const format = (template: string, vars: Record<string, string | number>) =>
    template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{
          background:
            phase === 'draw'
              ? 'radial-gradient(circle, #8B4513 0%, #2C1810 100%)'
              : 'radial-gradient(circle, #3E2723 0%, #1a0f0a 100%)',
          transition: 'background 0.15s',
        }}
        onMouseDown={phase === 'steady' || phase === 'draw' ? handleShot : undefined}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-6 right-6 p-2 text-[var(--western-cream)] opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t('close')}
        >
          <X className="w-8 h-8" />
        </button>

        {/* Round indicator */}
        {phase !== 'intro' && phase !== 'victory' && phase !== 'defeat' && (
          <p
            className="absolute top-8 left-1/2 -translate-x-1/2 text-[var(--western-gold)] uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            {format(t('round'), { n: round + 1 })} — {t(opponent.key)}
          </p>
        )}

        <div className="max-w-xl w-full text-center select-none">
          {phase === 'intro' && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <Crosshair className="w-16 h-16 mx-auto mb-6 text-[var(--western-gold)]" />
              <h2 className="text-4xl mb-6 text-[var(--western-cream)]" style={{ fontFamily: "'Rye', serif" }}>
                {t('title')}
              </h2>
              <p
                className="text-lg mb-8 text-[var(--western-parchment)] leading-relaxed"
                style={{ fontFamily: "'IM Fell English', serif" }}
              >
                {t('intro')}
              </p>
              <div className="flex items-center justify-center gap-6 mb-8">
                {OPPONENTS.map((o, i) => (
                  <div key={o.key} className="text-center">
                    <div className="text-4xl mb-2">{o.emojiArt}</div>
                    <p className="text-xs uppercase tracking-wider text-[var(--western-parchment)]/70" style={{ fontFamily: "'Special Elite', monospace" }}>
                      {t(o.key)}
                    </p>
                    <p className="text-xs text-[var(--western-gold)]">{o.reactionMs} ms</p>
                  </div>
                ))}
              </div>
              {best !== null && (
                <p className="mb-6 text-sm text-[var(--western-parchment)]/70" style={{ fontFamily: "'Special Elite', monospace" }}>
                  {t('best')}: <span className="text-[var(--western-gold)]">{best} ms</span>
                </p>
              )}
              <button
                onClick={startRound}
                className="px-8 py-4 bg-[var(--western-rust)] text-[var(--western-cream)] text-lg uppercase tracking-widest border-2 border-[var(--western-gold)] hover:bg-[var(--western-brown-dark)] transition-colors shadow-[4px_4px_0_#000]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {t('start')}
              </button>
            </motion.div>
          )}

          {phase === 'steady' && (
            <div className="cursor-crosshair">
              <Bell className="w-12 h-12 mx-auto mb-8 text-[var(--western-parchment)]/40" />
              <p className="text-3xl text-[var(--western-parchment)]" style={{ fontFamily: "'IM Fell English', serif" }}>
                {t('wait')}
              </p>
              <div className="mt-12 text-6xl opacity-60">{opponent.emojiArt}</div>
            </div>
          )}

          {phase === 'draw' && (
            <div className="cursor-crosshair">
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1.1 }}
                className="text-7xl sm:text-8xl text-[var(--western-cream)] font-bold"
                style={{ fontFamily: "'Rye', serif", textShadow: '4px 4px 0 #8B0000' }}
              >
                {t('draw')}
              </motion.p>
            </div>
          )}

          {phase === 'falseStart' && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <Skull className="w-16 h-16 mx-auto mb-6 text-[var(--western-red)]" />
              <p className="text-2xl mb-8 text-[var(--western-parchment)]" style={{ fontFamily: "'IM Fell English', serif" }}>
                {t('tooSoon')}
              </p>
              <button
                onClick={restart}
                className="px-6 py-3 bg-[var(--western-rust)] text-[var(--western-cream)] uppercase tracking-widest border-2 border-[var(--western-gold)] hover:bg-[var(--western-brown-dark)] transition-colors"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {t('retry')}
              </button>
            </motion.div>
          )}

          {(phase === 'roundWon' || phase === 'roundLost') && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <p className="text-5xl mb-4">{phase === 'roundWon' ? '🎯' : '💀'}</p>
              <p className="text-2xl mb-2 text-[var(--western-cream)]" style={{ fontFamily: "'Rye', serif" }}>
                {phase === 'roundWon'
                  ? format(t('youWin'), { ms: playerMs })
                  : format(t('youLose'), { ms: playerMs, oms: opponent.reactionMs })}
              </p>
              {phase === 'roundLost' && (
                <p className="mb-4 text-sm text-[var(--western-parchment)]/80" style={{ fontFamily: "'IM Fell English', serif" }}>
                  {t('defeat')}
                </p>
              )}
              {best !== null && (
                <p className="mb-8 text-sm text-[var(--western-parchment)]/70" style={{ fontFamily: "'Special Elite', monospace" }}>
                  {t('best')}: <span className="text-[var(--western-gold)]">{best} ms</span>
                </p>
              )}
              <button
                onClick={phase === 'roundWon' ? nextRound : restart}
                className="px-6 py-3 bg-[var(--western-rust)] text-[var(--western-cream)] uppercase tracking-widest border-2 border-[var(--western-gold)] hover:bg-[var(--western-brown-dark)] transition-colors"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {phase === 'roundWon' ? t('next') : t('retry')}
              </button>
            </motion.div>
          )}

          {phase === 'victory' && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Trophy className="w-20 h-20 mx-auto mb-6 text-[var(--western-gold)]" />
              <h2 className="text-4xl mb-4 text-[var(--western-cream)]" style={{ fontFamily: "'Rye', serif" }}>
                {t('victory')}
              </h2>
              <p className="text-lg mb-8 text-[var(--western-parchment)]" style={{ fontFamily: "'IM Fell English', serif" }}>
                {t('victorySub')}
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="#contact"
                  onClick={close}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--western-gold)] text-[var(--western-ink)] uppercase tracking-widest border-2 border-[var(--western-cream)] hover:bg-[var(--western-gold-light)] transition-colors"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <Mail className="w-4 h-4" />
                  {t('contact')}
                </a>
                <button
                  onClick={restart}
                  className="px-6 py-3 text-[var(--western-parchment)] uppercase tracking-widest border-2 border-[var(--western-brown-light)] hover:border-[var(--western-gold)] transition-colors"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {t('retry')}
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'defeat' && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <Skull className="w-16 h-16 mx-auto mb-6 text-[var(--western-parchment)]/60" />
              <p className="text-2xl mb-8 text-[var(--western-parchment)]" style={{ fontFamily: "'IM Fell English', serif" }}>
                {t('defeat')}
              </p>
              <button
                onClick={restart}
                className="px-6 py-3 bg-[var(--western-rust)] text-[var(--western-cream)] uppercase tracking-widest border-2 border-[var(--western-gold)] hover:bg-[var(--western-brown-dark)] transition-colors"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {t('retry')}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
