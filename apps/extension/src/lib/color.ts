interface ColorStyle {
  background: string
  text: string
}

function hexToRgb(hex: string) {
  // Remove the hash if present
  hex = hex.replace(/^#/, "")

  // Parse the hex values
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return { r, g, b }
}

function getContrastTextColor(backgroundColor: string): string {
  const { r, g, b } = hexToRgb(backgroundColor)

  // Calculate relative luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Use white text for dark backgrounds, black text for light backgrounds
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

export function getColorStyle(color: string | undefined): ColorStyle {
  if (!color) {
    return {
      background: "#3B82F6", // Default blue
      text: "#FFFFFF"
    }
  }

  return {
    background: color,
    text: getContrastTextColor(color)
  }
}
