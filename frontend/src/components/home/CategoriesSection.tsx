import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { slug: "women's-fashion", label: "Women's Fashion", sub: 'Clothing · Shoes · Bags', image: '/images/drape-midi.jpg' },
  { slug: "men's-fashion", label: "Men's Fashion", sub: 'Clothing · Footwear · Accessories', image: '/images/linen-trousers.jpg' },
  { slug: 'home-decor', label: 'Home Decor', sub: 'Accents · Textiles · Art', image: '/images/ceramic-lamp.jpg' },
  { slug: 'appliances', label: 'Appliances', sub: 'Kitchen · Living · Lifestyle', image: '/images/terracotta-planters.jpg' },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label">Shop by Category</p>
        <h2 className="section-title">One Destination.<br />Every Desire.</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="group relative rounded-md overflow-hidden aspect-[3/4] cursor-pointer bg-mist"
            >
              <Image 
                src={cat.image} 
                alt={cat.label} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
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
