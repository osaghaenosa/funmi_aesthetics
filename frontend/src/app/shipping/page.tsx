import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Plane, Home, Mail, Globe, Clock, Truck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | Funmi\'s Aesthetics',
  description: 'Funmi\'s Aesthetics ships worldwide. Learn about processing times, delivery estimates, tracking, and shipping costs.',
};

const timeline = [
  { Icon: Package, label: 'Order Processed', time: 'Within 1–3 business days' },
  { Icon: Plane,   label: 'Dispatched',       time: 'With tracking email' },
  { Icon: Home,    label: 'Delivered',         time: '3–21 days (location-based)' },
];

const faqs = [
  {
    Icon: Clock,
    q: 'How long does delivery take?',
    a: 'Domestic (Nigeria): 3–7 business days. International: 7–21 business days depending on destination and customs clearance.',
  },
  {
    Icon: Truck,
    q: 'How much does shipping cost?',
    a: 'Shipping costs are calculated at checkout based on package weight, destination country, and your chosen shipping method (standard or express).',
  },
  {
    Icon: Globe,
    q: 'Which carriers do you use?',
    a: 'We partner with DHL, FedEx, and trusted local postal services to ensure safe, reliable delivery to your door worldwide.',
  },
  {
    Icon: HelpCircle,
    q: 'Are there customs fees?',
    a: 'International customers are responsible for any customs duties, taxes, or import fees levied by their destination country. These are not included in our pricing.',
  },
  {
    Icon: Mail,
    q: 'How do I track my order?',
    a: 'All orders include a tracking number sent to your registered email address once dispatched. You can monitor your package in real-time via the carrier website.',
  },
];

export default function ShippingPage() {
  return (
    <div className="pt-[70px]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cream to-mist py-24 text-center border-b border-ink/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#C9A96E18,_transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <p className="section-label justify-center">Logistics</p>
          <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-light leading-tight mb-5">
            Shipping &amp; Delivery
          </h1>
          <p className="text-[1rem] text-ink-soft max-w-lg mx-auto">
            We ship worldwide. Here&apos;s everything you need to know about getting your order to you, safely and on time.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { label: 'Processing Time', value: '1–3 business days', note: 'Before dispatch' },
              { label: 'Domestic Delivery', value: '3–7 business days', note: 'Within Nigeria' },
              { label: 'International', value: '7–21 business days', note: 'Customs may add time' },
              { label: 'Carriers', value: 'DHL, FedEx & Local', note: 'Worldwide coverage' },
            ].map(({ label, value, note }) => (
              <div key={label} className="p-5 bg-cream rounded-xl border border-ink/8 hover:border-champagne/30 transition-colors">
                <p className="font-mono text-[0.65rem] tracking-widest uppercase text-sage mb-1">{label}</p>
                <p className="font-display text-lg font-semibold text-ink">{value}</p>
                <p className="text-[0.78rem] text-ink-soft mt-0.5">{note}</p>
              </div>
            ))}
          </div>

          {/* Journey timeline */}
          <h2 className="font-display text-2xl font-light mb-6">Your Order Journey</h2>
          <div className="grid grid-cols-3 gap-3 mb-12">
            {timeline.map(({ Icon, label, time }, i) => (
              <div key={i} className="relative text-center p-6 bg-cream rounded-xl border border-ink/8">
                {i < 2 && (
                  <div className="absolute top-1/2 -right-1.5 w-3 h-px bg-champagne hidden md:block" />
                )}
                <div className="w-12 h-12 rounded-full bg-champagne/15 flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-champagne" strokeWidth={1.5} />
                </div>
                <p className="font-display text-base font-semibold mb-1">{label}</p>
                <p className="font-mono text-[0.65rem] tracking-wider uppercase text-champagne">{time}</p>
              </div>
            ))}
          </div>

          {/* Tracking highlight */}
          <div className="p-6 bg-champagne/10 border border-champagne/30 rounded-xl mb-12 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-champagne" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold mb-1">Order Tracking</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                All orders include a tracking number sent to your registered email address once dispatched. Use this to monitor your package in real-time via the carrier&apos;s website.
              </p>
            </div>
          </div>

          {/* International note */}
          <div className="p-6 bg-cream rounded-xl border border-ink/8 mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Globe size={18} className="text-champagne" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-semibold">International Orders</h3>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">
              Customers are responsible for any customs duties, taxes, or import fees levied by their destination country. These charges are not included in our pricing and vary by location. We recommend checking your local regulations before ordering.
            </p>
          </div>

          {/* FAQ */}
          <h2 className="font-display text-2xl font-light mb-7">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ Icon, q, a }) => (
              <div key={q} className="p-6 bg-cream rounded-xl border border-ink/8 hover:border-champagne/30 transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-champagne/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-champagne" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{q}</h3>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed pl-10">{a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-charcoal text-warm-white rounded-xl text-center">
            <h3 className="font-display text-2xl font-light mb-2">Still Have Questions?</h3>
            <p className="text-white/55 text-sm mb-6">Our team is available 24/7 to help with shipping enquiries.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <a href="https://wa.me/2347037118627" target="_blank" rel="noreferrer" className="btn-ghost" style={{ color: '#FFFDF9', borderColor: 'rgba(255,255,255,0.2)' }}>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
