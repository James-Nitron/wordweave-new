import React from "react"

const Card = ({
  title,
  description,
  children
}: {
  title: string
  description?: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-md p-4 shadow-md w-full bg-white">
      <h2 className="text-md font-medium text-blue-500">{title}</h2>
      {description && <p className="text-xs text-gray-500 ">{description}</p>}
      <div className="mt-2">{children}</div>
    </div>
  )
}

export default Card
