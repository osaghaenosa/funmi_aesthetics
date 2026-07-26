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
      setProducts(data.products || []);
    } catch {
      setProducts([]);
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
            <p className="text-ink-soft text-sm">
              {category || gender || search
                ? 'Try adjusting your filters or search term.'
                : 'Products are being added soon — check back later!'}
            </p>
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
