"use client"

import { useEffect, useRef, useId } from "react"

// Variables globales para controlar la carga del script
let scriptLoaded = false
let scriptLoading = false
const scriptLoadCallbacks: Array<() => void> = []

interface HubspotFormProps {
  portalId: string
  formId: string
  region: string
  targetId?: string
}

export default function HubspotForm({ portalId, formId, region, targetId }: HubspotFormProps) {
  const generatedId = useId()
  const formId_unique = targetId || `hubspot-form-${generatedId.replace(/:/g, "-")}`
  const containerRef = useRef<HTMLDivElement>(null)
  const formCreated = useRef(false)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true

    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (scriptLoaded && window.hbspt?.forms) {
          resolve()
          return
        }

        if (scriptLoading) {
          scriptLoadCallbacks.push(resolve)
          return
        }

        const existing = document.querySelector('script[src*="js.hsforms.net"]')
        if (existing) {
          scriptLoaded = true
          if (window.hbspt?.forms) {
            resolve()
            return
          }
          // Esperar a que esté disponible
          const checkReady = setInterval(() => {
            if (window.hbspt?.forms) {
              clearInterval(checkReady)
              resolve()
            }
          }, 50)
          setTimeout(() => {
            clearInterval(checkReady)
            reject(new Error("HubSpot script timeout"))
          }, 10000)
          return
        }

        scriptLoading = true
        const script = document.createElement("script")
        script.src = "https://js.hsforms.net/forms/embed/v2.js"
        script.async = true
        script.defer = true
        script.charset = "utf-8"

        script.onload = () => {
          // Esperar a que hbspt esté disponible
          const checkReady = setInterval(() => {
            if (window.hbspt?.forms) {
              clearInterval(checkReady)
              scriptLoaded = true
              scriptLoading = false
              resolve()
              // Ejecutar callbacks pendientes
              scriptLoadCallbacks.forEach((cb) => cb())
              scriptLoadCallbacks.length = 0
            }
          }, 50)

          // Timeout de seguridad
          setTimeout(() => {
            clearInterval(checkReady)
            if (!scriptLoaded) {
              scriptLoading = false
              reject(new Error("HubSpot API not available"))
            }
          }, 10000)
        }

        script.onerror = () => {
          scriptLoading = false
          reject(new Error("Failed to load HubSpot script"))
        }

        document.head.appendChild(script)
      })
    }

    const initForm = () => {
      if (!mounted.current || formCreated.current || !containerRef.current) {
        return
      }

      if (!window.hbspt?.forms) {
        console.error("[Chiazza] HubSpot forms API not available")
        return
      }

      try {
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#${formId_unique}`,
        })
        formCreated.current = true
      } catch (error) {
        console.error("[Chiazza] Error creating form:", error)
      }
    }

    loadScript()
      .then(() => {
        if (mounted.current) {
          // Delay para asegurar que el DOM esté listo
          setTimeout(initForm, 150)
        }
      })
      .catch((error) => {
        console.error("[Chiazza] Script load error:", error)
      })

    return () => {
      mounted.current = false
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
      formCreated.current = false
    }
  }, [portalId, formId, region, formId_unique])

  return (
    <div className="bg-amber-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-amber-200">
      <div id={formId_unique} ref={containerRef} className="min-h-[400px]" />
    </div>
  )
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: { portalId: string; formId: string; region: string; target: string }) => void
      }
    }
  }
}
