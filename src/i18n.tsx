import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'nl' | 'en'
type Dict = Record<string, string>

const dicts: Record<Lang, Dict> = {
  nl: {
    // NAV
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
    phone: 'Telefoon',

    // ABOUT + VALUES (nieuw)
    about_title: 'Over mij',
    about_subtitle: 'Wie ik ben en wat mij drijft',
    about_p1_a: 'Ik ben Arne Meirhaeghe, een leergierige en creatieve full stack developer met een passie voor technologie, UX en teamwork.',
    about_p1_b: 'Met ervaring in React, .NET en hardware-integratie bouw ik oplossingen die zowel technisch sterk als gebruiksvriendelijk zijn.',
    about_p2: 'Mijn achtergrond als hoofdleiding bij KSA Deinze heeft me geleerd hoe belangrijk communicatie, verantwoordelijkheid en samenwerking zijn — vaardigheden die ik vandaag inzet in elk project.',
    about_p3: 'Ik geloof in groeien door te doen: leren, experimenteren met nieuwe technologieën en samen bouwen aan projecten die impact hebben.',

    values_title: 'Waarden',
    value_reliable: 'Betrouwbaar & betrokken',
    value_handson: 'Hands-on & leergierig',
    value_collab: 'Samenwerken & leiden',
    value_creative: 'Creatief & oplossingsgericht',

    // HOBBIES
    hobbies_title: 'Hobby’s',
    hobby_guitar: 'Gitaar spelen',
    hobby_programming: 'Side-projects & programmeren',
    hobby_ksalead: 'KSA: organiseren & leiding geven',
  },

  en: {
    // NAV
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
    phone: 'Phone',

    // ABOUT + VALUES (new)
    about_title: 'About me',
    about_subtitle: 'Who I am and what drives me',
    about_p1_a: 'I’m Arne Meirhaeghe, a curious and creative full-stack developer with a passion for technology, UX and teamwork.',
    about_p1_b: 'With experience in React, .NET and hardware integration I build solutions that are both technically solid and user-friendly.',
    about_p2: 'My background as head leader at KSA Deinze taught me the importance of communication, responsibility and collaboration — skills I apply in every project.',
    about_p3: 'I believe in learning by doing: keep learning, experiment with new technologies and build meaningful projects together.',

    values_title: 'Values',
    value_reliable: 'Reliable & engaged',
    value_handson: 'Hands-on & eager to learn',
    value_collab: 'Collaboration & leadership',
    value_creative: 'Creative & solution-oriented',

    // HOBBIES
    hobbies_title: 'Hobbies',
    hobby_guitar: 'Playing guitar',
    hobby_programming: 'Side-projects & coding',
    hobby_ksalead: 'KSA: organizing & leadership',
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
