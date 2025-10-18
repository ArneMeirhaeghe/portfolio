import React, { useEffect, useState } from 'react'
import Section from './Section'
import { Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react'
import { useI18n } from '@/i18n'

type Contact = {
  email: string
  tel: string
  locatie: string
  links: { github: string; linkedin: string }
}

export default function Contact() {
  const [contact, setContact] = useState<Contact | null>(null)
  const { t } = useI18n()

  useEffect(() => {
    fetch('/data/profile.json').then(r => r.json()).then(d => setContact(d.contact))
  }, [])

  if (!contact) return null

  return (
    <Section id="contact">
      <h2 className="text-2xl md:text-3xl font-semibold">{t('section_contact_title')}</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Mail size={18}/><a className="hover:text-brand-600" href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Github size={18}/><a className="hover:text-brand-600" href={contact.links.github} target="_blank" rel="noopener">GitHub</a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={18}/><a className="hover:text-brand-600" href={contact.links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18}/><span>{t('phone')}:</span> <span className="font-medium">{contact.tel}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18}/><span>{t('location')}:</span> <span className="font-medium">{contact.locatie}</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
          <p className="text-lg font-medium">Graag licht ik dit toe in een gesprek.</p>
          <div className="mt-4 flex gap-3">
            <a href="mailto:meirhaeghe123@gmail.com"><button className="px-4 py-2 rounded-xl bg-brand-500 text-white">Plan gesprek</button></a>
            <a href="/cv/arne-meirhaeghe-cv-nl.pdf" target="_blank" rel="noopener"><button className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">Download CV</button></a>
          </div>
        </div>
      </div>
    </Section>
  )
}
