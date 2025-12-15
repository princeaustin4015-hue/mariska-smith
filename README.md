# Mariska - Digital Entertainment Hub

A modern landing page for Mariska, a digital entertainment platform featuring interactive content and experiences.

## 🚀 Features

- **Instant Access**: Access content instantly without downloads
- **User-Friendly**: Clean interface with smooth navigation
- **Interactive Content**: Explore various digital experiences
- **Community**: Connect with users worldwide

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript
- **Fonts**: Josefin Sans (Google Fonts)
- **Performance**: Optimized with dynamic imports and code splitting

## 📁 Project Structure

```
mariska/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── Hero.tsx             # Hero section with animated showcase
│   ├── GamesSection.tsx     # Featured content showcase
│   ├── FeaturesSection.tsx  # Platform features section
│   ├── Footer.tsx           # Footer with social links
│   ├── Navigation.tsx       # Responsive navigation bar
│   └── ui/                  # UI components
├── lib/
│   ├── data/                # JSON data files
│   └── utils/               # Storage utilities (read-only)
└── app/
    └── api/                 # API routes (GET only)
```

## 🎨 Design Features

- **Modern UI**: Clean design with animations and interactive elements
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Theme**: Modern dark theme with accent colors
- **Smooth Animations**: Custom CSS animations and transitions
- **Performance Optimized**: Lazy loading and code splitting

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   - Main site: [http://localhost:3000](http://localhost:3000)

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px and above
- **Tablet**: Optimized for screens 768px and above
- **Desktop**: Optimized for screens 1024px and above

## ⚡ Performance Features

- **Lazy Loading**: Components load as they come into view
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js automatic image optimization
- **API Caching**: Optimized API route caching

## 🎯 SEO Optimization

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Open Graph**: Facebook and Twitter card optimization
- **Structured Data**: Semantic HTML structure
- **Performance**: Optimized Core Web Vitals

## 🔧 Customization

### Adding New Content

1. Update the data arrays in `components/FeaturesSection.tsx`
2. Add content images to `public/gamesicon/` directory
3. The UI will automatically adapt to new content

### Styling

- Modify `app/globals.css` for global styles
- Update Tailwind classes in components for styling changes
- Custom animations are defined in the CSS file

## 📄 License

This project is private and proprietary to Mariska.

## 🤝 Contributing

This is a private project. For any changes or improvements, please contact the development team.

---

Built with ❤️ for users worldwide
