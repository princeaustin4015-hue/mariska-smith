import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import { Hero } from '@/components/ui/hero'

// Dynamic imports for better code splitting
const GamesSection = dynamic(() => import('@/components/GamesSection'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
})

const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
})

const LeaderboardSection = dynamic(() => import('@/components/LeaderboardSection'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
})

const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true
})

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true
})

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0b0604]">
        <Hero
          title="Level Up Your Gaming Journey"
          subtitle="Discover games, tournaments & exclusive rewards"
          actions={[
            {
              label: "Join Now",
              href: "https://www.facebook.com/share/17dubonS1y/",
              variant: "outline"
            },
            {
              label: "Explore Offers",
              href: "#games",
              variant: "default"
            }
          ]}
          titleClassName="font-cursive"
          subtitleClassName="font-serif max-w-[600px]"
          actionsClassName="mt-8 flex-wrap justify-center"
          className="min-h-screen"
        />
        <GamesSection />
        <FeaturesSection />
        <LeaderboardSection />
        <ReviewsSection />
        <Footer />
      </main>
    </>
  )
}
