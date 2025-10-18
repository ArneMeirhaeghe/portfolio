import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  id?: string
  className?: string
  children: React.ReactNode
  container?: boolean
  /** Optioneel: toon een standaard sectie-header */
  title?: string
  subtitle?: string
  /** Centreer header-teksten */
  centerHeader?: boolean
}

export default function Section({
  id,
  className,
  children,
  container = true,
  title,
  subtitle,
  centerHeader = false,
}: Props) {
  return (
<section
  id={id}
  className={cn(
    "py-20 relative overflow-hidden",
    "bg-gradient-to-b from-background via-background/95 to-background/90",
    className
  )}
>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.5 }}
        className={container ? 'container' : undefined}
      >
        {(title || subtitle) && (
          <header className={cn('mb-6', centerHeader && 'text-center max-w-3xl mx-auto')}>
            {title && (
            <h2 className="relative text-2xl md:text-3xl font-semibold tracking-tight">
  {title}
  <span className="absolute -z-10 blur-2xl opacity-30 bg-gradient-to-r from-blue-500/40 to-purple-500/40 inset-0 rounded-full"></span>
</h2>

            )}
            {subtitle && (
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {children}
      </motion.div>
    </section>
  )
}
