"use client"

import { useEffect, useRef, useState } from "react"

interface ChiazzaHubSpotFormProps {
  targetId: string
  variant?: "hero" | "contact"
}

export default function ChiazzaHubSpotForm({ targetId, variant = "hero" }: ChiazzaHubSpotFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "failed">("loading")
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Prevent double initialization
    if (hasInitialized.current) return
    hasInitialized.current = true

    const scriptId = "hubspot-forms-script"
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null

    const createForm = () => {
      if (typeof window !== "undefined" && window.hbspt?.forms) {
        try {
          window.hbspt.forms.create({
            portalId: "22460986",
            formId: "e868b09c-6f97-48da-bf52-afbc82a1f232",
            region: "na1",
            target: `#${targetId}`,
            onFormReady: () => {
              console.log("[v0] HubSpot form ready:", targetId)
              setLoadState("loaded")
            },
            onFormSubmitted: () => {
              console.log("[v0] HubSpot form submitted:", targetId)
            },
          })
        } catch (error) {
          console.error("[v0] Error creating HubSpot form:", error)
          setLoadState("failed")
        }
      }
    }

    // Check if script already exists
    if (scriptElement) {
      if (window.hbspt?.forms) {
        createForm()
      } else {
        scriptElement.addEventListener("load", createForm)
      }
      return
    }

    // Create new script
    scriptElement = document.createElement("script")
    scriptElement.id = scriptId
    scriptElement.src = "//js.hsforms.net/forms/embed/v2.js"
    scriptElement.charset = "utf-8"
    scriptElement.type = "text/javascript"
    scriptElement.async = true

    scriptElement.addEventListener("load", () => {
      console.log("[v0] HubSpot script loaded")
      createForm()
    })

    scriptElement.addEventListener("error", () => {
      console.error("[v0] Failed to load HubSpot script")
      setLoadState("failed")
    })

    document.body.appendChild(scriptElement)

    return () => {
      // Cleanup on unmount
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = ""
      }
    }
  }, [targetId])

  const isHero = variant === "hero"
  const bgColor = isHero ? "bg-amber-50" : "bg-blue-50"
  const accentColor = isHero ? "amber" : "blue"

  if (loadState === "failed") {
    return (
      <div className={`${bgColor} rounded-2xl shadow-xl p-8 border-2 border-${accentColor}-200`}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error al cargar el formulario</h3>
          <p className="text-gray-600 mb-6">Por favor, recargá la página para intentar nuevamente</p>
          <button
            onClick={() => window.location.reload()}
            className={`bg-${accentColor}-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-${accentColor}-900 transition-colors`}
          >
            Recargar página
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${bgColor} rounded-2xl shadow-xl p-6 md:p-8 border-2 border-${accentColor}-200 min-h-[500px]`}>
      {loadState === "loading" && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div
              className={`absolute inset-0 border-4 border-${accentColor}-600 rounded-full border-t-transparent animate-spin`}
            ></div>
          </div>
          <p className="text-gray-700 font-semibold text-lg">Cargando formulario...</p>
        </div>
      )}

      <div
        id={targetId}
        ref={formContainerRef}
        className={loadState === "loading" ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity"}
      />
    </div>
  )
}

// Type declaration for HubSpot
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string
          formId: string
          region: string
          target: string
          onFormReady?: () => void
          onFormSubmitted?: () => void
        }) => void
      }
    }
  }
}
