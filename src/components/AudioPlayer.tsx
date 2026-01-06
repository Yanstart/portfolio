'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  initialVolume?: number;
}

// Music: "Wakanda Origins" by Ludwig Göransson (Black Panther OST)
// Download from Spotify/YouTube and place in public/audio/wakanda-origins.mp3

export default function AudioPlayer({
  src,
  autoPlay = true,
  initialVolume = 0.08
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current && autoPlay) {
        setHasInteracted(true);
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to click
        });
        setIsPlaying(true);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [autoPlay, hasInteracted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[var(--card-bg)] border-2 border-[var(--western-brown)] shadow-[3px_3px_0_var(--western-brown-dark)] px-3 py-2"
        role="group"
        aria-label="Audio controls"
      >
        {/* Music icon indicator */}
        <Music className={`w-3 h-3 ${isPlaying ? 'text-[var(--tech-blue)] animate-pulse' : 'text-[var(--text-muted)]'}`} />

        <button
          onClick={togglePlay}
          className="p-1.5 hover:bg-[var(--tech-blue)]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--tech-blue)] border border-[var(--western-brown-light)]"
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[var(--tech-blue)]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[var(--text-muted)]" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="0.3"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-[var(--western-brown-light)] rounded-none appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--tech-blue) 0%, var(--tech-blue) ${(volume / 0.3) * 100}%, var(--western-brown-light) ${(volume / 0.3) * 100}%, var(--western-brown-light) 100%)`
          }}
          aria-label="Volume control"
        />

        {/* Track info */}
        <span className="text-[8px] text-[var(--text-muted)] hidden sm:block" style={{ fontFamily: "'Special Elite', monospace" }}>
          Wakanda
        </span>
      </div>
    </>
  );
}
