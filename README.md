# Mariska - Luck-Based Gaming Platform

A modern, gamified landing page for Mariska, a luck-based gaming platform featuring three exciting games: Swifte, Monimak, and Gadmod.

## 🎮 Games

### Swifte ⚡

- **Type**: Lightning-fast reflex challenge
- **Difficulty**: Medium
- **Features**: Reflex Training, Speed Challenge, Quick Rounds, Instant Rewards
- **Popularity**: 95%

### Monimak 🔮

- **Type**: Mystical symbol matching adventure
- **Difficulty**: Hard
- **Features**: Symbol Matching, Mystical Themes, Pattern Recognition, Legendary Rewards
- **Popularity**: 88%
- **Status**: NEW

### Gadmod 🎯

- **Type**: Strategic precision gameplay
- **Difficulty**: Hard
- **Features**: Strategic Planning, Precision Control, Empire Building, Leaderboards
- **Popularity**: 92%

## 🚀 Features

- **Instant Play**: Jump into any game instantly without downloads
- **Fair Play**: Provably fair algorithms ensure every game is completely random
- **Amazing Rewards**: Win incredible prizes and climb the global leaderboards
- **Vibrant Community**: Connect with players worldwide and share achievements

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Fonts**: Geist Sans & Geist Mono
- **Performance**: Optimized with custom hooks and utilities

## 📁 Project Structure

```
mariska/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── Hero.tsx             # Hero section with animated showcase
│   ├── GamesSection.tsx     # Games showcase with interactive cards
│   ├── FeaturesSection.tsx  # Platform features section
│   ├── Footer.tsx           # Footer with social links
│   ├── Navigation.tsx       # Responsive navigation bar
│   └── LoadingSpinner.tsx   # Reusable loading component
├── lib/
│   └── constants.ts         # Game data and platform configuration
├── types/
│   └── game.ts              # TypeScript interfaces
├── hooks/
│   └── usePerformance.ts    # Performance optimization hooks
└── utils/
    └── performance.ts       # Performance utility functions
```

## 🎨 Design Features

- **Gamified UI**: Colorful gradients, animations, and interactive elements
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Theme**: Modern dark theme with purple/pink accent colors
- **Smooth Animations**: Custom CSS animations and transitions
- **Performance Optimized**: Lazy loading, debouncing, and throttling

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   Create a `.env.local` file in the root directory:

   ```env
   # NextAuth.js Configuration
   AUTH_SECRET=your-generated-secret-key-here
   ADMIN_PASSWORD=your-secure-password-here
   ```

   Generate `AUTH_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - Main site: [http://localhost:3000](http://localhost:3000)
   - Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 🔐 Admin Panel

The project includes a fully-featured admin panel for managing content:

- **Location**: `/admin`
- **Authentication**: NextAuth.js v5 (secure JWT-based)
- **Features**: 
  - Manage bonus offers
  - Manage leaderboard items
  - Manage giveaways
  - Image upload support
  - Real-time updates

**Quick Setup:**
1. See `QUICK_START.md` for detailed setup instructions
2. See `ADMIN_PANEL_README.md` for complete documentation
3. See `NEXTAUTH_SETUP.md` for authentication details

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px and above
- **Tablet**: Optimized for screens 768px and above
- **Desktop**: Optimized for screens 1024px and above

## ⚡ Performance Features

- **Lazy Loading**: Components load as they come into view
- **Debounced Resize**: Optimized window resize handling
- **Throttled Scroll**: Smooth scroll performance
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js

## 🎯 SEO Optimization

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Open Graph**: Facebook and Twitter card optimization
- **Structured Data**: Semantic HTML structure
- **Performance**: Optimized Core Web Vitals

## 🔧 Customization

### Adding New Games

1. Update the `GAMES` array in `lib/constants.ts`
2. Add the game interface to `types/game.ts` if needed
3. The UI will automatically adapt to new games

### Styling

- Modify `app/globals.css` for global styles
- Update Tailwind classes in components for styling changes
- Custom animations are defined in the CSS file

### Performance

- Use the `usePerformance` hook for device detection
- Implement `useIntersectionObserver` for lazy loading
- Add performance utilities from `utils/performance.ts`

## 📄 License

This project is private and proprietary to Mariska.

## 🤝 Contributing

This is a private project. For any changes or improvements, please contact the development team.

---

Built with ❤️ for gamers worldwide
