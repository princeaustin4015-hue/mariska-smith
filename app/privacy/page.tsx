import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0b0604] pt-20">
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 font-cursive text-center">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#ff7a00,#ffb300,#ffd24a)' }}>
                Privacy Policy
              </span>
            </h1>
            <div className="bg-[#19110a]/50 rounded-lg p-6 border border-yellow-400/20 text-gray-300 font-serif space-y-6">
              <p className="text-lg">We are committed to protecting your privacy and personal information.</p>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Information We Collect</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We collect minimal information necessary for account management</li>
                  <li>Basic account information such as username and email (if provided)</li>
                  <li>Usage data to improve our services</li>
                  <li>Technical information such as device type and browser</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To provide and maintain our services</li>
                  <li>To process bonus claims and manage your account</li>
                  <li>To improve user experience and platform functionality</li>
                  <li>To communicate important updates and notifications</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Data Protection</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your personal data is never shared with third parties</li>
                  <li>We use secure connections (HTTPS) to protect your information</li>
                  <li>All data is stored securely and encrypted</li>
                  <li>We implement industry-standard security measures</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Your Rights</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You can request access to your personal data at any time</li>
                  <li>You can request account deletion at any time</li>
                  <li>You can opt out of non-essential communications</li>
                  <li>You have the right to data portability</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Cookies and Tracking</h2>
                <p>Cookies are used only for essential site functionality, such as maintaining your session and preferences. We do not use tracking cookies for advertising purposes.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3 font-cursive">Compliance</h2>
                <p>We comply with applicable data protection regulations and continuously work to maintain the highest standards of privacy protection.</p>
              </div>
              <div className="pt-4 border-t border-yellow-400/20">
                <p className="text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>
                <p className="text-sm text-gray-400 mt-2 mb-4">For questions about privacy, contact us via Telegram or email:</p>
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

