"use client"

import * as React from "react"
import { motion, LayoutGroup } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TextRotate } from "@/components/ui/text-rotate"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
    const router = useRouter()

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

        {/* Subtle floating images - Free Play $5.0 */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          whileInView={{ opacity: 0.15, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          className="absolute left-0 bottom-0 z-10 pointer-events-none hidden lg:block"
          style={{ 
            filter: 'blur(1px)',
            mixBlendMode: 'screen'
          }}
        >
          <img
            src="/free play $5.0.png"
            alt="Free Play $5.0"
            className="w-48 h-auto opacity-60"
            style={{ 
              transform: 'rotate(-5deg)',
              filter: 'drop-shadow(0 0 20px rgba(255, 179, 0, 0.2))'
            }}
          />
        </motion.div>

        {/* Subtle floating images - Game List */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          whileInView={{ opacity: 0.15, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="absolute right-0 bottom-0 z-10 pointer-events-none hidden lg:block"
          style={{ 
            filter: 'blur(1px)',
            mixBlendMode: 'screen'
          }}
        >
          <img
            src="/game list0.1.png"
            alt="Game List"
            className="w-48 h-auto opacity-60"
            style={{ 
              transform: 'rotate(5deg)',
              filter: 'drop-shadow(0 0 20px rgba(255, 179, 0, 0.2))'
            }}
          />
        </motion.div>

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
                    "wins",
                    "jackpots",
                    "thrills",
                    "rewards",
                    "excitement",
                    "fortune",
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
          </div>
        </motion.div>
      </section>
    )
  },
)

Hero.displayName = "Hero"

export { Hero }

