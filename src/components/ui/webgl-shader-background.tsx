import { useEffect, useRef } from 'react'

type Variant = 'silk' | 'mesh' | 'fluted'

const vertex = `attribute vec2 a_position; void main(){gl_Position=vec4(a_position,0.,1.);}`

const fragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_mode;
uniform vec3 u_colors[4];

float hash21(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}
float grainHash(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),u.x),mix(hash21(i+vec2(0.,1.)),hash21(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(17.,9.2);a*=.5;}return v;}
vec3 palette(float x){x=clamp(x,0.,1.)*3.;vec3 c=u_colors[0];c=mix(c,u_colors[1],smoothstep(0.,1.,x));c=mix(c,u_colors[2],smoothstep(1.,2.,x));return mix(c,u_colors[3],smoothstep(2.,3.,x));}
vec3 silk(vec2 p,float t){vec2 q=p*1.16;for(float i=1.;i<5.;i++){q.x+=.54/i*cos(i*2.4*q.y+t*.8);q.y+=.54/i*cos(i*1.7*q.x+t*.6);}return palette(.5+.5*sin(q.x+q.y));}
vec3 mesh(vec2 p,float t){vec3 acc=u_colors[0]*.15;float total=.15;for(int i=0;i<4;i++){float fi=float(i);vec2 c=vec2(sin(t*(.21+fi*.071)+fi*2.4+5069.),cos(t*(.17+fi*.093)+fi*1.7))*.646;float w=exp(-dot(p-c,p-c)*6.);acc+=u_colors[i]*w;total+=w;}return acc/total;}
vec3 fluted(vec2 p,float t){float cell=fract((p.x+1.)*19.)-.5;float prism=sin(cell*3.14159)*.10;vec2 sp=p+vec2(prism,sin(p.x*19.+t*.2)*prism*.35);float field=fbm(sp*2.2+vec2(t*.035,-t*.025));float hi=pow(1.-abs(cell)*2.,4.);return palette(clamp(field+hi*.3,0.,1.))*(.72+hi*.42);}
void main(){vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec2 p=(gl_FragCoord.xy-.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);float t=u_time;vec3 col=u_mode<.5?silk(p,t):u_mode<1.5?mesh(p,t):fluted(p,t);float contrast=u_mode<.5?1.16:(u_mode<1.5?1.17:1.);float bright=u_mode<.5?-.18:0.;col=(col-.5)*contrast+.5+bright;float vignette=u_mode<.5?.55:(u_mode<1.5?.15:0.);float v=length(uv-.5)*1.414;col*=1.-vignette*smoothstep(.35,1.,v);float grain=u_mode<.5?.06:(u_mode<1.5?.10:.04);col+=(grainHash(gl_FragCoord.xy+vec2(17.,31.))-.5)*grain;gl_FragColor=vec4(clamp(col,0.,1.),1.);}`

const COLORS: Record<Variant, [number, number, number][]> = {
  silk: [[0,0,0],[.122,.318,1],[0,.898,1],[.918,.992,1]],
  mesh: [[1,1,1],[.961,.961,.961],[.106,.416,.655],[.341,.824,.957]],
  fluted: [[.027,.102,.141],[.082,.369,.459],[0,1,.851],[.941,.992,.980]],
}

export default function WebGLShaderBackground({ variant, className = '' }: { variant: Variant; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' })
    if (!canvas || !gl) return
    const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); return shader }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program); gl.useProgram(program)
    const buffer = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    const resolution = gl.getUniformLocation(program, 'u_resolution'); const time = gl.getUniformLocation(program, 'u_time'); const mode = gl.getUniformLocation(program, 'u_mode'); const colors = gl.getUniformLocation(program, 'u_colors[0]')
    const palette = COLORS[variant].flat(); gl.uniform3fv(colors, palette); gl.uniform1f(mode, variant === 'silk' ? 0 : variant === 'mesh' ? 1 : 2)
    let frame = 0; let started = performance.now(); let visible = !document.hidden
    const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 2); const rect = canvas.getBoundingClientRect(); canvas.width = Math.max(1, Math.round(rect.width*dpr)); canvas.height = Math.max(1, Math.round(rect.height*dpr)); gl.viewport(0,0,canvas.width,canvas.height); gl.uniform2f(resolution,canvas.width,canvas.height) }
    const render = (now: number) => { if (visible) { gl.uniform1f(time, (now-started)/1000*(variant === 'mesh' ? -1.37 : variant === 'silk' ? .21 : .57)); gl.drawArrays(gl.TRIANGLES,0,3) } frame=requestAnimationFrame(render) }
    const onVisibility = () => { visible = !document.hidden; if (visible) started = performance.now() }
    resize(); window.addEventListener('resize', resize); document.addEventListener('visibilitychange', onVisibility); frame=requestAnimationFrame(render)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVisibility); gl.deleteProgram(program); gl.deleteBuffer(buffer) }
  }, [variant])
  return <canvas ref={canvasRef} aria-hidden="true" className={`shader-bg ${className}`} />
}
