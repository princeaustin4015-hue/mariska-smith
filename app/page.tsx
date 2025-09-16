import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import GamesSection from '@/components/GamesSection';
import FeaturesSection from '@/components/FeaturesSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <GamesSection />
  <FeaturesSection />
  <ReviewsSection />
  <Footer />
      </main>
    </>
  );
}
