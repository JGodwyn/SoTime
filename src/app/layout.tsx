import type { Metadata } from 'next'
import '@/src/styles/globals.css'
import { Navigation } from '@/src/components/navigation'

export const metadata: Metadata = {
  title: 'SoTime',
  description: 'Your time management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
