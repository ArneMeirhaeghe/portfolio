import React, { useEffect, useMemo, useState } from 'react'
import Section from './Section'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { useI18n } from '@/i18n'
import { ExternalLink, Github } from 'lucide-react'

type Project = {
  id: string
  title: string
  type: 'school' | 'stage' | 'hobby'
  year: number
  summary: { nl: string; en: string }
  tech: string[]
  liveUrl?: string
  repoUrl?: string
  images?: string[]
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<'all' | Project['type']>('all')
  const { t, lang } = useI18n()

  useEffect(() => {
    fetch('/data/projects.json').then(r => r.json()).then(setProjects)
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter(p => p.type === filter)
  }, [projects, filter])

  return (
    <Section id="projects">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">{t('section_projects_title')}</h2>
        <div className="flex gap-2">
          <Button variant={filter === 'all' ? 'primary' : 'ghost'} onClick={() => setFilter('all')}>{t('filter_all')}</Button>
          <Button variant={filter === 'school' ? 'primary' : 'ghost'} onClick={() => setFilter('school')}>{t('filter_school')}</Button>
          <Button variant={filter === 'hobby' ? 'primary' : 'ghost'} onClick={() => setFilter('hobby')}>{t('filter_hobby')}</Button>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <article key={p.id} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden group">
            <div className="h-40 bg-neutral-100 dark:bg-neutral-900">
              <img src={p.images?.[0] ?? '/images/cover.jpg'} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <Badge>{p.year}</Badge>
              </div>
              <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
                {lang === 'nl' ? p.summary.nl : p.summary.en}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map(t => <Badge key={t} className="bg-neutral-100/70 dark:bg-neutral-800/70">{t}</Badge>)}
              </div>
              <div className="mt-4 flex items-center gap-3">
                {p.liveUrl && <a className="inline-flex items-center gap-1 hover:text-brand-600" href={p.liveUrl} target="_blank" rel="noopener">
                  <ExternalLink size={16}/> {t('view_live')}
                </a>}
                {p.repoUrl && <a className="inline-flex items-center gap-1 hover:text-brand-600" href={p.repoUrl} target="_blank" rel="noopener">
                  <Github size={16}/> {t('view_repo')}
                </a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
