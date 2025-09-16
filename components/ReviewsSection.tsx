'use client';

const DUMMY_REVIEWS = [
   {
	   name: 'Emily R.',
	   review:
		   'Absolutely love the games! The gold theme is stunning and the experience is seamless.',
	   rating: 5,
   },
   {
	   name: 'Michael B.',
	   review: 'The UI is so luxurious and smooth. I keep coming back for more!',
	   rating: 5,
   },
   {
	   name: 'Jessica T.',
	   review: 'Great variety of games and the download process is super easy.',
	   rating: 4,
   },
   {
	   name: 'David S.',
	   review:
		   'The animations and gold accents make it feel premium. Highly recommend!',
	   rating: 5,
   },
   {
	   name: 'Olivia M.',
	   review: 'Support is quick and the games are fair. Love the overall vibe.',
	   rating: 4,
   },
   {
	   name: 'James L.',
	   review: 'A beautiful site with fun games. The gold/black theme is perfect!',
	   rating: 5,
   },
];

export default function ReviewsSection() {
	return (
		   <section
			   className="py-24 relative overflow-hidden"
			   style={{
				   backgroundImage: `linear-gradient(135deg, #1a1207cc 0%, #3a2a0acc 60%, #ffd70033 100%), url('/review%20background.jpg')`,
				   backgroundPosition: 'center',
				   backgroundSize: 'cover',
				   backgroundRepeat: 'no-repeat',
			   }}
		   >
			   {/* Sparkle overlay */}
			   <div className="pointer-events-none absolute inset-0 z-10" style={{
				   background: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10%25\' cy=\'20%25\' r=\'1.5\' fill=\'%23fff7c2\' fill-opacity=\'0.7\'/%3E%3Ccircle cx=\'80%25\' cy=\'60%25\' r=\'1.2\' fill=\'%23ffe066\' fill-opacity=\'0.5\'/%3E%3Ccircle cx=\'50%25\' cy=\'80%25\' r=\'1.8\' fill=\'%23fffbe6\' fill-opacity=\'0.4\'/%3E%3Ccircle cx=\'70%25\' cy=\'30%25\' r=\'1.1\' fill=\'%23fffbe6\' fill-opacity=\'0.6\'/%3E%3C/svg%3E") repeat',
				   opacity: 0.5
			   }} />
			   <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#19110a]/50 to-black/60"></div>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-24"
				style={{
					background:
						'linear-gradient(180deg, #0b0604 0%, rgba(11,6,4,0.7) 40%, rgba(11,6,4,0) 100%)',
				}}
			></div>
			   <div
				   className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
				   style={{
					   background:
						   'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0) 100%)',
				   }}
			   ></div>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 roomy-copy relative z-10">
				<h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200 mb-14 text-center font-cursive drop-shadow-lg">
					What Players Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{DUMMY_REVIEWS.map((review, i) => (
						<div
							key={i}
							className="relative rounded-3xl p-8 border-2 border-yellow-400/40 bg-gradient-to-br from-[#19110a]/95 to-[#0f0a06]/90 shadow-2xl flex flex-col items-center text-center overflow-hidden group transition-all duration-300 hover:scale-105 hover:border-yellow-400/80"
						>
							<div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-yellow-400/40 to-orange-400/30 rounded-full blur-2xl opacity-70 pointer-events-none"></div>
							<div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-orange-400/30 to-yellow-400/20 rounded-full blur-xl opacity-60 pointer-events-none"></div>
							<div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center text-4xl font-bold text-black bg-gradient-to-br from-yellow-400 to-orange-300 shadow-lg border-4 border-yellow-300/70">
								<span className="select-none">{review.name[0]}</span>
							</div>
							<blockquote className="text-gray-100 italic mb-4 text-lg font-medium drop-shadow">
								“{review.review}”
							</blockquote>
							<div className="flex justify-center mb-2">
								{[...Array(review.rating)].map((_, j) => (
									<span key={j} className="text-yellow-400 text-xl mx-0.5">
										★
									</span>
								))}
								{[...Array(5 - review.rating)].map((_, j) => (
									<span key={j} className="text-gray-600 text-xl mx-0.5">
										★
									</span>
								))}
							</div>
							<div className="text-yellow-200 font-bold mb-1 tracking-wide">
								{review.name}
							</div>
							<div className="text-gray-400 text-xs">Verified Reviewer</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
