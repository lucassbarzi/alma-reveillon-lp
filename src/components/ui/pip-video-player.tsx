import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, X, SkipForward, RefreshCw } from 'lucide-react'

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

export default function PipVideoPlayer() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeVideo = VIDEOS[currentIdx]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Fallback se autoplay for bloqueado
          setIsPlaying(false)
        })
      }
    }
  }, [currentIdx, isMuted, isPlaying])

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
    // Loop para o próximo vídeo automaticamente
    setCurrentIdx((prev) => (prev + 1) % VIDEOS.length)
    setProgress(0)
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(true)}
        className="pip-reopen fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-[#143847]/90 px-4 py-2.5 text-xs font-medium text-white shadow-2xl backdrop-blur-md transition-all hover:bg-[#143847] hover:scale-105"
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
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          width: isMinimized ? '190px' : '200px',
          height: isMinimized ? '44px' : '330px'
        }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pip-player fixed bottom-6 right-6 z-[80] overflow-hidden rounded-2xl border border-white/20 bg-[#143847] shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl group"
      >
        {isMinimized ? (
          // Vista minimizada
          <div className="flex h-full w-full items-center justify-between px-3.5 py-2 text-white">
            <div className="flex items-center gap-2 overflow-hidden cursor-pointer" onClick={() => setIsMinimized(false)}>
              <div className="pip-player__mini-brand"><span className="h-2 w-2 rounded-full bg-[#2b829d] animate-pulse shrink-0" /><span>ALMA</span></div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsMinimized(false)} 
                className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Expandir"
              >
                <Maximize2 size={13} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
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
            <div className="absolute inset-0 z-0 bg-black">
              <video
                key={activeVideo.id}
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
            <div className="relative z-10 w-full bg-white/20 h-1">
              <div 
                className="pip-player__track"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Cabeçalho do PiP */}
            <div className="pip-player__header relative z-10 flex items-center justify-between p-3.5 text-white">
              <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="pip-player__edge-button"
                  aria-label="Minimizar"
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-black/40 p-1.5 text-white/80 hover:bg-black/60 hover:text-white transition-all backdrop-blur-md border border-white/10"
                  aria-label="Fechar"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Rodapé e Controles */}
            <div className="pip-player__controls">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                    aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                    aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  </button>
                </div>

                <button
                  onClick={nextVideo}
                  className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md hover:bg-white/30 transition border border-white/10"
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
