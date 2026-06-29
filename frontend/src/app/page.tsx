import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import TrustStrip from '@/components/home/TrustStrip';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoriesSection />
      <FeaturedProducts />
      <BrandStory />
      <TrustStrip />
      <NewsletterSection />
    </>
  );
}
