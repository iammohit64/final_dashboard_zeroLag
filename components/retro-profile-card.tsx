import * as React from "react"
import { cn } from "@/lib/utils"
import { Flame } from "lucide-react"

interface RetroProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  userType: string
  streak: number
  avatarSrc?: string
  avatarFallback?: string
}

const RetroProfileCard = React.forwardRef<HTMLDivElement, RetroProfileCardProps>(
  ({ className, name, userType, streak, avatarSrc, avatarFallback, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-card rounded-lg shadow-soft p-6 flex flex-col items-center animate-fadeIn border border-border",
        className,
      )}
      {...props}
    >
      <div className="relative w-20 h-20 mx-auto mb-3">
        <img
          src={avatarSrc || "/placeholder.svg?height=80&width=80"}
          alt={`${name} avatar`}
          className="w-full h-full rounded-full border-2 border-dark-navy object-cover"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-light-plum border-2 border-retro-border-dark rounded-full flex items-center justify-center text-white text-xs font-bold">
          <img src="/placeholder.svg?height=16&width=16" alt="Chat bubble icon" className="w-4 h-4" />{" "}
          {/* Placeholder for chat bubble */}
        </div>
      </div>
      <h3 className="font-headline text-lg text-text mb-1">{name}</h3>
      <p className="text-sm text-subtleText mb-2">{userType}</p>
      <div className="badge badge-success flex items-center gap-1">
        <span role="img" aria-label="fire">🔥</span>
        <span>{streak} day streak</span>
      </div>
    </div>
  ),
)
RetroProfileCard.displayName = "RetroProfileCard"

export { RetroProfileCard }
