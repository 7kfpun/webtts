import { useEffect, useRef, useState } from 'react'
import { detectLanguage, findMatchingLanguageCode } from '../utils/languageDetection'
import { trackEvent } from '../utils/analytics'

export function useLanguageDetection(text, languages, currentLanguage, onLanguageChange) {
  const [detectedLanguageName, setDetectedLanguageName] = useState(null)
  const [unsupportedLanguage, setUnsupportedLanguage] = useState(null)
  const lastDetectedRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      if (!text || text.length < 10 || !languages || languages.length === 0) {
        setDetectedLanguageName(null)
        setUnsupportedLanguage(null)
        return
      }

      const detectedCode = detectLanguage(text)
      if (!detectedCode) {
        setDetectedLanguageName(null)
        setUnsupportedLanguage(null)
        return
      }

      const matchingCode = findMatchingLanguageCode(detectedCode, languages)
      if (!matchingCode) {
        setDetectedLanguageName(null)
        setUnsupportedLanguage(detectedCode)
        trackEvent('language_unsupported', { detected: detectedCode })
        return
      }

      const matchedLang = languages.find(l => l.code === matchingCode)
      if (matchedLang) {
        setDetectedLanguageName(matchedLang.name_english)
        setUnsupportedLanguage(null)
        trackEvent('language_detected', { detected: matchingCode })

        if (matchingCode !== currentLanguage && matchingCode !== lastDetectedRef.current) {
          lastDetectedRef.current = matchingCode
          onLanguageChange(matchingCode)
          trackEvent('language_auto_switch', { to: matchingCode })
        }
      } else {
        setDetectedLanguageName(null)
        setUnsupportedLanguage(detectedCode)
        trackEvent('language_unsupported', { detected: detectedCode })
      }
    }, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, languages, currentLanguage, onLanguageChange])

  return { detectedLanguageName, unsupportedLanguage }
}
