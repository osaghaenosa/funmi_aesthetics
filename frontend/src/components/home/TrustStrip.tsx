import { Globe, ShieldCheck, PackageSearch, MessageCircle } from 'lucide-react';

const trusts = [
  { Icon: Globe,          title: 'Worldwide Shipping',  desc: 'DHL, FedEx & local carriers — we ship everywhere' },
  { Icon: ShieldCheck,    title: 'Secure Checkout',      desc: 'Your payment and data are always protected' },
  { Icon: PackageSearch,  title: 'Order Tracking',       desc: 'Real-time updates sent straight to your inbox' },
  { Icon: MessageCircle,  title: '24/7 Support',         desc: 'WhatsApp & email — always here for you' },
];

export default function TrustStrip() {
  return (
    <div className="bg-cream border-y border-ink/8 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trusts.map(({ Icon, title, desc }) => (
            <div key={title} className="text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-champagne/15 flex items-center justify-center mb-4">
                <Icon size={22} className="text-champagne" strokeWidth={1.5} />
              </div>
              <h4 className="font-display text-base font-semibold mb-1">{title}</h4>
              <p className="text-xs text-ink-soft leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
