"use client"

import { useEffect, useState } from "react"

interface SimpleHubSpotFormProps {
  formId: string
}

export default function SimpleHubSpotForm({ formId }: SimpleHubSpotFormProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log("[v0] Starting HubSpot form initialization for:", formId)
    let attempts = 0
    const maxAttempts = 50 // 5 seconds total
    let intervalId: NodeJS.Timeout

    const loadScript = () => {
      const existingScript = document.getElementById("hs-script-loader")

      if (existingScript) {
        console.log("[v0] Script already exists, checking if loaded")
        checkAndCreateForm()
        return
      }

      console.log("[v0] Loading HubSpot script")
      const script = document.createElement("script")
      script.id = "hs-script-loader"
      script.src = "https://js.hsforms.net/forms/embed/v2.js"
      script.async = true
      script.charset = "utf-8"

      script.onload = () => {
        console.log("[v0] Script loaded successfully")
        checkAndCreateForm()
      }

      script.onerror = () => {
        console.error("[v0] Failed to load HubSpot script")
        setError(true)
        setIsLoading(false)
      }

      document.body.appendChild(script)
    }

    const checkAndCreateForm = () => {
      intervalId = setInterval(() => {
        attempts++
        console.log(`[v0] Attempt ${attempts}: Checking for hbspt.forms`)

        if (window.hbspt?.forms) {
          console.log("[v0] HubSpot forms API available, creating form")
          clearInterval(intervalId)

          try {
            window.hbspt.forms.create({
              portalId: "22460986",
              formId: "e868b09c-6f97-48da-bf52-afbc82a1f232",
              region: "na1",
              target: `#${formId}`,
              onFormReady: () => {
                console.log("[v0] Form ready:", formId)
                setIsLoading(false)
              },
              onFormSubmit: () => {
                console.log("[v0] Form submitted:", formId)
              },
            })
          } catch (err) {
            console.error("[v0] Error creating form:", err)
            setError(true)
            setIsLoading(false)
          }
        } else if (attempts >= maxAttempts) {
          console.error("[v0] Max attempts reached, form failed to load")
          clearInterval(intervalId)
          setError(true)
          setIsLoading(false)
        }
      }, 100)
    }

    loadScript()

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [formId])

  return (
    <div className="bg-amber-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-amber-200">
      {isLoading && (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-amber-800">Cargando formulario...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error al cargar el formulario</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      <div id={formId} className={isLoading || error ? "hidden" : "min-h-[400px]"} />
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
          onFormSubmit?: () => void
        }) => void
      }
    }
  }
}
