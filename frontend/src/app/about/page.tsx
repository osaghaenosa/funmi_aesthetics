import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Our Story' };

const values = [
  { icon: '🎯', title: 'Intentional Curation', desc: "Every product is hand-selected. We don't stock what's merely popular — we stock what's genuinely excellent." },
  { icon: '🌍', title: 'Accessible Luxury', desc: "Premium aesthetics shouldn't require a premium price tag. We bridge the gap between quality and affordability." },
  { icon: '⚖️', title: 'Style Without Bias', desc: 'Fashion and beauty belong to everyone. Our collections celebrate every gender, body, and style sensibility.' },
];

export default function AboutPage() {
  return (
    <div className="pt-[70px]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cream to-mist py-24 text-center border-b border-ink/8">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label justify-center">Who We Are</p>
          <h1 className="font-display text-[clamp(3rem,5vw,5rem)] font-light leading-tight mb-5">Our Story</h1>
          <p className="text-[1rem] text-ink-soft max-w-lg mx-auto">
            A brand born from passion, built on purpose — and dedicated to everyone who loves beautiful things.
          </p>
        </div>
      </div>

      {/* Main story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="rounded-lg aspect-[4/5] bg-gradient-to-br from-sage to-sage-deep flex items-center justify-center text-8xl">
                🌿
              </div>
              <div className="absolute bottom-[-28px] right-[-16px] w-[44%] aspect-square rounded-md border-[6px] border-warm-white shadow-xl bg-gradient-to-br from-blush to-champagne flex items-center justify-center text-4xl">
                ✨
              </div>
              <div className="absolute top-8 right-[-16px] bg-champagne text-ink px-5 py-4 rounded-md text-center shadow-lg shadow-champagne/30">
                <strong className="block font-display text-2xl font-light">Global</strong>
                <span className="font-mono text-[0.62rem] tracking-widest uppercase">Reach &<br/>Delivery</span>
              </div>
            </div>

            <div className="md:pl-4">
              <p className="section-label">The Beginning</p>
              <h2 className="section-title">Welcome to Funmi&apos;s Aesthetics</h2>
              <div className="space-y-4 text-[0.95rem] text-ink-soft leading-relaxed">
                <p>
                  Welcome to Funmi&apos;s Aesthetics — where style meets substance, and every piece tells a story of elegance, comfort, and modern living.
                </p>
                <p>
                  Founded by Funmilola Alade (FAD), Funmi&apos;s Aesthetics began with a passion for curating beautiful things that make everyday life more enjoyable. What started as a love for fashion and home aesthetics has grown into a global destination for men and women who value quality craftsmanship and timeless design.
                </p>
                <p>
                  Our mission is simple: to make premium aesthetics accessible to everyone, no matter where you are in the world. We believe style has no boundaries — it should empower, inspire, and reflect your unique personality.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-10 pt-8 border-t border-ink/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blush to-champagne flex items-center justify-center text-sm font-medium text-ink shrink-0">FA</div>
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
          <p className="section-label">What Guides Us</p>
          <h2 className="section-title">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="p-9 bg-warm-white rounded-md border border-ink/8 hover:border-champagne/40 transition-colors">
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="font-display text-[1.4rem] font-normal mb-3">{title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
