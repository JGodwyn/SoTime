'use client'

import { Button } from "@/src/components/ui/button"
import { useOverlay } from "@/src/components/overlay/overlay-provider"
import { cn } from "@/lib/utils"

export function ConnectAccountOverlayContent() {
  const { closeOverlay } = useOverlay()

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Lightning Bolt Icon */}
      <div className="flex justify-center mb-2">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-dodger-400"
        >
          <path
            d="M32 8L20 32H32L28 56L44 32H32L36 8H32Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-heading-md text-white uppercase tracking-wide">
        CONNECT ACCOUNT
      </h2>

      {/* Description */}
      <p className="text-body-md text-white/80 max-w-sm">
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
  )
}

