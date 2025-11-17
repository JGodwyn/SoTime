'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/src/components/navigation'

export function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Don't show navigation on homepage
  if (pathname === '/homepage') {
    return null
  }
  
  return <Navigation />
}

