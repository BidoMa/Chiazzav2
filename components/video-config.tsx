"use client"

import { useEffect } from "react"

export default function VideoConfig() {
  useEffect(() => {
    // Función para intentar reproducir todos los videos con autoplay
    const attemptAutoplay = () => {
      const videos = document.querySelectorAll("video[autoplay]")

      videos.forEach((video) => {
        // Asegurarse de que el video esté muted para permitir autoplay
        video.muted = true

        // Intentar reproducir
        const playPromise = (video as HTMLVideoElement).play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Autoplay prevented for video:", error)
          })
        }
      })
    }

    // Intentar reproducir videos cuando la página esté completamente cargada
    if (document.readyState === "complete") {
      attemptAutoplay()
    } else {
      window.addEventListener("load", attemptAutoplay)
      // También intentar en interacción del usuario
      document.addEventListener("click", attemptAutoplay, { once: true })
    }

    return () => {
      window.removeEventListener("load", attemptAutoplay)
      document.removeEventListener("click", attemptAutoplay)
    }
  }, [])

  return null
}
