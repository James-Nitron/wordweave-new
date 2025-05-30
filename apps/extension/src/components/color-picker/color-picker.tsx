import React, { useState } from "react"
import { ChromePicker } from "react-color"

interface ColorPickerProps {
  defaultColor?: string
  onChange?: (color: string) => void
  className?: string
  id?: string
}

const ColorPicker = ({
  defaultColor = "rgba(59, 130, 246, 1)",
  onChange,
  className,
  id
}: ColorPickerProps) => {
  const [color, setColor] = useState(defaultColor)

  const handleColorChange = (newColor: any) => {
    const { r, g, b, a } = newColor.rgb
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`
    setColor(rgbaColor)
    onChange?.(rgbaColor)
  }

  return (
    <div className={className} id={id}>
      <ChromePicker
        color={color}
        onChange={handleColorChange}
        styles={{
          default: {
            picker: {
              boxShadow: "none",
              border: "none",
              width: "100%",
              borderRadius: "0"
            }
          }
        }}
      />
    </div>
  )
}

export default ColorPicker
