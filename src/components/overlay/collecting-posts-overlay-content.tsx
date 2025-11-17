'use client';

import { Button } from '@/src/components/ui/button';
import { Loader } from '@/src/components/ui/loader';
import { useOverlay } from '@/src/components/overlay/overlay-provider';
import { useEffect, useState } from 'react';

export function CollectingPostsOverlayContent() {
  const { closeOverlay } = useOverlay();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    setIsVisible(true);
  }, []);

  const text = 'COLLECTING YOUR POSTS';
  const words = text.split(' ');

  return (
    <div className="relative z-10 w-80 max-w-sm rounded-3xl p-8 text-left">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Loader */}
        <div className="flex justify-center mb-2">
          <Loader />
        </div>

        {/* Title */}
        <h2 className="text-heading-lg text-white uppercase tracking-wide">
          <span className="text-reveal-wrapper">
            {words.map((word, index) => (
              <span
                key={index}
                className="text-reveal-char"
                style={{
                  animationDelay: isVisible ? `${index * 0.15}s` : '0s',
                }}
              >
                {word}
                {index < words.length - 1 && '\u00A0'}
              </span>
            ))}
          </span>
        </h2>

        {/* Close Button */}
        <div className="flex flex-col items-center gap-4 w-full mt-4">
          <Button
            type="button"
            size="lg"
            variant="secondary"
            onClick={closeOverlay}
          >
            CLOSE
          </Button>
        </div>
      </div>
    </div>
  );
}

