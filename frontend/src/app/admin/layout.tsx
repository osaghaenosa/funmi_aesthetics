'use client';

import AdminSidebar from '@/components/layout/AdminSidebar';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useRequireAuth();
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If we have a user and they are explicitly not an admin, boot them.
    // (If user is null, we wait for useRequireAuth to fetchMe or redirect to login)
    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!isAuthenticated || (user && user.role !== 'admin')) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-[#F5F2EB]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A96E]"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F5F2EB] min-h-[calc(100vh-64px)]">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
