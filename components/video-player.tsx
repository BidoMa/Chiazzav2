"use client"

import { useEffect, useRef } from "react"

interface VideoPlayerProps {
  src: string
  className?: string
}

export default function VideoPlayer({ src, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
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
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <video ref={videoRef} className="w-full h-full object-cover" loop muted playsInline preload="metadata">
        <source src={src} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
    </div>
  )
}
