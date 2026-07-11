import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShoppingCart, Copyright, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Funmi\'s Aesthetics',
  description: 'Read the Funmi\'s Aesthetics Terms & Conditions. By using our website and making a purchase, you agree to these terms.',
};

const termsSections = [
  {
    Icon: ShoppingCart,
    title: 'Orders & Availability',
    items: [
      'All products are subject to availability.',
      'We reserve the right to refuse or cancel orders at our discretion.',
      'Prices are listed in USD and Nigerian Naira and may be converted based on your location.',
    ],
  },
  {
    Icon: Copyright,
    title: 'Intellectual Property',
    items: [
      'All images, logos, and content on this website belong to Funmi\'s Aesthetics.',
      'You may not reproduce, distribute, or use our content without prior written permission.',
    ],
  },
  {
    Icon: UserCheck,
    title: 'Eligibility',
    items: [
      'Users must be 18 years of age or older to make purchases.',
      'By using this website, you confirm you meet this age requirement.',
    ],
  },
  {
    Icon: FileText,
    title: 'Governing Law',
    items: [
      'These terms are governed by Nigerian law.',
      'Any disputes will be resolved under the jurisdiction of Nigerian courts.',
      'For jurisdiction-specific rules (GDPR, CCPA, etc.), please contact us directly.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="pt-[70px]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cream to-mist py-24 text-center border-b border-ink/8">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label justify-center">Legal</p>
          <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-light leading-tight mb-5">
            Terms &amp; Conditions
          </h1>
          <p className="text-[0.9rem] text-ink-soft">Last updated: 2026</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Agreement notice */}
          <div className="p-7 bg-champagne/10 border border-champagne/30 rounded-xl mb-12">
            <p className="text-[0.95rem] text-ink-soft leading-relaxed">
              Welcome to Funmi&apos;s Aesthetics. By using our website and making a purchase, you agree to the following terms and conditions. Please read them carefully before placing an order.
            </p>
          </div>

          <div className="space-y-10">
            {termsSections.map(({ Icon, title, items }) => (
              <div key={title} className="border-b border-ink/8 pb-10 last:border-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-champagne" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold">{title}</h2>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.93rem] text-ink-soft">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Limitations note */}
          <div className="mt-10 p-6 bg-cream rounded-xl border border-ink/8">
            <p className="text-sm text-ink-soft leading-relaxed">
              <strong className="text-ink">Limitations of Liability:</strong> Funmi&apos;s Aesthetics shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products. Our liability is limited to the value of the order placed.
            </p>
          </div>

          <div className="mt-8 p-8 bg-charcoal text-warm-white rounded-xl">
            <h3 className="font-display text-xl font-light mb-2">Questions About These Terms?</h3>
            <p className="text-white/60 text-sm mb-4">Contact our team — we&apos;re happy to clarify anything.</p>
            <div className="flex gap-3 flex-wrap">
              <a href="mailto:funmisaesthetics@gmail.com" className="text-sm text-champagne hover:underline">funmisaesthetics@gmail.com</a>
              <span className="text-white/30">·</span>
              <a href="https://wa.me/2347037118627" target="_blank" rel="noreferrer" className="text-sm text-champagne hover:underline">+234 703 711 8627</a>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/privacy" className="btn-secondary">Privacy Policy</Link>
            <Link href="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
