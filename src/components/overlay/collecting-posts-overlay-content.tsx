'use client';

import { Button } from '@/src/components/ui/button';
import { Loader } from '@/src/components/ui/loader';
import { useOverlay } from '@/src/components/overlay/overlay-provider';
import { useEffect, useState } from 'react';

const TEXT_STEPS = ['COLLECTING YOUR POSTS...', 'SETTING EVERYTHING UP'];
const INITIAL_DELAY_MS = 1000;
const DISPLAY_DURATION_MS = 2000;
const ANIMATION_DURATION_MS = 600;

type AnimationPhase = 'hidden' | 'enter' | 'exit';

export function CollectingPostsOverlayContent() {
  const { closeOverlay } = useOverlay();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>('hidden');
  const [loaderPhase, setLoaderPhase] = useState<AnimationPhase>('hidden');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('enter');
      setLoaderPhase('enter'); // Loader enters with first text
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationPhase !== 'enter') {
      return;
    }

    // Start exit animation after display duration for ALL texts
    const timer = setTimeout(() => {
      setAnimationPhase('exit');
      // Loader exits only with the last text
      if (currentTextIndex >= TEXT_STEPS.length - 1) {
        setLoaderPhase('exit');
      }
    }, DISPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [animationPhase, currentTextIndex]);

  useEffect(() => {
    if (animationPhase !== 'exit') {
      return;
    }

    const timer = setTimeout(() => {
      // Check if this was the last text
      if (currentTextIndex >= TEXT_STEPS.length - 1) {
        setAnimationPhase('hidden');
        setLoaderPhase('hidden');
        setIsComplete(true);
        return;
      }

      setAnimationPhase('hidden');
      setCurrentTextIndex((prev) => Math.min(prev + 1, TEXT_STEPS.length - 1));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimationPhase('enter'));
      });
    }, ANIMATION_DURATION_MS);

    return () => clearTimeout(timer);
  }, [animationPhase, currentTextIndex]);

  const currentText = TEXT_STEPS[currentTextIndex];
  const words = currentText.split(' ').filter((word) => word.trim() !== '');

  return (
    <div className="relative z-10 w-80 max-w-sm rounded-3xl p-8 text-left">
      {/* Fixed height container to prevent layout shifts */}
      <div className="h-[200px] flex flex-col items-center justify-center relative">
        {/* Title - hidden after all animations complete */}
        {!isComplete && (
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

                // For exit, reverse the order so last word exits first
                const delay =
                  animationPhase === 'exit'
                    ? (words.length - 1 - index) * 0.15
                    : index * 0.15;

                return (
                  <span
                    key={`${currentTextIndex}-${index}-${word}`}
                    className={`${wordClass} inline-block`}
                    style={{
                      animationDelay: shouldAnimate ? `${delay}s` : '0s',
                    }}
                  >
                    {word}
                    {index < words.length - 1 && '\u00A0'}
                  </span>
                );
              })}
            </span>
          </h2>
        )}

        {/* Loader - animated in/out with text */}
        {!isComplete && (
          <div className="absolute top-[calc(160px+1.5rem)] left-1/2 -translate-x-1/2 flex justify-center">
            <div
              className={`${
                loaderPhase === 'enter'
                  ? 'text-reveal-char'
                  : loaderPhase === 'exit'
                    ? 'text-reveal-char-exit'
                    : 'text-reveal-char-hidden'
              }`}
              style={{
                animationDelay:
                  loaderPhase === 'enter' ? '0.45s' : '0s',
              }}
            >
              <Loader />
            </div>
          </div>
        )}
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

