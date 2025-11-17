'use client';

import { Button } from '@/src/components/ui/button';
import { Loader } from '@/src/components/ui/loader';
import { useOverlay } from '@/src/components/overlay/overlay-provider';
import { useEffect, useState } from 'react';

export function CollectingPostsOverlayContent() {
  const { closeOverlay } = useOverlay();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after 1 second delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const text = 'COLLECTING YOUR POSTS';
  const words = text.split(' ').filter((word) => word.trim() !== '');

  return (
    <div className="relative z-10 w-80 max-w-sm rounded-3xl p-8 text-left">
      {/* Fixed height container to prevent layout shifts */}
      <div className="h-[200px] flex flex-col items-center justify-center relative">
        {/* Title */}
        <h2 className="text-heading-lg text-white uppercase tracking-wide min-h-[60px] flex items-center justify-center">
          <span className="text-reveal-wrapper">
            {words.map((word, index) => (
              <span
                key={index}
                className={isVisible ? 'text-reveal-char' : ''}
                style={{
                  animationDelay: isVisible ? `${index * 0.15}s` : '0s',
                  ...(!isVisible && {
                    clipPath: 'inset(100% -12px 0 -12px)',
                    transform: 'translateY(100px)',
                    opacity: 0,
                    filter: 'blur(16px)',
                  }),
                }}
              >
                {word}
                {index < words.length - 1 && '\u00A0'}
              </span>
            ))}
          </span>
        </h2>

        {/* Loader - absolutely positioned within fixed height container */}
        <div className="absolute top-[calc(160px+1.5rem)] -translate-x-1/2 flex justify-center">
          <Loader />
        </div>
      </div>

      {/* Close Button */}
      {/* <div className="flex flex-col items-center gap-4 w-full mt-4">
        <Button
          type="button"
          size="lg"
          variant="secondary"
          onClick={closeOverlay}
        >
          CLOSE
        </Button>
      </div> */}
    </div>
  );
}

