import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 flex justify-center pt-4">
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
            <Link href="/auth">
              <Button 
                size="md" 
                className="text-btn-sm uppercase tracking-wide"
              >
                CONNECT ACCOUNT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
