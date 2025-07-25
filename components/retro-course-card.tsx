import * as React from "react"
import { cn } from "@/lib/utils"
import { RetroButton } from "./retro-button"

interface RetroCourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  imageUrl: string
  instructor?: string
  price: number
  tag?: "Featured" | "New"
  duration?: string
}

const RetroCourseCard = React.forwardRef<HTMLDivElement, RetroCourseCardProps>(
  ({ className, title, imageUrl, instructor, price, tag, duration, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-2 border-retro-brown bg-beige shadow-retro-3d rounded-sm overflow-hidden", className)}
        {...props}
      >
        <div className="relative w-full h-32 bg-retro-gray-200 border-b-2 border-retro-brown">
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          {tag && (
            <span
              className={cn(
                "absolute top-2 left-2 px-2 py-0.5 text-xs font-bold rounded-full border border-retro-dark-red",
                tag === "Featured" ? "bg-retro-red text-white" : "bg-retro-blue text-white",
              )}
            >
              {tag}
            </span>
          )}
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-bold text-retro-brown text-base line-clamp-2">{title}</h3>
          {instructor && <p className="text-xs text-gray-700">{instructor}</p>}
          {duration && <p className="text-xs text-gray-700">{duration}</p>}
          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-retro-orange text-lg">${price}</span>
            <RetroButton size="sm" className="text-xs">
              Enroll
            </RetroButton>
          </div>
        </div>
      </div>
    )
  },
)
RetroCourseCard.displayName = "RetroCourseCard"

export { RetroCourseCard }
