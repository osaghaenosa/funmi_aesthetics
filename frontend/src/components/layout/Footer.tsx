import Link from 'next/link';
import { AtSign, MessageCircle, Share2, Globe } from 'lucide-react';

const shopLinks = [
  { href: '/shop?category=women%27s-fashion', label: "Women's Fashion" },
  { href: '/shop?category=men%27s-fashion', label: "Men's Fashion" },
  { href: '/shop?category=bags', label: 'Bags & Accessories' },
  { href: '/shop?category=home-decor', label: 'Home Decor' },
  { href: '/shop?category=footwear', label: 'Footwear' },
];

const companyLinks = [
  { href: '/about', label: 'Our Story' },
  { href: '/shipping', label: 'Shipping Policy' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/account', label: 'My Account' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/returns', label: 'Returns' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/60">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl text-warm-white mb-4">
              Funmi<span className="text-champagne">&apos;s</span> Aesthetics
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Elevating Style, Comfort & Home —<br />
              For Every Aesthetic. Delivered Worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: AtSign, label: 'Instagram' },
                { Icon: MessageCircle, label: 'WhatsApp' },
                { Icon: Share2, label: 'Twitter' },
                { Icon: Globe, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-sm transition-all hover:border-champagne hover:text-champagne"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-warm-white mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-champagne transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-warm-white mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-champagne transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-warm-white mb-5">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-champagne transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-white/5 rounded-md">
              <p className="font-mono text-[0.65rem] tracking-widest uppercase text-champagne mb-1">Contact</p>
              <p className="text-xs">funmisaesthetics@gmail.com</p>
              <p className="text-xs mt-1">+234 703 711 8627</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>© {new Date().getFullYear()} Funmi&apos;s Aesthetics. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-champagne transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-champagne transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-champagne transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
