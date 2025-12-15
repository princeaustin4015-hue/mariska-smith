'use client'

import { memo, useMemo } from 'react'

interface Review {
  name: string
  review: string
  rating: number
}

const DUMMY_REVIEWS: Review[] = [
  {
    name: 'Erica M.',
    review: 'Been playing for 3 months now and I love it! The daily bonuses are legit and I\'ve earned so many credits. GV and OS are my go-to games. Customer support is quick too when I had questions.',
    rating: 5,
  },
  {
    name: 'Tom Steel',
    review: 'Best arcade platform I\'ve found honestly. The token system is fair and bonuses actually work. I\'ve claimed the weekly bonus 4 times already. Highly recommend trying JC and FK!',
    rating: 5,
  },
  {
    name: 'Tree J.',
    review: 'Started last week and already got $5 free credits! The games load fast and the bonus claiming process is super simple. My friends are all joining now after I showed them.',
    rating: 5,
  },
  {
    name: 'Jen Hoggatt',
    review: 'I\'ve tried a lot of platforms but this one stands out. The referral bonus is great - got $20 just from sharing with 2 friends. The arcade games are fun and credits add up fast!',
    rating: 5,
  },
  {
    name: 'Ab Sylve',
    review: 'The daily bonuses keep me coming back. I play MW and CM regularly and the tokens I earn are real. No issues with withdrawals either. Solid platform overall.',
    rating: 5,
  },
  {
    name: 'Tony Jr',
    review: 'Love how easy it is to claim bonuses. I check daily for the 30% bonus and it\'s always there. The games are smooth and I\'ve never had any technical problems. 5 stars!',
    rating: 5,
  },
]

function ReviewsSection() {
  const reviews = useMemo(() => DUMMY_REVIEWS, [])
  return (
    <section
      id="reviews"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden scroll-mt-20"
      style={{
        backgroundImage: `linear-gradient(135deg, #1a1207cc 0%, #3a2a0acc 60%, #ffd70033 100%), url('/review background.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Sparkle overlay */}
      <div className="pointer-events-none absolute inset-0 z-10" style={{
        background: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10%25\' cy=\'20%25\' r=\'1.5\' fill=\'%23fff7c2\' fill-opacity=\'0.7\'/%3E%3Ccircle cx=\'80%25\' cy=\'60%25\' r=\'1.2\' fill=\'%23ffe066\' fill-opacity=\'0.5\'/%3E%3Ccircle cx=\'50%25\' cy=\'80%25\' r=\'1.8\' fill=\'%23fffbe6\' fill-opacity=\'0.4\'/%3E%3Ccircle cx=\'70%25\' cy=\'30%25\' r=\'1.1\' fill=\'%23fffbe6\' fill-opacity=\'0.6\'/%3E%3C/svg%3E") repeat',
        opacity: 0.5
      }} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#19110a]/50 to-black/60"></div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-12 sm:h-16 md:h-24"
        style={{
          background: 'linear-gradient(180deg, #0b0604 0%, rgba(11,6,4,0.7) 40%, rgba(11,6,4,0) 100%)'
        }}
      ></div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 md:h-32"
        style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0) 100%)'
        }}
      ></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 roomy-copy relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200 mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center font-cursive drop-shadow-lg px-2">
          User Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-yellow-400/40 bg-gradient-to-br from-[#19110a]/95 to-[#0f0a06]/90 shadow-2xl flex flex-col items-center text-center overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95 hover:border-yellow-400/80"
            >
              <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400/40 to-orange-400/30 rounded-full blur-2xl opacity-70 pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400/30 to-yellow-400/20 rounded-full blur-xl opacity-60 pointer-events-none"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-black bg-gradient-to-br from-yellow-400 to-orange-300 shadow-lg border-4 border-yellow-300/70">
                <span className="select-none">{review.name[0]}</span>
              </div>
              <blockquote className="text-gray-100 italic mb-3 sm:mb-4 text-sm sm:text-base md:text-lg font-semibold drop-shadow px-1 font-serif">
                &ldquo;{review.review}&rdquo;
              </blockquote>
              <div className="flex justify-center mb-2">
                {[...Array(review.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg sm:text-xl mx-0.5">
                    ★
                  </span>
                ))}
                {[...Array(5 - review.rating)].map((_, j) => (
                  <span key={j} className="text-gray-600 text-lg sm:text-xl mx-0.5">
                    ★
                  </span>
                ))}
              </div>
              <div className="text-yellow-200 font-bold mb-1 tracking-wide text-sm sm:text-base font-cursive">
                {review.name}
              </div>
              <div className="text-gray-400 text-xs font-medium font-serif">Verified Reviewer</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(ReviewsSection)
