'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen grid md:grid-cols-2 pt-[70px] overflow-hidden">
      {/* Copy */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-warm-white">
        {/* Pre-heading pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-champagne/40 bg-champagne/8 w-fit mb-8">
          <Sparkles size={13} className="text-champagne" />
          <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-champagne">
            New Season · Summer 2026
          </span>
        </div>

        <h1 className="font-display text-[clamp(3.2rem,5.8vw,5.8rem)] font-light leading-[1.04] text-ink mb-6">
          Dress the Life<br />
          <em className="italic text-sage-deep not-italic">You Deserve.</em>
        </h1>

        <p className="text-[1rem] text-ink-soft max-w-[440px] leading-[1.85] mb-10">
          Funmi&apos;s Aesthetics brings you fashion, bags, shoes, and home décor that speak before you say a word. Curated for those who believe quality is not a luxury — it&apos;s a standard.
        </p>

        <div className="flex flex-wrap gap-4 items-center mb-14">
          <Link href="/shop" className="btn-primary group">
            Explore Collection
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link href="/about" className="btn-secondary">
            Our Story
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="flex items-center gap-6 pt-7 border-t border-ink/8">
          <div>
            <p className="font-display text-2xl font-light text-ink leading-none">1,200+</p>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-sage mt-1">Happy Clients</p>
          </div>
          <div className="w-px h-10 bg-ink/10" />
          <div>
            <p className="font-display text-2xl font-light text-ink leading-none">200+</p>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-sage mt-1">Curated Pieces</p>
          </div>
          <div className="w-px h-10 bg-ink/10" />
          <div>
            <p className="font-display text-2xl font-light text-ink leading-none">40+</p>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-sage mt-1">Countries Shipped</p>
          </div>
        </div>
      </div>

      {/* Visual grid */}
      <div className="relative bg-mist min-h-[50vh] md:min-h-0 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
          {[
            { image: '/images/drape-midi.jpg',      label: "Women's Fashion" },
            { image: '/images/tote-bag.jpg',         label: 'Bags' },
            { image: '/images/ceramic-lamp.jpg',     label: 'Home Décor' },
            { image: '/images/leather-sneakers.jpg', label: 'Footwear' },
          ].map((cell, i) => (
            <div key={i} className="relative overflow-hidden group cursor-pointer bg-mist">
              <Image
                src={cell.image}
                alt={cell.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-400" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[0.6rem] tracking-widest uppercase text-warm-white bg-ink/70 px-2 py-1 rounded-full backdrop-blur-sm">
                  {cell.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating badge */}
        <div className="absolute bottom-7 left-7 bg-warm-white rounded-xl px-5 py-4 flex gap-4 items-center shadow-2xl z-10 border border-champagne/20">
          <div>
            <span className="font-display text-3xl font-light text-champagne leading-none block">4.9</span>
            <div className="flex gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-2.5 h-2.5 text-champagne fill-champagne" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="text-xs text-ink-soft leading-snug">
            Rated by<br /><strong className="text-ink">1,200+ shoppers</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
