import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Playlist = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`

const PlaylistButton = styled.button`
  padding: 0.55rem 0.8rem;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(96, 165, 250, 0.7)' : 'rgba(148, 163, 184, 0.3)')};
  background: ${({ $active }) => ($active ? 'rgba(37, 99, 235, 0.12)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#dbeafe' : '#cbd5f5')};
  font-size: 0.85rem;
  cursor: pointer;
  transition: border 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(96, 165, 250, 0.6);
  }
`

const PlaylistLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(148, 163, 184, 0.85);
`

export function AudioPlayer({ audioResult, playbackRate = 1 }) {
  const audioRef = useRef(null)
  const [currentTrack, setCurrentTrack] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (audioResult?.url && audio) {
      audio.playbackRate = playbackRate
      audio.load()
      audio.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Audio playback failed:', err)
        }
      })
    }

    return () => {
      if (audio) {
        audio.pause()
      }
    }
  }, [audioResult, playbackRate])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  const handleEnded = () => {
    if (audioResult && !audioResult.isConcatenated && audioResult.chunks) {
      const nextTrack = currentTrack + 1
      if (nextTrack < audioResult.chunks.length) {
        setCurrentTrack(nextTrack)
      } else {
        setCurrentTrack(0)
      }
    }
  }

  const handleTrackChange = (index) => {
    setCurrentTrack(index)
  }

  if (!audioResult) return null

  const currentUrl = audioResult.isConcatenated
    ? audioResult.url
    : audioResult.chunks[currentTrack]

  const showPlaylist = !audioResult.isConcatenated && audioResult.chunks.length > 1

  return (
    <Wrapper>
      <audio
        ref={audioRef}
        controls
        src={currentUrl}
        onEnded={handleEnded}
        style={{ width: '100%' }}
      />

      {showPlaylist && (
        <>
          <PlaylistLabel>Audio chunks ({audioResult.chunks.length})</PlaylistLabel>
          <Playlist>
            {audioResult.chunks.map((_, index) => {
              const active = index === currentTrack
              return (
                <PlaylistButton key={index} $active={active} onClick={() => handleTrackChange(index)}>
                  Chunk {index + 1}
                </PlaylistButton>
              )
            })}
          </Playlist>
        </>
      )}
    </Wrapper>
  )
}
