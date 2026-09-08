import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, X, SkipForward, GripHorizontal, Move } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  src: string
  poster: string
  year: string
}

const VIDEOS: VideoItem[] = [
  {
    id: 'aftermovie-geral',
    title: 'Aftermovie Oficial',
    year: 'Edição Especial',
    src: '/media/pip/aftermovie-geral.mp4',
    poster: '/media/pip/aftermovie-geral-poster.jpg'
  },
  {
    id: 'alma-2024',
    title: 'ALMA Highlights',
    year: 'Edição 2025',
    src: '/media/pip/alma-2024-reels.mp4',
    poster: '/media/pip/alma-2024-reels-poster.jpg'
  }
]

const MIN_WIDTH = 150
const MAX_WIDTH = 440
const ASPECT_RATIO = 295 / 175 // ~1.6857 (Vertical Reel Format)

export default function PipVideoPlayer() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [width, setWidth] = useState(185)
  const [isResizing, setIsResizing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const resizeStartRef = useRef<{ startX: number; startY: number; startW: number; direction: string }>({
    startX: 0,
    startY: 0,
    startW: 185,
    direction: 'left',
  })

  const height = Math.round(width * ASPECT_RATIO)
  const activeVideo = VIDEOS[currentIdx]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false)
        })
      }
    }
  }, [currentIdx, isMuted])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const nextVideo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIdx((prev) => (prev + 1) % VIDEOS.length)
    setProgress(0)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)
    }
  }

  const handleVideoEnded = () => {
    nextVideo({ stopPropagation: () => {} } as React.MouseEvent)
  }

  // Handle resizing via borders / corners
  const handleResizePointerDown = (e: React.PointerEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: width,
      direction,
    }

    const onPointerMove = (moveEvent: PointerEvent) => {
      const { startX, startW, direction } = resizeStartRef.current
      let delta = 0

      if (direction.includes('left')) {
        // Dragging left edge outwards increases width
        delta = startX - moveEvent.clientX
      } else if (direction.includes('right')) {
        // Dragging right edge outwards increases width
        delta = moveEvent.clientX - startX
      } else if (direction.includes('top')) {
        // Dragging top edge upwards increases height/width
        delta = (startX - moveEvent.clientX + (resizeStartRef.current.startY - moveEvent.clientY)) / 2
      }

      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startW + delta))
      setWidth(Math.round(newWidth))
    }

    const onPointerUp = () => {
      setIsResizing(false)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(true)}
        className="pip-reopen fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-[#143847]/90 px-4 py-2.5 text-xs font-medium text-white shadow-2xl backdrop-blur-md transition-all hover:bg-[#143847] hover:scale-105 cursor-pointer"
        aria-label="Abrir Aftermovies"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b829d] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8fbfce]"></span>
        </span>
        Aftermovies ALMA
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={playerRef}
        drag={!isResizing}
        dragMomentum={false}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          width: isMinimized ? 200 : width,
          height: isMinimized ? 48 : height
        }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: isResizing ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`pip-player fixed z-[80] overflow-hidden rounded-2xl border border-white/20 bg-[#143847] shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl group select-none ${
          isResizing ? 'cursor-ew-resize' : 'cursor-grab active:cursor-grabbing'
        }`}
        style={{
          width: isMinimized ? 200 : width,
          height: isMinimized ? 48 : height,
          touchAction: 'none',
        }}
      >
        {/* Resize Handles (Bordas e Cantos) */}
        {!isMinimized && (
          <>
            {/* Borda Esquerda */}
            <div
              className="pip-resize-handle pip-resize-handle--left"
              onPointerDown={(e) => handleResizePointerDown(e, 'left')}
              title="Arrastar para redimensionar largura"
            />
            {/* Borda Direita */}
            <div
              className="pip-resize-handle pip-resize-handle--right"
              onPointerDown={(e) => handleResizePointerDown(e, 'right')}
              title="Arrastar para redimensionar largura"
            />
            {/* Borda Superior */}
            <div
              className="pip-resize-handle pip-resize-handle--top"
              onPointerDown={(e) => handleResizePointerDown(e, 'top')}
              title="Arrastar para redimensionar"
            />
            {/* Canto Superior Esquerdo */}
            <div
              className="pip-resize-handle pip-resize-handle--top-left"
              onPointerDown={(e) => handleResizePointerDown(e, 'left-top')}
              title="Redimensionar pelo canto"
            >
              <div className="pip-resize-corner-indicator" />
            </div>
            {/* Canto Superior Direito */}
            <div
              className="pip-resize-handle pip-resize-handle--top-right"
              onPointerDown={(e) => handleResizePointerDown(e, 'right-top')}
              title="Redimensionar pelo canto"
            />
          </>
        )}

        {isMinimized ? (
          // Vista minimizada
          <div className="flex h-full w-full items-center justify-between px-3.5 py-2 text-white">
            <div className="flex items-center gap-2 overflow-hidden cursor-pointer" onClick={() => setIsMinimized(false)}>
              <div className="pip-player__mini-brand"><span className="h-2 w-2 rounded-full bg-[#2b829d] animate-pulse shrink-0" /><span>ALMA</span></div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMinimized(false) }} 
                className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Expandir"
              >
                <Maximize2 size={13} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false) }} 
                className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Fechar"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        ) : (
          // Vista Normal / Expandida (Picture in Picture Vertical)
          <div className="relative h-full w-full flex flex-col justify-between">
            {/* Vídeo Tag */}
            <div className="absolute inset-0 z-0 bg-black pointer-events-none">
              <video
                ref={videoRef}
                src={activeVideo.src}
                poster={activeVideo.poster}
                autoPlay
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="pip-player__video"
              />
              {/* Gradientes de contraste */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Barra de Progresso no topo */}
            <div className="relative z-10 w-full bg-white/20 h-1 pointer-events-none">
              <div 
                className="pip-player__track"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Cabeçalho do PiP (Drag Handle Indicator) */}
            <div className="pip-player__header relative z-10 flex items-center justify-between p-3 text-white">
              <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[9px] font-bold tracking-wider text-white/90 uppercase">ALMA</span>
              </div>

              {/* Indicador de Mover */}
              <div className="opacity-0 group-hover:opacity-75 transition-opacity flex items-center gap-1 text-[9px] text-white/70 bg-black/30 px-1.5 py-0.5 rounded">
                <Move size={9} />
                <span>Mover</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(true) }}
                  className="pip-player__edge-button cursor-pointer"
                  aria-label="Minimizar"
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
                  className="rounded-full bg-black/40 p-1.5 text-white/80 hover:bg-black/60 hover:text-white transition-all backdrop-blur-md border border-white/10 cursor-pointer"
                  aria-label="Fechar"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Rodapé e Controles */}
            <div className="pip-player__controls relative z-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={togglePlay}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer"
                  aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer"
                  aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                >
                  {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
              </div>

              <button
                onClick={nextVideo}
                className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md hover:bg-white/30 transition border border-white/10 cursor-pointer"
                aria-label="Próximo vídeo"
              >
                <span>Próximo</span>
                <SkipForward size={11} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
