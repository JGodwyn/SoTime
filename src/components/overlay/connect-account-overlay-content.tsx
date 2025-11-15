'use client'

import { Button } from "@/src/components/ui/button"
import { useOverlay } from "@/src/components/overlay/overlay-provider"
import { cn } from "@/lib/utils"

export function ConnectAccountOverlayContent() {
  const { closeOverlay } = useOverlay()

  return (
    <div className="relative z-10 w-full max-w-sm rounded-3xl p-8 text-left">
      <div className="flex flex-col items-center text-center space-y-6">
      {/* Lightning Bolt Icon */}
      <div className="flex justify-center mb-2">
          <img
            src="/assets/IllustrationConnectAccount.svg"
            alt="Chevron Down"
            width={40}
            height={40}
          />

        </div>
        
        

      {/* Title */}
      <h2 className="text-heading-md text-white uppercase tracking-wide">
        CONNECT ACCOUNT
      </h2>

      {/* Description */}
      <p className="text-body-lg text-white/80 max-w-sm">
        You can add more accounts once you connect X.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 w-full mt-4">
        {/* Connect X Account Button - Orange to Red Gradient */}
        <Button
          type="button"
          size="lg"
          // className="text-btn-lg uppercase tracking-wide"
          onClick={() => {
            // TODO: Implement X account connection
            console.log("Connect X account clicked")
          }}
        >
          CONNECT X ACCOUNT
        </Button>

        {/* Close Button - White */}
        <Button
          type="button"
          size="lg"
          variant="secondary"
          onClick={closeOverlay}
        >
          CLOSE
        </Button>
      </div>
      </div>
    </div>
  )
}

