import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, Clock, CheckCircle, XCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns & Refunds | Funmi\'s Aesthetics',
  description: 'Funmi\'s Aesthetics returns and refund policy — learn how to request a return or exchange.',
};

export default function ReturnsPage() {
  return (
    <div className="pt-[70px]">
      <div className="bg-gradient-to-br from-cream to-mist py-24 text-center border-b border-ink/8">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label justify-center">Customer Care</p>
          <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-light leading-tight mb-5">
            Returns &amp; Refunds
          </h1>
          <p className="text-[1rem] text-ink-soft max-w-lg mx-auto">
            Your satisfaction is our priority. Here&apos;s everything you need to know.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {[
              {
                Icon: CheckCircle,
                color: 'text-green-600',
                bg: 'bg-green-50 border-green-100',
                title: 'Eligible for Return',
                items: ['Items in original, unworn condition', 'Items with original tags attached', 'Requests made within 7 days of delivery', 'Defective or incorrectly sent items'],
              },
              {
                Icon: XCircle,
                color: 'text-red-500',
                bg: 'bg-red-50 border-red-100',
                title: 'Not Eligible for Return',
                items: ['Worn, washed, or altered items', 'Items without original packaging', 'Sale or final-clearance items', 'Custom or personalised orders'],
              },
            ].map(({ Icon, color, bg, title, items }) => (
              <div key={title} className={`p-7 rounded-xl border ${bg}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={20} className={color} />
                  <h3 className="font-display text-xl font-semibold">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                      <span className="w-1 h-1 rounded-full bg-current mt-2 shrink-0 opacity-50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Process steps */}
          <h2 className="font-display text-2xl font-light mb-7">How to Request a Return</h2>
          <div className="space-y-4 mb-12">
            {[
              { step: '01', Icon: Mail, title: 'Contact Us', desc: 'Email funmisaesthetics@gmail.com or message us on WhatsApp (+234 703 711 8627) within 7 days of delivery.' },
              { step: '02', Icon: RefreshCw, title: 'Await Approval', desc: 'Our team will review your request and respond within 24–48 hours with return instructions.' },
              { step: '03', Icon: Clock, title: 'Ship It Back', desc: 'Send the item back securely. Return shipping costs are the responsibility of the customer unless the item was defective.' },
              { step: '04', Icon: CheckCircle, title: 'Refund Processed', desc: 'Once we receive and inspect the item, your refund will be processed within 5–10 business days to your original payment method.' },
            ].map(({ step, Icon, title, desc }) => (
              <div key={step} className="flex gap-5 p-6 bg-cream rounded-xl border border-ink/8">
                <div className="font-mono text-[0.65rem] tracking-widest text-champagne font-semibold w-8 shrink-0 pt-1">{step}</div>
                <div className="w-9 h-9 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-champagne" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="p-8 bg-charcoal text-warm-white rounded-xl">
            <h3 className="font-display text-xl font-light mb-2">Need Help With a Return?</h3>
            <p className="text-white/60 text-sm mb-5">Our team responds within 24 hours — we&apos;re here to make things right.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="mailto:funmisaesthetics@gmail.com" className="btn-primary">Email Us</a>
              <Link href="/contact" className="btn-ghost" style={{ color: '#FFFDF9', borderColor: 'rgba(255,255,255,0.2)' }}>Contact Form</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
