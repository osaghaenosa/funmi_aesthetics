import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Guards a protected page.
 * - Waits for the global session initialisation (first /auth/me check from SessionProvider).
 * - If no valid session exists once initialisation is done, opens the login modal.
 * - Returns { isAuthenticated, isChecking } so the caller can show a spinner.
 */
export function useRequireAuth() {
  const { isAuthenticated, isInitializing } = useAuthStore();

  // isChecking is true while the very first /auth/me fetch is in-flight
  const isChecking = isInitializing;

  // Once we have a definitive answer (not initializing) and the user is not authenticated, open login modal
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth', { detail: 'login' }));
    }
  }, [isInitializing, isAuthenticated]);

  return { isAuthenticated, isChecking };
}
