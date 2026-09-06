import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import Button from '../ui/Button'
import styles from './BackgroundMusic.module.css'

export const DEFAULT_MUSIC_SRC = '/assets/audio/background-music.mp3'
export const DEFAULT_MUSIC_VOLUME = 0.4

type MusicStatus = 'not-started' | 'playing' | 'paused'

export interface BackgroundMusicHandle {
  start: () => Promise<void>
  toggle: () => Promise<void>
  pause: () => void
}

interface BackgroundMusicProps {
  src?: string
  volume?: number
}

function MusicNoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18V5l10-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  )
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, BackgroundMusicProps>(
  function BackgroundMusic(
    { src = DEFAULT_MUSIC_SRC, volume = DEFAULT_MUSIC_VOLUME },
    ref,
  ) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const hasStartedRef = useRef(false)
    const [status, setStatus] = useState<MusicStatus>('not-started')

    useEffect(() => {
      const audio = audioRef.current
      if (!audio) return

      audio.volume = Math.min(Math.max(volume, 0), 1)
      audio.loop = true

      const handlePlay = () => setStatus('playing')
      const handlePause = () => setStatus((current) => (
        current === 'not-started' ? current : 'paused'
      ))
      const handleError = () => {
        if (!hasStartedRef.current) return
        setStatus('paused')
        console.warn(`Unable to load background music: ${src}`)
      }

      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('error', handleError)

      return () => {
        audio.pause()
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('error', handleError)
      }
    }, [src, volume])

    const start = useCallback(async () => {
      const audio = audioRef.current
      if (!audio || status === 'playing') return

      hasStartedRef.current = true
      try {
        await audio.play()
      } catch (error) {
        setStatus('paused')
        console.warn('Unable to play background music:', error)
      }
    }, [status])

    const pause = useCallback(() => {
      audioRef.current?.pause()
    }, [])

    const toggle = useCallback(async () => {
      if (status === 'playing') {
        pause()
        return
      }

      await start()
    }, [pause, start, status])

    useImperativeHandle(ref, () => ({ start, toggle, pause }), [pause, start, toggle])

    return (
      <>
        <audio ref={audioRef} src={src} preload="metadata" />
        {status !== 'not-started' && (
          <Button
            variant="ghost"
            size="sm"
            className={styles.control}
            onClick={() => void toggle()}
            aria-label={status === 'playing' ? 'Pause background music' : 'Play background music'}
            title={status === 'playing' ? 'Pause background music' : 'Play background music'}
            icon={<MusicNoteIcon />}
          >
            <span className={styles.srOnly}>
              {status === 'playing' ? 'Pause background music' : 'Play background music'}
            </span>
          </Button>
        )}
      </>
    )
  },
)

export default BackgroundMusic
