import React from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Language } from '../../i18n/translations'

interface LanguageSwitcherProps {
  variant?: 'menu' | 'footer'
  className?: string
}

export default function LanguageSwitcher({ variant = 'menu', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()

  const languages: { code: Language; label: string; title: string }[] = [
    { code: 'pt-BR', label: t.languageSwitcher.pt, title: 'Português (Brasil)' },
    { code: 'en', label: t.languageSwitcher.en, title: 'English' },
    { code: 'es', label: t.languageSwitcher.es, title: 'Español' },
  ]

  if (variant === 'footer') {
    return (
      <nav
        className={`lang-switcher lang-switcher--footer ${className}`}
        aria-label={t.languageSwitcher.ariaLabel}
      >
        {languages.map((item, idx) => {
          const isActive = language === item.code
          return (
            <React.Fragment key={item.code}>
              {idx > 0 && <span className="lang-switcher__sep" aria-hidden="true">·</span>}
              <button
                type="button"
                className={`lang-switcher__btn ${isActive ? 'lang-switcher__btn--active' : ''}`}
                onClick={() => setLanguage(item.code)}
                aria-pressed={isActive}
                title={item.title}
              >
                {item.label}
              </button>
            </React.Fragment>
          )
        })}
      </nav>
    )
  }

  return (
    <nav
      className={`lang-switcher lang-switcher--menu ${className}`}
      aria-label={t.languageSwitcher.ariaLabel}
    >
      <div className="lang-switcher__pill">
        {languages.map((item) => {
          const isActive = language === item.code
          return (
            <button
              key={item.code}
              type="button"
              className={`lang-switcher__btn ${isActive ? 'lang-switcher__btn--active' : ''}`}
              onClick={() => setLanguage(item.code)}
              aria-pressed={isActive}
              title={item.title}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
