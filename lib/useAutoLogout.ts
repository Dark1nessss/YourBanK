import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

export function useAutoLogout() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout>();

  const logout = useCallback(() => {
    document.cookie = 'auth-token=; Max-Age=0; path=/';
    document.cookie = 'user-session=; Max-Age=0; path=/';
    router.push('/sign-in');
  }, [router]);

  const startTimer = useCallback(() => {
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

  // Initialize timer on first call
  if (!timerRef.current) {
    startTimer();
  }

  // Return functions to control the timer
  return {
    resetTimer,
    logout,
  };
}
