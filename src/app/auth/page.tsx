import { Button } from "@/src/components/ui/button"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-night-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-heading-lg font-bold text-night-0">
            Welcome Back
          </h1>
          <p className="mt-2 text-body-md text-night-200">
            Sign in to your SoTime account
          </p>
        </div>
        
        <div className="bg-night-800 rounded-lg shadow-lg p-8 space-y-6 border border-night-700">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-body-md font-medium text-night-100 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-night-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pumpkin-500 focus:border-pumpkin-500 bg-night-700 text-night-0 placeholder-night-400 text-body-md"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-body-md font-medium text-night-100 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-night-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pumpkin-500 focus:border-pumpkin-500 bg-night-700 text-night-0 placeholder-night-400 text-body-md"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <Button className="w-full bg-pumpkin-500 hover:bg-pumpkin-600 text-night-0 text-btn-lg" size="lg">
            Sign In
          </Button>
          
          <div className="text-center">
            <p className="text-body-sm text-night-300">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-dodger-400 hover:text-dodger-300 text-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
