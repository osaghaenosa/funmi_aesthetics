'use client';

import { useState, useRef, useCallback } from 'react';
import { X, Upload, Loader2, Trash2, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { productApi, uploadApi } from '@/lib/api';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DEFAULT_CATEGORIES = [
  "Women's Fashion",
  "Men's Fashion",
  'Bags',
  'Footwear',
  'Home Decor',
  'Appliances',
  'Accessories',
];

// ── Upload a single file to ImageKit directly from the browser ──
async function uploadToImageKit(
  file: File,
  authToken: { token: string; expire: number; signature: string; publicKey: string; urlEndpoint: string }
): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  form.append('fileName', `${Date.now()}-${file.name.replace(/\s+/g, '-')}`);
  form.append('folder', '/funmis-aesthetics/products');
  form.append('token', authToken.token);
  form.append('expire', String(authToken.expire));
  form.append('signature', authToken.signature);
  form.append('publicKey', authToken.publicKey);

  const res = await fetch(`${authToken.urlEndpoint.replace(/\/$/, '')}/api/v1/files/upload`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    // fallback to ImageKit's upload API endpoint
    const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      body: form,
    });
    if (!uploadRes.ok) throw new Error('ImageKit upload failed');
    const data = await uploadRes.json();
    return data.url as string;
  }

  const data = await res.json();
  return data.url as string;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    priceNaira: '',
    category: '',
    gender: 'unisex',
    badge: '',
    stock: '',
    sku: '',
    isFeatured: false,
  });

  if (!isOpen) return null;

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // ── Image Upload ──────────────────────────────────────────
  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter((f) =>
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type)
    );
    if (validFiles.length === 0) {
      toast.error('Please upload JPEG, PNG, or WebP images only.');
      return;
    }
    if (uploadedUrls.length + validFiles.length > 5) {
      toast.error('Maximum 5 images per product.');
      return;
    }

    setUploading(true);
    try {
      // 1. Get auth token from our backend (keeps private key secret)
      const { data: auth } = await uploadApi.getAuthToken();

      // 2. Upload each file directly to ImageKit from the browser
      const urls = await Promise.all(validFiles.map((f) => uploadToImageKit(f, auth)));

      setUploadedUrls((prev) => [...prev, ...urls]);
      toast.success(`${urls.length} image${urls.length > 1 ? 's' : ''} uploaded!`);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Image upload failed.';
      // Give a friendly nudge if ImageKit isn't configured yet
      if (msg.includes('not configured')) {
        toast.error('⚙️ ImageKit not configured yet — add your keys to the .env files and restart the server.');
      } else {
        toast.error(msg);
      }
    } finally {
      setUploading(false);
    }
  }, [uploadedUrls]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (idx: number) => {
    setUploadedUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const category = form.category === '__custom__' ? customCategory.trim() : form.category;
    if (!category) { toast.error('Please choose or enter a category.'); return; }
    if (uploadedUrls.length === 0) { toast.error('Please upload at least one product image.'); return; }

    setSaving(true);
    try {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await productApi.create({
        ...form,
        category,
        slug,
        price: Number(form.price),
        priceNaira: Number(form.priceNaira),
        stock: Number(form.stock),
        images: uploadedUrls,
      });

      toast.success('Product added successfully! ✨');
      onSuccess();
      // Reset form
      setForm({ name: '', description: '', price: '', priceNaira: '', category: '', gender: 'unisex', badge: '', stock: '', sku: '', isFeatured: false });
      setUploadedUrls([]);
      setCustomCategory('');
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.errors?.[0]?.msg || 'Failed to save product.';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-ink/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-warm-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative animate-fade-in-up">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-warm-white/95 backdrop-blur-md border-b border-ink/10 px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-light">Add New Product</h2>
            <p className="text-xs text-ink-soft mt-0.5">Fill in the details and upload images to list this product in the store.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-ink-soft hover:bg-ink/10 transition-colors">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-7">

          {/* ── IMAGE UPLOAD ──────────────────────────────── */}
          <div>
            <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-3">
              Product Images * <span className="normal-case tracking-normal text-ink-soft/60">(up to 5 — first is the main image)</span>
            </label>

            {/* Drop zone */}
            {uploadedUrls.length < 5 && (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? 'border-champagne bg-champagne/8 scale-[1.01]'
                    : 'border-ink/15 hover:border-champagne/50 hover:bg-champagne/4'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
                />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 text-ink-soft">
                    <Loader2 size={28} className="animate-spin text-champagne" />
                    <span className="text-sm">Uploading to ImageKit…</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-ink-soft">
                    <div className="w-12 h-12 rounded-full bg-champagne/15 flex items-center justify-center">
                      <Upload size={20} className="text-champagne" />
                    </div>
                    <p className="text-sm font-medium text-ink">Click or drag & drop images here</p>
                    <p className="text-xs">JPEG, PNG, WebP — max 5 MB each · Hosted on ImageKit CDN</p>
                  </div>
                )}
              </div>
            )}

            {/* Preview grid */}
            {uploadedUrls.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {uploadedUrls.map((url, i) => (
                  <div key={url} className="relative group aspect-square rounded-lg overflow-hidden border border-ink/10">
                    <Image src={url} alt={`Product image ${i + 1}`} fill className="object-cover" unoptimized />
                    {i === 0 && (
                      <span className="absolute top-1 left-1 bg-champagne text-ink text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">Main</span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                    >
                      <Trash2 size={18} className="text-white" />
                    </button>
                  </div>
                ))}
                {uploadedUrls.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="aspect-square rounded-lg border-2 border-dashed border-ink/15 flex items-center justify-center text-ink-soft hover:border-champagne hover:text-champagne transition-all disabled:opacity-40"
                  >
                    <PlusCircle size={20} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── BASIC INFO ──────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Product Name *</label>
              <input name="name" required value={form.name} onChange={change} placeholder="e.g. Silk Drape Midi Dress" className="input-field" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">SKU</label>
              <input name="sku" value={form.sku} onChange={change} placeholder="e.g. FA-001" className="input-field" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Badge</label>
              <select name="badge" value={form.badge} onChange={change} className="input-field bg-white">
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Description *</label>
            <textarea name="description" required value={form.description} onChange={change} rows={3} placeholder="Describe the product — material, fit, style..." className="input-field py-3 resize-none" />
          </div>

          {/* ── PRICING & STOCK ──────────────────────────── */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Price (USD) *</label>
              <input name="price" type="number" step="0.01" required min="0" value={form.price} onChange={change} placeholder="0.00" className="input-field" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Price (NGN) *</label>
              <input name="priceNaira" type="number" required min="0" value={form.priceNaira} onChange={change} placeholder="0" className="input-field" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Stock *</label>
              <input name="stock" type="number" required min="0" value={form.stock} onChange={change} placeholder="0" className="input-field" />
            </div>
          </div>

          {/* ── CATEGORY & GENDER ──────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Category *</label>
              <select name="category" value={form.category} onChange={change} className="input-field bg-white">
                <option value="">Select a category…</option>
                {DEFAULT_CATEGORIES.map((c) => (
                  <option key={c} value={c.toLowerCase().replace(/\s+/g, '-')}>{c}</option>
                ))}
                <option value="__custom__">+ Add custom category</option>
              </select>
              {form.category === '__custom__' && (
                <input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Type your new category name…"
                  className="input-field mt-2"
                />
              )}
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Gender</label>
              <select name="gender" value={form.gender} onChange={change} className="input-field bg-white">
                <option value="unisex">Unisex</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>
          </div>

          {/* Featured toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={change} className="sr-only peer" />
              <div className="w-10 h-6 bg-ink/15 rounded-full peer-checked:bg-champagne transition-colors" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-sm text-ink-soft">Feature this product on the homepage</span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2 border-t border-ink/8">
            <button type="button" onClick={onClose} className="btn-ghost px-6">Cancel</button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="btn-primary px-8 flex items-center gap-2 disabled:opacity-60"
            >
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
