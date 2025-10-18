import React, { useEffect, useState } from 'react'
import Section from './Section'
import { useI18n } from '@/i18n'

type Exp = { titel: string; bedrijf?: string; periode: string; impact: string[] }
type Profile = { ervaring_kern: Exp[] }

export default function Experience() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const { t } = useI18n()
  useEffect(() => { fetch('/data/profile.json').then(r => r.json()).then(setProfile) }, [])
  if (!profile) return null

  return (
    <Section id="experience">
      <h2 className="text-2xl md:text-3xl font-semibold">{t('section_experience_title')}</h2>
      <div className="mt-6 relative">
        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-8">
          {profile.ervaring_kern.map((e, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-neutral-950 border-2 border-brand-500" />
              <h3 className="font-semibold">{e.titel}{e.bedrijf ? ` — ${e.bedrijf}` : ''}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{e.periode}</p>
              <ul className="mt-2 text-sm space-y-1 list-disc ml-4">
                {e.impact.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
