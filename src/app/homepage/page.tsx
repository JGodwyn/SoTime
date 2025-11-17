'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useOverlay } from '@/src/components/overlay/overlay-provider';
import { CollectingPostsOverlayContent } from '@/src/components/overlay/collecting-posts-overlay-content';

interface XUser {
  id: string;
  name: string | null;
  username: string | null;
}

export default function Homepage() {
  const [user, setUser] = useState<XUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openOverlay } = useOverlay();

  useEffect(() => {
    // Check for error in URL params
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');
      if (errorParam) {
        setError(decodeURIComponent(errorParam));
        // Clear error from URL
        window.history.replaceState({}, '', window.location.pathname);
      }
    }

    // Fetch user info on mount
    fetch('/api/auth/x/user')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user info:', err);
        setIsLoading(false);
      });
  }, []);

  // Show overlay after 1s delay when authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const timer = setTimeout(() => {
        openOverlay({
          content: <CollectingPostsOverlayContent />,
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, openOverlay]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-night-900">
        <div className="text-center">
          <p className="text-body-lg text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-night-900">
        <div className="text-center space-y-4">
          {error ? (
            <>
              <h1 className="text-heading-lg text-foreground">
                Connection Failed
              </h1>
              <p className="text-body-lg text-red-400 mb-4">{error}</p>
              <p className="text-body-md text-muted-foreground">
                Please try connecting again.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-heading-lg text-foreground">Not Connected</h1>
              <p className="text-body-lg text-muted-foreground">
                Please connect your X account to continue.
              </p>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-night-900 relative">
      <div className="text-center space-y-6 relative z-10">
        {/* Success Message */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500/30 mb-4">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          {/* User Info */}
          <div className="space-y-4">
            {user.name && (
              <h2 className="text-heading-xl text-white">
                {user.name}{' '}
                <span className="text-night-300">(@{user.username}) </span>
              </h2>
            )}
          </div>

          <h1 className="text-heading-sm text-white uppercase tracking-wide mt-4">
            Your account is <br /> connected
          </h1>
        </div>
      </div>
    </main>
  );
}

