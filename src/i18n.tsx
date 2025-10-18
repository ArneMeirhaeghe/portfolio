import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'nl' | 'en'
type Dict = Record<string, string>

const dicts: Record<Lang, Dict> = {
  nl: {
    nav_about: 'Over mij',
    nav_skills: 'Skills',
    nav_projects: 'Projecten',
    nav_experience: 'Ervaring',
    nav_values: 'Leadership & Waarden',
    nav_contact: 'Contact',
    cta_contact: 'Contact',
    cta_download_cv: 'Download CV',
    section_about_title: 'Over mij',
    section_skills_title: 'Skills',
    section_projects_title: 'Projecten',
    section_experience_title: 'Ervaring',
    section_values_title: 'Leadership & Waarden',
    section_contact_title: 'Contact',
    filter_all: 'Alles',
    filter_school: 'School',
    filter_stage: 'Stage',
    filter_hobby: 'Hobby',
    view_live: 'Live',
    view_repo: 'Repo',
    made_by: 'Gemaakt door',
    location: 'Locatie',
    phone: 'Telefoon'
  },
  en: {
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_experience: 'Experience',
    nav_values: 'Leadership & Values',
    nav_contact: 'Contact',
    cta_contact: 'Contact',
    cta_download_cv: 'Download CV',
    section_about_title: 'About',
    section_skills_title: 'Skills',
    section_projects_title: 'Projects',
    section_experience_title: 'Experience',
    section_values_title: 'Leadership & Values',
    section_contact_title: 'Contact',
    filter_all: 'All',
    filter_school: 'School',
    filter_stage: 'Internship',
    filter_hobby: 'Hobby',
    view_live: 'Live',
    view_repo: 'Repo',
    made_by: 'Made by',
    location: 'Location',
    phone: 'Phone'
  }
}

const I18nContext = createContext<{lang: Lang, t: (k: string)=>string, setLang: (l:Lang)=>void}>({
  lang: 'nl',
  t: (k)=>k,
  setLang: ()=>{}
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('nl')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored) setLang(stored)
    else {
      const nav = navigator.language.toLowerCase()
      setLang(nav.startsWith('nl') ? 'nl' : 'en')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({
    lang,
    t: (k: string) => dicts[lang][k] ?? k,
    setLang
  }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
