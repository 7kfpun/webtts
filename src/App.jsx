import { useEffect, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Download, Loader2, Volume2, Waves } from 'lucide-react'
import { useAppStore } from './store/useAppStore'
import { useLanguageDetection } from './hooks/useLanguageDetection'
import { VoiceSelector } from './components/VoiceSelector'
import { ProgressBar } from './components/ProgressBar'
import { AudioPlayer } from './components/AudioPlayer'
import { ErrorMessage } from './components/ErrorMessage'
import { TextStats } from './components/TextStats'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'

const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(15, 23, 42, 0.85), #030712 68%);
  padding: 2rem 1rem 4rem;
`

const Shell = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`

const Hero = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0 0.5rem;
`

const Title = styled.h1`
  margin: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(2.4rem, 4vw, 3.9rem);
  letter-spacing: 0.13em;
  color: #f8fafc;
  text-transform: uppercase;
`

const Subtitle = styled.p`
  color: #cbd5f5;
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.6;
`

const MainGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 3fr) minmax(260px, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const VoiceInfo = styled.div`
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.45);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;
  color: #cbd5f5;
`

const Pulse = keyframes`
  from { opacity: 0.4; }
  to { opacity: 1; }
`

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 0;
  color: #a5b4fc;
  animation: ${Pulse} 1s ease-in-out infinite alternate;
`

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`

const SpeedControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
`

const SpeedLabel = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: #94a3b8;
`

const SpeedValue = styled.span`
  font-weight: 600;
  color: #f8fafc;
`

const SpeedSlider = styled.input`
  flex: 1;
  appearance: none;
  height: 4px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.3);

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #60a5fa;
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.25);
  }
`

const FooterNote = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
`

const IconSpin = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

function App() {
  const text = useAppStore((state) => state.text)
  const setText = useAppStore((state) => state.setText)
  const languages = useAppStore((state) => state.languages)
  const selectedLanguage = useAppStore((state) => state.selectedLanguage)
  const availableVoices = useAppStore((state) => state.availableVoices)
  const selectedVoice = useAppStore((state) => state.selectedVoice)
  const downloadedModels = useAppStore((state) => state.downloadedModels)
  const voiceLoading = useAppStore((state) => state.voiceLoading)
  const voiceError = useAppStore((state) => state.voiceError)
  const voices = useAppStore((state) => state.voices)
  const downloadProgress = useAppStore((state) => state.downloadProgress)
  const downloading = useAppStore((state) => state.downloading)
  const downloadError = useAppStore((state) => state.downloadError)
  const generating = useAppStore((state) => state.generating)
  const generateProgress = useAppStore((state) => state.generateProgress)
  const currentChunk = useAppStore((state) => state.currentChunk)
  const totalChunks = useAppStore((state) => state.totalChunks)
  const audioResult = useAppStore((state) => state.audioResult)
  const ttsError = useAppStore((state) => state.ttsError)
  const initVoices = useAppStore((state) => state.initVoices)
  const changeLanguage = useAppStore((state) => state.changeLanguage)
  const changeVoice = useAppStore((state) => state.changeVoice)
  const verifyModelCache = useAppStore((state) => state.verifyModelCache)
  const downloadSelectedVoice = useAppStore((state) => state.downloadSelectedVoice)
  const generateAudio = useAppStore((state) => state.generateAudio)
  const clearErrors = useAppStore((state) => state.clearErrors)
  const playbackRate = useAppStore((state) => state.playbackRate)
  const setPlaybackRate = useAppStore((state) => state.setPlaybackRate)

  useEffect(() => {
    initVoices()
  }, [initVoices])

  useEffect(() => {
    if (selectedVoice) {
      verifyModelCache(selectedVoice)
    }
  }, [selectedVoice, verifyModelCache])

  const voice = selectedVoice ? voices[selectedVoice] : null
  const modelSizeMB = useMemo(() => {
    if (!voice?.files) return null
    const entry = Object.entries(voice.files).find(([name]) => name.endsWith('.onnx'))
    const bytes = entry?.[1]?.size_bytes
    return bytes ? bytes / (1024 * 1024) : null
  }, [voice])

  const isModelDownloaded = selectedVoice ? downloadedModels.has(selectedVoice) : false
  const readyToSpeak = Boolean(text.trim() && selectedVoice)

  const handleDownload = async () => {
    await downloadSelectedVoice()
  }

  const handleSpeak = async () => {
    if (!readyToSpeak) return
    if (!isModelDownloaded) {
      const ok = await downloadSelectedVoice()
      if (!ok) return
    }
    await generateAudio()
  }

  const { detectedLanguageName, unsupportedLanguage } = useLanguageDetection(
    text,
    languages,
    selectedLanguage,
    changeLanguage
  )

  const aggregatedError = voiceError || downloadError || ttsError

  return (
    <Page>
      <Shell>
        <Hero>
          <Title>Web-TTS</Title>
          <Subtitle>
            Web-TTS crafts natural narrations directly in your browser with AI-powered voices inspired by large language model workflows. Track progress in
            real time, auto-detect languages, and keep every model ready for offline sessions.
          </Subtitle>
        </Hero>

        {voiceLoading ? (
          <LoadingState>
            <Waves size={34} /> Loading voices
          </LoadingState>
        ) : (
          <>
            <MainGrid>
              <Card>
                <CardHeader>
                  <CardTitle>Your text</CardTitle>
                  <p>Paste an article or script, tweak it, and render speech without leaving this editor.</p>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste the narration you'd like to hear..."
                    disabled={generating}
                  />
                  <TextStats text={text} detectedLanguage={detectedLanguageName} />
                  <SpeedControl>
                    <SpeedLabel>Playback Speed</SpeedLabel>
                    <SpeedSlider
                      type="range"
                      min="0.8"
                      max="1.4"
                      step="0.05"
                      value={playbackRate}
                      onChange={(e) => setPlaybackRate(Number(e.target.value))}
                      disabled={generating}
                    />
                    <SpeedValue>{playbackRate.toFixed(2)}x</SpeedValue>
                  </SpeedControl>
                  <Actions>
                    <Button onClick={handleSpeak} disabled={!readyToSpeak || generating} size="lg">
                      {generating ? <IconSpin size={20} /> : <Volume2 size={20} />}
                      {generating
                        ? totalChunks > 1
                          ? `Generating ${currentChunk}/${totalChunks}`
                          : 'Generating audio'
                        : isModelDownloaded
                        ? 'Speak'
                        : 'Download & Speak'}
                    </Button>
                    {generating && (
                      <ProgressBar
                        progress={generateProgress}
                        label={totalChunks > 1 ? `Chunk ${currentChunk} of ${totalChunks}` : 'Synthesizing'}
                      />
                    )}
                  </Actions>
                </CardContent>
              </Card>

              <SideColumn>
                <Card>
                  <CardHeader>
                    <CardTitle>Voice</CardTitle>
                    <p>Pick a language and voice. Cached voices stay ready even when offline.</p>
                  </CardHeader>
                  <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <VoiceSelector
                      languages={languages}
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={changeLanguage}
                      availableVoices={availableVoices}
                      selectedVoice={selectedVoice}
                      onVoiceChange={changeVoice}
                      downloadedModels={downloadedModels}
                      disabled={generating}
                    />

                    {voice && (
                      <VoiceInfo>
                        <strong>{voice.name}</strong>
                        <span>Quality: {voice.quality}</span>
                        <span>Language: {voice.language?.name_english}</span>
                        {modelSizeMB && <span>Model size: {modelSizeMB.toFixed(1)} MB</span>}
                      </VoiceInfo>
                    )}

                    {selectedVoice && (
                      <Actions>
                        <Button onClick={handleDownload} disabled={downloading || isModelDownloaded} variant="secondary">
                          {downloading ? <IconSpin size={18} /> : <Download size={18} />}
                          {downloading
                            ? 'Downloading voice...'
                            : isModelDownloaded
                            ? 'Voice cached'
                            : 'Download voice'}
                        </Button>
                        {downloading && <ProgressBar progress={downloadProgress} />}
                      </Actions>
                    )}
                  </CardContent>
                </Card>

                {unsupportedLanguage && (
                  <Alert>
                    <AlertTitle>Language not supported</AlertTitle>
                    <AlertDescription>
                      Detected language ({unsupportedLanguage}) is not available. Please select a language manually.
                    </AlertDescription>
                  </Alert>
                )}
              </SideColumn>
            </MainGrid>

            <ErrorMessage message={aggregatedError} onDismiss={clearErrors} />

            {audioResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Audio</CardTitle>
                </CardHeader>
                <CardContent>
                  <AudioPlayer key={audioResult.url} audioResult={audioResult} playbackRate={playbackRate} />
                </CardContent>
              </Card>
            )}
          </>
        )}
        <FooterNote>On-Device AI • Privacy-First LLM • Zero Subscriptions</FooterNote>
      </Shell>
    </Page>
  )
}

export default App
