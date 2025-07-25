import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const retroButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-text shadow-soft hover:bg-primary-hover font-headline border-none",
        primary: "bg-light-plum text-white border-2 border-retro-border-dark shadow-retro-soft hover:bg-light-plum/80",
        secondary: "bg-dark-navy text-white border-2 border-retro-border-dark shadow-retro-soft hover:bg-dark-navy/80",
        destructive: "bg-warm-red text-white border-2 border-retro-border-dark shadow-retro-soft hover:bg-warm-red/80",
        outline:
          "border-2 border-[var(--border)] bg-transparent text-[var(--text-primary)] shadow-[var(--shadow)] hover:bg-[var(--primary)] hover:text-[var(--text-primary)]",
        ghost: "hover:bg-[var(--primary)] hover:text-[var(--text-primary)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3",
        lg: "h-10 rounded-sm px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  asChild?: boolean
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(retroButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
RetroButton.displayName = "RetroButton"

export { RetroButton, retroButtonVariants }
