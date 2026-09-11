import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { translations, type Language, type Translations } from './translations'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'alma_preferred_language'

export function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'pt-BR'

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt-BR' || saved === 'en' || saved === 'es') {
      return saved
    }
  } catch {
    // ignore storage access issues
  }

  const rawLanguages: readonly string[] =
    typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [typeof navigator !== 'undefined' ? navigator.language || '' : '']

  for (const raw of rawLanguages) {
    if (!raw) continue
    const lower = raw.toLowerCase()
    if (lower.startsWith('pt')) return 'pt-BR'
    if (lower.startsWith('es')) return 'es'
    if (lower.startsWith('en')) return 'en'
  }

  return 'pt-BR'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage())

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore storage access issues
    }
  }

  // Synchronize document.documentElement.lang and head meta elements
  useEffect(() => {
    if (typeof document === 'undefined') return

    // 1. html lang
    document.documentElement.lang = language

    const currentT = translations[language]

    // 2. document.title
    document.title = currentT.meta.title

    // 3. meta description
    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta) {
      descMeta.setAttribute('content', currentT.meta.description)
    }

    // 4. og:description & og:title & og:locale
    const ogDescMeta = document.querySelector('meta[property="og:description"]')
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', currentT.meta.ogDescription)
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', currentT.meta.ogTitle)
    }

    const ogLocaleMeta = document.querySelector('meta[property="og:locale"]')
    if (ogLocaleMeta) {
      ogLocaleMeta.setAttribute('content', currentT.meta.locale)
    }
  }, [language])

  const t = useMemo(() => translations[language], [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
