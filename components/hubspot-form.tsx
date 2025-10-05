"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface HubspotFormProps {
  portalId: string
  formId: string
  region: string
  targetId?: string
}

export default function HubspotForm({ portalId, formId, region, targetId }: HubspotFormProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const formCreated = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Generar ID único para el formulario
  const formContainerId = targetId || `hubspot-form-${portalId}-${formId}`

  const createForm = () => {
    // Verificar que el script esté cargado y la API disponible
    if (!window.hbspt?.forms) {
      console.error("[Chiazza] HubSpot API no disponible")
      setHasError(true)
      setIsLoading(false)
      return
    }

    // Verificar que el contenedor exista
    if (!containerRef.current) {
      console.error("[Chiazza] Contenedor no encontrado")
      setHasError(true)
      setIsLoading(false)
      return
    }

    // Evitar crear el formulario múltiples veces
    if (formCreated.current) {
      return
    }

    try {
      console.log("[Chiazza] Creando formulario HubSpot...")

      // Crear el formulario
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${formContainerId}`,
        onFormReady: () => {
          console.log("[Chiazza] Formulario listo")
          setIsLoading(false)
          setHasError(false)
          formCreated.current = true

          // Limpiar timeout si existe
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
        },
        onFormSubmit: () => {
          console.log("[Chiazza] Formulario enviado")
        },
      })
    } catch (error) {
      console.error("[Chiazza] Error al crear formulario:", error)
      setHasError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!scriptLoaded) {
      return
    }

    // Esperar un momento para asegurar que el DOM esté listo
    const initTimeout = setTimeout(() => {
      createForm()
    }, 100)

    timeoutRef.current = setTimeout(() => {
      if (!formCreated.current) {
        console.error("[Chiazza] Timeout: El formulario no se cargó a tiempo")
        setHasError(true)
        setIsLoading(false)
      }
    }, 8000)

    return () => {
      clearTimeout(initTimeout)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [scriptLoaded, portalId, formId, region])

  useEffect(() => {
    return () => {
      formCreated.current = false
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <>
      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("[Chiazza] Script de HubSpot cargado")
          setScriptLoaded(true)
        }}
        onError={(e) => {
          console.error("[Chiazza] Error al cargar script de HubSpot:", e)
          setHasError(true)
          setIsLoading(false)
        }}
      />

      <div className="bg-amber-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-amber-200">
        {isLoading && !hasError && (
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-amber-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-amber-800 font-medium">Cargando formulario...</p>
          </div>
        )}

        {hasError && (
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No se pudo cargar el formulario</h3>
              <p className="text-gray-600 mb-4 max-w-md">
                Por favor, intentá recargar la página o contactanos directamente por WhatsApp.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
              >
                Recargar página
              </button>
            </div>
          </div>
        )}

        <div
          id={formContainerId}
          ref={containerRef}
          className={`min-h-[400px] ${isLoading || hasError ? "hidden" : ""}`}
        />
      </div>
    </>
  )
}

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
