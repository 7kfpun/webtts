# Project: Web TTS

A client-side Text-to-Speech application using Piper TTS and ONNX Runtime Web.

## Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Tech Stack

- React
- Vite
- ONNX Runtime Web
- Piper WASM
- Styled Components

## Key Files

- `src/services/ttsService.js`: Handles TTS generation logic
- `src/components/AudioPlayer.jsx`: Audio playback component
- `src/config/constants.js`: Configuration and constants
- `public/piper_worker.js`: Web Worker for TTS generation
