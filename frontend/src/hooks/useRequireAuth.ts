import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Guards a page — redirects to home and opens auth modal if not authenticated.
 * Call at the top of any protected page.
 */
export function useRequireAuth() {
  const { isAuthenticated, fetchMe } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth', { detail: 'login' }));
    } else {
      fetchMe();
    }
  }, [isAuthenticated]);

  return { isAuthenticated };
}
