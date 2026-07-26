'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Silently restores the user session from the httpOnly cookie on every page load.
 * Place this once at the root layout — it runs transparently in the background.
 * 
 * This is the ONLY place fetchMe() should be called on app boot.
 * It sets isInitializing: false when done, unblocking all protected pages.
 */
export default function SessionProvider() {
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    // Fire-and-forget: restore session from httpOnly cookie on every mount
    fetchMe();
  }, [fetchMe]);

  return null;
}
