'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isChecking } = useRequireAuth();
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Once we've finished checking and we know the user is not an admin, redirect
    if (!isChecking && user && user.role !== 'admin') {
      router.push('/');
    }
  }, [isChecking, user, router]);

  // Show spinner while verifying session
  if (isChecking || !isAuthenticated) {
    return (
      <div className="pt-[70px] min-h-screen flex justify-center items-center bg-[#F5F2EB]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C9A96E]" />
          <p className="text-sm text-[#8E8B82] font-medium tracking-wide">Verifying access…</p>
        </div>
      </div>
    );
  }

  // Non-admin user — show nothing while redirect happens
  if (user && user.role !== 'admin') return null;

  return (
    <div className="pt-[70px] min-h-screen bg-[#F5F2EB] flex">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
