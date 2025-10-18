import React, { useEffect, useState } from 'react'
import Button from './ui/Button'
import Badge from './ui/Badge'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useI18n } from '@/i18n'

type Profile = {
  naam: string
  pitch: { nl: string; en: string }
  rol_doelen: string[]
  contact: {
    email: string
    links: { github: string; linkedin: string }
  }
}

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const { t, lang } = useI18n()

  useEffect(() => {
    fetch('/data/profile.json').then(r => r.json()).then(setProfile)
  }, [])

  if (!profile) return null

  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <motion.h1
              className="text-3xl md:text-5xl font-semibold leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5 }}
            >
              {profile.naam}
            </motion.h1>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile.rol_doelen.map(role => <Badge key={role}>{role}</Badge>)}
            </div>

            <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-300">
              {lang === 'nl' ? profile.pitch.nl : profile.pitch.en}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact"><Button>{t('cta_contact')}</Button></a>
              <a href="/cv/arne-meirhaeghe-cv-nl.pdf" target="_blank" rel="noopener">
                <Button variant="outline">{t('cta_download_cv')}</Button>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm">
              <a className="inline-flex items-center gap-1 hover:text-brand-600" href={`mailto:${profile.contact.email}`}><Mail size={18}/> {profile.contact.email}</a>
              <a className="inline-flex items-center gap-1 hover:text-brand-600" href={profile.contact.links.github} target="_blank" rel="noopener"><Github size={18}/> GitHub</a>
              <a className="inline-flex items-center gap-1 hover:text-brand-600" href={profile.contact.links.linkedin} target="_blank" rel="noopener"><Linkedin size={18}/> LinkedIn</a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .6, delay: .1 }}
            className="relative"
          >
            <img src="/images/cover.jpg" alt="Cover" className="rounded-2xl w-full h-64 md:h-80 object-cover shadow-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
