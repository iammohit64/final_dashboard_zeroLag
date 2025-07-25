import * as React from "react"
import { cn } from "@/lib/utils"
import { X, Minus, Square } from "lucide-react"

interface RetroWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  retroHeaderColor?: "orange" | "blue" | "green" | "pink" | "yellow" | "light-plum" | "gray"
  showControls?: boolean
}

const RetroWindow = React.forwardRef<HTMLDivElement, RetroWindowProps>(
  ({ className, title, retroHeaderColor, showControls = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("card-3d", className)} // Uses your existing .card-3d class
        {...props}
      >
        {/* Window Header */}
        <div
          className="card-header-retro flex items-center justify-between px-3 py-1 text-sm font-retro"
          data-color={retroHeaderColor} // Use a data-attribute for CSS to target
        >
          <span>{title}</span>
          {showControls && (
            <div className="flex gap-1">
              <button className="w-5 h-5 bg-white border-2 border-retro-border-dark flex items-center justify-center text-xs">
                <Minus className="w-3 h-3" />
              </button>
              <button className="w-5 h-5 bg-white border-2 border-retro-border-dark flex items-center justify-center text-xs">
                <Square className="w-3 h-3" />
              </button>
              <button className="w-5 h-5 bg-warm-red border-2 border-retro-border-dark flex items-center justify-center text-white text-xs">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        
        {/* Window Content */}
        <div className="p-4">{children}</div>
      </div>
    );
  }
);
RetroWindow.displayName = "RetroWindow"

export { RetroWindow }

// The component now relies on your card-3d.css
import "../app/card-3d.css";