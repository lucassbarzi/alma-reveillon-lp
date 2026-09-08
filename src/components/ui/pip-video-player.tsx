import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, X, SkipForward, Move } from 'lucide-react'

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
  const resizeStartRef = useRef<{ startX: number; startW: number; direction: string }>({
    startX: 0,
    startW: 185,
    direction: 'right',
  })

  const height = isMinimized ? 48 : Math.round(width * ASPECT_RATIO)
  const activeVideo = VIDEOS[currentIdx]

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

  // Resize via left / right border drag
  const handleResizePointerDown = (e: React.PointerEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStartRef.current = { startX: e.clientX, startW: width, direction }

    const onPointerMove = (ev: PointerEvent) => {
      const { startX, startW, direction: dir } = resizeStartRef.current
      const delta = dir === 'left' ? startX - ev.clientX : ev.clientX - startX
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

  // ─── Closed state ─────────────────────────────────────────────────────────
  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(true)}
        className="pip-reopen fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-[#143847]/90 px-4 py-2.5 text-xs font-medium text-white shadow-2xl backdrop-blur-md transition-all hover:bg-[#143847] hover:scale-105 cursor-pointer"
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
      {/*
        ── OUTER LAYER ──────────────────────────────────────────────────────────
        This motion.div is draggable. It is transparent (no border, no bg).
        The resize handles live here so they never get clipped by overflow:hidden.
        Its size matches the inner card exactly so drag works correctly.
      */}
      <motion.div
        drag={!isResizing}
        dragMomentum={false}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed z-[80] select-none group ${isResizing ? 'cursor-ew-resize' : 'cursor-grab active:cursor-grabbing'}`}
        style={{
          right: 24,
          bottom: 24,
          width: width,
          height: height,
          touchAction: 'none',
        }}
      >
        {/* Left resize handle */}
        {!isMinimized && (
          <div
            className="absolute top-2 bottom-2 left-0 w-3 z-10 cursor-ew-resize"
            style={{ transform: 'translateX(-4px)' }}
            onPointerDown={(e) => handleResizePointerDown(e, 'left')}
          />
        )}
        {/* Right resize handle */}
        {!isMinimized && (
          <div
            className="absolute top-2 bottom-2 right-0 w-3 z-10 cursor-ew-resize"
            style={{ transform: 'translateX(4px)' }}
            onPointerDown={(e) => handleResizePointerDown(e, 'right')}
          />
        )}

        {/*
          ── INNER CARD ───────────────────────────────────────────────────────
          This div is the visible card. overflow:hidden + border-radius here
          ensure the video is properly clipped to the rounded corners.
        */}
        <div
          className="w-full h-full overflow-hidden"
          style={{
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.2)',
            background: '#143847',
            boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
            color: '#fff',
          }}
        >
          {isMinimized ? (
            // ── Minimized bar ────────────────────────────────────────────────
            <div className="flex h-full w-full items-center justify-between px-3.5 py-2 text-white">
              <div
                className="flex items-center gap-2 overflow-hidden cursor-pointer"
                onClick={() => setIsMinimized(false)}
              >
                <div className="pip-player__mini-brand">
                  <span className="h-2 w-2 rounded-full bg-[#2b829d] animate-pulse shrink-0" />
                  <span>ALMA</span>
                </div>
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
            // ── Full player ──────────────────────────────────────────────────
            <div className="relative h-full w-full flex flex-col">

              {/* Video layer — fills entire card, sits behind everything */}
              <div className="absolute inset-0 bg-black">
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
                  style={{ pointerEvents: 'none' }}
                />
                {/* Top gradient for header legibility */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
                {/* Bottom gradient for controls legibility */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
              </div>

              {/* Progress bar — top of card */}
              <div className="relative z-10 w-full bg-white/20 h-1 shrink-0">
                <div className="pip-player__track" style={{ width: `${progress}%` }} />
              </div>

              {/* Header */}
              <div className="pip-player__header relative z-10 flex items-center justify-between p-3 text-white shrink-0">
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[9px] font-bold tracking-wider text-white/90 uppercase">ALMA</span>
                </div>

                {/* Move hint */}
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

              {/* Spacer pushes controls to the bottom */}
              <div className="flex-1" />

              {/* Controls — always at bottom, above video via z-index */}
              <div
                className="pip-player__controls relative z-10 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
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
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
