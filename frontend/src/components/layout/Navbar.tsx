'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Heart, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Dispatch custom event to open auth modal
  const openAuth = (panel: 'login' | 'register') => {
    window.dispatchEvent(new CustomEvent('open-auth', { detail: panel }));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-ink/10 transition-all duration-300 ${
          scrolled ? 'bg-cream/97 backdrop-blur-xl shadow-sm' : 'bg-cream/88 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="font-display text-[1.45rem] font-medium tracking-wide">
            Funmi<span className="text-champagne">&apos;s</span> Aesthetics
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex gap-9 items-center">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="relative text-[0.82rem] font-medium tracking-[0.12em] uppercase text-ink-soft hover:text-ink transition-colors duration-200 group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-champagne transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/account" className="btn-ghost">
                <User size={14} />
                {user?.firstName}
              </Link>
            ) : (
              <>
                <button onClick={() => openAuth('login')} className="btn-ghost">Sign In</button>
                <button onClick={() => openAuth('register')} className="btn-primary">Join Us</button>
              </>
            )}
            <button
              onClick={toggleCart}
              className="relative ml-1 p-2.5 rounded-full hover:bg-mist transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-champagne text-ink text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleCart} className="relative p-2" aria-label="Cart">
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-champagne text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2" aria-label="Menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-warm-white flex flex-col justify-center items-center gap-8 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl font-light hover:text-champagne transition-colors"
          >
            {label}
          </Link>
        ))}
        <div className="flex gap-3 mt-4">
          {isAuthenticated ? (
            <Link href="/account" onClick={() => setMenuOpen(false)} className="btn-primary">
              My Account
            </Link>
          ) : (
            <>
              <button onClick={() => { openAuth('login'); setMenuOpen(false); }} className="btn-ghost">Sign In</button>
              <button onClick={() => { openAuth('register'); setMenuOpen(false); }} className="btn-primary">Join Us</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
