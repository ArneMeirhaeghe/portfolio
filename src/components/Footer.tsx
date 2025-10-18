import { useI18n } from '@/i18n'
import React from 'react'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Arne Meirhaeghe</p>
        <p className="text-neutral-500">{t('made_by')} Arne — GitHub & LinkedIn in contactsectie</p>
      </div>
    </footer>
  )
}
