import React, { useEffect, useState } from 'react'
import Section from './Section'
import { useI18n } from '@/i18n'

type Localized = string | { nl?: string; en?: string }

type Exp = {
  titel: Localized
  bedrijf?: Localized
  periode: Localized
  impact: Localized[]
}

type Profile = { ervaring_kern: Exp[] }

function tr(v: Localized, lang: 'nl' | 'en'): string {
  if (typeof v === 'string') return v
  // kies taal met fallback (NL → EN → lege string)
  return v[lang] ?? v.nl ?? v.en ?? ''
}

export default function Experience() {
  const { t, lang } = useI18n()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch('/data/profile.json')
      .then(r => r.json())
      .then((d) => {
        // Map het bestaande (NL-alleen) JSON naar Localized vorm, non-destructief
        const safe = (d.ervaring_kern ?? []).map((e: any) => ({
          titel: typeof e.titel === 'object' ? e.titel : { nl: e.titel },
          bedrijf: typeof e.bedrijf === 'object' || e.bedrijf === undefined ? e.bedrijf : { nl: e.bedrijf },
          periode: typeof e.periode === 'object' ? e.periode : { nl: e.periode },
          impact: (e.impact ?? []).map((i: any) => (typeof i === 'object' ? i : { nl: i })),
        })) as Exp[]
        setProfile({ ervaring_kern: safe })
      })
      .catch(() => setProfile({ ervaring_kern: [] }))
  }, [])

  if (!profile) return null

  return (
    <Section id="experience" title={t('section_experience_title')}>
      <div className="mt-6 relative">
        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-8">
          {profile.ervaring_kern.map((e, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-neutral-950 border-2 border-brand-500" />
              <h3 className="font-semibold">
                {tr(e.titel, lang)}
                {e.bedrijf ? ` — ${tr(e.bedrijf, lang)}` : ''}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {tr(e.periode, lang)}
              </p>
              <ul className="mt-2 text-sm space-y-1 list-disc ml-4">
                {e.impact.map((item, idx) => (
                  <li key={idx}>{tr(item, lang)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
