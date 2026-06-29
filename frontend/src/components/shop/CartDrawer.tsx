'use client';

import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQty, total, totalNaira, clearCart } = useCartStore();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm" onClick={toggleCart} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[81] w-full max-w-md bg-warm-white flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h2 className="font-display text-xl font-medium">Your Cart</h2>
            {items.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-champagne text-ink text-[0.7rem] font-bold rounded-full">
                {items.reduce((a, i) => a + i.qty, 0)}
              </span>
            )}
          </div>
          <button onClick={toggleCart} className="w-8 h-8 rounded-full bg-mist flex items-center justify-center hover:bg-ink/10">
            <X size={14} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-6xl">🛍️</div>
              <p className="font-display text-2xl font-light">Your cart is empty</p>
              <p className="text-sm text-ink-soft">Discover something beautiful</p>
              <button onClick={toggleCart} className="btn-primary mt-2">
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product._id} className="flex gap-4 pb-5 border-b border-ink/8 last:border-0">
                <div className="relative w-20 h-24 rounded-md overflow-hidden bg-mist flex-shrink-0">
                  {product.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base font-normal truncate">{product.name}</p>
                  <p className="text-xs text-ink-soft mt-0.5">₦{product.priceNaira.toLocaleString()} / ${product.price}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 border border-ink/10 rounded-full overflow-hidden">
                      <button onClick={() => updateQty(product._id, qty - 1)} className="px-3 py-1 hover:bg-mist transition-colors text-ink-soft">
                        <Minus size={11} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{qty}</span>
                      <button onClick={() => updateQty(product._id, qty + 1)} className="px-3 py-1 hover:bg-mist transition-colors text-ink-soft">
                        <Plus size={11} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(product._id)} className="text-ink-soft hover:text-ink transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <div className="text-right">
                <p className="font-medium">₦{totalNaira().toLocaleString()}</p>
                <p className="text-xs text-ink-soft">(${total().toFixed(2)})</p>
              </div>
            </div>
            <p className="text-xs text-ink-soft">Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="btn-primary w-full justify-center"
            >
              Checkout <ArrowRight size={14} />
            </Link>
            <button onClick={clearCart} className="w-full text-xs text-ink-soft hover:text-ink transition-colors py-1">
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
