import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Visual */}
          <div className="relative">
            {/* Main image */}
            <div className="rounded-2xl aspect-[4/5] overflow-hidden bg-mist relative">
              <Image
                src="/images/drape-midi.jpg"
                alt="Funmi's Aesthetics — curated fashion"
                fill
                className="object-cover"
              />
              {/* subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </div>

            {/* Floating secondary image */}
            <div className="absolute bottom-[-28px] right-[-28px] w-[45%] aspect-square rounded-xl border-[5px] border-warm-white shadow-2xl overflow-hidden bg-mist">
              <Image
                src="/images/tote-bag.jpg"
                alt="Premium bags"
                fill
                className="object-cover"
              />
            </div>

            {/* Years badge */}
            <div className="absolute top-8 right-[-16px] bg-champagne text-ink px-5 py-4 rounded-xl text-center shadow-lg shadow-champagne/30">
              <strong className="block font-display text-3xl font-light leading-none">4+</strong>
              <span className="font-mono text-[0.62rem] tracking-widest uppercase">Years<br/>Curating</span>
            </div>
          </div>

          {/* Copy */}
          <div className="md:pl-4">
            <p className="section-label">Our Story</p>
            <h2 className="section-title">Born from a Love<br />for Beautiful Things</h2>
            <p className="text-[0.95rem] text-ink-soft leading-relaxed mb-5">
              Founded by Funmilola Alade, Funmi&apos;s Aesthetics began as a personal passion for curating pieces that make everyday life more beautiful. What started as a love for fashion and home design has grown into a global destination for men and women who refuse to compromise on quality.
            </p>
            <p className="text-[0.95rem] text-ink-soft leading-relaxed mb-9">
              We believe style is for everyone — unbound by gender, geography, or budget. Every piece in our collection is chosen with intention, care, and an eye for timeless elegance.
            </p>
            <Link href="/about" className="btn-secondary">Read Full Story</Link>

            <div className="flex items-center gap-4 mt-9 pt-7 border-t border-ink/10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blush to-champagne flex items-center justify-center text-sm font-semibold text-ink shrink-0">
                FA
              </div>
              <div>
                <p className="font-display text-lg font-medium">Funmilola Alade</p>
                <p className="text-xs text-ink-soft">Founder & CEO, Funmi&apos;s Aesthetics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
