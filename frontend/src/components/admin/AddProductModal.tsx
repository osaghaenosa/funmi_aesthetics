'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { productApi } from '@/lib/api';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    priceNaira: '',
    category: '',
    gender: 'unisex',
    image: '', // simplified single image input
    badge: '',
    stock: '',
    sku: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        priceNaira: Number(form.priceNaira),
        stock: Number(form.stock),
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        images: form.image ? [form.image] : [],
      };

      await productApi.create(payload);
      toast.success('Product added successfully!');
      onSuccess();
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.errors?.[0]?.msg || 'Failed to add product';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-[999] bg-ink/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-warm-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-warm-white/90 backdrop-blur-md border-b border-ink/10 px-8 py-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-light">Add New Product</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-ink-soft hover:bg-ink/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Product Name *</label>
              <input name="name" required value={form.name} onChange={change} placeholder="e.g. Silk Drape Midi" className="input-field" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">SKU</label>
              <input name="sku" value={form.sku} onChange={change} placeholder="e.g. FA-001" className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Description *</label>
            <textarea name="description" required value={form.description} onChange={change} rows={3} placeholder="Describe the product..." className="input-field py-3" />
          </div>

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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Category *</label>
              <input name="category" required value={form.category} onChange={change} placeholder="e.g. bags, footwear..." className="input-field" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Gender</label>
              <select name="gender" value={form.gender} onChange={change} className="input-field appearance-none bg-white">
                <option value="unisex">Unisex</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>
            <div>
              <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Badge</label>
              <select name="badge" value={form.badge} onChange={change} className="input-field appearance-none bg-white">
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Image File/URL</label>
            <input name="image" value={form.image} onChange={change} placeholder="e.g. /images/tote-bag.jpg or https://..." className="input-field" />
            <p className="text-[0.65rem] text-ink-soft mt-1">For now, enter the path of an image placed in the public folder or a web URL.</p>
          </div>

          <div className="pt-4 flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="btn-ghost px-6">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary px-8">
              {loading ? 'Saving...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
