import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, type OGLRenderingContext } from 'ogl'
import { forwardRef, useEffect, useImperativeHandle, useRef, type RefObject } from 'react'

export interface CircularGalleryItem { image: string; text: string }
export interface CircularGalleryHandle { next: () => void; previous: () => void; goTo: (index: number) => void }
interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CircularGalleryItem[]
  bend?: number
  borderRadius?: number
  scrollSpeed?: number
  scrollEase?: number
  onIndexChange?: (index: number) => void
  onItemSelect?: (index: number) => void
  overlayRef?: RefObject<HTMLElement | null>
  onFallback?: () => void
}

const MOBILE_BREAKPOINT = 780
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const wrap = (value: number, total: number) => ((value % total) + total) % total

const vertex = `
precision highp float;
attribute vec3 position; attribute vec2 uv;
uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform float uTime; uniform float uSpeed;
varying vec2 vUv;
void main(){ vUv=uv; vec3 p=position; p.z=(sin(p.x*4.0+uTime)*1.15+cos(p.y*2.0+uTime)*1.15)*(0.055+min(abs(uSpeed),1.0)*0.16); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }
`
const fragment = `
precision highp float;
uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; uniform sampler2D tMap; uniform float uBorderRadius; uniform float uShade;
varying vec2 vUv;
float roundedBoxSDF(vec2 p,vec2 b,float r){ vec2 d=abs(p)-b; return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r; }
void main(){ vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0)); vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5); vec4 color=texture2D(tMap,uv); float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius); float alpha=1.0-smoothstep(-0.003,0.003,d); color.rgb*=1.0-uShade; gl_FragColor=vec4(color.rgb,alpha); }
`

class Media {
  plane!: Mesh
  program!: Program
  texture!: Texture
  imageElement?: HTMLImageElement
  extra = 0
  width = 0
  widthTotal = 0
  x = 0

  constructor(
    private gl: OGLRenderingContext,
    private geometry: Plane,
    private image: string,
    private index: number,
    private length: number,
    private scene: Transform,
    private screen: { width: number; height: number },
    private viewport: { width: number; height: number },
    private bend: number,
    private borderRadius: number,
  ) { this.create(); this.resize() }

  create() {
    this.texture = new Texture(this.gl, { generateMipmaps: false })
    this.program = new Program(this.gl, { depthTest: false, depthWrite: false, vertex, fragment, transparent: true, uniforms: {
      tMap: { value: this.texture }, uPlaneSizes: { value: [0, 0] }, uImageSizes: { value: [720, 960] },
      uSpeed: { value: 0 }, uTime: { value: Math.random() * 100 }, uBorderRadius: { value: this.borderRadius }, uShade: { value: .5 },
    } })
    const image = new Image()
    image.decoding = 'async'
    image.crossOrigin = 'anonymous'
    this.imageElement = image
    image.onload = () => {
      this.texture.image = image
      this.program.uniforms.uImageSizes.value = [image.naturalWidth || 720, image.naturalHeight || 960]
    }
    image.onerror = () => { this.program.uniforms.uImageSizes.value = [720, 960] }
    image.src = this.image
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program })
    this.plane.setParent(this.scene)
  }

  resize(screen = this.screen, viewport = this.viewport) {
    this.screen = screen; this.viewport = viewport
    const mobile = screen.width < MOBILE_BREAKPOINT
    const pixelWidth = mobile ? Math.min(screen.width * .76, 310) : Math.min(screen.width * .25, 350)
    const pixelHeight = mobile ? Math.min(screen.height * .86, 400) : Math.min(screen.height * .76, 500)
    this.plane.scale.x = viewport.width * pixelWidth / screen.width
    this.plane.scale.y = viewport.height * pixelHeight / screen.height
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    const gap = viewport.width * (mobile ? 26 : 48) / screen.width
    this.width = this.plane.scale.x + gap
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }

  update(current: number, last: number, direction: 'left' | 'right') {
    this.plane.position.x = this.x - current - this.extra
    const x = this.plane.position.x
    const halfViewport = this.viewport.width / 2
    const bend = Math.abs(this.bend)
    if (bend > .001) {
      const radius = (halfViewport * halfViewport + bend * bend) / (2 * bend)
      const effectiveX = Math.min(Math.abs(x), halfViewport)
      const arc = radius - Math.sqrt(Math.max(0, radius * radius - effectiveX * effectiveX))
      this.plane.position.y = this.bend > 0 ? -arc : arc
      this.plane.rotation.z = (this.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(Math.min(1, effectiveX / radius))
    } else { this.plane.position.y = 0; this.plane.rotation.z = 0 }
    const speed = current - last
    this.program.uniforms.uTime.value += .025
    this.program.uniforms.uSpeed.value = speed
    this.program.uniforms.uShade.value = Math.min(.67, Math.abs(x / this.width) * .2)
    const halfPlane = this.plane.scale.x / 2
    if (direction === 'right' && this.plane.position.x + halfPlane < -halfViewport) this.extra -= this.widthTotal
    if (direction === 'left' && this.plane.position.x - halfPlane > halfViewport) this.extra += this.widthTotal
  }

  destroy() {
    if (this.imageElement) { this.imageElement.onload = null; this.imageElement.onerror = null }
    const program = (this.program as any).program
    const texture = (this.texture as any).texture
    if (program) this.gl.deleteProgram(program)
    if (texture) this.gl.deleteTexture(texture)
    ;(this.plane as any)?.remove?.()
  }
}

class GalleryEngine {
  renderer!: Renderer
  gl!: OGLRenderingContext
  camera!: Camera
  scene!: Transform
  geometry!: Plane
  medias: Media[] = []
  raf = 0
  screen = { width: 1, height: 1 }
  viewport = { width: 1, height: 1 }
  scroll = { current: 0, target: 0, last: 0 }
  isDown = false
  moved = false
  startX = 0
  startY = 0
  startTarget = 0
  active = 0
  visible = true
  intersecting = true
  contextLost = false
  resizeObserver!: ResizeObserver
  intersectionObserver?: IntersectionObserver

  constructor(
    private container: HTMLElement,
    private items: CircularGalleryItem[],
    private bend: number,
    private radius: number,
    private speed: number,
    private ease: number,
    private onIndex?: (index: number) => void,
    private onSelect?: (index: number) => void,
    private overlayRef?: RefObject<HTMLElement | null>,
  ) {
    const mobile = innerWidth < MOBILE_BREAKPOINT
    this.renderer = new Renderer({ alpha: true, antialias: !mobile, dpr: mobile ? 1 : Math.min(devicePixelRatio || 1, 1.5) })
    this.gl = this.renderer.gl
    if (!this.gl) throw new Error('WebGL unavailable')
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
    this.gl.canvas.addEventListener('webglcontextlost', this.handleContextLost as EventListener, false)
    this.gl.canvas.addEventListener('webglcontextrestored', this.handleContextRestored as EventListener, false)
    this.camera = new Camera(this.gl); this.camera.fov = 45; this.camera.position.z = 20
    this.scene = new Transform()
    this.geometry = new Plane(this.gl, { widthSegments: mobile ? 24 : 48, heightSegments: mobile ? 16 : 32 })
    this.resize()
    this.medias = items.map((item, index) => new Media(this.gl, this.geometry, item.image, index, items.length, this.scene, this.screen, this.viewport, bend, radius))
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(container)
    this.intersectionObserver = new IntersectionObserver(([entry]) => { this.intersecting = entry.isIntersecting }, { rootMargin: '160px' })
    this.intersectionObserver.observe(container)
    this.bind()
    this.update()
  }

  private setActive(index: number) {
    const normalized = wrap(index, this.items.length)
    if (normalized !== this.active) { this.active = normalized; this.onIndex?.(normalized) }
  }

  resize = () => {
    this.screen = { width: Math.max(1, this.container.clientWidth), height: Math.max(1, this.container.clientHeight) }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })
    const fov = this.camera.fov * Math.PI / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    this.viewport = { width: height * this.camera.aspect, height }
    this.medias.forEach((media) => media.resize(this.screen, this.viewport))
  }

  snap = () => {
    if (!this.medias[0]) return
    const width = this.medias[0].width
    this.scroll.target = Math.round(this.scroll.target / width) * width
    this.setActive(Math.round(this.scroll.target / width))
  }
  next = () => { if (this.medias[0]) { this.scroll.target += this.medias[0].width; this.snap() } }
  previous = () => { if (this.medias[0]) { this.scroll.target -= this.medias[0].width; this.snap() } }
  goTo = (index: number) => {
    if (!this.medias[0]) return
    let delta = index - this.active
    if (delta > this.items.length / 2) delta -= this.items.length
    if (delta < -this.items.length / 2) delta += this.items.length
    this.scroll.target += delta * this.medias[0].width
    this.snap()
  }

  pointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    this.isDown = true; this.moved = false; this.startX = event.clientX; this.startY = event.clientY; this.startTarget = this.scroll.target
    this.container.setPointerCapture?.(event.pointerId)
  }
  pointerMove = (event: PointerEvent) => {
    if (!this.isDown) return
    const deltaX = this.startX - event.clientX
    const deltaY = this.startY - event.clientY
    if (Math.hypot(deltaX, deltaY) > 8) this.moved = true
    if (Math.abs(deltaX) >= Math.abs(deltaY)) this.scroll.target = this.startTarget + deltaX * (this.speed * .018)
  }
  pointerUp = () => {
    if (!this.isDown) return
    this.isDown = false
    if (!this.moved) this.onSelect?.(this.active)
    this.snap()
  }
  pointerCancel = () => { this.isDown = false; this.moved = true; this.snap() }
  keyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); this.next() }
    if (event.key === 'ArrowLeft') { event.preventDefault(); this.previous() }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.onSelect?.(this.active) }
  }
  visibilityChange = () => { this.visible = !document.hidden }
  handleContextLost = (event: Event) => { event.preventDefault(); this.contextLost = true }
  handleContextRestored = () => { this.contextLost = true }

  bind() {
    this.container.tabIndex = 0
    this.container.addEventListener('pointerdown', this.pointerDown)
    this.container.addEventListener('pointermove', this.pointerMove)
    this.container.addEventListener('pointerup', this.pointerUp)
    this.container.addEventListener('pointercancel', this.pointerCancel)
    this.container.addEventListener('keydown', this.keyDown)
    document.addEventListener('visibilitychange', this.visibilityChange)
  }

  update = () => {
    if (this.visible && this.intersecting && !this.contextLost) {
      this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.ease)
      const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
      this.medias.forEach((media) => media.update(this.scroll.current, this.scroll.last, direction))
      if (this.medias[0]) this.setActive(Math.round(this.scroll.current / this.medias[0].width))
      const active = this.medias[this.active]
      const overlay = this.overlayRef?.current
      if (active && overlay) {
        const x = active.plane.position.x / this.viewport.width * this.screen.width
        const y = -active.plane.position.y / this.viewport.height * this.screen.height
        overlay.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,0) rotate(${active.plane.rotation.z * 180 / Math.PI}deg)`
      }
      this.renderer.render({ scene: this.scene, camera: this.camera })
      this.scroll.last = this.scroll.current
    }
    this.raf = requestAnimationFrame(this.update)
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    this.resizeObserver?.disconnect(); this.intersectionObserver?.disconnect()
    this.container.removeEventListener('pointerdown', this.pointerDown); this.container.removeEventListener('pointermove', this.pointerMove)
    this.container.removeEventListener('pointerup', this.pointerUp); this.container.removeEventListener('pointercancel', this.pointerCancel)
    this.container.removeEventListener('keydown', this.keyDown); document.removeEventListener('visibilitychange', this.visibilityChange)
    this.gl.canvas.removeEventListener('webglcontextlost', this.handleContextLost as EventListener); this.gl.canvas.removeEventListener('webglcontextrestored', this.handleContextRestored as EventListener)
    this.medias.forEach((media) => media.destroy()); (this.geometry as any)?.remove?.()
    this.gl.getExtension('WEBGL_lose_context')?.loseContext(); this.gl.canvas.remove()
  }
}

export const CircularGallery = forwardRef<CircularGalleryHandle, CircularGalleryProps>(function CircularGallery({ items, bend = 3, borderRadius = .045, scrollSpeed = 2, scrollEase = .075, onIndexChange, onItemSelect, overlayRef, onFallback, className = '', ...props }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<GalleryEngine | null>(null)
  useImperativeHandle(ref, () => ({ next: () => engineRef.current?.next(), previous: () => engineRef.current?.previous(), goTo: (index) => engineRef.current?.goTo(index) }), [])
  useEffect(() => {
    if (!containerRef.current) return
    try {
      const probe = document.createElement('canvas').getContext('webgl')
      if (!probe) { onFallback?.(); return }
      const engine = new GalleryEngine(containerRef.current, items, bend, borderRadius, scrollSpeed, scrollEase, onIndexChange, onItemSelect, overlayRef)
      engineRef.current = engine
      return () => { engine.destroy(); engineRef.current = null }
    } catch {
      onFallback?.()
    }
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, onIndexChange, onItemSelect, overlayRef, onFallback])
  return <div ref={containerRef} className={`circular-gallery ${className}`} {...props} />
})
