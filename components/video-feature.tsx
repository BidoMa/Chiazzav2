"use client"

import { useRef, useEffect } from "react"

export default function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error("Autoplay failed:", error)
          })
        } else if (videoRef.current) {
          videoRef.current.pause()
        }
      })
    }, options)

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl">
      <video ref={videoRef} className="w-full h-auto" loop muted playsInline poster="/video-poster.png">
        <source src="/cafe-especialidad.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
        <div className="p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Café de especialidad y chocolates premium</h3>
          <p className="text-white/90">Baristas expertos y mucho amor para brindarte lo mejor en cada visita</p>
        </div>
      </div>
    </div>
  )
}
