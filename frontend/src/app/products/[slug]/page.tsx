import ProductDetailClient from './ProductDetailClient';
import { Product } from '@/types';
import type { Metadata } from 'next';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${slug}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: product?.name || 'Product',
    description: product?.description,
  };
}

// Fallback mock for when API not connected
const MOCK_MAP: Record<string, Product> = {
  'drape-midi-dress': { _id: '1', name: 'Drape Midi Dress', slug: 'drape-midi-dress', description: 'An effortlessly elegant midi dress with a fluid drape silhouette. Crafted from a premium blend fabric that moves beautifully. Perfect for day-to-evening transitions. Available in sizes XS–XL.', price: 29, priceNaira: 45000, category: "women's-fashion", gender: 'women', images: [], badge: 'New', stock: 35, tags: ['dress', 'midi', 'women'], rating: 4.8, numReviews: 24, isFeatured: true },
  'structured-tote-bag': { _id: '2', name: 'Structured Tote Bag', slug: 'structured-tote-bag', description: 'A premium structured tote in vegan leather. Spacious interior with zip pocket, magnetic snap closure, and detachable pouch. Built to last.', price: 40, priceNaira: 62000, category: 'bags', gender: 'unisex', images: [], badge: 'Bestseller', stock: 20, tags: ['bag', 'tote'], rating: 4.9, numReviews: 41, isFeatured: true },
  'clean-leather-sneakers': { _id: '3', name: 'Clean Leather Sneakers', slug: 'clean-leather-sneakers', description: 'Minimalist white leather sneakers with a cushioned EVA sole. Full-grain leather upper, breathable lining. The perfect everyday canvas shoe.', price: 50, priceNaira: 78000, category: 'footwear', gender: 'unisex', images: [], badge: '', stock: 42, tags: ['shoes'], rating: 4.7, numReviews: 18, isFeatured: true },
};

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let product = await getProduct(params.slug);
  if (!product) product = MOCK_MAP[params.slug] || null;

  return <ProductDetailClient product={product} />;
}
