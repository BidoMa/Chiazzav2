"use client"

import { useState, useEffect, useRef } from "react"

let hubspotScriptLoaded = false
let hubspotScriptLoading = false

interface HubspotFormProps {
  portalId?: string
  formId?: string
  region?: string
  targetId: string
  variant?: "hero" | "contact"
}

export default function HubspotForm({
  portalId = "22460986",
  formId = "42c1366a-e739-4350-b499-9699643d7d5b", // Updated to correct form ID from example
  region = "na1",
  targetId,
  variant = "hero",
}: HubspotFormProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const formCreatedRef = useRef(false)

  useEffect(() => {
    const loadHubSpotScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if already loaded
        if (hubspotScriptLoaded && window.hbspt) {
          resolve()
          return
        }

        // If currently loading, wait for it
        if (hubspotScriptLoading) {
          const checkLoaded = () => {
            if (hubspotScriptLoaded && window.hbspt) {
              resolve()
            } else {
              setTimeout(checkLoaded, 100)
            }
          }
          checkLoaded()
          return
        }

        // Check if script already exists in DOM
        const existingScript = document.getElementById("hubspot-forms-embed-script")
        if (existingScript) {
          if (window.hbspt) {
            hubspotScriptLoaded = true
            resolve()
          } else {
            // Script exists but not loaded yet, wait for it
            existingScript.addEventListener("load", () => {
              hubspotScriptLoaded = true
              resolve()
            })
          }
          return
        }

        // Load the script
        hubspotScriptLoading = true
        const script = document.createElement("script")
        script.id = "hubspot-forms-embed-script"
        script.src = "//js.hsforms.net/forms/embed/v2.js"
        script.async = true

        script.onload = () => {
          hubspotScriptLoaded = true
          hubspotScriptLoading = false
          resolve()
        }

        script.onerror = () => {
          hubspotScriptLoading = false
          reject(new Error("Failed to load HubSpot script"))
        }

        document.head.appendChild(script)
      })
    }

    const createForm = () => {
      if (window.hbspt && window.hbspt.forms && !formCreatedRef.current) {
        try {
          // Clear container before creating form
          if (formContainerRef.current) {
            formContainerRef.current.innerHTML = ""
          }

          formCreatedRef.current = true

          window.hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: `#${targetId}`,
            onFormReady: () => {
              setIsLoading(false)
              console.log("[v0] HubSpot form loaded successfully")
            },
            onFormSubmit: () => {
              console.log("[v0] HubSpot form submitted")
            },
          })
        } catch (error) {
          console.error("[v0] Error creating HubSpot form:", error)
          setHasError(true)
          setIsLoading(false)
          formCreatedRef.current = false
        }
      }
    }

    // Load script and create form
    loadHubSpotScript()
      .then(() => {
        // Small delay to ensure DOM is ready
        setTimeout(createForm, 100)
      })
      .catch((error) => {
        console.error("[v0] Error loading HubSpot script:", error)
        setHasError(true)
        setIsLoading(false)
      })

    return () => {
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = ""
      }
      formCreatedRef.current = false
    }
  }, [portalId, formId, region, targetId])

  const isHeroVariant = variant === "hero"
  const decorativeColor = isHeroVariant ? "amber" : "blue"

  if (hasError) {
    return (
      <div className="relative mt-8 md:mt-0">
        <div className="relative bg-white rounded-xl shadow-xl p-5 md:p-8 border border-gray-100 min-h-[400px] z-10">
          <div className="mb-4 md:mb-6 text-center">
            <div
              className={`inline-block mb-2 bg-${decorativeColor}-50 px-3 py-1 rounded-full border border-${decorativeColor}-100`}
            >
              <span className={`text-xs md:text-sm font-medium text-${decorativeColor}-800`}>Franquicia Premium</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Abrí tu propia Franquicia Chiazza</h3>
            <p className="text-sm md:text-base text-gray-600">
              Completá este formulario y nos estaremos comunicando en breve para asesorarte
            </p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Error al cargar el formulario</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mt-8 md:mt-0">
      {/* Background decorative elements */}
      <div
        className={`absolute -top-5 -right-5 w-32 h-32 bg-${decorativeColor}-100 rounded-full blur-2xl opacity-50`}
      ></div>
      <div
        className={`absolute -bottom-5 -left-5 w-32 h-32 bg-${decorativeColor}-50 rounded-full blur-2xl opacity-50`}
      ></div>

      <div className="relative bg-white rounded-xl shadow-xl p-5 md:p-8 border border-gray-100 min-h-[400px] z-10">
        <div className="mb-4 md:mb-6 text-center">
          <div
            className={`inline-block mb-2 bg-${decorativeColor}-50 px-3 py-1 rounded-full border border-${decorativeColor}-100`}
          >
            <span className={`text-xs md:text-sm font-medium text-${decorativeColor}-800`}>Franquicia Premium</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Abrí tu propia Franquicia Chiazza</h3>
          <p className="text-sm md:text-base text-gray-600">
            Completá este formulario y nos estaremos comunicando en breve para asesorarte
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
            <span className="ml-3 text-gray-600">Cargando formulario...</span>
          </div>
        )}

        <div id={targetId} ref={formContainerRef} className={isLoading ? "hidden" : "block"} />
      </div>
    </div>
  )
}

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          region: string
          portalId: string
          formId: string
          target: string
          onFormReady?: () => void
          onFormSubmit?: () => void
        }) => void
      }
    }
  }
}
