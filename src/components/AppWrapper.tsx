'use client';

import { useState, ReactNode } from 'react';
import WesternLoader from './WesternLoader';

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowContent(true);
    setTimeout(() => setIsLoading(false), 100);
  };

  return (
    <>
      {isLoading && (
        <WesternLoader onLoadingComplete={handleLoadingComplete} />
      )}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {children}
      </div>
    </>
  );
}
