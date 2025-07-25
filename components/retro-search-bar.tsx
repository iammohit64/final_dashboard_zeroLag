import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { RetroInput } from "./retro-input"

export interface RetroSearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RetroSearchBar = React.forwardRef<HTMLInputElement, RetroSearchBarProps>(({ className, ...props }, ref) => {
  return (
    <div className={cn("relative", className)}>
      <RetroInput ref={ref} className="pl-9" {...props} />
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-retro-navy-text" />
    </div>
  )
})
RetroSearchBar.displayName = "RetroSearchBar"

export { RetroSearchBar }
