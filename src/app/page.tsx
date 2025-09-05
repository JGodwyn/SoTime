import { Button } from "@/src/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center space-y-8">
        <h1 className="text-display-lg text-foreground">
          Welcome to SoTime
        </h1>
        <p className="text-body-lg text-muted-foreground max-w-2xl">
          Your personal time management companion. Stay organized, focused, and productive.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="text-btn-lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-btn-lg">
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <h3 className="text-title-lg text-card-foreground mb-2">Time Tracking</h3>
            <p className="text-body-md text-muted-foreground">Monitor how you spend your time</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <h3 className="text-title-lg text-card-foreground mb-2">Task Management</h3>
            <p className="text-body-md text-muted-foreground">Organize and prioritize your tasks</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <h3 className="text-title-lg text-card-foreground mb-2">Analytics</h3>
            <p className="text-body-md text-muted-foreground">Gain insights into your productivity</p>
          </div>
        </div>
      </div>
    </main>
  )
}
