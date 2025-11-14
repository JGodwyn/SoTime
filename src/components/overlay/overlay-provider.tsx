'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { cn } from "@/lib/utils"

type OverlayContent = ReactNode | (() => ReactNode)

type OverlayRegistration = {
  content: OverlayContent
  panelClassName?: string
  backdropClassName?: string
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

type OverlayOpenConfig = {
  content?: OverlayContent
  panelClassName?: string
  backdropClassName?: string
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

type OverlayActiveConfig = {
  content: ReactNode
  panelClassName?: string
  backdropClassName?: string
  closeOnBackdrop: boolean
  closeOnEscape: boolean
}

type OverlayContextValue = {
  openOverlay: (config?: OverlayOpenConfig) => void
  closeOverlay: () => void
  registerOverlayContent: (config: OverlayRegistration) => () => void
  isOpen: boolean
}

const OverlayContext = createContext<OverlayContextValue | null>(null)

const DEFAULT_PANEL_CLASS =
  "relative z-10 w-full max-w-lg rounded-3xl bg-night-800 border border-white/10 p-8 shadow-2xl text-left"

// change the backdrop configurations here
const DEFAULT_BACKDROP_CLASS = "absolute inset-0 bg-black/80 backdrop-blur-md"
const CLOSE_ANIMATION_MS = 500

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [baseConfig, setBaseConfig] = useState<OverlayRegistration | null>(null)
  const [activeConfig, setActiveConfig] = useState<OverlayActiveConfig | null>(null)

  const closeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const element = document.createElement("div")
    element.id = "overlay-root"
    document.body.appendChild(element)
    setPortalElement(element)

    return () => {
      document.body.removeChild(element)
    }
  }, [])

  useEffect(() => {
    if (!isClosing) {
      return
    }

    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      setActiveConfig(null)
      closeTimerRef.current = null
    }, CLOSE_ANIMATION_MS)

    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    }
  }, [isClosing])

  const openOverlay = useCallback(
    (overrideConfig?: OverlayOpenConfig) => {
      const mergedContent = overrideConfig?.content ?? baseConfig?.content

      if (!mergedContent) {
        console.warn("openOverlay called without content. Register content or pass it directly.")
        return
      }

      const resolvedContent =
        typeof mergedContent === "function"
          ? (mergedContent as () => ReactNode)()
          : mergedContent

      const mergedPanelClass = overrideConfig?.panelClassName ?? baseConfig?.panelClassName
      const mergedBackdropClass = overrideConfig?.backdropClassName ?? baseConfig?.backdropClassName
      const mergedCloseOnBackdrop = overrideConfig?.closeOnBackdrop ?? baseConfig?.closeOnBackdrop ?? true
      const mergedCloseOnEscape = overrideConfig?.closeOnEscape ?? baseConfig?.closeOnEscape ?? true

      setActiveConfig({
        content: resolvedContent,
        panelClassName: mergedPanelClass,
        backdropClassName: mergedBackdropClass,
        closeOnBackdrop: mergedCloseOnBackdrop,
        closeOnEscape: mergedCloseOnEscape,
      })
      setIsClosing(false)
      setIsOpen(true)
    },
    [baseConfig]
  )

  const closeOverlay = useCallback(() => {
    if (!isOpen || isClosing) {
      return
    }

    setIsClosing(true)
  }, [isOpen, isClosing])

  const registerOverlayContent = useCallback((config: OverlayRegistration) => {
    setBaseConfig(config)
    return () => {
      setBaseConfig((current) => (current === config ? null : current))
    }
  }, [])

  const shouldRender = Boolean((isOpen || isClosing) && portalElement && activeConfig)

  useEffect(() => {
    if (!shouldRender) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [shouldRender])

  useEffect(() => {
    if (!activeConfig?.closeOnEscape || !shouldRender) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeOverlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeConfig?.closeOnEscape, shouldRender, closeOverlay])

  const contextValue = useMemo<OverlayContextValue>(
    () => ({
      openOverlay,
      closeOverlay,
      registerOverlayContent,
      isOpen,
    }),
    [openOverlay, closeOverlay, registerOverlayContent, isOpen]
  )

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      {shouldRender && portalElement && activeConfig
        ? createPortal(
            <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
              <div
                className={cn(
                  DEFAULT_BACKDROP_CLASS,
                  activeConfig.backdropClassName,
                  isClosing ? "animate-overlay-fade-out" : "animate-overlay-fade-in"
                )}
                onClick={activeConfig.closeOnBackdrop ? closeOverlay : undefined}
            />
            {/* this is the stadium light background styler */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <Image
                  src="/assets/StadiumLight.svg"
                  alt="Stadium Light"
                  width={2452}
                  height={1001}
                  className={cn(
                    "w-full h-auto opacity-100 brightness-100 stadium-light-mask",
                    isClosing ? "animate-overlay-fade-out" : "animate-overlay-fade-in"
                  )}
                />
              </div>
              <div
                className={cn(
                  DEFAULT_PANEL_CLASS,
                  activeConfig.panelClassName,
                  isClosing ? "animate-overlay-fade-out" : "animate-overlay-fade-in"
                )}
              >
                {activeConfig.content}
              </div>
            </div>,
            portalElement
          )
        : null}
    </OverlayContext.Provider>
  )
}

export function useOverlay(): OverlayContextValue {
  const context = useContext(OverlayContext)

  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider")
  }

  return context
}

