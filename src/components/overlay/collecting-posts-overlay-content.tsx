'use client';

import { Button } from '@/src/components/ui/button';
import { Loader } from '@/src/components/ui/loader';
import { useOverlay } from '@/src/components/overlay/overlay-provider';
import { useEffect, useState } from 'react';

const TEXT_STEPS = ['COLLECTING YOUR POSTS...', 'SETTING EVERYTHING UP'];
const INITIAL_DELAY_MS = 1000;
const DISPLAY_DURATION_MS = 1000;
const ANIMATION_DURATION_MS = 600;

type AnimationPhase = 'hidden' | 'enter' | 'exit';

export function CollectingPostsOverlayContent() {
  const { closeOverlay } = useOverlay();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>('hidden');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('enter');
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationPhase !== 'enter') {
      return;
    }

    if (currentTextIndex >= TEXT_STEPS.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setAnimationPhase('exit');
    }, DISPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [animationPhase, currentTextIndex]);

  useEffect(() => {
    if (animationPhase !== 'exit') {
      return;
    }

    const timer = setTimeout(() => {
      setAnimationPhase('hidden');
      setCurrentTextIndex((prev) => Math.min(prev + 1, TEXT_STEPS.length - 1));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimationPhase('enter'));
      });
    }, ANIMATION_DURATION_MS);

    return () => clearTimeout(timer);
  }, [animationPhase]);

  const currentText = TEXT_STEPS[currentTextIndex];
  const words = currentText.split(' ').filter((word) => word.trim() !== '');

  return (
    <div className="relative z-10 w-80 max-w-sm rounded-3xl p-8 text-left">
      {/* Fixed height container to prevent layout shifts */}
      <div className="h-[200px] flex flex-col items-center justify-center relative">
        {/* Title */}
        <h2 className="text-heading-lg text-white uppercase tracking-wide text-center min-h-[60px] flex items-center justify-center">
          <span className="text-reveal-wrapper inline-block w-full text-center">
            {words.map((word, index) => {
              let wordClass = 'text-reveal-char-hidden';
              if (animationPhase === 'enter') {
                wordClass = 'text-reveal-char';
              } else if (animationPhase === 'exit') {
                wordClass = 'text-reveal-char-exit';
              }

              const shouldAnimate =
                animationPhase === 'enter' || animationPhase === 'exit';

              return (
                <span
                  key={`${currentTextIndex}-${index}-${word}`}
                  className={`${wordClass} inline-block`}
                  style={{
                    animationDelay: shouldAnimate ? `${index * 0.15}s` : '0s',
                  }}
                >
                  {word}
                  {index < words.length - 1 && '\u00A0'}
                </span>
              );
            })}
          </span>
        </h2>

        {/* Loader - absolutely positioned within fixed height container */}
        <div className="absolute top-[calc(160px+1.5rem)] left-1/2 -translate-x-1/2 flex justify-center">
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

