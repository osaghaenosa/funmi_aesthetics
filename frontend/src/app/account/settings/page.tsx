'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/lib/api';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { isAuthenticated } = useRequireAuth();
  const { user: storeUser, fetchMe } = useAuthStore();
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (storeUser) {
      setForm({ firstName: storeUser.firstName, lastName: storeUser.lastName, phone: storeUser.phone || '' });
    }
  }, [storeUser]);

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.updateProfile(form);
      await fetchMe();
      toast.success('Profile updated successfully! ✓');
    } catch {
      toast.error('Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !storeUser) return null;

  return (
    <div className="pt-[70px] min-h-screen bg-warm-white">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/account" className="text-ink-soft hover:text-ink transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <h1 className="font-display text-3xl font-light">Account Settings</h1>
        </div>

        {/* Avatar / Name header */}
        <div className="flex items-center gap-4 mb-10 p-6 bg-cream rounded-md border border-ink/8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-warm-white shrink-0" style={{ background: 'linear-gradient(135deg, #C9A96E, #6B7F6E)' }}>
            {storeUser.firstName[0]}{storeUser.lastName[0]}
          </div>
          <div>
            <p className="font-display text-xl font-light">{storeUser.firstName} {storeUser.lastName}</p>
            <p className="text-sm text-ink-soft">{storeUser.email}</p>
            {storeUser.role === 'admin' && (
              <span className="inline-block mt-1 px-2 py-0.5 text-[0.62rem] font-medium tracking-widest uppercase rounded-full" style={{ background: 'rgba(201,169,110,0.2)', color: '#C9A96E' }}>Admin</span>
            )}
          </div>
        </div>

        {/* Profile form */}
        <div className="bg-cream rounded-md border border-ink/8 p-8 mb-6">
          <h2 className="font-display text-xl font-light mb-6">Profile Information</h2>
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">First Name</label>
                <input name="firstName" value={form.firstName} onChange={change} required className="input-field" />
              </div>
              <div>
                <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={change} required className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Email</label>
              <input value={storeUser.email} disabled className="input-field" style={{ opacity: 0.5, cursor: 'not-allowed' }} />
              <p className="text-[0.7rem] text-ink-soft mt-1">Email cannot be changed. Contact support to update.</p>
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Phone</label>
              <input name="phone" value={form.phone} onChange={change} className="input-field" placeholder="+234 703 711 8627" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ gap: '0.5rem' }}>
              <Save size={14} /> {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Danger zone */}
        <div style={{ background: '#fef2f2', borderRadius: '14px', border: '1px solid #fecaca', padding: '1.5rem' }}>
          <h3 className="font-display text-lg" style={{ color: '#b91c1c', marginBottom: '0.5rem' }}>Danger Zone</h3>
          <p className="text-xs" style={{ color: '#ef4444', marginBottom: '1rem' }}>Deleting your account is permanent and cannot be undone.</p>
          <button
            onClick={() => toast.error('Please contact support at funmisaesthetics@gmail.com to delete your account.')}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: '9999px', background: 'transparent', cursor: 'pointer' }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
