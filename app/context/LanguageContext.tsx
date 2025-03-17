'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { en } from '../translations/en'
import { ar } from '../translations/ar'
import { hi } from '../translations/hi'
import { ur } from '../translations/ur'

type Translations = typeof en
type Language = 'en' | 'ar' | 'hi' | 'ur'

interface LanguageContextType {
  language: Language
  translations: Translations
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en,
  ar,
  hi,
  ur,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguageState] = useState<Language>('en')

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr'
    // Update the URL to include the new language
    router.push(`/${lang}${pathname}`)
  }, [router, pathname])

  const t = useCallback((key: string) => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }
    
    return value || key
  }, [language])

  return (
    <LanguageContext.Provider value={{
      language,
      translations: translations[language],
      setLanguage,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 