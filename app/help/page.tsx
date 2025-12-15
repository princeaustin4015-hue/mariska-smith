import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function HelpPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0b0604] pt-20">
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 font-cursive text-center">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#ff7a00,#ffb300,#ffd24a)' }}>
                Help Center
              </span>
            </h1>
            <div className="space-y-6 text-gray-300">
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-cursive">Getting Started</h2>
                <p className="text-gray-300 font-serif mb-4">To get started, simply click "Join Now" to access our arcade games platform. You can claim bonuses, earn credits, and collect tokens by playing games.</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300 font-serif">
                  <li>Click "Join Now" to access the platform</li>
                  <li>Browse available arcade games in the Games section</li>
                  <li>Claim bonuses from the Bonuses section</li>
                  <li>Start playing to earn credits and tokens</li>
                </ul>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-cursive">Account Management</h2>
                <p className="text-gray-300 font-serif mb-4">Manage your account settings and track your progress:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300 font-serif">
                  <li>View your credits and tokens balance</li>
                  <li>Track bonus claims and rewards</li>
                  <li>Check your leaderboard position</li>
                  <li>Manage your profile settings</li>
                </ul>
              </div>
              <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 font-cursive">Contact Support</h2>
                <p className="text-gray-300 font-serif mb-4">For assistance, reach out via Telegram or email:</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                  <a 
                    href="https://t.me/+12297308774" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-yellow-400 hover:text-yellow-300 underline text-lg font-bold font-cursive min-h-[44px] flex items-center"
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
                <p className="text-gray-300 font-serif mt-4">Our support team is available to help with any questions or issues you may have.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

