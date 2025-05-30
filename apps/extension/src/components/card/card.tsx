import React from "react"

import { cn } from "~/lib/utils"

const Card = ({
  title,
  description,
  className,
  children
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-md p-4 shadow-md w-full bg-white">
      <h2 className="text-md font-medium text-blue-500">{title}</h2>
      {description && <p className="text-xs text-gray-500 ">{description}</p>}
      <div className={cn("mt-2", className)}>{children}</div>
    </div>
  )
}

export default Card
