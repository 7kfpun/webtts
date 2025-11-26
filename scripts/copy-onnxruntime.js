import { mkdir, copyFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ONNX_FILES } from './onnx-files.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const destDir = resolve(projectRoot, 'public', 'onnxruntime')
const srcBase = resolve(projectRoot, 'node_modules', 'onnxruntime-web', 'dist')

await mkdir(destDir, { recursive: true })
await Promise.all(
  ONNX_FILES.map(async (file) => {
    const src = resolve(srcBase, file)
    const dest = resolve(destDir, file)
    await copyFile(src, dest)
  })
)

console.log(`Copied ONNX Runtime assets to ${destDir}`)
