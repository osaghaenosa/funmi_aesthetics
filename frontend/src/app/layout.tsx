import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shop/CartDrawer';
import AuthModal from '@/components/auth/AuthModal';
import './globals.css';

export const metadata: Metadata = {
  title: { default: "Funmi's Aesthetics — Style Has No Boundaries", template: "%s | Funmi's Aesthetics" },
  description: "Premium fashion, shoes, bags, and home essentials — curated for everyone. Delivered worldwide.",
  keywords: ["funmi's aesthetics", 'unisex fashion', 'luxury bags', 'home decor nigeria'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <AuthModal />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#1C1B19', color: '#FFFDF9', borderRadius: '12px', fontSize: '0.875rem' },
            success: { iconTheme: { primary: '#C9A96E', secondary: '#1C1B19' } },
          }}
        />
      </body>
    </html>
  );
}
