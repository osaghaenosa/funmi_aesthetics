'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

type Panel = 'login' | 'register';

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>('login');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const { login, register, isLoading } = useAuthStore();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Panel;
      setPanel(detail);
      setOpen(true);
    };
    window.addEventListener('open-auth', handler);
    return () => window.removeEventListener('open-auth', handler);
  }, []);

  const close = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (panel === 'login') {
        await login(form.email, form.password);
        toast.success('Welcome back! ✨');
      } else {
        await register({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password });
        toast.success("Welcome to Funmi's Aesthetics! 🎉");
      }
      close();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Something went wrong.';
      toast.error(msg);
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-ink/50 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="relative bg-warm-white rounded-lg w-full max-w-[460px] overflow-hidden shadow-2xl animate-fade-in-up">
        {/* Colour band */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-champagne to-sage-deep" />

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-mist flex items-center justify-center text-ink-soft hover:bg-ink/10 transition-colors"
        >
          <X size={14} />
        </button>

        <div className="px-10 py-10">
          {/* Header */}
          <p className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-champagne mb-2">
            {panel === 'login' ? 'Welcome Back' : 'New Here'}
          </p>
          <h2 className="font-display text-[2.2rem] font-light leading-tight mb-1">
            {panel === 'login' ? 'Sign in to\nyour account' : 'Create your\naccount'}
          </h2>
          <p className="text-sm text-ink-soft mb-7">
            {panel === 'login'
              ? 'Access your orders, wishlist, and more.'
              : 'Join us and unlock a world of curated beauty.'}
          </p>

          {/* Social auth */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => toast('Google sign-in coming soon!', { icon: '🔜' })}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border-[1.5px] border-ink/10 rounded-sm text-sm font-medium text-ink-soft hover:border-ink hover:text-ink hover:bg-mist transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => toast('Apple sign-in coming soon!', { icon: '🔜' })}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border-[1.5px] border-ink/10 rounded-sm text-sm font-medium text-ink-soft hover:border-ink hover:text-ink hover:bg-mist transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-ink/10" />
            <span className="text-xs text-ink-soft">or continue with email</span>
            <div className="flex-1 h-px bg-ink/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {panel === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">First Name</label>
                  <input name="firstName" type="text" required value={form.firstName} onChange={change} placeholder="Funmilola" className="input-field" />
                </div>
                <div>
                  <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Last Name</label>
                  <input name="lastName" type="text" required value={form.lastName} onChange={change} placeholder="Alade" className="input-field" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Email</label>
              <input name="email" type="email" required value={form.email} onChange={change} placeholder="you@example.com" className="input-field" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Password</label>
              <input name="password" type="password" required value={form.password} onChange={change} placeholder="••••••••" className="input-field" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-1 bg-ink text-warm-white text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-sage-deep transition-colors disabled:opacity-60"
            >
              {isLoading ? 'Please wait…' : panel === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Switch */}
          <p className="text-center text-sm text-ink-soft mt-5">
            {panel === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setPanel(panel === 'login' ? 'register' : 'login')}
              className="text-champagne font-medium hover:underline"
            >
              {panel === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
