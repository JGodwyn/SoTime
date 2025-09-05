import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { ThemeToggle } from "@/src/components/theme-toggle"

export function Navigation() {
  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-title-lg font-bold text-card-foreground">
              SoTime
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-body-md text-muted-foreground hover:text-card-foreground px-3 py-2 rounded-md font-medium transition-colors">
                Home
              </Link>
              <Link href="/typography-demo" className="text-body-md text-muted-foreground hover:text-card-foreground px-3 py-2 rounded-md font-medium transition-colors">
                Typography
              </Link>
              <Link href="/features" className="text-body-md text-muted-foreground hover:text-card-foreground px-3 py-2 rounded-md font-medium transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-body-md text-muted-foreground hover:text-card-foreground px-3 py-2 rounded-md font-medium transition-colors">
                About
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth">
              <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-btn-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="text-btn-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
