"use client"

import { useEffect } from "react"

interface SimpleHubSpotFormProps {
  formId: string
}

export default function SimpleHubSpotForm({ formId }: SimpleHubSpotFormProps) {
  useEffect(() => {
    // Load HubSpot script if not already loaded
    if (!document.getElementById("hs-script-loader")) {
      const script = document.createElement("script")
      script.id = "hs-script-loader"
      script.src = "//js.hsforms.net/forms/embed/v2.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    // Wait for HubSpot to be available and create form
    const checkAndCreateForm = () => {
      if (window.hbspt?.forms) {
        window.hbspt.forms.create({
          portalId: "22460986",
          formId: "e868b09c-6f97-48da-bf52-afbc82a1f232",
          region: "na1",
          target: `#${formId}`,
        })
      } else {
        setTimeout(checkAndCreateForm, 100)
      }
    }

    const timer = setTimeout(checkAndCreateForm, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [formId])

  return (
    <div className="bg-amber-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-amber-200">
      <div id={formId} className="min-h-[400px]" />
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
        }) => void
      }
    }
  }
}
