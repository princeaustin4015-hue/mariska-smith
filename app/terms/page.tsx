import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0b0604] pt-20">
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 font-cursive text-center">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#ff7a00,#ffb300,#ffd24a)' }}>
                Terms of Service
              </span>
            </h1>
            <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20 text-gray-300 font-serif space-y-6">
              <p className="text-lg">By using this platform, you agree to the following terms:</p>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Age Requirement</h2>
                <p>You must be 21 years or older to use this service. By accessing this platform, you confirm that you meet this age requirement.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Service Usage</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All arcade games are for entertainment purposes only</li>
                  <li>Credits and tokens are virtual rewards and have no cash value</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You agree not to share your account credentials with others</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Platform Rules</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Abuse of the platform may result in account suspension or termination</li>
                  <li>You may not use automated tools or scripts to manipulate the platform</li>
                  <li>Fraudulent activity is strictly prohibited</li>
                  <li>Respect other users and maintain appropriate conduct</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Service Modifications</h2>
                <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We are not liable for any loss or inconvenience resulting from such changes.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Limitation of Liability</h2>
                <p>The platform is provided "as is" without warranties of any kind. We are not responsible for any damages arising from the use or inability to use the service.</p>
              </div>
              <div className="pt-4 border-t border-yellow-400/20">
                <p className="text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>
                <p className="text-sm text-gray-400 mt-2 mb-4">For questions about these terms, contact us via Telegram or email:</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a 
                    href="https://t.me/+12297308774" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-yellow-400 hover:text-yellow-300 underline text-sm font-bold font-cursive min-h-[44px] flex items-center"
                  >
                    Telegram: +12297308774
                  </a>
                  <Button
                    asChild
                    variant="default"
                    size="default"
                    className="w-full sm:w-auto min-h-[44px] touch-manipulation text-sm"
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

