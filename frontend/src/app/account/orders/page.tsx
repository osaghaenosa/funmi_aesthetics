'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { orderApi } from '@/lib/api';
import { Order } from '@/types';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const STATUS_CONFIG = {
  pending:    { label: 'Pending',    icon: Clock,        color: 'text-champagne bg-champagne/10' },
  processing: { label: 'Processing', icon: Package,      color: 'text-blue-600 bg-blue-50' },
  shipped:    { label: 'Shipped',    icon: Truck,        color: 'text-sage bg-sage/10' },
  delivered:  { label: 'Delivered',  icon: CheckCircle,  color: 'text-sage-deep bg-sage-deep/10' },
  cancelled:  { label: 'Cancelled',  icon: XCircle,      color: 'text-red-500 bg-red-50' },
};

export default function OrdersPage() {
  const { isAuthenticated } = useRequireAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    orderApi.myOrders()
      .then(({ data }) => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="pt-[70px] min-h-screen bg-warm-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/account" className="text-ink-soft hover:text-ink transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <h1 className="font-display text-3xl font-light">My Orders</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-mist rounded-md animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto mb-4 text-ink/20" />
            <p className="font-display text-2xl font-light mb-2">No orders yet</p>
            <p className="text-sm text-ink-soft mb-6">Your orders will appear here once you shop.</p>
            <Link href="/shop" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={order._id} className="bg-cream rounded-md border border-ink/8 p-6">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-widest uppercase text-ink-soft">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-ink-soft mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                      <StatusIcon size={12} /> {cfg.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-ink-soft">
                      {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'} ·{' '}
                      {order.currency === 'NGN'
                        ? `₦${order.totalPrice.toLocaleString()}`
                        : `$${order.totalPrice.toFixed(2)}`}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-xs text-sage font-medium">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
