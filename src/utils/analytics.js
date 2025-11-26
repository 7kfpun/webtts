const GA_ID = 'G-DRNN170Z50'
let analyticsInitialized = false

export function initAnalytics() {
  if (analyticsInitialized) return
  if (typeof window === 'undefined') return
  if (import.meta.env && import.meta.env.DEV) return
  if (window.location.protocol !== 'https:') {
    console.info('Analytics disabled: requires HTTPS.')
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.dataset.analytics = GA_ID
  script.onerror = () => {
    console.warn('Analytics script failed to load.')
  }
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  analyticsInitialized = true
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return
  if (!analyticsInitialized) return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}
