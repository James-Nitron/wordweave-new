import React, { useState } from "react"
import { BlockPicker } from "react-color"

interface ColorPickerProps {
  defaultColor?: string
  onChange?: (color: string) => void
  className?: string
  id?: string
}

export function ColorPicker({
  defaultColor = "#3B82F6", // Default to blue-600
  onChange,
  id
}: ColorPickerProps) {
  const [color, setColor] = useState(defaultColor)

  const handleColorChange = (newColor: any) => {
    const hexColor = newColor.hex
    setColor(hexColor)
    onChange?.(hexColor)
  }

  return (
    <div id={id}>
      <BlockPicker
        color={color}
        onChange={handleColorChange}
        width="100%"
        colors={[
          "#3B82F6", // blue-600
          "#EF4444", // red-500
          "#10B981", // emerald-500
          "#F59E0B", // amber-500
          "#8B5CF6", // violet-500
          "#EC4899", // pink-500
          "#6B7280", // gray-500
          "#000000" // black
        ]}
        triangle="hide"
        styles={{
          default: {
            card: {
              boxShadow: "none",
              border: "none",
              borderRadius: "0",
              background: "transparent"
            }
          }
        }}
      />
    </div>
  )
}
