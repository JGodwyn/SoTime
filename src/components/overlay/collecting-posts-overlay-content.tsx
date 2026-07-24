'use client';

import { Button } from '@/src/components/ui/button';
import { Loader } from '@/src/components/ui/loader';
import { useOverlay } from '@/src/components/overlay/overlay-provider';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const TEXT_STEPS = ['COLLECTING YOUR POSTS...', 'SETTING EVERYTHING UP'];
const INITIAL_DELAY_MS = 1000;
const DISPLAY_DURATION_MS = 2000;
const ANIMATION_DURATION_MS = 600;

type AnimationPhase = 'hidden' | 'enter' | 'exit';

interface UserStats {
  name: string;
  username: string;
  profileImageUrl: string | null;
  tweetCount: number | null;
}

export function CollectingPostsOverlayContent() {
  const { closeOverlay } = useOverlay();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>('hidden');
  const [loaderPhase, setLoaderPhase] = useState<AnimationPhase>('hidden');
  const [isComplete, setIsComplete] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [statsPhase, setStatsPhase] = useState<AnimationPhase>('hidden');
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

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

  // Fetch user stats when animations complete
  useEffect(() => {
    if (!isComplete) return;

    const fetchStats = async (retryCount = 0) => {
      setIsLoadingStats(true);
      setStatsError(null);
      
      try {
        const response = await fetch('/api/auth/x/stats');
        const data = await response.json();
        
        // Handle rate limiting with auto-retry
        if (response.status === 429) {
          const retryAfter = data.retryAfter || 15;
          const rateLimit = data.rateLimit;
          
          // Log rate limit details to console for debugging
          console.log('X API Rate Limit Details:', {
            ...rateLimit,
            retryAfter,
            retryCount,
          });
          
          if (retryCount < 3) {
            const resetTime = rateLimit?.resetAt ? new Date(rateLimit.resetAt).toLocaleTimeString() : '';
            setStatsError(`Rate limited. Retrying in ${retryAfter}s...${resetTime ? ` (Resets at ${resetTime})` : ''}`);
            setTimeout(() => fetchStats(retryCount + 1), retryAfter * 1000);
            return;
          } else {
            const resetTime = rateLimit?.resetAt ? new Date(rateLimit.resetAt).toLocaleTimeString() : 'a minute';
            setStatsError(`X API limit reached. Resets at ${resetTime}.`);
            setIsLoadingStats(false);
            setTimeout(() => setStatsPhase('enter'), 300);
            return;
          }
        }
        
        if (!response.ok) {
          setStatsError(data.error || 'Failed to fetch stats');
          setIsLoadingStats(false);
          setTimeout(() => setStatsPhase('enter'), 300);
          return;
        }
        
        if (data.authenticated && data.user) {
          setUserStats({
            name: data.user.name,
            username: data.user.username,
            profileImageUrl: data.user.profileImageUrl,
            tweetCount: data.user.tweetCount,
          });
          setIsRateLimited(!!data.rateLimited);
          setIsLoadingStats(false);
          setTimeout(() => {
            setStatsPhase('enter');
          }, 300);
        } else {
          setStatsError('Session expired. Please reconnect your account.');
          setIsLoadingStats(false);
          setTimeout(() => setStatsPhase('enter'), 300);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
        setStatsError('Failed to connect to server');
        setIsLoadingStats(false);
        setTimeout(() => setStatsPhase('enter'), 300);
      }
    };

    fetchStats();
  }, [isComplete]);

  const currentText = TEXT_STEPS[currentTextIndex];
  const words = currentText.split(' ').filter((word) => word.trim() !== '');

  return (
    <div className={`relative z-10 ${isComplete && userStats ? 'w-full h-full' : 'w-80 max-w-sm rounded-3xl p-8'} text-center`}>
      {/* Container that adapts based on state */}
      <div className={`flex flex-col items-center justify-center relative ${isComplete && userStats ? 'h-full' : 'h-[200px]'}`}>
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

        {/* Loading state - shown while fetching stats */}
        {isComplete && isLoadingStats && (
          <div className="flex flex-col items-center justify-center text-center">
            <Loader />
            <span className="text-body-md text-white/60 uppercase tracking-wide mt-4">
              Loading your stats...
            </span>
          </div>
        )}

        {/* Error state - shown when API fails */}
        {isComplete && !isLoadingStats && statsError && (
          <div className={`flex flex-col items-center justify-center text-center ${
            statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
          }`}
          style={{ animationDelay: '0s' }}
          >
            <span className="text-heading-md text-white uppercase tracking-wide mb-4">
              Oops!
            </span>
            <span className="text-body-lg text-white/60 mb-8">
              {statsError}
            </span>
            <Button
              type="button"
              size="lg"
              variant="secondary"
              onClick={closeOverlay}
            >
              TRY AGAIN
            </Button>
          </div>
        )}

        {/* User Stats Display - shown after animations complete */}
        {isComplete && !isLoadingStats && !statsError && userStats && (
          <div className="relative flex flex-col items-center justify-center text-center">
            {/* User Avatar and Name */}
            <div
              className={`flex flex-col items-center gap-2 ${
                statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
              }`}
              style={{ animationDelay: '0s' }}
            >
              {userStats.profileImageUrl ? (
                <Image
                  src={userStats.profileImageUrl.replace('_normal', '_200x200')}
                  alt={userStats.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full border-2 border-pumpkin-500"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-night-500 flex items-center justify-center border-2 border-pumpkin-500">
                  <span className="text-white text-xl font-bold">
                    {userStats.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-body-lg text-white uppercase tracking-wider font-medium">
                {userStats.name}
              </span>
            </div>

            {/* Stats content - either full stats or loading message */}
            {userStats.tweetCount !== null ? (
              <>
                {/* YOU'VE MADE text */}
                <div
                  className={`mt-8 ${
                    statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
                  }`}
                  style={{ animationDelay: '0.15s' }}
                >
                  <span className="text-heading-md text-white/80 uppercase tracking-widest">
                    YOU'VE MADE
                  </span>
                </div>

                {/* Large Post Count */}
                <div
                  className={`my-2 ${
                    statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
                  }`}
                  style={{ animationDelay: '0.3s' }}
                >
                  <span className="text-display-3xl text-white font-bold text-vignette">
                    {userStats.tweetCount.toLocaleString()}
                  </span>
                </div>

                {/* POSTS label */}
                <div
                  className={`${
                    statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
                  }`}
                  style={{ animationDelay: '0.45s' }}
                >
                  <span className="text-heading-lg text-dodger-400 uppercase tracking-widest">
                    POSTS
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Rate limited - loading stats */}
                <div
                  className={`mt-8 ${
                    statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
                  }`}
                  style={{ animationDelay: '0.15s' }}
                >
                  <span className="text-heading-md text-white/80 uppercase tracking-widest">
                    LOADING YOUR STATS
                  </span>
                </div>
                <div
                  className={`my-4 ${
                    statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
                  }`}
                  style={{ animationDelay: '0.3s' }}
                >
                  <Loader />
                </div>
                <div
                  className={`${
                    statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
                  }`}
                  style={{ animationDelay: '0.45s' }}
                >
                  <span className="text-body-lg text-white/50">
                    X API is rate limited. Stats will appear shortly.
                  </span>
                </div>
              </>
            )}

            {/* Comparison bubble - positioned to the right, only when we have stats */}
            {userStats.tweetCount !== null && (
              <div
                className={`absolute top-0 right-[-200px] ${
                  statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
                }`}
                style={{ animationDelay: '0.6s' }}
              >
                <div className="bg-dodger-500/20 backdrop-blur-md border border-dodger-400/40 rounded-2xl px-5 py-4 text-center shadow-lg shadow-dodger-500/10">
                  <span className="text-body-lg text-white uppercase font-semibold tracking-wide">
                    THAT'S AROUND
                  </span>
                  <br />
                  <span className="text-heading-md text-dodger-300 uppercase font-bold">
                    90% OF USERS
                  </span>
                </div>
              </div>
            )}

            {/* Wavy Loader */}
            <div
              className={`mt-12 ${
                statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
              }`}
              style={{ animationDelay: '0.75s' }}
            >
              <Loader />
            </div>

            {/* Next Button */}
            <div
              className={`mt-8 ${
                statsPhase === 'enter' ? 'text-reveal-char' : 'text-reveal-char-hidden'
              }`}
              style={{ animationDelay: '0.9s' }}
            >
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={closeOverlay}
              >
                NEXT
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

