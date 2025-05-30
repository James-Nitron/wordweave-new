interface ColorStyle {
  background: string
  text: string
}

function getContrastTextColor(color: string): string {
  // Extract RGB values from the RGBA string
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return "#FFFFFF"

  const [, r, g, b] = match.map(Number)

  // Calculate relative luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Use white text for dark backgrounds, black text for light backgrounds
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

export function getColorStyle(color: string | undefined): ColorStyle {
  const defaultColor = "rgba(59, 130, 246, 1)" // Default blue

  return {
    background: color ?? defaultColor,
    text: getContrastTextColor(color ?? defaultColor)
  }
}
