import ProductDetailClient from './ProductDetailClient';
import { Product } from '@/types';
import type { Metadata } from 'next';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${slug}`,
      { cache: 'no-store' }
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

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let product = await getProduct(params.slug);

  return <ProductDetailClient product={product} />;
}
