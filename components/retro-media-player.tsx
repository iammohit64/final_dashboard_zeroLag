"use client"

import * as React from "react"
import { Play, Pause, FastForward, Rewind } from "lucide-react"
import { cn } from "@/lib/utils"
import { RetroButton } from "./retro-button"
import { RetroProgressBar } from "./retro-progress-bar"

interface RetroMediaPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  artist: string
  progress: number // 0-100
}

const RetroMediaPlayer = React.forwardRef<HTMLDivElement, RetroMediaPlayerProps>(
  ({ className, title, artist, progress, ...props }, ref) => {
    const [isPlaying, setIsPlaying] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn("border-2 border-retro-brown bg-beige shadow-retro-3d rounded-sm p-4 space-y-3", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-retro-brown">{title}</h3>
            <p className="text-sm text-gray-700">{artist}</p>
          </div>
          <div className="flex gap-1">
            <RetroButton size="icon" variant="secondary" className="w-7 h-7">
              <Rewind className="w-4 h-4" />
            </RetroButton>
            <RetroButton size="icon" variant="primary" className="w-7 h-7" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </RetroButton>
            <RetroButton size="icon" variant="secondary" className="w-7 h-7">
              <FastForward className="w-4 h-4" />
            </RetroButton>
          </div>
        </div>
        <RetroProgressBar value={progress} indicatorColor="bg-retro-orange" />
        <div className="flex justify-between text-xs text-gray-600">
          <span>0:00</span>
          <span>{Math.floor((progress / 100) * 3)}:00</span> {/* Mock duration */}
        </div>
      </div>
    )
  },
)
RetroMediaPlayer.displayName = "RetroMediaPlayer"

export { RetroMediaPlayer }
