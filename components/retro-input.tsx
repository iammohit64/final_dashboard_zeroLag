import * as React from "react"
import { cn } from "@/lib/utils"

export interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RetroInput = React.forwardRef<HTMLInputElement, RetroInputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-[var(--radius)] border-2 border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm shadow-[var(--shadow)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
RetroInput.displayName = "RetroInput"

export { RetroInput }
