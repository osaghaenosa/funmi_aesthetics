import { Suspense } from 'react';
import ShopClient from './ShopClient';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop' };

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="pt-[70px] min-h-screen flex items-center justify-center">
        <div className="text-ink-soft text-sm">Loading…</div>
      </div>
    }>
      <ShopClient />
    </Suspense>
  );
}
