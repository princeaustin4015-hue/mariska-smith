import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-cursive",
  {
    variants: {
      variant: {
        default: "gold-gradient-bg text-black hover:opacity-90 active:scale-95 shadow-lg hover:shadow-[0_0_18px_rgba(255,179,0,0.45)] rounded-full",
        destructive:
          "bg-[#ef4444] text-white hover:bg-[#ef4444]/90 rounded-full",
        outline:
          "border-2 border-[rgba(255,210,74,0.6)] bg-transparent text-white hover:bg-[rgba(0,0,0,0.4)] hover:border-[rgba(255,210,74,0.9)] backdrop-blur-sm rounded-full",
        secondary:
          "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/80 rounded-full",
        ghost: "hover:bg-[#ffd24a] hover:text-black rounded-full",
        link: "text-[#ffb300] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
