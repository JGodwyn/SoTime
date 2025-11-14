'use client'

import { useCallback } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { useOverlay } from "@/src/components/overlay/overlay-provider"

export function Navigation() {
  const { openOverlay } = useOverlay()

  const handleConnectClick = useCallback(() => {
    openOverlay()
  }, [openOverlay])

  return (
    <nav className="sticky top-16 z-50 flex justify-center pt-4 animate-slide-in-from-top">
      <div className="bg-night-700 rounded-full px-2 py-2">
        <div className="flex items-center justify-between w-full min-w-[480px]">
          {/* Left side - SOTIME logo */}
          <div className="flex items-center px-4">
            <Link href="/" className="text-white font-bold text-title-lg uppercase tracking-wide">
              SOTIME
            </Link>
          </div>
          
          {/* Right side - Features link and Connect Account button */}
          <div className="flex items-center space-x-4">
            <Link href="/features" className="text-white text-body-md hover:text-white/80 transition-colors">
              Features
            </Link>
            <Button
              type="button"
              size="md"
              className="text-btn-lg uppercase tracking-wide"
              onClick={handleConnectClick}
            >
              CONNECT ACCOUNT
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
