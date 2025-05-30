import React from "react"

import { cn } from "~/lib/utils"

interface SwitchProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
  label?: string
}

const Switch = ({
  checked,
  onChange,
  disabled = false,
  className,
  id,
  label
}: SwitchProps) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {label && (
        <span className="text-sm font-medium text-gray-500">{label}</span>
      )}
      <label className="relative inline-flex cursor-pointer" htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={cn(
            "w-11 h-6 bg-gray-200 rounded-full peer",
            "peer-focus:ring-4 peer-focus:ring-blue-300",
            "dark:peer-focus:ring-blue-800 dark:bg-gray-700",
            "peer-checked:after:translate-x-full peer-checked:after:border-white",
            "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
            "after:bg-white after:border-gray-300 after:border",
            "after:rounded-full after:h-5 after:w-5",
            "after:transition-all dark:border-gray-600",
            "peer-checked:bg-blue-600",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          )}
        />
      </label>
    </div>
  )
}

export default Switch
