"use client"

import * as React from "react"
import { motion, LayoutGroup } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TextRotate } from "@/components/ui/text-rotate"
import Link from "next/link"

export interface HeroAction {
  label: string
  href: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  subtitle?: string
  actions?: HeroAction[]
  titleClassName?: string
  subtitleClassName?: string
  actionsClassName?: string
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      ...props
    },
    ref,
  ) => {
    const handleActionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          const offset = 80 // Account for fixed navbar height
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        // External links - let them open naturally, but add security attributes
        // Don't prevent default, just ensure proper attributes
      }
    }

    const isExternalLink = (href: string) => {
      return href.startsWith('http://') || href.startsWith('https://')
    }
    return (
      <section
        ref={ref}
        className={cn(
          "relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background",
          className,
        )}
        style={{
          backgroundImage: "url('/cover page.webp')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        {...props}
      >
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.85)_100%)]"></div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,179,0,0.06) 0%, rgba(0,0,0,0.4) 60%)' }}></div>

        {/* Gradient Effects */}
        <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center overflow-hidden">
          {/* Main glow */}
          <div className="absolute inset-auto z-50 h-24 sm:h-32 md:h-36 w-[20rem] sm:w-[24rem] md:w-[28rem] -translate-y-[-30%] rounded-full bg-primary/40 opacity-60 blur-3xl" style={{ mixBlendMode: 'screen' }} />
          
          {/* Lamp effect */}
          <motion.div
            initial={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
            whileInView={{ width: "12rem" }}
            className="absolute top-0 z-30 h-24 sm:h-32 md:h-36 -translate-y-[20%] rounded-full bg-primary/40 blur-2xl"
            style={{ mixBlendMode: 'screen' }}
          />
          
          {/* Top line */}
          <motion.div
            initial={{ width: "10rem" }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
            whileInView={{ width: "20rem" }}
            className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-primary/30 blur-sm hidden sm:block"
            style={{ mixBlendMode: 'screen' }}
          />
          
          {/* Left gradient cone - hidden on mobile */}
          <motion.div
            initial={{ opacity: 0.2, width: "10rem" }}
            whileInView={{ opacity: 0.5, width: "20rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-auto right-1/2 h-40 sm:h-48 md:h-56 w-[20rem] sm:w-[25rem] md:w-[30rem] pointer-events-none hidden md:block"
            style={{
              background: 'conic-gradient(from 70deg at center top, rgba(255, 179, 0, 0.25) 0%, rgba(255, 179, 0, 0.1) 25%, transparent 50%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 200% 200% at center, black 15%, rgba(0,0,0,0.3) 40%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 200% 200% at center, black 15%, rgba(0,0,0,0.3) 40%, transparent 85%)',
              mixBlendMode: 'screen',
              borderRadius: '50%'
            }}
          />
          
          {/* Right gradient cone - hidden on mobile */}
          <motion.div
            initial={{ opacity: 0.2, width: "10rem" }}
            whileInView={{ opacity: 0.5, width: "20rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-auto left-1/2 h-40 sm:h-48 md:h-56 w-[20rem] sm:w-[25rem] md:w-[30rem] pointer-events-none hidden md:block"
            style={{
              background: 'conic-gradient(from 290deg at center top, transparent 0%, transparent 35%, rgba(255, 179, 0, 0.1) 65%, rgba(255, 179, 0, 0.25) 100%)',
              maskImage: 'radial-gradient(ellipse 200% 200% at center, black 15%, rgba(0,0,0,0.3) 40%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 200% 200% at center, black 15%, rgba(0,0,0,0.3) 40%, transparent 85%)',
              mixBlendMode: 'screen',
              borderRadius: '50%'
            }}
          />
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative z-50 max-w-7xl mx-auto flex justify-center flex-1 flex-col px-4 sm:px-5 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12"
        >
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8">
            <h1
              className={cn(
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight px-2",
                titleClassName,
              )}
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 4px 30px rgba(0,0,0,0.8)' }}
            >
              {title}
            </h1>
            
            <LayoutGroup>
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight px-2"
                layout
              >
                <motion.span
                  className="text-yellow-400 inline-block"
                  layout
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                >
                  Your gateway to
                </motion.span>
                <TextRotate
                  texts={[
                    "credits",
                    "tokens",
                    "bonuses",
                    "rewards",
                    "prizes",
                    "wins",
                  ]}
                  mainClassName="text-yellow-400 inline-block px-2 sm:px-3 md:px-4 lg:px-5 bg-[#ff5941] overflow-hidden py-0.5 sm:py-1 md:py-1.5 lg:py-2 rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </motion.div>
            </LayoutGroup>
            
            {subtitle && (
              <p
                className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4",
                  subtitleClassName,
                )}
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.95)' }}
              >
                {subtitle}
              </p>
            )}
            
            {actions && actions.length > 0 && (
              <div className={cn("flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-4 sm:mt-6 px-4 sm:px-0", actionsClassName)}>
                {actions.map((action, index) => {
                  const isExternal = isExternalLink(action.href)
                  return (
                    <Button
                      key={index}
                      variant={action.variant || "default"}
                      size="lg"
                      asChild
                      className="w-full sm:w-auto min-h-[44px] touch-manipulation"
                    >
                      {isExternal ? (
                        <a 
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => handleActionClick(e, action.href)}
                        >
                          {action.label}
                        </a>
                      ) : (
                        <Link 
                          href={action.href}
                          onClick={(e) => handleActionClick(e, action.href)}
                        >
                          {action.label}
                        </Link>
                      )}
                    </Button>
                  )
                })}
              </div>
            )}

            {/* Social Media Icons */}
            <div className="flex items-center justify-center space-x-4 mt-6 sm:mt-8">
              <a
                href="https://www.facebook.com/share/16imCG9Jhw/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[48px] min-h-[48px] border border-yellow-400/30 hover:border-yellow-400"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://t.me/+12297308774"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[48px] min-h-[48px] border border-yellow-400/30 hover:border-yellow-400"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mariska_smit_?igsh=MXNkbWZxaGQ3MzcxMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[48px] min-h-[48px] border border-yellow-400/30 hover:border-yellow-400"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    )
  },
)

Hero.displayName = "Hero"

export { Hero }

