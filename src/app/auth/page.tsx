import { Button } from "@/src/components/ui/button"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-heading-lg font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="mt-2 text-body-md text-muted-foreground">
            Sign in to your SoTime account
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-body-md font-medium text-card-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder-muted-foreground text-body-md"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-body-md font-medium text-card-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder-muted-foreground text-body-md"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <Button className="w-full text-btn-lg" size="lg">
            Sign In
          </Button>
          
          <div className="text-center">
            <p className="text-body-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-secondary hover:text-secondary/80 text-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
