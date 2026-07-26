'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  return (
    <aside className="w-64 bg-[#1C1B19] text-[#FFFDF9] sticky top-[70px] h-[calc(100vh-70px)] flex flex-col shrink-0 hidden md:flex">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-[#33312E] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden relative border border-[#C9A96E]/30 shrink-0">
          <Image src="/images/logo/logo.jpeg" alt="Funmi's Aesthetics" fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-[0.8rem] font-semibold text-[#FFFDF9] truncate">Admin Portal</p>
          <p className="text-[0.65rem] text-[#8E8B82] truncate">{user?.firstName} {user?.lastName}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href || (pathname.startsWith(href + '/') && href !== '/admin');
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                isActive
                  ? 'bg-[#C9A96E]/20 text-[#C9A96E]'
                  : 'text-[#8E8B82] hover:bg-[#33312E] hover:text-[#FFFDF9]'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-sm font-medium flex-1">{name}</span>
              {isActive && <ChevronRight size={14} className="opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-[#33312E] pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all w-full text-sm font-medium"
        >
          <LogOut size={18} strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
