import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
  asChild?: boolean
}

export default function Button({ className, variant = 'primary', ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition'
  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 active:scale-[.99]',
    ghost: 'bg-transparent hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60',
    outline: 'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50/60 dark:hover:bg-neutral-800/60'
  } as const
  return <button className={cn(base, variants[variant], className)} {...props} />
}
