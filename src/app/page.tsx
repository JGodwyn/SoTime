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
          width={2452}
          height={1001}
          className="w-full h-auto opacity-100 brightness-100 stadium-light-mask"
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
        
          {/* Profile Avatar and Social Media Platform Icons */}
          <div className="relative flex items-center justify-center mt-8">
            {/* Social Media Platform Icons - positioned behind avatar */}
            <div className="flex items-center justify-center gap-2 mt-4" style={{
              maskImage: 'radial-gradient(ellipse 100% 120% at center, black 0%, black 25%, transparent 50%)',
              WebkitMaskImage: 'radial-gradient(ellipse 100% 120% at center, black 0%, black 25%, transparent 50%)'
            }}>
            <Image
              src="/assets/Tiktok.svg"
              alt="TikTok"
              width={64}
              height={64}
              className="w-64 h-64 hover:scale-110 transition-transform duration-200"
            />
            <Image
              src="/assets/Instagram.svg"
              alt="Instagram"
              width={64}
              height={64}
              className="w-64 h-64 hover:scale-110 transition-transform duration-200"
            />
            <Image
              src="/assets/X.svg"
              alt="X"
              width={64}
              height={64}
              className="w-64 h-64 hover:scale-110 transition-transform duration-200"
            />
            <Image
              src="/assets/LinkedIn.svg"
              alt="LinkedIn"
              width={64}
              height={64}
              className="w-64 h-64 hover:scale-110 transition-transform duration-200"
            />
            <Image
              src="/assets/MagicPost.svg"
              alt="MagicPost"
              width={64}
              height={64}
              className="w-64 h-64 hover:scale-110 transition-transform duration-200"
            />
            </div>

            {/* Profile Avatar with rotating background */}
            <div className="absolute z-10 top-2">
              {/* Showing Post Rotating SVG - positioned behind avatar */}
              <Image
                src="/assets/ShowingPostRotating.svg"
                alt="Showing Post Rotating"
                width={98}
                height={98}
                className="w-24 h-24"
              />

              {/* Profile Avatar SVG - positioned on top of the rotating circle */}
              <Image
                src="/assets/ProfileAvatar.svg"
                alt="Profile Avatar"
                width={61}
                height={61}
                className="absolute w-16 h-16 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              />
            </div>
          </div>
      </div>
    </main>
  )
}
