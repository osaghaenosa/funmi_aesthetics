'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen grid md:grid-cols-2 pt-[70px] overflow-hidden">
      {/* Copy */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-20">
        <p className="flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.22em] uppercase text-champagne mb-6 before:content-[''] before:w-7 before:h-px before:bg-champagne">
          New Season Collection
        </p>
        <h1 className="font-display text-[clamp(3rem,5.5vw,5.5rem)] font-light leading-[1.07] text-ink mb-7">
          Style Has<br />
          <em className="italic text-sage-deep">No Boundaries</em>
        </h1>
        <p className="text-[0.98rem] text-ink-soft max-w-[420px] leading-relaxed mb-10">
          Premium fashion, shoes, bags, and home essentials — curated for everyone who
          appreciates quality craftsmanship and timeless design. Delivered worldwide.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/shop" className="btn-primary">
            Shop Now <ArrowRight size={14} />
          </Link>
          <Link href="/about" className="btn-secondary">
            Our Story
          </Link>
        </div>
      </div>

      {/* Visual */}
      <div className="relative bg-mist min-h-[50vh] md:min-h-0 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
          {[
            { emoji: '👗', from: '#D4AFA3', to: '#C9A96E', label: 'Women\'s Fashion' },
            { emoji: '👜', from: '#C9A96E', to: '#9E7A44', label: 'Bags' },
            { emoji: '🏠', from: '#EAE7E1', to: '#D4C8B8', label: 'Home Decor' },
            { emoji: '👟', from: '#2A2A28', to: '#0F0E0C', label: 'Footwear' },
          ].map((cell, i) => (
            <div
              key={i}
              className="relative overflow-hidden group cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${cell.from}, ${cell.to})` }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                {cell.emoji}
              </div>
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[0.6rem] tracking-widest uppercase text-warm-white bg-ink/60 px-2 py-1 rounded-full backdrop-blur-sm">
                  {cell.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="absolute bottom-7 left-7 bg-warm-white rounded-md px-5 py-4 flex gap-4 items-center shadow-xl z-10">
          <span className="font-display text-3xl font-light text-champagne">200+</span>
          <div className="text-xs text-ink-soft leading-snug">Curated<br />Products</div>
        </div>
      </div>
    </section>
  );
}
