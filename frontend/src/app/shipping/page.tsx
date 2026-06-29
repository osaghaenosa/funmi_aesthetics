import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shipping & Delivery' };

const timeline = [
  { icon: '📦', label: 'Order Processed', time: 'Within 1–3 business days' },
  { icon: '✈️', label: 'Dispatched', time: 'With tracking email' },
  { icon: '🏠', label: 'Delivered', time: '3–21 days (location-based)' },
];

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Domestic (Nigeria): 3–7 business days. International: 7–21 business days depending on destination and customs clearance.',
  },
  {
    q: 'How much does shipping cost?',
    a: 'Shipping costs are calculated at checkout based on package weight, destination country, and your chosen shipping method (standard or express).',
  },
  {
    q: 'Which carriers do you use?',
    a: 'We partner with DHL, FedEx, and trusted local postal services to ensure safe, reliable delivery to your door worldwide.',
  },
  {
    q: 'Are there customs fees?',
    a: 'Customers are responsible for any customs duties, taxes, or import fees levied by their destination country. These are not included in our pricing.',
  },
  {
    q: 'How do I track my order?',
    a: 'All orders include a tracking number sent to your registered email address once dispatched. You can monitor your package in real-time via the carrier website.',
  },
];

export default function ShippingPage() {
  return (
    <div className="pt-[70px]">
      <div className="bg-gradient-to-br from-cream to-mist py-24 text-center border-b border-ink/8">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label justify-center">Logistics</p>
          <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-light leading-tight mb-5">Shipping & Delivery</h1>
          <p className="text-[1rem] text-ink-soft max-w-lg mx-auto">
            We ship worldwide. Here&apos;s everything you need to know about getting your order to you.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Timeline */}
          <div className="grid grid-cols-3 gap-4 mb-14">
            {timeline.map(({ icon, label, time }, i) => (
              <div key={i} className="relative text-center p-7 bg-cream rounded-md border border-ink/8">
                {i < 2 && (
                  <div className="absolute top-1/2 -right-2 w-4 h-px bg-champagne hidden md:block" />
                )}
                <div className="text-3xl mb-3">{icon}</div>
                <p className="font-display text-base font-normal mb-1">{label}</p>
                <p className="font-mono text-[0.68rem] tracking-wider uppercase text-champagne">{time}</p>
              </div>
            ))}
          </div>

          {/* Highlight card */}
          <div className="p-6 bg-champagne/10 border border-champagne/30 rounded-md mb-8 flex gap-4 items-start">
            <span className="text-2xl">📧</span>
            <div>
              <h3 className="font-display text-xl font-normal mb-1">Order Tracking</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                All orders include a tracking number sent to your registered email address once dispatched. You can use this to monitor your package in real-time via the carrier&apos;s website.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <h2 className="font-display text-2xl font-light mb-7 mt-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="p-6 bg-cream rounded-md border border-ink/8">
                <h3 className="font-display text-lg font-normal mb-2">{q}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
