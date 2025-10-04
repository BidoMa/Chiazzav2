"use client"

import { useEffect, useRef, useState } from "react"

interface ChiazzaContactFormProps {
  formIdentifier: string
  displayVariant?: "primary" | "secondary"
}

// Global state for script management
const scriptState = {
  isReady: false,
  isLoading: false,
  listeners: [] as Array<() => void>,
}

export default function ChiazzaContactForm({ formIdentifier, displayVariant = "primary" }: ChiazzaContactFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<"loading" | "ready" | "error">("loading")
  const mountedRef = useRef(false)
  const formInitializedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    const initializeForm = () => {
      if (!mountedRef.current || formInitializedRef.current) return

      if (window.hbspt?.forms?.create) {
        try {
          formInitializedRef.current = true

          window.hbspt.forms.create({
            region: "na1",
            portalId: "22460986",
            formId: "42c1366a-e739-4350-b499-9699643d7d5b",
            target: `#${formIdentifier}`,
            onFormReady: () => {
              if (mountedRef.current) {
                setFormStatus("ready")
              }
            },
            onFormSubmitted: () => {
              console.log("[Chiazza] Form submitted successfully")
            },
          })
        } catch (error) {
          console.error("[Chiazza] Form initialization error:", error)
          if (mountedRef.current) {
            setFormStatus("error")
          }
        }
      }
    }

    const loadScript = () => {
      if (scriptState.isReady) {
        initializeForm()
        return
      }

      if (scriptState.isLoading) {
        scriptState.listeners.push(initializeForm)
        return
      }

      const existingScript = document.querySelector('script[src*="js.hsforms.net"]')
      if (existingScript) {
        if (window.hbspt) {
          scriptState.isReady = true
          initializeForm()
        } else {
          existingScript.addEventListener("load", () => {
            scriptState.isReady = true
            initializeForm()
            scriptState.listeners.forEach((fn) => fn())
            scriptState.listeners = []
          })
        }
        return
      }

      scriptState.isLoading = true
      const scriptElement = document.createElement("script")
      scriptElement.src = "https://js.hsforms.net/forms/embed/v2.js"
      scriptElement.async = true
      scriptElement.defer = true

      scriptElement.addEventListener("load", () => {
        scriptState.isReady = true
        scriptState.isLoading = false
        initializeForm()
        scriptState.listeners.forEach((fn) => fn())
        scriptState.listeners = []
      })

      scriptElement.addEventListener("error", () => {
        scriptState.isLoading = false
        if (mountedRef.current) {
          setFormStatus("error")
        }
      })

      document.body.appendChild(scriptElement)
    }

    loadScript()

    return () => {
      mountedRef.current = false
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
      formInitializedRef.current = false
    }
  }, [formIdentifier])

  const isPrimary = displayVariant === "primary"
  const accentColor = isPrimary ? "amber" : "blue"

  if (formStatus === "error") {
    return (
      <div className="relative">
        <div className={`absolute -top-4 -right-4 w-24 h-24 bg-${accentColor}-100 rounded-full blur-xl opacity-40`} />
        <div className={`absolute -bottom-4 -left-4 w-24 h-24 bg-${accentColor}-50 rounded-full blur-xl opacity-40`} />

        <div className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-200">
          <div className="text-center mb-6">
            <div
              className={`inline-flex items-center gap-2 bg-${accentColor}-50 px-4 py-2 rounded-full border border-${accentColor}-200 mb-3`}
            >
              <span className={`text-sm font-semibold text-${accentColor}-900`}>Franquicia Premium</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Abrí tu propia Franquicia Chiazza</h3>
            <p className="text-base text-gray-600">
              Completá este formulario y nos estaremos comunicando en breve para asesorarte
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-700 mb-6 text-center">No pudimos cargar el formulario</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className={`absolute -top-4 -right-4 w-24 h-24 bg-${accentColor}-100 rounded-full blur-xl opacity-40`} />
      <div className={`absolute -bottom-4 -left-4 w-24 h-24 bg-${accentColor}-50 rounded-full blur-xl opacity-40`} />

      <div className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-200 min-h-[450px]">
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center gap-2 bg-${accentColor}-50 px-4 py-2 rounded-full border border-${accentColor}-200 mb-3`}
          >
            <span className={`text-sm font-semibold text-${accentColor}-900`}>Franquicia Premium</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Abrí tu propia Franquicia Chiazza</h3>
          <p className="text-base text-gray-600">
            Completá este formulario y nos estaremos comunicando en breve para asesorarte
          </p>
        </div>

        {formStatus === "loading" && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-800 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Cargando formulario...</p>
          </div>
        )}

        <div id={formIdentifier} ref={containerRef} className={formStatus === "loading" ? "hidden" : "block"} />
      </div>
    </div>
  )
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string
          portalId: string
          formId: string
          target: string
          onFormReady?: () => void
          onFormSubmitted?: () => void
        }) => void
      }
    }
  }
}
