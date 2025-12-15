import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0b0604] pt-20">
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 font-cursive text-center">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#ff7a00,#ffb300,#ffd24a)' }}>
                Frequently Asked Questions
              </span>
            </h1>
            <div className="space-y-4">
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">How do I claim bonuses?</h2>
                <p className="text-gray-300 font-serif">Visit the Bonuses section and click "Claim Bonus" on any available offer. Credits and tokens will be added to your account automatically.</p>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">What are credits and tokens?</h2>
                <p className="text-gray-300 font-serif">Credits and tokens are rewards you earn by playing arcade games. Use them to access premium features and claim exclusive bonuses. They are virtual rewards with no cash value.</p>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">How do I download games?</h2>
                <p className="text-gray-300 font-serif">Click on any game in the Arcade Games section and select "Download" to get started. Games are available for instant download and require no additional setup.</p>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Is there a referral program?</h2>
                <p className="text-gray-300 font-serif">Yes! Share your referral link and earn tokens when friends join. Check the Bonuses section for referral bonus details and current rewards.</p>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">How do I earn more credits?</h2>
                <p className="text-gray-300 font-serif">You can earn credits by playing arcade games, claiming daily bonuses, participating in weekly promotions, and referring friends to the platform.</p>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Are the games free to play?</h2>
                <p className="text-gray-300 font-serif">Yes, all arcade games are free to download and play. You can earn credits and tokens through gameplay and bonus claims.</p>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">How do I contact support?</h2>
                <p className="text-gray-300 font-serif mb-4">You can reach our support team via Telegram or email. We're here to help!</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                  <a 
                    href="https://t.me/+12297308774" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-yellow-400 hover:text-yellow-300 underline text-base font-bold font-cursive min-h-[44px] flex items-center"
                  >
                    Telegram: +12297308774
                  </a>
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto min-h-[44px] touch-manipulation"
                  >
                    <a href="mailto:michealbrewer548@gmail.com">
                      Contact via Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

