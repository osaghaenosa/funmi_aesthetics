import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Guards a protected page.
 * - On mount, verifies the session via /auth/me (using the httpOnly cookie).
 * - If no valid session exists, opens the login modal.
 * - Returns { isAuthenticated, isChecking } so the caller can show a spinner.
 */
export function useRequireAuth() {
  const { isAuthenticated, fetchMe } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await fetchMe();
      setIsChecking(false);
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once check is done and user is not authenticated, open login modal
  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth', { detail: 'login' }));
    }
  }, [isChecking, isAuthenticated]);

  return { isAuthenticated, isChecking };
}
