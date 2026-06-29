'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Heart, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

const menuItems = [
  { icon: Package, label: 'My Orders', desc: 'Track, view, and manage your purchases', href: '/account/orders' },
  { icon: Heart, label: 'Wishlist', desc: 'Items you have saved for later', href: '/account/wishlist' },
  { icon: MapPin, label: 'Addresses', desc: 'Manage your delivery addresses', href: '/account/addresses' },
  { icon: Settings, label: 'Account Settings', desc: 'Update your profile and password', href: '/account/settings' },
];

export default function AccountPage() {
  const { user, isAuthenticated, logout, fetchMe } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth', { detail: 'login' }));
      router.push('/');
    } else {
      fetchMe();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully.');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="pt-[70px] min-h-screen bg-warm-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-5 mb-12 pb-8 border-b border-ink/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-champagne to-sage flex items-center justify-center text-xl font-medium text-warm-white">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div>
            <h1 className="font-display text-3xl font-light">{user.firstName} {user.lastName}</h1>
            <p className="text-sm text-ink-soft mt-0.5">{user.email}</p>
            {user.role === 'admin' && (
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-champagne/20 text-champagne text-[0.65rem] font-medium tracking-widest uppercase rounded-full">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="grid gap-4 mb-10">
          {menuItems.map(({ icon: Icon, label, desc, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 p-5 bg-cream rounded-md border border-ink/8 hover:border-champagne/30 hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-10 h-10 rounded-sm bg-mist flex items-center justify-center group-hover:bg-champagne/15 transition-colors">
                <Icon size={18} className="text-ink-soft group-hover:text-champagne transition-colors" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-ink-soft mt-0.5">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-ink-soft" />
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
