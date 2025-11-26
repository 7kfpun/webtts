import { piperGenerate } from 'piper-wasm'
import { HF_BASE, PIPER_PATHS } from '../config/constants'
import { chunkText } from '../utils/textProcessing'
import { concatenateAudioChunks } from '../utils/audioProcessing'
import { getModelPaths } from './voiceService'

export async function generateSpeech(text, voice, onProgress, onChunkUpdate) {
  const chunks = chunkText(text)
  console.info('[TTS] Starting generation', {
    textLength: text?.length || 0,
    chunkCount: chunks.length,
    chunkLengths: chunks.map(chunk => chunk.length)
  })
  const audioChunks = []
  const { modelPath, configPath } = getModelPaths(voice)

  for (let i = 0; i < chunks.length; i++) {
    onChunkUpdate?.(i + 1, chunks.length)
    const chunkText = chunks[i]
    console.debug('[TTS] Processing chunk', {
      index: i + 1,
      total: chunks.length,
      length: chunkText.length
    })

    let result
    try {
      result = await piperGenerate(
        PIPER_PATHS.phonemizeJs,
        PIPER_PATHS.phonemizeWasm,
        PIPER_PATHS.phonemizeData,
        PIPER_PATHS.worker,
        HF_BASE + modelPath,
        HF_BASE + configPath,
        null,
        chunkText,
        (p) => {
          const chunkProgress = (i / chunks.length) * 100 + (p / chunks.length)
          onProgress?.(chunkProgress)
        },
        null,
        false,
        PIPER_PATHS.dist
      )
      console.log('[TTS] ONNX Path:', PIPER_PATHS.dist)
    } catch (error) {
      console.error('[TTS] Piper generation failed', {
        chunk: i + 1,
        length: chunkText.length
      }, error)
      throw error
    }

    if (!result || !result.file) {
      throw new Error(`Failed to generate audio for chunk ${i + 1}`)
    }

    audioChunks.push(result.file)
  }

  console.info('[TTS] Completed generation', {
    chunks: audioChunks.length
  })
  onProgress?.(100)

  if (audioChunks.length === 0) {
    throw new Error('No audio generated')
  }

  try {
    const concatenatedUrl = await concatenateAudioChunks(audioChunks)
    return {
      url: concatenatedUrl,
      chunks: audioChunks,
      isConcatenated: true
    }
  } catch (error) {
    console.warn('Failed to concatenate audio chunks, returning playlist:', error)
    return {
      url: audioChunks[0],
      chunks: audioChunks,
      isConcatenated: false
    }
  }
}
