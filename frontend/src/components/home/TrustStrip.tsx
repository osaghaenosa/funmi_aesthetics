const trusts = [
  { icon: '🌍', title: 'Worldwide Shipping', desc: 'DHL, FedEx & local carriers — we ship everywhere' },
  { icon: '🔒', title: 'Secure Checkout', desc: 'Your payment and data are always protected' },
  { icon: '📦', title: 'Order Tracking', desc: 'Real-time updates sent straight to your inbox' },
  { icon: '💬', title: '24/7 Support', desc: 'WhatsApp & email — always here for you' },
];

export default function TrustStrip() {
  return (
    <div className="bg-cream border-y border-ink/8 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trusts.map(({ icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="text-3xl mb-3">{icon}</div>
              <h4 className="font-display text-base font-normal mb-1">{title}</h4>
              <p className="text-xs text-ink-soft leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
