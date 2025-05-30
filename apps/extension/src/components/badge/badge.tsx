import { getColorStyle } from "~/lib/color"
import { cn } from "~/lib/utils"

interface BadgeProps {
  color?: string
  children: React.ReactNode
  className?: string
}

const Badge = ({ color, children, className }: BadgeProps) => {
  const { background, text } = getColorStyle(color)

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 rounded text-sm font-medium",
        className
      )}
      style={{
        backgroundColor: background,
        color: text
      }}>
      {children}
    </span>
  )
}

export default Badge
