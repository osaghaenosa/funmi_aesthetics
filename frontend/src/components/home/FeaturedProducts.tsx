import Link from 'next/link';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?featured=true&limit=6`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function FeaturedProducts() {
  let products = await getFeaturedProducts();

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label">Curated for You</p>
            <h2 className="section-title mb-0">Featured Picks</h2>
          </div>
          <Link href="/shop" className="btn-secondary shrink-0">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
