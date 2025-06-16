"use client"

import { useState, useEffect } from "react"

interface PlayButtonProps {
  videoSelector: string
}

export default function PlayButton({ videoSelector }: PlayButtonProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const video = document.querySelector(videoSelector) as HTMLVideoElement
    if (!video) return

    // Verificar si el video está pausado después de un breve tiempo
    // (esto indica que el autoplay falló)
    const timer = setTimeout(() => {
      if (video.paused) {
        setShowButton(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [videoSelector])

  const handlePlay = () => {
    const video = document.querySelector(videoSelector) as HTMLVideoElement
    if (video) {
      video
        .play()
        .then(() => setShowButton(false))
        .catch((error) => console.error("Play failed:", error))
    }
  }

  if (!showButton) return null

  return (
    <button
      onClick={handlePlay}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 z-20"
      aria-label="Reproducir video"
    >
      <div className="bg-white/90 text-red-800 rounded-full p-4 shadow-lg hover:bg-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
    </button>
  )
}
