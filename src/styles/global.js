import { createGlobalStyle } from 'styled-components'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'

export const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: dark;
    font-family: 'Inter', 'IBM Plex Mono', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #050912;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: radial-gradient(circle at top, #0f172a, #050912 65%);
    color: #e2e8f0;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
  }

  #root {
    min-height: 100vh;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  ::selection {
    background: rgba(96, 165, 250, 0.4);
  }
`
