export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_CONSENT_KEY = 'maverick-ai-cookie-consent'
const COOKIE_PREFERENCES_KEY = 'maverick-ai-cookie-preferences'

// Default cookie preferences
export const defaultCookiePreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false
}

// Set a cookie with expiration
export function setCookie(name: string, value: string, days: number = 365): void {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`
}

// Get a cookie value
export function getCookie(name: string): string | null {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Delete a cookie
export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
}

// Check if user has given consent
export function hasGivenConsent(): boolean {
  return getCookie(COOKIE_CONSENT_KEY) === 'true'
}

// Set cookie consent
export function setConsentGiven(): void {
  setCookie(COOKIE_CONSENT_KEY, 'true', 365)
}

// Get cookie preferences
export function getCookiePreferences(): CookiePreferences {
  const stored = getCookie(COOKIE_PREFERENCES_KEY)
  if (!stored) return defaultCookiePreferences
  
  try {
    const parsed = JSON.parse(stored)
    return { ...defaultCookiePreferences, ...parsed }
  } catch {
    return defaultCookiePreferences
  }
}

// Set cookie preferences
export function setCookiePreferences(preferences: CookiePreferences): void {
  setCookie(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences), 365)
  setConsentGiven()
}

// Accept all cookies
export function acceptAllCookies(): void {
  const allAccepted: CookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: true,
    functional: true
  }
  setCookiePreferences(allAccepted)
}

// Accept only necessary cookies
export function acceptNecessaryCookies(): void {
  setCookiePreferences(defaultCookiePreferences)
}

// Clear all non-necessary cookies based on preferences
export function clearDisallowedCookies(): void {
  const preferences = getCookiePreferences()
  
  // Clear analytics cookies if not allowed
  if (!preferences.analytics) {
    // Google Analytics
    deleteCookie('_ga')
    deleteCookie('_ga_*')
    deleteCookie('_gid')
    deleteCookie('_gat')
  }
  
  // Clear marketing cookies if not allowed  
  if (!preferences.marketing) {
    // Facebook Pixel, Google Ads, etc.
    deleteCookie('_fbp')
    deleteCookie('_fbc')
    deleteCookie('fr')
  }
  
  // Clear functional cookies if not allowed
  if (!preferences.functional) {
    // Custom functional cookies
    deleteCookie('theme-preference')
    deleteCookie('language-preference')
  }
}