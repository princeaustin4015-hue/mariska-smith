import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import { Hero } from '@/components/ui/hero'

// Dynamic imports for better code splitting
const GamesSection = dynamic(() => import('@/components/GamesSection'), { ssr: true })
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), { ssr: true })
const LeaderboardSection = dynamic(() => import('@/components/LeaderboardSection'), { ssr: true })
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0b0604]">
        <Hero
          title="Where Skill Meets Rewards"
          subtitle="Earn credits, collect tokens & claim bonuses"
          actions={[
            {
              label: "Join Now",
              href: "https://www.facebook.com/share/16imCG9Jhw/",
              variant: "outline"
            },
            {
              label: "Claim Bonuses",
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
