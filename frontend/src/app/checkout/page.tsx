'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Lock, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { orderApi } from '@/lib/api';
import toast from 'react-hot-toast';

type Step = 'shipping' | 'payment' | 'review';

const STEPS: { id: Step; label: string }[] = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

const PAYMENT_METHODS = [
  { id: 'paystack', label: 'Paystack', desc: 'Pay with card or bank transfer (NGN)' },
  { id: 'paypal', label: 'PayPal', desc: 'Pay securely via PayPal (USD)' },
  { id: 'bank', label: 'Bank Transfer', desc: 'Manual bank transfer — confirmation within 24h' },
];

const CATEGORY_EMOJIS: Record<string, string> = {
  "women's-fashion": '👗', "men's-fashion": '👔', bags: '👜',
  footwear: '👟', 'home-decor': '🏺', appliances: '🔌', accessories: '💍',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, totalNaira, clearCart, itemCount } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [step, setStep] = useState<Step>('shipping');
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');

  const changeShipping = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setShipping((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth', { detail: 'login' }));
      return;
    }
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({ product: i.product._id, qty: i.qty }));
      const { data } = await orderApi.create({
        orderItems,
        shippingAddress: { ...shipping },
        paymentMethod,
        currency,
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      router.push(`/account/orders`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Order failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-[70px] min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🛍️</span>
        <p className="font-display text-3xl font-light">Your cart is empty</p>
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const shippingCost = total() > 100 ? 0 : 10;
  const grandTotal = total() + shippingCost;
  const grandTotalNaira = totalNaira() + (shippingCost * 1540);

  return (
    <div className="pt-[70px] min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <Link href="/shop" className="text-ink-soft hover:text-ink transition-colors">
            <ChevronRight size={16} className="rotate-180" />
          </Link>
          <h1 className="font-display text-3xl font-light">Checkout</h1>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-ink-soft">
            <Lock size={12} /> Secure checkout
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step === s.id
                    ? 'bg-ink text-warm-white'
                    : STEPS.findIndex((x) => x.id === step) > i
                    ? 'bg-sage-deep text-warm-white'
                    : 'bg-mist text-ink-soft'
                }`}>
                  {STEPS.findIndex((x) => x.id === step) > i ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium tracking-wide uppercase hidden sm:block ${step === s.id ? 'text-ink' : 'text-ink-soft'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-ink/10 mx-3" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Left panel */}
          <div className="bg-warm-white rounded-lg border border-ink/8 p-8">

            {/* SHIPPING */}
            {step === 'shipping' && (
              <div>
                <h2 className="font-display text-2xl font-light mb-7">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Full Name *</label>
                    <input name="fullName" value={shipping.fullName} onChange={changeShipping} required className="input-field" placeholder="Funmilola Alade" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Email *</label>
                    <input name="email" type="email" value={shipping.email} onChange={changeShipping} required className="input-field" placeholder="you@example.com" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Phone *</label>
                    <input name="phone" value={shipping.phone} onChange={changeShipping} required className="input-field" placeholder="+234 703 711 8627" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Address Line 1 *</label>
                    <input name="line1" value={shipping.line1} onChange={changeShipping} required className="input-field" placeholder="123 Main Street" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Address Line 2</label>
                    <input name="line2" value={shipping.line2} onChange={changeShipping} className="input-field" placeholder="Apartment, suite, etc. (optional)" />
                  </div>
                  <div>
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">City *</label>
                    <input name="city" value={shipping.city} onChange={changeShipping} required className="input-field" placeholder="Lagos" />
                  </div>
                  <div>
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">State *</label>
                    <input name="state" value={shipping.state} onChange={changeShipping} required className="input-field" placeholder="Lagos State" />
                  </div>
                  <div>
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">Country *</label>
                    <input name="country" value={shipping.country} onChange={changeShipping} required className="input-field" placeholder="Nigeria" />
                  </div>
                  <div>
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-1.5">ZIP / Postal Code</label>
                    <input name="zip" value={shipping.zip} onChange={changeShipping} className="input-field" placeholder="100001" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const required = ['fullName', 'email', 'phone', 'line1', 'city', 'state', 'country'] as const;
                    const missing = required.some((f) => !shipping[f]);
                    if (missing) { toast.error('Please fill all required fields.'); return; }
                    setStep('payment');
                  }}
                  className="btn-primary mt-8 w-full justify-center"
                >
                  Continue to Payment <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* PAYMENT */}
            {step === 'payment' && (
              <div>
                <h2 className="font-display text-2xl font-light mb-7">Payment Method</h2>

                {/* Currency toggle */}
                <div className="flex gap-3 mb-7">
                  <span className="text-xs text-ink-soft self-center mr-2">Pay in:</span>
                  {(['NGN', 'USD'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-5 py-2 text-xs font-medium tracking-widest uppercase rounded-full border transition-all ${
                        currency === c ? 'bg-ink text-warm-white border-ink' : 'border-ink/10 text-ink-soft hover:border-champagne'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  {PAYMENT_METHODS.map(({ id, label, desc }) => (
                    <label
                      key={id}
                      className={`flex items-start gap-4 p-5 rounded-md border cursor-pointer transition-all ${
                        paymentMethod === id ? 'border-champagne bg-champagne/5' : 'border-ink/10 hover:border-ink/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={paymentMethod === id}
                        onChange={() => setPaymentMethod(id)}
                        className="mt-0.5 accent-champagne"
                      />
                      <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-ink-soft mt-0.5">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep('shipping')} className="btn-secondary flex-1 justify-center">← Back</button>
                  <button onClick={() => setStep('review')} className="btn-primary flex-1 justify-center">Review Order <ChevronRight size={14} /></button>
                </div>
              </div>
            )}

            {/* REVIEW */}
            {step === 'review' && (
              <div>
                <h2 className="font-display text-2xl font-light mb-7">Review Your Order</h2>

                {/* Shipping summary */}
                <div className="p-5 bg-cream rounded-md border border-ink/8 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono text-[0.68rem] tracking-widest uppercase text-sage">Shipping To</h3>
                    <button onClick={() => setStep('shipping')} className="text-xs text-champagne hover:underline">Edit</button>
                  </div>
                  <p className="text-sm font-medium">{shipping.fullName}</p>
                  <p className="text-xs text-ink-soft mt-1">
                    {shipping.line1}{shipping.line2 ? `, ${shipping.line2}` : ''}, {shipping.city}, {shipping.state}, {shipping.country}
                  </p>
                  <p className="text-xs text-ink-soft">{shipping.phone} · {shipping.email}</p>
                </div>

                {/* Payment summary */}
                <div className="p-5 bg-cream rounded-md border border-ink/8 mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono text-[0.68rem] tracking-widest uppercase text-sage">Payment</h3>
                    <button onClick={() => setStep('payment')} className="text-xs text-champagne hover:underline">Edit</button>
                  </div>
                  <p className="text-sm">{PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label} · {currency}</p>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-8">
                  {items.map(({ product, qty }) => (
                    <div key={product._id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-md bg-gradient-to-br from-mist to-champagne-lt flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                        {product.images?.[0]
                          ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          : CATEGORY_EMOJIS[product.category] || '🛍️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-ink-soft">Qty: {qty}</p>
                      </div>
                      <p className="text-sm font-medium">
                        {currency === 'NGN'
                          ? `₦${(product.priceNaira * qty).toLocaleString()}`
                          : `$${(product.price * qty).toFixed(2)}`}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep('payment')} className="btn-secondary flex-[0.4] justify-center">← Back</button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="btn-primary flex-[0.6] justify-center disabled:opacity-60"
                  >
                    {loading ? 'Placing Order…' : 'Place Order'} {!loading && <ChevronRight size={14} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-warm-white rounded-lg border border-ink/8 p-7 sticky top-24">
            <h3 className="font-display text-xl font-light mb-5 flex items-center gap-2">
              <ShoppingBag size={16} /> Order Summary
            </h3>
            <div className="space-y-3 mb-5 pb-5 border-b border-ink/10">
              {items.map(({ product, qty }) => (
                <div key={product._id} className="flex justify-between text-sm">
                  <span className="text-ink-soft truncate max-w-[180px]">{product.name} × {qty}</span>
                  <span>
                    {currency === 'NGN'
                      ? `₦${(product.priceNaira * qty).toLocaleString()}`
                      : `$${(product.price * qty).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm mb-5">
              <div className="flex justify-between">
                <span className="text-ink-soft">Subtotal ({itemCount()} items)</span>
                <span>{currency === 'NGN' ? `₦${totalNaira().toLocaleString()}` : `$${total().toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Shipping</span>
                <span className={shippingCost === 0 ? 'text-sage-deep font-medium' : ''}>
                  {shippingCost === 0 ? 'FREE' : currency === 'NGN' ? `₦${(shippingCost * 1540).toLocaleString()}` : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
            </div>
            <div className="flex justify-between font-medium text-base pt-4 border-t border-ink/10">
              <span>Total</span>
              <span>
                {currency === 'NGN'
                  ? `₦${grandTotalNaira.toLocaleString()}`
                  : `$${grandTotal.toFixed(2)}`}
              </span>
            </div>
            {shippingCost === 0 && (
              <p className="text-[0.7rem] text-sage mt-2">🎉 Free shipping on orders over $100</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
