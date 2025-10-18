import { cn } from '@/lib/utils'
import React from 'react'

export default function Badge({ children, className }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 rounded-md text-xs bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200',
      className
    )}>
      {children}
    </span>
  )
}
