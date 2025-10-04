"use client"

import { useEffect, useRef, useId } from "react"

let hubspotScriptLoaded = false
let hubspotScriptLoading = false

interface HubspotFormProps {
  portalId: string
  formId: string
  region: string
  targetId?: string
}

export default function HubspotForm({ portalId, formId, region, targetId }: HubspotFormProps) {
  const generatedId = useId()
  const uniqueId = targetId || `hubspot-form-${generatedId}`
  const formContainerRef = useRef<HTMLDivElement>(null)
  const formCreatedRef = useRef(false)

  useEffect(() => {
    const loadHubSpotScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Si ya está cargado, resolver inmediatamente
        if (hubspotScriptLoaded) {
          resolve()
          return
        }

        // Si está cargando, esperar con polling
        if (hubspotScriptLoading) {
          const checkInterval = setInterval(() => {
            if (hubspotScriptLoaded) {
              clearInterval(checkInterval)
              resolve()
            }
          }, 100)
          return
        }

        // Verificar si el script ya existe en el DOM
        const existingScript = document.querySelector('script[src*="js.hsforms.net"]')
        if (existingScript) {
          hubspotScriptLoaded = true
          resolve()
          return
        }

        // Cargar el script
        hubspotScriptLoading = true
        const script = document.createElement("script")
        script.src = "https://js.hsforms.net/forms/embed/v2.js"
        script.async = true
        script.charset = "utf-8"

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
      if (!window.hbspt?.forms) {
        console.error("HubSpot forms API not available")
        return
      }

      if (formCreatedRef.current) {
        return
      }

      try {
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#${uniqueId}`,
        })
        formCreatedRef.current = true
      } catch (error) {
        console.error("Error creating HubSpot form:", error)
      }
    }

    loadHubSpotScript()
      .then(() => {
        // Delay de 100ms para asegurar que el API esté disponible
        setTimeout(createForm, 100)
      })
      .catch((error) => {
        console.error("Error loading HubSpot script:", error)
      })

    // Cleanup
    return () => {
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = ""
      }
      formCreatedRef.current = false
    }
  }, [portalId, formId, region, uniqueId])

  return (
    <div className="bg-amber-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-amber-200">
      <div id={uniqueId} ref={formContainerRef} className="min-h-[400px]" />
    </div>
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
        }) => void
      }
    }
  }
}
