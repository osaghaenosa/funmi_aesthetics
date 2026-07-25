'use client';

import { useEffect, useState, useCallback } from 'react';
import { productApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import AddProductModal from '@/components/admin/AddProductModal';
import toast from 'react-hot-toast';
import { Trash2, PlusCircle, PackageOpen } from 'lucide-react';

export default function AdminProducts() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    productApi.getAll({ limit: 100 } as any).then((res) => {
      setProducts(res.data.products || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') fetchProducts();
  }, [user, fetchProducts]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      await productApi.delete(id);
      toast.success(`"${name}" removed.`);
      fetchProducts();
    } catch {
      toast.error('Failed to delete product.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-cormorant font-semibold">Products</h1>
          <p className="text-xs text-stone mt-0.5">{products.length} product{products.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-ink text-warm-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#C9A96E] transition-colors"
        >
          <PlusCircle size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone/10 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone animate-pulse">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center">
            <PackageOpen size={40} className="mx-auto mb-3 text-stone/40" />
            <p className="font-display text-xl font-light text-stone mb-1">No products yet</p>
            <p className="text-xs text-stone/60">Click "Add Product" to list your first item.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-warm-white border-b border-stone/10">
              <tr>
                <th className="p-4 text-xs font-medium text-stone uppercase tracking-wider">Image</th>
                <th className="p-4 text-xs font-medium text-stone uppercase tracking-wider">Name</th>
                <th className="p-4 text-xs font-medium text-stone uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-medium text-stone uppercase tracking-wider">Price</th>
                <th className="p-4 text-xs font-medium text-stone uppercase tracking-wider">Stock</th>
                <th className="p-4 text-xs font-medium text-stone uppercase tracking-wider">Badge</th>
                <th className="p-4 text-xs font-medium text-stone uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/10">
              {products.map((p: any) => (
                <tr key={p._id} className="hover:bg-warm-white/60 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 relative bg-warm-white rounded-lg overflow-hidden border border-stone/10 shrink-0">
                      {p.images?.[0]
                        ? <Image src={p.images[0]} alt={p.name} fill className="object-cover" unoptimized />
                        : <div className="w-full h-full bg-mist flex items-center justify-center text-stone/30 text-[10px]">No img</div>
                      }
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-sm">{p.name}</p>
                    {p.sku && <p className="text-[11px] text-stone/60 mt-0.5">SKU: {p.sku}</p>}
                  </td>
                  <td className="p-4 text-sm capitalize text-stone">{p.category?.replace(/-/g, ' ')}</td>
                  <td className="p-4 text-sm">
                    <span className="font-medium">${p.price}</span>
                    <span className="text-xs text-stone block">₦{p.priceNaira?.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-sm">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      p.stock === 0 ? 'bg-red-50 text-red-600' : p.stock <= 5 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-700'
                    }`}>
                      {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {p.badge ? (
                      <span className="px-2.5 py-0.5 bg-champagne/20 text-[#8B6914] rounded-full text-xs font-medium">{p.badge}</span>
                    ) : <span className="text-stone/30 text-xs">—</span>}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(p._id, p.name)}
                      disabled={deleting === p._id}
                      className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                      title="Delete product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
      />
    </div>
  );
}
