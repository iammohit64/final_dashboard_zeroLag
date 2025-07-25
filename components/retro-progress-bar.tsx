import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface RetroProgressBarProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor?: string // Tailwind color class, e.g., "bg-butter-yellow"
}

const RetroProgressBar = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, RetroProgressBarProps>(
  ({ className, value, indicatorColor = "bg-butter-yellow", ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-[var(--radius)] bg-[var(--secondary)] border-2 border-[var(--border)] shadow-[var(--shadow)]",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
)
RetroProgressBar.displayName = ProgressPrimitive.Root.displayName

export { RetroProgressBar }
