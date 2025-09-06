import { Button } from "@/src/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center space-y-8">
        <h1 className="text-display-3xl text-foreground max-w-4xl mx-auto">
          We help you<br />
          dig up your posts
        </h1>
        <p className="text-body-lg text-muted-foreground max-w-lg mx-auto">
          Your posts deserve more than a scroll. Filter, group, and let AI help you organize and see them in a whole new way.
        </p>
      </div>
    </main>
  )
}
