'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Silently restores the user session from the httpOnly cookie on every page load.
 * Place this once at the root layout — it runs transparently in the background.
 */
export default function SessionProvider() {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    // Fire-and-forget: restore session from cookie on app load
    // No loading state needed here — individual protected pages handle their own guards
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
