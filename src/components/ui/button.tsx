import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variant === "default" && "bg-[#57d2f4] text-[#04151f] hover:bg-[#7de0f8] shadow-md",
          variant === "outline" && "border border-white/20 bg-transparent text-white hover:bg-white/10",
          variant === "ghost" && "hover:bg-white/10 text-white",
          size === "default" && "h-10 px-5 py-2",
          size === "sm" && "h-8 px-3 text-[10px]",
          size === "lg" && "h-12 px-8 text-sm",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
