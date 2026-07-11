import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Globe, Scale, Gem } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story | Funmi\'s Aesthetics',
  description: 'Learn about Funmi\'s Aesthetics — founded by Funmilola Alade (FAD). A global destination for premium fashion, bags, home decor, and lifestyle pieces.',
};

const values = [
  {
    Icon: Target,
    title: 'Intentional Curation',
    desc: "Every product is hand-selected. We don't stock what's merely popular — we stock what's genuinely excellent.",
  },
  {
    Icon: Globe,
    title: 'Accessible Luxury',
    desc: "Premium aesthetics shouldn't require a premium price tag. We bridge the gap between quality and affordability, delivering worldwide.",
  },
  {
    Icon: Scale,
    title: 'Style Without Bias',
    desc: 'Fashion and beauty belong to everyone. Our collections celebrate every gender, body, and style sensibility.',
  },
  {
    Icon: Gem,
    title: 'Quality Craftsmanship',
    desc: 'We partner only with makers who share our standards — delivering pieces built to last, look great, and feel even better.',
  },
];

const offerings = [
  "Women's and Men's fashion, shoes, and accessories",
  'Statement bags and lifestyle pieces',
  'Exquisite home decor',
  'Reliable household appliances',
];

export default function AboutPage() {
  return (
    <div className="pt-[70px]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cream via-mist to-[#e2ddd7] py-28 text-center border-b border-ink/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#C9A96E22,_transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <p className="section-label justify-center">Who We Are</p>
          <h1 className="font-display text-[clamp(3rem,5vw,5.5rem)] font-light leading-tight mb-5">
            Born From a Love<br />
            <em className="italic text-sage-deep">for Beautiful Things</em>
          </h1>
          <p className="text-[1rem] text-ink-soft max-w-xl mx-auto leading-relaxed">
            A brand born from passion, built on purpose — dedicated to everyone who believes life deserves to look as good as it feels.
          </p>
        </div>
      </div>

      {/* Main Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Visual */}
            <div className="relative">
              <div className="rounded-2xl aspect-[4/5] overflow-hidden bg-mist relative">
                <Image
                  src="/images/drape-midi.jpg"
                  alt="Funmi's Aesthetics — premium fashion"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-[-28px] right-[-24px] w-[46%] aspect-square rounded-xl border-[5px] border-warm-white shadow-2xl overflow-hidden bg-mist">
                <Image
                  src="/images/tote-bag.jpg"
                  alt="Premium bags"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-8 right-[-16px] bg-champagne text-ink px-5 py-4 rounded-xl text-center shadow-lg shadow-champagne/30">
                <strong className="block font-display text-3xl font-light leading-none">Global</strong>
                <span className="font-mono text-[0.62rem] tracking-widest uppercase">Reach &<br />Delivery</span>
              </div>
            </div>

            {/* Copy */}
            <div className="md:pl-4">
              <p className="section-label">The Beginning</p>
              <h2 className="section-title">Welcome to Funmi&apos;s Aesthetics</h2>
              <div className="space-y-4 text-[0.95rem] text-ink-soft leading-relaxed mb-8">
                <p>
                  Welcome to Funmi&apos;s Aesthetics — where style meets substance, and every piece tells a story of elegance, comfort, and modern living.
                </p>
                <p>
                  Founded by <strong className="text-ink font-semibold">Funmilola Alade (FAD)</strong>, Funmi&apos;s Aesthetics began with a passion for curating beautiful things that make everyday life more enjoyable. What started as a love for fashion and home aesthetics has grown into a global destination for men and women who value quality craftsmanship and timeless design.
                </p>
                <p>
                  Our mission is simple: to make premium aesthetics accessible to everyone, no matter where you are in the world. We believe style has no boundaries — it should empower, inspire, and reflect your unique personality.
                </p>
              </div>

              {/* Offerings list */}
              <p className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-sage mb-4">What We Offer</p>
              <ul className="space-y-2 mb-9">
                {offerings.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9rem] text-ink-soft">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-[0.95rem] text-ink-soft leading-relaxed mb-9 italic border-l-2 border-champagne pl-4">
                &ldquo;Whether you&apos;re updating your wardrobe or transforming your living space, we&apos;re here to help you create a life that feels as good as it looks.&rdquo;
              </p>

              <Link href="/shop" className="btn-primary">
                Shop the Collection
              </Link>

              <div className="flex items-center gap-4 mt-9 pt-7 border-t border-ink/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blush to-champagne flex items-center justify-center text-sm font-semibold text-ink shrink-0">
                  FA
                </div>
                <div>
                  <p className="font-display text-lg font-medium">Funmilola Alade (FAD)</p>
                  <p className="text-xs text-ink-soft">Founder & CEO, Funmi&apos;s Aesthetics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label justify-center">What Guides Us</p>
            <h2 className="section-title mb-3">Our Values</h2>
            <p className="text-[0.95rem] text-ink-soft max-w-xl mx-auto">
              Every decision we make — from sourcing to delivery — is rooted in these principles.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="p-8 bg-warm-white rounded-xl border border-ink/8 hover:border-champagne/40 hover:shadow-lg transition-all duration-300 group">
                <div className="w-11 h-11 rounded-full bg-champagne/15 flex items-center justify-center mb-5 group-hover:bg-champagne/25 transition-colors">
                  <Icon size={20} className="text-champagne" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[1.3rem] font-semibold mb-2">{title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-warm-white mb-4">
            Let&apos;s Build Beautiful<br />Moments Together
          </h2>
          <p className="text-white/55 mb-8 text-sm leading-relaxed">
            Thank you for being part of our journey. Browse our collection or reach out — we&apos;d love to hear from you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop" className="btn-primary">Explore the Shop</Link>
            <Link href="/contact" className="btn-secondary" style={{ color: '#FFFDF9', borderColor: 'rgba(255,255,255,0.25)' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
