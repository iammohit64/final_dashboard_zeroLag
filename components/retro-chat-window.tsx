import * as React from "react"
import { cn } from "@/lib/utils"

interface RetroChatWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  avatarSrc?: string
  avatarFallback?: string
  name: string
  status?: string
}

const RetroChatWindow = React.forwardRef<HTMLDivElement, RetroChatWindowProps>(
  ({ className, title, avatarSrc, avatarFallback, name, status, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-2 border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow)] rounded-[var(--radius)] overflow-hidden", className)}
      {...props}
    >
      <div className="flex items-center px-3 py-2 border-b-2 border-[var(--border)] bg-[var(--secondary)] text-sm font-bold text-[var(--text-primary)]">
        <img
          src={avatarSrc || "/placeholder.svg?height=24&width=24"}
          alt={`${name} avatar`}
          className="w-6 h-6 rounded-full border border-[var(--border)] mr-2"
        />
        <span>{name}</span>
        {status && <span className="ml-auto text-xs font-normal">({status})</span>}
      </div>
      <div className="p-3">{children}</div>
    </div>
  ),
)
RetroChatWindow.displayName = "RetroChatWindow"

export { RetroChatWindow }
