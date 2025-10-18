import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

export function download(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = ''
  a.click()
}
