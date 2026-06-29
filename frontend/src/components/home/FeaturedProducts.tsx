import Link from 'next/link';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?featured=true&limit=6`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

// Fallback mock data when API not connected
const MOCK_PRODUCTS: Product[] = [
  { _id: '1', name: 'Drape Midi Dress', slug: 'drape-midi-dress', description: '', price: 29, priceNaira: 45000, category: "women's-fashion", gender: 'women', images: [], badge: 'New', stock: 35, tags: [], rating: 4.8, numReviews: 24, isFeatured: true },
  { _id: '2', name: 'Structured Tote Bag', slug: 'structured-tote-bag', description: '', price: 40, priceNaira: 62000, category: 'bags', gender: 'unisex', images: [], badge: 'Bestseller', stock: 20, tags: [], rating: 4.9, numReviews: 41, isFeatured: true },
  { _id: '3', name: 'Clean Leather Sneakers', slug: 'clean-leather-sneakers', description: '', price: 50, priceNaira: 78000, category: 'footwear', gender: 'unisex', images: [], badge: '', stock: 42, tags: [], rating: 4.7, numReviews: 18, isFeatured: true },
  { _id: '4', name: 'Ceramic Table Lamp', slug: 'ceramic-table-lamp', description: '', price: 24, priceNaira: 38000, category: 'home-decor', gender: 'unisex', images: [], badge: '', stock: 15, tags: [], rating: 4.6, numReviews: 9, isFeatured: true },
  { _id: '5', name: 'Merino Knit Scarf', slug: 'merino-knit-scarf', description: '', price: 14, priceNaira: 22000, category: 'accessories', gender: 'unisex', images: [], badge: 'Sale', stock: 60, tags: [], rating: 4.5, numReviews: 32, isFeatured: false },
  { _id: '6', name: 'Woven Rattan Mirror', slug: 'woven-rattan-mirror', description: '', price: 35, priceNaira: 54000, category: 'home-decor', gender: 'unisex', images: [], badge: 'New', stock: 12, tags: [], rating: 4.8, numReviews: 7, isFeatured: true },
];

export default async function FeaturedProducts() {
  let products = await getFeaturedProducts();
  if (products.length === 0) products = MOCK_PRODUCTS;

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
