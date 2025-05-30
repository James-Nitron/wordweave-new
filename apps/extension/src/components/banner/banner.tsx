import { cn } from "~/lib/utils"

const Banner = ({
  variant,
  description
}: {
  variant: "info" | "warning"
  description: string
}) => {
  const variantStyles = {
    info: "bg-blue-50 border-l-blue-500",
    warning: "bg-amber-50 border-l-amber-500"
  }

  return (
    <div
      className={cn(
        "flex gap-2 w-full p-3 rounded-lg border-l-2",
        variantStyles[variant]
      )}>
      <p className="text-xs text-gray-700">{description}</p>
    </div>
  )
}

export default Banner
