import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, SkipForward, Volume2, VolumeX, X, Minimize2, Maximize2 } from 'lucide-react'

const BASE = import.meta.env.BASE_URL
const VIDEOS = [
  { id: 'aftermovie-geral', title: 'Aftermovie Oficial', year: 'Edição Especial', src: `${BASE}media/pip/aftermovie-geral.mp4`, poster: `${BASE}media/pip/aftermovie-geral-poster.jpg` },
  { id: 'alma-2024', title: 'ALMA Highlights', year: 'Edição 2025', src: `${BASE}media/pip/alma-2024-reels.mp4`, poster: `${BASE}media/pip/alma-2024-reels-poster.jpg` },
]

interface PipVideoPlayerProps {
  closeOnTrigger?: boolean
}

export default function PipVideoPlayer({ closeOnTrigger }: PipVideoPlayerProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(true)
  const [minimized, setMinimized] = useState(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const video = VIDEOS[index]

  useEffect(() => {
    if (closeOnTrigger) {
      setOpen(false)
    }
  }, [closeOnTrigger])

  useEffect(() => {
    const element = videoRef.current
    if (!element) return
    element.muted = muted
    if (playing) element.play().catch(() => setPlaying(false))
  }, [index, muted, playing])

  const next = () => {
    setIndex((value) => (value + 1) % VIDEOS.length)
    setProgress(0)
  }

  const togglePlay = () => {
    const element = videoRef.current
    if (!element) return
    if (element.paused) { element.play().then(() => setPlaying(true)).catch(() => setPlaying(false)) }
    else { element.pause(); setPlaying(false) }
  }

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.div
          key="pip-card"
          className={`pip-card ${minimized ? 'pip-card--minimized' : ''}`}
          initial={{ opacity: 0, scale: 0.86, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: 32, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'bottom right' }}
        >
          {minimized ? (
            <div className="pip-mini">
              <button className="pip-mini__title" onClick={() => setMinimized(false)}><span>●</span> ALMA</button>
              <div className="pip-mini__actions">
                <button onClick={() => setMinimized(false)} aria-label="Expandir"><Maximize2 size={13} /></button>
                <button onClick={() => setOpen(false)} aria-label="Fechar"><X size={13} /></button>
              </div>
            </div>
          ) : (
            <div className="pip-frame">
              <video
                ref={videoRef}
                src={video.src}
                poster={video.poster}
                autoPlay
                muted={muted}
                playsInline
                onEnded={next}
                onTimeUpdate={() => {
                  if (videoRef.current?.duration) setProgress(videoRef.current.currentTime / videoRef.current.duration * 100)
                }}
              />
              <div className="pip-shade pip-shade--top" />
              <div className="pip-shade pip-shade--bottom" />
              <div className="pip-progress"><span style={{ width: `${progress}%` }} /></div>
              <div className="pip-header">
                <span className="pip-badge"><i /> RECAP</span>
                <div><button onClick={() => setMinimized(true)} aria-label="Minimizar"><Minimize2 size={13} /></button><button onClick={() => setOpen(false)} aria-label="Fechar"><X size={13} /></button></div>
              </div>
              <div className="pip-footer">
                <div className="pip-info"><small>{video.year}</small><strong>{video.title}</strong></div>
                <div className="pip-controls">
                  <div><button onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Reproduzir'}>{playing ? <Pause size={13} /> : <Play size={13} />}</button><button onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Ativar som' : 'Desativar som'}>{muted ? <VolumeX size={13} /> : <Volume2 size={13} />}</button></div>
                  <button className="pip-next" onClick={next} aria-label="Próximo vídeo">Próximo <SkipForward size={11} /></button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.button
          key="pip-reopen"
          className="pip-reopen"
          onClick={() => setOpen(true)}
          aria-label="Abrir Aftermovies"
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          ● &nbsp; Aftermovies ALMA
        </motion.button>
      )}
    </AnimatePresence>
  )
}
