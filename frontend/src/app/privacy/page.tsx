import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Eye, Share2, Lock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Funmi\'s Aesthetics',
  description: 'Read the Funmi\'s Aesthetics privacy policy — how we collect, use, and protect your personal data.',
};

const sections = [
  {
    Icon: Eye,
    title: 'Information We Collect',
    content: `We collect information you provide when you place an order, create an account, or contact us — including your name, email address, shipping address, and payment details. We also collect usage data through cookies to improve your browsing experience.`,
  },
  {
    Icon: Shield,
    title: 'How We Use Your Information',
    items: [
      'To process and fulfill your orders',
      'To communicate with you about orders and promotions',
      'To improve our website and customer service',
      'For marketing purposes (you can opt out at any time)',
    ],
  },
  {
    Icon: Share2,
    title: 'Data Sharing',
    content: `We do not sell your personal data. We may share information with trusted service providers — such as payment processors and shipping companies — only as necessary to fulfill your order or provide our services.`,
  },
  {
    Icon: Lock,
    title: 'Security',
    content: `We use industry-standard security measures to protect your personal data, including encrypted connections (SSL/TLS) and secure data storage practices.`,
  },
  {
    Icon: Mail,
    title: 'Your Rights',
    content: `You have the right to access, correct, or delete your personal information at any time. To exercise any of these rights, please contact us at funmisaesthetics@gmail.com. For full details and jurisdiction-specific rules (GDPR, CCPA, etc.), please get in touch.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-[70px]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cream to-mist py-24 text-center border-b border-ink/8">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label justify-center">Legal</p>
          <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-light leading-tight mb-5">
            Privacy Policy
          </h1>
          <p className="text-[0.9rem] text-ink-soft">Last updated: 2026</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Intro */}
          <div className="p-7 bg-champagne/10 border border-champagne/30 rounded-xl mb-12">
            <p className="text-[0.95rem] text-ink-soft leading-relaxed">
              At Funmi&apos;s Aesthetics, we respect your privacy and are committed to protecting your personal data. This policy explains what information we collect, how we use it, and what rights you have.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map(({ Icon, title, content, items }) => (
              <div key={title} className="border-b border-ink/8 pb-10 last:border-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-champagne" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold">{title}</h2>
                </div>
                {content && (
                  <p className="text-[0.93rem] text-ink-soft leading-relaxed">{content}</p>
                )}
                {items && (
                  <ul className="space-y-2 mt-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.93rem] text-ink-soft">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="mt-12 p-8 bg-charcoal text-warm-white rounded-xl">
            <h3 className="font-display text-2xl font-light mb-3">Reach Us</h3>
            <p className="text-white/60 text-sm mb-5">Our 24-hour customer representatives are always available to help.</p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-champagne font-mono text-[0.7rem] tracking-widest uppercase mr-2">Email</span>
                <a href="mailto:funmisaesthetics@gmail.com" className="text-white/80 hover:text-champagne transition-colors">
                  funmisaesthetics@gmail.com
                </a>
              </p>
              <p>
                <span className="text-champagne font-mono text-[0.7rem] tracking-widest uppercase mr-2">WhatsApp</span>
                <a href="https://wa.me/2347037118627" className="text-white/80 hover:text-champagne transition-colors" target="_blank" rel="noreferrer">
                  +234 703 711 8627
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/terms" className="btn-secondary">Terms &amp; Conditions</Link>
            <Link href="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
