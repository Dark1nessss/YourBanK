'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export function useAutoLogout() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout>();

  const logout = useCallback(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;

    // Clear cookies using the session cookie we're actually using
    document.cookie = 'session=; Max-Age=0; path=/';

    router.push('/sign-in');
  }, [router]);

  const startTimer = useCallback(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const tokenExpiration = 30 * 60 * 1000; // 30 minutes
    timerRef.current = setTimeout(logout, tokenExpiration);
  }, [logout]);

  const resetTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  // Initialize timer only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      startTimer();
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTimer]);

  // Return functions to control the timer
  return {
    resetTimer,
    logout,
  };
}
