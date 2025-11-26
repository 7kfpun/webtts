import { VOICES_JSON_URL, QUALITY_ORDER } from '../config/constants'

export async function fetchVoices() {
  const response = await fetch(VOICES_JSON_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch voices from HuggingFace')
  }
  return await response.json()
}

export function extractLanguages(voices) {
  const langMap = new Map()
  Object.values(voices).forEach(voice => {
    const langCode = voice.language.code
    if (!langMap.has(langCode)) {
      langMap.set(langCode, voice.language)
    }
  })

  return Array.from(langMap.values()).sort((a, b) =>
    a.name_english.localeCompare(b.name_english)
  )
}

export function getVoicesForLanguage(voices, languageCode) {
  return Object.values(voices)
    .filter(v => v.language.code === languageCode)
    .sort((a, b) => {
      const qualityDiff = (QUALITY_ORDER[a.quality] || 99) - (QUALITY_ORDER[b.quality] || 99)
      if (qualityDiff !== 0) return qualityDiff
      return a.name.localeCompare(b.name)
    })
}

export function getDefaultLanguage(languages) {
  return languages.find(l => l.family === 'en') || languages[0]
}

export function getDefaultVoice(voices) {
  return voices.find(v => v.quality === 'medium' || v.quality === 'high') || voices[0]
}

export function getModelPaths(voice) {
  const modelFiles = Object.keys(voice.files).filter(f => f.endsWith('.onnx'))
  if (modelFiles.length === 0) {
    throw new Error('No model files found for voice')
  }
  const modelPath = modelFiles[0]
  return {
    modelPath,
    configPath: modelPath + '.json'
  }
}
