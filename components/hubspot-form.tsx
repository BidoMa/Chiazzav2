"use client"

import { useEffect, useState, useRef, useCallback } from "react"

declare global {
  interface Window {
    hbspt: any
  }
}

export default function HubspotForm() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      setIsInView(true)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!formRef.current || isInView) return

    try {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: "100px",
      })

      observerRef.current.observe(formRef.current)
    } catch (error) {
      console.warn("IntersectionObserver error:", error)
      setIsInView(true)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [handleIntersection, isInView])

  useEffect(() => {
    if (isInView && !isLoaded && !scriptRef.current) {
      const script = document.createElement("script")
      script.src = "//js.hsforms.net/forms/embed/v2.js"
      script.charset = "utf-8"
      script.type = "text/javascript"
      script.async = true
      script.defer = true
      scriptRef.current = script

      script.onload = () => {
        try {
          if (window.hbspt) {
            window.hbspt.forms.create({
              portalId: "22460986",
              formId: "e868b09c-6f97-48da-bf52-afbc82a1f232",
              region: "na1",
              target: "#hubspot-form-container",
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
            setIsLoaded(true)
          }
        } catch (error) {
          console.error("HubSpot form creation error:", error)
        }
      }

      script.onerror = () => {
        console.error("Failed to load HubSpot script")
        scriptRef.current = null
      }

      document.head.appendChild(script)

      return () => {
        try {
          if (scriptRef.current && scriptRef.current.parentNode) {
            document.head.removeChild(scriptRef.current)
            scriptRef.current = null
          }
        } catch (error) {
          console.warn("Error removing HubSpot script:", error)
        }
      }
    }
  }, [isInView, isLoaded])

  return (
    <div className="relative mt-8 md:mt-0" ref={formRef}>
      {/* Background decorative elements */}
      <div className="absolute -top-5 -right-5 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-50"></div>
      <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50"></div>

      <div
        id="hubspot-form-container"
        className="relative bg-white rounded-xl shadow-xl p-5 md:p-8 border border-gray-100 min-h-[400px] z-10"
      >
        <div className="mb-4 md:mb-6 text-center">
          <div className="inline-block mb-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <span className="text-xs md:text-sm font-medium text-amber-800">Franquicia Premium</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Abrí tu propia Franquicia Chiazza</h3>
          <p className="text-sm md:text-base text-gray-600">
            Completá este formulario y nos estaremos comunicando en breve para asesorarte
          </p>
        </div>

        {!isLoaded && isInView && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
          </div>
        )}
      </div>
    </div>
  )
}
