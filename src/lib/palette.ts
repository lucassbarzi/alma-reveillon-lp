type AlmaColor = 'blue' | 'ocean' | 'blue-soft' | 'sand' | 'sand-light'

/** WebGL uses the same approved palette as CSS; unused uniform slots stay zero. */
export function almaShaderColors(colors: AlmaColor[], slots = 8): number[] {
  const style = getComputedStyle(document.documentElement)
  const values = colors.flatMap(color =>
    style.getPropertyValue(`--alma-${color}-rgb`).split(',').map(channel => Number(channel.trim()) / 255),
  )
  return [...values, ...Array(Math.max(0, slots * 3 - values.length)).fill(0)]
}
