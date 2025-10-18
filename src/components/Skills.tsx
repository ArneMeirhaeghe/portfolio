import React, { useEffect, useState } from 'react'
import Section from './Section'
import Badge from './ui/Badge'
import { useI18n } from '@/i18n'

type Skill = { skill: string; niveau: string; bewijs: string }
type Profile = { skills_top: Skill[] }

export default function Skills() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const { t } = useI18n()
  useEffect(() => { fetch('/data/profile.json').then(r => r.json()).then(setProfile) }, [])
  if (!profile) return null

  return (
    <Section id="skills">
      <h2 className="text-2xl md:text-3xl font-semibold">{t('section_skills_title')}</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profile.skills_top.map(s => (
          <div key={s.skill} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{s.skill}</h3>
              <Badge>{s.niveau}</Badge>
            </div>
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">{s.bewijs}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
