'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/types';
import { productApi } from '@/lib/api';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: "women's-fashion", label: "Women's Fashion" },
  { value: "men's-fashion", label: "Men's Fashion" },
  { value: 'bags', label: 'Bags & Accessories' },
  { value: 'footwear', label: 'Footwear' },
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'appliances', label: 'Appliances' },
];

const GENDER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'unisex', label: 'Unisex' },
];

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest' },
  { value: '-rating', label: 'Top Rated' },
  { value: 'price', label: 'Price: Low → High' },
  { value: '-price', label: 'Price: High → Low' },
];

const MOCK: Product[] = [
  { _id: '1', name: 'Drape Midi Dress', slug: 'drape-midi-dress', description: 'Elegant midi dress.', price: 29, priceNaira: 45000, category: "women's-fashion", gender: 'women', images: [], badge: 'New', stock: 35, tags: [], rating: 4.8, numReviews: 24, isFeatured: true },
  { _id: '2', name: 'Structured Tote Bag', slug: 'structured-tote-bag', description: 'Premium tote.', price: 40, priceNaira: 62000, category: 'bags', gender: 'unisex', images: [], badge: 'Bestseller', stock: 20, tags: [], rating: 4.9, numReviews: 41, isFeatured: true },
  { _id: '3', name: 'Clean Leather Sneakers', slug: 'clean-leather-sneakers', description: 'Minimalist sneakers.', price: 50, priceNaira: 78000, category: 'footwear', gender: 'unisex', images: [], badge: '', stock: 42, tags: [], rating: 4.7, numReviews: 18, isFeatured: true },
  { _id: '4', name: 'Ceramic Table Lamp', slug: 'ceramic-table-lamp', description: 'Sculptural lamp.', price: 24, priceNaira: 38000, category: 'home-decor', gender: 'unisex', images: [], badge: '', stock: 15, tags: [], rating: 4.6, numReviews: 9, isFeatured: false },
  { _id: '5', name: 'Merino Knit Scarf', slug: 'merino-knit-scarf', description: 'Soft merino wool.', price: 14, priceNaira: 22000, category: 'accessories', gender: 'unisex', images: [], badge: 'Sale', stock: 60, tags: [], rating: 4.5, numReviews: 32, isFeatured: false },
  { _id: '6', name: 'Oxford Derby Shoes', slug: 'oxford-derby-shoes', description: 'Classic Oxfords.', price: 55, priceNaira: 85000, category: 'footwear', gender: 'men', images: [], badge: '', stock: 22, tags: [], rating: 4.7, numReviews: 14, isFeatured: false },
  { _id: '7', name: 'Woven Rattan Mirror', slug: 'woven-rattan-mirror', description: 'Artisan mirror.', price: 35, priceNaira: 54000, category: 'home-decor', gender: 'unisex', images: [], badge: 'New', stock: 12, tags: [], rating: 4.8, numReviews: 7, isFeatured: true },
  { _id: '8', name: 'Mini Crossbody Bag', slug: 'mini-crossbody-bag', description: 'Compact leather bag.', price: 28, priceNaira: 43000, category: 'bags', gender: 'women', images: [], badge: 'Bestseller', stock: 18, tags: [], rating: 4.9, numReviews: 29, isFeatured: true },
  { _id: '9', name: 'Linen Throw Pillow Set', slug: 'linen-throw-pillow-set', description: 'Stone-washed pillows.', price: 12, priceNaira: 19500, category: 'home-decor', gender: 'unisex', images: [], badge: '', stock: 50, tags: [], rating: 4.4, numReviews: 11, isFeatured: false },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [gender, setGender] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { sort };
      if (category) params.category = category;
      if (gender) params.gender = gender;
      if (search) params.search = search;
      const { data } = await productApi.getAll(params);
      setProducts(data.products?.length ? data.products : MOCK);
    } catch {
      setProducts(MOCK);
    } finally {
      setLoading(false);
    }
  }, [category, gender, sort, search]);

  useEffect(() => { load(); }, [load]);

  const filtered = search
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : products;

  return (
    <div className="pt-[70px]">
      {/* Page header */}
      <div className="bg-cream border-b border-ink/8 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label">Discover</p>
          <h1 className="section-title mb-3">The Full Collection</h1>
          <p className="section-sub">Every item hand-picked for quality, style, and lasting appeal.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 btn-ghost"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            {/* Quick gender pills */}
            {GENDER_OPTIONS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={`px-4 py-2 text-xs tracking-widest uppercase rounded-full border transition-all ${
                  gender === g.value
                    ? 'bg-ink text-warm-white border-ink'
                    : 'border-ink/10 text-ink-soft hover:border-champagne hover:text-champagne'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field !py-2 w-48 text-sm"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field !py-2 text-sm w-auto"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-cream rounded-md border border-ink/8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-[0.7rem] tracking-widest uppercase text-sage">Category</h3>
              <button onClick={() => setShowFilters(false)} className="text-ink-soft hover:text-ink"><X size={14} /></button>
            </div>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full border transition-all ${
                    category === c.value
                      ? 'bg-sage-deep text-warm-white border-sage-deep'
                      : 'border-ink/10 text-ink-soft hover:border-sage hover:text-sage'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active filters */}
        {(category || gender) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-ink-soft">Active:</span>
            {category && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-sage-deep/10 text-sage-deep rounded-full text-xs">
                {category} <button onClick={() => setCategory('')}><X size={10} /></button>
              </span>
            )}
            {gender && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-champagne/20 text-champagne rounded-full text-xs">
                {gender} <button onClick={() => setGender('')}><X size={10} /></button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-mist rounded-md aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl font-light mb-3">No products found</p>
            <p className="text-ink-soft text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-ink-soft mb-5">{filtered.length} products</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
