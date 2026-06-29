'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const BADGE_STYLES: Record<string, string> = {
  New: 'bg-sage-deep text-warm-white',
  Bestseller: 'bg-champagne text-ink',
  Sale: 'bg-ink text-warm-white',
};

const PLACEHOLDERS: Record<string, string> = {
  "women's-fashion": '👗', "men's-fashion": '👔', bags: '👜',
  footwear: '👟', 'home-decor': '🏺', appliances: '🔌', accessories: '💍',
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block card">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-mist to-champagne-lt">
            {PLACEHOLDERS[product.category] || '🛍️'}
          </div>
        )}

        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-[0.65rem] font-medium tracking-widest uppercase rounded-full ${BADGE_STYLES[product.badge] || 'bg-ink text-warm-white'}`}>
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => { e.preventDefault(); toast('Wishlist coming soon!'); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-warm-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-warm-white"
        >
          <Heart size={14} className="text-ink-soft" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="font-mono text-[0.62rem] tracking-widest uppercase text-sage mb-1">{product.category.replace(/-/g, ' ')}</p>
        <h3 className="font-display text-[1.15rem] font-normal mb-1 group-hover:text-champagne transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-medium text-sm">₦{product.priceNaira.toLocaleString()}</span>
            <span className="text-xs text-ink-soft ml-2">/ ${product.price}</span>
          </div>
          <button
            onClick={handleAdd}
            className="w-9 h-9 rounded-full bg-ink text-warm-white flex items-center justify-center hover:bg-champagne transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}
