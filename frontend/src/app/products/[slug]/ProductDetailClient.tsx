'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, ChevronLeft, Truck, Shield, RefreshCw, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const BADGE_STYLES: Record<string, string> = {
  New: 'bg-sage-deep text-warm-white',
  Bestseller: 'bg-champagne text-ink',
  Sale: 'bg-ink text-warm-white',
};

const CATEGORY_EMOJIS: Record<string, string> = {
  "women's-fashion": '👗', "men's-fashion": '👔', bags: '👜',
  footwear: '👟', 'home-decor': '🏺', appliances: '🔌', accessories: '💍',
};

const GUARANTEES = [
  { icon: Truck, label: 'Worldwide Shipping', desc: 'DHL, FedEx & local carriers' },
  { icon: Shield, label: 'Secure Payment', desc: 'SSL encrypted checkout' },
  { icon: RefreshCw, label: 'Easy Returns', desc: '14-day return policy' },
];

export default function ProductDetailClient({ product }: { product: Product | null }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <div className="pt-[70px] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-display text-4xl font-light">Product not found</p>
        <Link href="/shop" className="btn-secondary">← Back to Shop</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty}× ${product.name} added to cart 🛍️`);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));

  return (
    <div className="pt-[70px] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-ink/8 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-xs text-ink-soft">
          <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-champagne transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-champagne transition-colors capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-ink truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Images */}
          <div className="sticky top-24">
            {/* Main image */}
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-mist to-champagne-lt mb-4 flex items-center justify-center relative">
              {product.images?.[activeImg] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-9xl">{CATEGORY_EMOJIS[product.category] || '🛍️'}</span>
              )}
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1.5 text-[0.65rem] font-semibold tracking-widest uppercase rounded-full ${BADGE_STYLES[product.badge]}`}>
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnail strip */}
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-24 rounded-md overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-champagne' : 'border-ink/10 hover:border-ink/30'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-sage mb-3">
              {product.category.replace(/-/g, ' ')} · {product.gender}
            </p>
            <h1 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {stars.map((filled, i) => (
                  <Star key={i} size={14} className={filled ? 'text-champagne fill-champagne' : 'text-ink/20'} />
                ))}
              </div>
              <span className="text-sm text-ink-soft">
                {product.rating} ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-7 pb-7 border-b border-ink/10">
              <span className="font-display text-3xl font-light">₦{product.priceNaira.toLocaleString()}</span>
              <span className="text-base text-ink-soft">(${product.price})</span>
            </div>

            {/* Description */}
            <p className="text-sm text-ink-soft leading-relaxed mb-8">{product.description}</p>

            {/* Stock badge */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-sage-deep font-medium">
                  <span className="w-2 h-2 rounded-full bg-sage-deep inline-block" />
                  {product.stock <= 10 ? `Only ${product.stock} left` : 'In Stock'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-red-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Out of Stock
                </span>
              )}
            </div>

            {/* Qty + Add */}
            <div className="flex gap-3 mb-8">
              <div className="flex items-center border border-ink/15 rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-mist transition-colors text-ink-soft"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-3 hover:bg-mist transition-colors text-ink-soft"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="flex-1 btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={15} />
                Add to Cart
              </button>
              <button
                onClick={() => toast('Saved to wishlist ♡', { icon: '❤️' })}
                className="w-12 h-12 flex items-center justify-center border border-ink/15 rounded-full hover:border-champagne hover:text-champagne transition-all"
              >
                <Heart size={16} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-7 border-t border-ink/10">
              {GUARANTEES.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="text-center">
                  <Icon size={18} className="mx-auto mb-2 text-sage" />
                  <p className="text-xs font-medium mb-0.5">{label}</p>
                  <p className="text-[0.7rem] text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-7 pt-6 border-t border-ink/10">
                <span className="text-xs text-ink-soft mr-1">Tags:</span>
                {product.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/shop?search=${tag}`}
                    className="px-3 py-1 text-[0.7rem] tracking-wide uppercase border border-ink/10 rounded-full text-ink-soft hover:border-champagne hover:text-champagne transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
