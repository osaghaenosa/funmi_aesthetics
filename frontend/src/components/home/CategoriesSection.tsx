import Link from 'next/link';

const categories = [
  { slug: "women's-fashion", label: "Women's Fashion", sub: 'Clothing · Shoes · Bags', emoji: '👗', from: '#D4AFA3', to: '#C9A96E' },
  { slug: "men's-fashion", label: "Men's Fashion", sub: 'Clothing · Footwear · Accessories', emoji: '👔', from: '#2A2A28', to: '#0F0E0C' },
  { slug: 'home-decor', label: 'Home Decor', sub: 'Accents · Textiles · Art', emoji: '🏡', from: '#C9A96E', to: '#9E7A44' },
  { slug: 'appliances', label: 'Appliances', sub: 'Kitchen · Living · Lifestyle', emoji: '🔌', from: '#6B7F6E', to: '#3E5240' },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label">Browse by Category</p>
        <h2 className="section-title">Everything You Need,<br />All in One Place</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="group relative rounded-md overflow-hidden aspect-[3/4] cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                {cat.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-[1.35rem] text-warm-white mb-1">{cat.label}</p>
                <p className="font-mono text-[0.62rem] tracking-widest uppercase text-champagne-lt">{cat.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
