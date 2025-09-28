"use client"

import { useEffect, useState, useRef, useCallback } from "react"

declare global {
  interface Window {
    hbspt: any
  }
}

let hubspotScriptLoaded = false
let hubspotScriptLoading = false

interface HubspotFormProps {
  portalId?: string
  formId?: string
  region?: string
  targetId: string
  variant?: "hero" | "contact"
}

const loadHubSpotScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (hubspotScriptLoaded && window.hbspt) {
      resolve()
      return
    }

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

    const existingScript = document.getElementById("hubspot-forms-embed-script")
    if (existingScript) {
      if (window.hbspt) {
        hubspotScriptLoaded = true
        resolve()
      } else {
        // Script exists but not loaded yet
        existingScript.addEventListener("load", () => {
          hubspotScriptLoaded = true
          hubspotScriptLoading = false
          resolve()
        })
      }
      return
    }

    hubspotScriptLoading = true
    const script = document.createElement("script")
    script.id = "hubspot-forms-embed-script"
    script.src = "https://js.hsforms.net/forms/embed/v2.js"
    script.charset = "utf-8"
    script.type = "text/javascript"
    script.async = true
    script.defer = true

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

export default function HubspotForm({
  portalId = "22460986",
  formId = "e868b09c-6f97-48da-bf52-afbc82a1f232",
  region = "na1",
  targetId,
  variant = "hero",
}: HubspotFormProps) {
  const [isInView, setIsInView] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const formCreatedRef = useRef(false)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Use requestAnimationFrame to avoid layout thrashing
      requestAnimationFrame(() => {
        try {
          const [entry] = entries
          if (entry.isIntersecting && !isInView) {
            setIsInView(true)
            // Disconnect observer immediately to prevent further callbacks
            if (observerRef.current) {
              observerRef.current.disconnect()
              observerRef.current = null
            }
          }
        } catch (error) {
          console.warn("IntersectionObserver callback error:", error)
        }
      })
    },
    [isInView],
  )

  useEffect(() => {
    if (!formRef.current || isInView) return

    try {
      const createObserver = () => {
        try {
          observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: "100px",
          })

          if (formRef.current) {
            observerRef.current.observe(formRef.current)
          }
        } catch (error) {
          console.warn("IntersectionObserver creation error:", error)
          // Fallback: set in view immediately
          setIsInView(true)
        }
      }

      const timeoutId = setTimeout(createObserver, 100)

      return () => {
        clearTimeout(timeoutId)
        if (observerRef.current) {
          try {
            observerRef.current.disconnect()
          } catch (error) {
            console.warn("Observer disconnect error:", error)
          }
          observerRef.current = null
        }
      }
    } catch (error) {
      console.warn("IntersectionObserver setup error:", error)
      setIsInView(true)
    }
  }, [handleIntersection, isInView])

  const createForm = useCallback(() => {
    if (window.hbspt && window.hbspt.forms && !formCreatedRef.current && formContainerRef.current) {
      try {
        if (formContainerRef.current) {
          formContainerRef.current.innerHTML = ""
        }

        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#${targetId}`,
          css: `
            .hs-form-field label {
              color: #1f2937;
              font-weight: 500;
              margin-bottom: 6px;
              font-size: 0.95rem;
              letter-spacing: 0.01em;
            }
            .hs-form-field input, .hs-form-field textarea, .hs-form-field select {
              border-radius: 8px;
              border: 1px solid #e5e7eb;
              background-color: #ffffff;
              padding: 12px 16px;
              font-size: 16px;
              transition: all 0.3s ease;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
              width: 100%;
            }
            .hs-form-field input:focus, .hs-form-field textarea:focus, .hs-form-field select:focus {
              border-color: #1e40af;
              box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2), 0 4px 8px rgba(0,0,0,0.1);
              outline: none;
              transform: translateY(-1px);
            }
            .hs-button {
              background-color: #1e40af !important;
              color: #ffffff !important;
              border: none !important;
              border-radius: 8px !important;
              padding: 14px 28px !important;
              font-weight: 600 !important;
              font-size: 16px !important;
              cursor: pointer !important;
              transition: all 0.3s ease !important;
              box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2) !important;
              text-transform: uppercase !important;
              letter-spacing: 0.03em !important;
              width: 100% !important;
            }
            .hs-button:hover {
              background-color: #1e3a8a !important;
              transform: translateY(-2px) !important;
              box-shadow: 0 6px 16px rgba(30, 64, 175, 0.3) !important;
            }
            .hs-error-msg {
              color: #1e40af !important;
              font-size: 0.85rem !important;
              margin-top: 4px !important;
            }
            .submitted-message {
              color: #065f46 !important;
              background-color: #d1fae5 !important;
              padding: 20px !important;
              border-radius: 8px !important;
              text-align: center !important;
              font-size: 1.1rem !important;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
            }
            .hs-form {
              margin-top: 1rem !important;
            }
            .hs-richtext {
              color: #1f2937 !important;
            }
            .legal-consent-container {
              color: #4b5563 !important;
              font-size: 0.85rem !important;
            }
            .legal-consent-container a {
              color: #1e40af !important;
              text-decoration: underline !important;
            }
            @media (max-width: 767px) {
              .hs-form-field {
                margin-bottom: 16px !important;
              }
              .hs-button {
                padding: 12px 20px !important;
                font-size: 14px !important;
              }
            }
          `,
        })
        formCreatedRef.current = true
      } catch (error) {
        console.error("HubSpot form creation error:", error)
      }
    }
  }, [portalId, formId, region, targetId])

  useEffect(() => {
    if (isInView && !formCreatedRef.current) {
      loadHubSpotScript()
        .then(() => {
          setTimeout(() => {
            createForm()
          }, 50)
        })
        .catch((error) => {
          console.error("Failed to load HubSpot script:", error)
        })
    }
  }, [isInView, createForm])

  useEffect(() => {
    return () => {
      if (formContainerRef.current) {
        try {
          formContainerRef.current.innerHTML = ""
        } catch (error) {
          console.warn("Cleanup error:", error)
        }
      }
      formCreatedRef.current = false
    }
  }, [])

  const isHeroVariant = variant === "hero"
  const decorativeColor = isHeroVariant ? "amber" : "blue"

  return (
    <div className="relative mt-8 md:mt-0" ref={formRef}>
      {/* Background decorative elements */}
      <div
        className={`absolute -top-5 -right-5 w-32 h-32 bg-${decorativeColor}-100 rounded-full blur-2xl opacity-50`}
      ></div>
      <div
        className={`absolute -bottom-5 -left-5 w-32 h-32 bg-${decorativeColor}-50 rounded-full blur-2xl opacity-50`}
      ></div>

      <div
        id={targetId}
        ref={formContainerRef}
        className="relative bg-white rounded-xl shadow-xl p-5 md:p-8 border border-gray-100 min-h-[400px] z-10"
      >
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

        {isInView && !formCreatedRef.current && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
            <span className="ml-3 text-gray-600">Cargando formulario...</span>
          </div>
        )}
      </div>
    </div>
  )
}
