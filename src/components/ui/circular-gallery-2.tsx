import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, type OGLRenderingContext } from 'ogl'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

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
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const wrap = (value: number, total: number) => ((value % total) + total) % total

const vertex = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpeed;
varying vec2 vUv;
void main(){vUv=uv;vec3 p=position;p.z=(sin(p.x*4.0+uTime)*1.15+cos(p.y*2.0+uTime)*1.15)*(0.055+min(abs(uSpeed),1.0)*0.16);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`

const fragment = `
precision highp float;
uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform float uBorderRadius;
uniform float uShade;
varying vec2 vUv;
float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}
void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);float alpha=1.0-smoothstep(-0.003,0.003,d);color.rgb*=1.0-uShade;gl_FragColor=vec4(color.rgb,alpha);}`

class Media {
  plane!: Mesh
  program!: Program
  texture!: Texture
  extra = 0
  width = 0
  widthTotal = 0
  x = 0
  constructor(private gl: OGLRenderingContext, private geometry: Plane, private image: string, private index: number, private length: number, private scene: Transform, private screen: {width:number;height:number}, private viewport: {width:number;height:number}, private bend: number, private borderRadius: number) { this.create(); this.resize() }
  create(){
    this.texture=new Texture(this.gl,{generateMipmaps:false})
    this.program=new Program(this.gl,{depthTest:false,depthWrite:false,vertex,fragment,uniforms:{tMap:{value:this.texture},uPlaneSizes:{value:[0,0]},uImageSizes:{value:[1,1]},uSpeed:{value:0},uTime:{value:Math.random()*100},uBorderRadius:{value:this.borderRadius},uShade:{value:.5}},transparent:true})
    const img=new Image();img.decoding='async';img.src=this.image;img.onload=()=>{this.texture.image=img;this.program.uniforms.uImageSizes.value=[img.naturalWidth,img.naturalHeight]}
    this.plane=new Mesh(this.gl,{geometry:this.geometry,program:this.program});this.plane.setParent(this.scene)
  }
  resize(screen=this.screen,viewport=this.viewport){this.screen=screen;this.viewport=viewport;const mobile=screen.width<640;const pw=mobile?Math.min(screen.width*.76,310):Math.min(screen.width*.25,350);const ph=mobile?Math.min(screen.height*.70,430):Math.min(screen.height*.76,500);this.plane.scale.x=viewport.width*pw/screen.width;this.plane.scale.y=viewport.height*ph/screen.height;this.program.uniforms.uPlaneSizes.value=[this.plane.scale.x,this.plane.scale.y];const gap=viewport.width*(mobile?26:48)/screen.width;this.width=this.plane.scale.x+gap;this.widthTotal=this.width*this.length;this.x=this.width*this.index}
  update(current:number,last:number,direction:'left'|'right'){
    this.plane.position.x=this.x-current-this.extra;const x=this.plane.position.x,H=this.viewport.width/2,B=Math.abs(this.bend);if(B>.001){const R=(H*H+B*B)/(2*B),effective=Math.min(Math.abs(x),H),arc=R-Math.sqrt(Math.max(0,R*R-effective*effective));this.plane.position.y=this.bend>0?-arc:arc;this.plane.rotation.z=(this.bend>0?-1:1)*Math.sign(x)*Math.asin(Math.min(1,effective/R))}else{this.plane.position.y=0;this.plane.rotation.z=0}const speed=current-last;this.program.uniforms.uTime.value+=.025;this.program.uniforms.uSpeed.value=speed;this.program.uniforms.uShade.value=Math.min(.67,Math.abs(x/this.width)*.2);const half=this.plane.scale.x/2,edge=this.viewport.width/2;if(direction==='right'&&this.plane.position.x+half<-edge)this.extra-=this.widthTotal;if(direction==='left'&&this.plane.position.x-half>edge)this.extra+=this.widthTotal
  }
}

class GalleryEngine {
  renderer:Renderer;gl:OGLRenderingContext;camera:Camera;scene:Transform;geometry:Plane;medias:Media[]=[];raf=0;screen={width:1,height:1};viewport={width:1,height:1};scroll={current:0,target:0,last:0};isDown=false;startX=0;startTarget=0;moved=false;active=0;visible=true;resizeObserver:ResizeObserver
  constructor(private container:HTMLElement,private items:CircularGalleryItem[],private bend:number,private radius:number,private speed:number,private ease:number,private onIndex?:(i:number)=>void,private onSelect?:(i:number)=>void){const mobile=innerWidth<780;this.renderer=new Renderer({alpha:true,antialias:!mobile,dpr:mobile?1:Math.min(devicePixelRatio||1,1.5)});this.gl=this.renderer.gl;this.gl.clearColor(0,0,0,0);container.appendChild(this.gl.canvas);this.camera=new Camera(this.gl);this.camera.fov=45;this.camera.position.z=20;this.scene=new Transform();this.geometry=new Plane(this.gl,{widthSegments:mobile?24:48,heightSegments:mobile?16:32});this.resize();this.medias=items.map((item,i)=>new Media(this.gl,this.geometry,item.image,i,items.length,this.scene,this.screen,this.viewport,bend,radius));this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(container);this.bind();this.update(performance.now())}
  resize(){this.screen={width:Math.max(1,this.container.clientWidth),height:Math.max(1,this.container.clientHeight)};this.renderer.setSize(this.screen.width,this.screen.height);this.camera.perspective({aspect:this.screen.width/this.screen.height});const fov=this.camera.fov*Math.PI/180,height=2*Math.tan(fov/2)*this.camera.position.z;this.viewport={width:height*this.camera.aspect,height};this.medias.forEach(m=>m.resize(this.screen,this.viewport))}
  snap(){if(!this.medias[0])return;const width=this.medias[0].width;this.scroll.target=Math.round(this.scroll.target/width)*width;const next=wrap(Math.round(this.scroll.target/width),this.items.length);if(next!==this.active){this.active=next;this.onIndex?.(next)}}
  next(){if(!this.medias[0])return;this.scroll.target+=this.medias[0].width;this.snap()}
  previous(){if(!this.medias[0])return;this.scroll.target-=this.medias[0].width;this.snap()}
  goTo(index:number){if(!this.medias[0])return;let delta=index-this.active;if(delta>this.items.length/2)delta-=this.items.length;if(delta<-this.items.length/2)delta+=this.items.length;this.scroll.target+=delta*this.medias[0].width;this.snap()}
  pointerDown=(e:PointerEvent)=>{this.isDown=true;this.moved=false;this.startX=e.clientX;this.startTarget=this.scroll.target;this.container.setPointerCapture?.(e.pointerId)}
  pointerMove=(e:PointerEvent)=>{if(!this.isDown)return;const distance=this.startX-e.clientX;if(Math.abs(distance)>7)this.moved=true;this.scroll.target=this.startTarget+distance*(this.speed*.018)}
  pointerUp=()=>{if(!this.isDown)return;this.isDown=false;if(!this.moved)this.onSelect?.(this.active);this.snap()}
  visibility=()=>{this.visible=!document.hidden}
  bind(){this.container.addEventListener('pointerdown',this.pointerDown);this.container.addEventListener('pointermove',this.pointerMove);this.container.addEventListener('pointerup',this.pointerUp);this.container.addEventListener('pointercancel',this.pointerUp);document.addEventListener('visibilitychange',this.visibility)}
  update=(now:number)=>{if(this.visible){this.scroll.current=lerp(this.scroll.current,this.scroll.target,this.ease);const direction=this.scroll.current>this.scroll.last?'right':'left';this.medias.forEach(m=>m.update(this.scroll.current,this.scroll.last,direction));this.renderer.render({scene:this.scene,camera:this.camera});this.scroll.last=this.scroll.current}this.raf=requestAnimationFrame(this.update)}
  destroy(){cancelAnimationFrame(this.raf);this.resizeObserver.disconnect();this.container.removeEventListener('pointerdown',this.pointerDown);this.container.removeEventListener('pointermove',this.pointerMove);this.container.removeEventListener('pointerup',this.pointerUp);this.container.removeEventListener('pointercancel',this.pointerUp);document.removeEventListener('visibilitychange',this.visibility);this.gl.canvas.remove()}
}

export const CircularGallery = forwardRef<CircularGalleryHandle,CircularGalleryProps>(function CircularGallery({items,bend=3,borderRadius=.045,scrollSpeed=2,scrollEase=.075,onIndexChange,onItemSelect,className='',...props},ref){const containerRef=useRef<HTMLDivElement>(null);const engineRef=useRef<GalleryEngine|null>(null);useImperativeHandle(ref,()=>({next:()=>engineRef.current?.next(),previous:()=>engineRef.current?.previous(),goTo:(i)=>engineRef.current?.goTo(i)}),[]);useEffect(()=>{if(!containerRef.current)return;const engine=new GalleryEngine(containerRef.current,items,bend,borderRadius,scrollSpeed,scrollEase,onIndexChange,onItemSelect);engineRef.current=engine;return()=>{engine.destroy();engineRef.current=null}},[items,bend,borderRadius,scrollSpeed,scrollEase,onIndexChange,onItemSelect]);return <div ref={containerRef} className={`circular-gallery ${className}`} {...props}/>})
