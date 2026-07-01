'use client';

import { useEffect, useState } from 'react';
import { productApi } from '@/lib/api';
import useAuthStore from '@/store/authStore';
import Image from 'next/image';

export default function AdminProducts() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      productApi.getAll().then((res) => {
        setProducts(res.data.products || res.data);
        setLoading(false);
      }).catch(console.error);
    }
  }, [user]);

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-cormorant font-semibold">Products</h1>
        <button className="bg-ink text-warm-white px-4 py-2 rounded hover:bg-ink-light transition">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-warm-white border-b border-stone/10">
            <tr>
              <th className="p-4 font-medium text-stone">Image</th>
              <th className="p-4 font-medium text-stone">Name</th>
              <th className="p-4 font-medium text-stone">Price</th>
              <th className="p-4 font-medium text-stone">Stock</th>
              <th className="p-4 font-medium text-stone">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone/10">
            {products.map((p: any) => (
              <tr key={p._id} className="hover:bg-warm-white/50">
                <td className="p-4">
                  <div className="w-12 h-12 relative bg-warm-white rounded overflow-hidden border border-stone/10">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
