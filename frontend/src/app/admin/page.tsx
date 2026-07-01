'use client';

import { useEffect, useState } from 'react';
import { Users, ShoppingCart, Package } from 'lucide-react';
import { authApi, orderApi, productApi } from '@/lib/api';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          authApi.getUsers(),
          orderApi.getAll(),
          productApi.getAll(),
        ]);
        setStats({
          users: usersRes.data.count,
          orders: ordersRes.data.count || ordersRes.data.orders?.length || 0,
          products: productsRes.data.count || productsRes.data.products?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-cormorant font-semibold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone/10 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-stone text-sm">Total Users</p>
            <p className="text-2xl font-semibold">{stats.users}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone/10 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-lg">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-stone text-sm">Total Orders</p>
            <p className="text-2xl font-semibold">{stats.orders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone/10 flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-lg">
            <Package size={24} />
          </div>
          <div>
            <p className="text-stone text-sm">Total Products</p>
            <p className="text-2xl font-semibold">{stats.products}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
