import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ONNX_FILES } from './scripts/onnx-files.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const expressionsShim = path.resolve(__dirname, 'src/shims/expressions.js')
const piperModulePathFragment = `${path.sep}piper-wasm${path.sep}`

const piperExpressionsPlugin = () => ({
  name: 'piper-expressions-shim',
  resolveId(source, importer) {
    if (source === 'piper-wasm/expressions.js') {
      return expressionsShim
    }
    if (source === './expressions.js' && importer?.includes(piperModulePathFragment)) {
      return expressionsShim
    }
    return null
  }
})

const piperExpressionsEsbuildPlugin = {
  name: 'piper-expressions-shim',
  setup(build) {
    build.onResolve({ filter: /^\.\/expressions\.js$/ }, (args) => {
      if (args.importer?.includes(piperModulePathFragment)) {
        return { path: expressionsShim }
      }
      return null
    })
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    piperExpressionsPlugin(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: ONNX_FILES.map((file) => `node_modules/onnxruntime-web/dist/${file}`),
          dest: 'onnxruntime'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      'piper-wasm/expressions.js': expressionsShim
    }
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [piperExpressionsEsbuildPlugin]
    }
  }
})
