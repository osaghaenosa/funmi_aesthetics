'use client';

import { useEffect, useState } from 'react';
import { Users, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import { authApi, orderApi, productApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;

    const fetchStats = async () => {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          authApi.getUsers(),
          orderApi.getAll(),
          productApi.getAll(),
        ]);
        setStats({
          users: usersRes.data.count ?? usersRes.data.users?.length ?? 0,
          orders: ordersRes.data.count ?? ordersRes.data.orders?.length ?? 0,
          products: productsRes.data.total ?? productsRes.data.products?.length ?? 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const statCards = [
    {
      label: 'Total Users',
      value: stats.users,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/users',
    },
    {
      label: 'Total Orders',
      value: stats.orders,
      icon: ShoppingCart,
      color: 'bg-emerald-50 text-emerald-600',
      href: '/admin/orders',
    },
    {
      label: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'bg-purple-50 text-purple-600',
      href: '/admin/products',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-cormorant font-semibold">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
          {user?.firstName} 👋
        </h1>
        <p className="text-stone text-sm mt-1">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white p-6 rounded-xl shadow-sm border border-stone/10 flex items-center gap-4 hover:shadow-md hover:border-[#C9A96E]/30 transition-all group"
          >
            <div className={`p-3 rounded-xl ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-stone text-sm">{label}</p>
              <p className="text-2xl font-semibold mt-0.5">
                {loading ? <span className="inline-block w-8 h-6 bg-stone/10 animate-pulse rounded" /> : value}
              </p>
            </div>
            <TrendingUp size={14} className="ml-auto text-stone/30 group-hover:text-[#C9A96E] transition-colors" />
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow-sm border border-stone/10 p-6">
        <h2 className="font-cormorant text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products" className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1B19] text-[#FFFDF9] rounded-lg text-sm font-medium hover:bg-[#C9A96E] transition-colors">
            <Package size={15} /> Add Product
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-2 px-4 py-2.5 border border-stone/20 text-stone rounded-lg text-sm font-medium hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
            <ShoppingCart size={15} /> View Orders
          </Link>
          <Link href="/admin/users" className="flex items-center gap-2 px-4 py-2.5 border border-stone/20 text-stone rounded-lg text-sm font-medium hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
            <Users size={15} /> Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}
