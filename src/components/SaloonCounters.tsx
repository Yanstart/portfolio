'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return <span ref={ref}>{value}</span>;
}

export default function SaloonCounters() {
  const t = useTranslations('counters');

  const items = [
    { value: 7, label: t('years') },
    { value: 2, label: t('systems') },
    { value: 345, label: t('tests') },
    { value: 4, label: t('langs') },
  ];

  return (
    <section className="py-10">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-y-4 border-double border-[var(--western-brown)] py-8 bg-[var(--card-bg)]/60"
        >
          {items.map((item) => (
            <div key={item.label} className="text-center px-4">
              <p
                className="text-4xl sm:text-5xl text-[var(--western-gold)] font-bold"
                style={{ fontFamily: "'Rye', serif" }}
              >
                <CountUp target={item.value} />
              </p>
              <p
                className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
