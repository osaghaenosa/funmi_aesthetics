'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("You're on the list — stay stylish! 🌿");
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-20 bg-sage-deep relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-60px] w-64 h-64 rounded-full bg-champagne/10" />
      <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 rounded-full bg-champagne/7" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-warm-white mb-3">
          Stay in the loop,<br />ahead of the trend
        </h2>
        <p className="text-white/60 text-sm mb-9">
          New arrivals, exclusive offers, and style inspiration — curated and delivered to you.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-full text-warm-white placeholder:text-white/40 text-sm outline-none focus:border-champagne transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 bg-champagne text-ink text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-champagne-lt transition-colors whitespace-nowrap disabled:opacity-70"
          >
            {loading ? '…' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
