"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RetroSidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  icon: React.ElementType
  active?: boolean
  onClick: () => void
  badgeContent?: number
}

const RetroSidebarItem = React.forwardRef<HTMLDivElement, RetroSidebarItemProps>(
  ({ className, label, icon: Icon, active, onClick, badgeContent, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center p-2 border-2 bg-[var(--background)] border-[var(--border)] shadow-[var(--shadow)] rounded-[var(--radius)] cursor-pointer hover:bg-[var(--primary)] hover:shadow-[var(--shadow)] transition-all duration-200",
        active && "bg-butter-yellow shadow-retro-soft-sm",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <div className="w-8 h-8 flex items-center justify-center bg-[var(--secondary)] border-2 border-[var(--border)] rounded-[var(--radius)] mr-3">
        <Icon className={cn("w-4 h-4 text-[var(--text-primary)]", active && "text-[var(--primary)]")} />
      </div>
      <span className={cn("text-sm font-medium text-[var(--text-primary)]", active && "text-[var(--primary)]")}>{label}</span>
      {badgeContent && (
  <span className="badge badge-pending ml-auto">
    {badgeContent}
  </span>
)}
    </div>
  ),
)
RetroSidebarItem.displayName = "RetroSidebarItem"

export { RetroSidebarItem }
