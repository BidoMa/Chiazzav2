"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    hbspt: any
  }
}

export default function HubspotFormContact() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only load the script if it hasn't been loaded yet
    if (!isLoaded) {
      const script = document.createElement("script")
      script.src = "//js.hsforms.net/forms/embed/v2.js"
      script.charset = "utf-8"
      script.type = "text/javascript"
      script.async = true
      script.defer = true

      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: "22460986",
            formId: "e868b09c-6f97-48da-bf52-afbc82a1f232",
            region: "na1",
            target: "#hubspot-form-contact-container",
            css: `
              .hs-form-field label {
                color: #1f2937;
                font-weight: 500;
                margin-bottom: 4px;
              }
              .hs-form-field input, .hs-form-field textarea, .hs-form-field select {
                border-radius: 6px;
                border: 1px solid #e5e7eb;
                background-color: #ffffff;
                padding: 10px 12px;
                font-size: 16px;
                transition: all 0.2s ease;
              }
              .hs-form-field input:focus, .hs-form-field textarea:focus, .hs-form-field select:focus {
                border-color: #1e40af; /* blue-800 */
                box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.2);
                outline: none;
              }
              .hs-button {
                background-color: #1e40af !important; /* blue-800 */
                color: #ffffff !important;
                border: none !important;
                border-radius: 6px !important;
                padding: 12px 24px !important;
                font-weight: 600 !important;
                font-size: 16px !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
              }
              .hs-button:hover {
                background-color: #1e3a8a !important; /* blue-900 */
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 12px rgba(0,0,0,0.15) !important;
              }
              .hs-error-msg {
                color: #1e40af !important; /* blue-800 */
                font-size: 0.85rem !important;
                margin-top: 4px !important;
              }
              .submitted-message {
                color: #065f46 !important; /* green-700 */
                background-color: #d1fae5 !important; /* green-100 */
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
                color: #1f2937 !important; /* gray-800 */
              }
              .legal-consent-container {
                color: #4b5563 !important; /* gray-600 */
                font-size: 0.85rem !important;
              }
              .legal-consent-container a {
                color: #1e40af !important; /* blue-800 */
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
      }

      document.body.appendChild(script)

      return () => {
        // Clean up the script when the component unmounts
        if (script.parentNode) {
          document.body.removeChild(script)
        }
      }
    }
  }, [isLoaded])

  return (
    <div className="relative mt-8 md:mt-0">
      {/* Background decorative elements */}
      <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-100 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>

      <div
        id="hubspot-form-contact-container"
        className="relative bg-white rounded-xl shadow-xl p-5 md:p-8 border border-gray-100 min-h-[400px] z-10"
      >
        <div className="mb-4 md:mb-6 text-center">
          <div className="inline-block mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <span className="text-xs md:text-sm font-medium text-blue-800">Franquicia Premium</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Abrí tu propia Franquicia Chiazza</h3>
          <p className="text-sm md:text-base text-gray-600">
            Completá este formulario y nos estaremos comunicando en breve para asesorarte
          </p>
        </div>

        {!isLoaded && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
          </div>
        )}
      </div>
    </div>
  )
}
