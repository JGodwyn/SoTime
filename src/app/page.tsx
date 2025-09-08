import { Button } from "@/src/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 bg-background overflow-hidden relative">
      {/* Stadium Light Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/assets/StadiumLight.svg"
          alt="Stadium Light"
          width={1440}
          height={702}
          className="w-full h-auto opacity-60"
        />
      </div>
      
      <div className="text-center space-y-6 relative z-10">
        <h1 className="text-display-3xl max-w-4xl mx-auto text-vignette">
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
