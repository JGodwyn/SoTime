import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-[hsl(var(--btn-default-text))] shadow-lg hover:bg-dodger-500 hover:shadow-xl transform hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-radial before:from-[hsl(var(--primary))/0] before:to-[hsl(var(--primary))] before:pointer-events-none",
        destructive:
          "bg-destructive text-[hsl(var(--btn-destructive-text))] hover:bg-destructive/90 transform hover:-translate-y-0.5",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-[hsl(var(--btn-outline-text))] transform hover:-translate-y-0.5",
        secondary:
          "bg-night-600 text-[hsl(var(--btn-secondary-text))] hover:bg-night-300 transform hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-[hsl(var(--btn-ghost-text))]",
        link: "text-[hsl(var(--btn-link-text))] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-6 px-4 tracking-wide text-btn-sm",
        md: "h-8 px-6 tracking-wide text-btn-lg",
        lg: "h-10 px-8 tracking-wide text-btn-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
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
        className={cn(
          buttonVariants({ variant, size }), 
          className,
          "rounded-full"
        )}
        style={{ position: 'relative', zIndex: 1000000 }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
