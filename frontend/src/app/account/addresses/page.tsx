import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Addresses | Funmi\'s Aesthetics',
};

export default function AddressesPage() {
  return (
    <div className="pt-[70px] min-h-screen bg-warm-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-cormorant font-semibold mb-8">My Addresses</h1>
        <div className="bg-white rounded-xl shadow-sm border border-stone/10 p-12 text-center text-stone">
          <p>You have not saved any addresses yet.</p>
        </div>
      </div>
    </div>
  );
}
