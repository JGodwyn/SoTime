import type { Metadata } from 'next'
import '@/src/styles/globals.css'
import { Navigation } from '@/src/components/navigation'
import { OverlayProvider } from '@/src/components/overlay/overlay-provider'

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
        <OverlayProvider>
          <Navigation />
          {children}
        </OverlayProvider>
      </body>
    </html>
  )
}
