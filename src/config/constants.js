export const VOICES_JSON_URL = 'https://huggingface.co/rhasspy/piper-voices/raw/main/voices.json'
export const HF_BASE = 'https://huggingface.co/rhasspy/piper-voices/resolve/main/'
export const CACHE_NAME = 'piper-tts-models'
export const STORAGE_KEY = 'downloaded-models'

export const PIPER_PATHS = {
  phonemizeJs: '/piper_phonemize.js',
  phonemizeWasm: '/piper_phonemize.wasm',
  phonemizeData: '/piper_phonemize.data',
  worker: '/piper_worker.js',
  dist: typeof window !== 'undefined' ? `${window.location.origin}/onnxruntime/` : '/onnxruntime/'
}

export const TEXT_PROCESSING = {
  maxChunkSize: 1000,
  cjkMaxChunkSize: 280,
  cjkThreshold: 0.3
}

export const DEFAULT_TEXTS = [
  'TTS Web downloads a Piper voice once and keeps it cached in your browser, so you can generate speech offline after the first run. When you revisit the app, it simply checks the cache and skips the download step entirely, saving both time and data.',
  'Type or paste any article into the editor, select a language and voice, then click Speak to hear a natural-sounding narration within seconds. The progress indicator keeps you updated on each chunk, so you always know when the audio will be ready.',
  'Use the built-in language detector to auto-switch to the closest available voice or pick a different accent manually from the dropdown. The detector runs locally and only nudges you when it spots a language mismatch.',
  'Track download and synthesis progress in real time with progress bars that show both percentages and chunk counts for long passages. This makes it easy to gauge whether a chapter-length script will finish in time for your presentation.',
  'Audio is generated on-device by WebAssembly, so no text ever leaves your browser and privacy-sensitive content stays local. It works even while offline once the required models are cached.',
  'Models are fetched directly from Hugging Face and stored via the Cache API, making each selected voice available instantly next time. You can mix and match languages without repeatedly downloading the same assets.',
  'Need to narrate long blog posts? TTS Web automatically splits text into manageable chunks and stitches the audio back together, ensuring that multi-thousand-character articles play smoothly from start to finish.',
  'The audio player lists each generated chunk so you can replay sections individually when concatenation is not available, perfect for language learners who want to loop tricky sentences or paragraphs.',
  'Toggle between languages quickly: voices are organized by language and quality so you can find a premium or lightweight option fast, and the details card shows the exact download size before you commit.',
  'Use the interface as a drafting pad—word and character counters help you stay within limits before you click the Speak button, and the text area stays front and center so editing feels effortless.'
]

export function getRandomDefaultText() {
  const index = Math.floor(Math.random() * DEFAULT_TEXTS.length)
  return DEFAULT_TEXTS[index]
}

export const QUALITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
  x_low: 3
}
