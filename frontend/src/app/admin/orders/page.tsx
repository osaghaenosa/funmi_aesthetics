'use client';

import { useEffect, useState } from 'react';
import { orderApi } from '@/lib/api';
import useAuthStore from '@/store/authStore';

export default function AdminOrders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      orderApi.getAll().then((res) => {
        setOrders(res.data.orders || res.data);
        setLoading(false);
      }).catch(console.error);
    }
  }, [user]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await orderApi.updateStatus(id, { status });
      setOrders(orders.map((o: any) => o._id === id ? { ...o, status } : o));
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-cormorant font-semibold mb-6">Orders</h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-warm-white border-b border-stone/10">
            <tr>
              <th className="p-4 font-medium text-stone">Order ID</th>
              <th className="p-4 font-medium text-stone">Customer</th>
              <th className="p-4 font-medium text-stone">Date</th>
              <th className="p-4 font-medium text-stone">Total</th>
              <th className="p-4 font-medium text-stone">Status</th>
              <th className="p-4 font-medium text-stone">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone/10">
            {orders.map((o: any) => (
              <tr key={o._id} className="hover:bg-warm-white/50">
                <td className="p-4 font-mono text-sm">{o._id}</td>
                <td className="p-4">{o.user?.firstName} {o.user?.lastName}</td>
                <td className="p-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-4">${o.totalPrice}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    o.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    o.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    o.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {o.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    className="border border-stone/20 rounded p-1 text-sm bg-transparent"
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
