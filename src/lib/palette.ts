type AlmaColor = 'blue' | 'ocean' | 'blue-soft' | 'sand' | 'sand-light'

const FALLBACK_RGB: Record<AlmaColor, number[]> = {
  'blue-soft': [123 / 255, 175 / 255, 189 / 255],
  'blue': [115 / 255, 172 / 255, 191 / 255],
  'ocean': [19 / 255, 88 / 255, 111 / 255],
  'sand': [241 / 255, 210 / 255, 167 / 255],
  'sand-light': [251 / 255, 221 / 255, 160 / 255],
}

/** WebGL uses the same approved palette as CSS; unused uniform slots stay zero. */
export function almaShaderColors(colors: AlmaColor[], slots = 8): number[] {
  const style = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : null
  const values = colors.flatMap(color => {
    const raw = style?.getPropertyValue(`--alma-${color}-rgb`)
    if (raw && raw.includes(',')) {
      return raw.split(',').map(channel => Number(channel.trim()) / 255)
    }
    return FALLBACK_RGB[color] || [1, 1, 1]
  })
  return [...values, ...Array(Math.max(0, slots * 3 - values.length)).fill(0)]
}

