"use client"

import { useState, useRef, useEffect } from "react"

interface VercelVideoPlayerProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  preload?: "auto" | "metadata" | "none"
  fallbackImage?: string
}

export default function VercelVideoPlayer({
  src,
  poster,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  preload = "metadata",
  fallbackImage,
}: VercelVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [canAutoPlay, setCanAutoPlay] = useState<boolean>(true)

  // Handle video loading errors
  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const handleError = () => {
      console.error("Video error occurred:", video.error)
      setError(true)
    }

    const handleCanPlay = () => {
      if (autoPlay && canAutoPlay) {
        playVideo()
      }
    }

    video.addEventListener("error", handleError)
    video.addEventListener("canplay", handleCanPlay)

    // Test autoplay capability
    video
      .play()
      .then(() => {
        setCanAutoPlay(true)
        setIsPlaying(true)
        // Pause it immediately if autoPlay is false
        if (!autoPlay) {
          video.pause()
          setIsPlaying(false)
        }
      })
      .catch((e) => {
        console.warn("Autoplay not allowed:", e)
        setCanAutoPlay(false)
      })

    return () => {
      video.removeEventListener("error", handleError)
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [autoPlay, canAutoPlay])

  // Intersection Observer for viewport-based playback
  useEffect(() => {
    if (!videoRef.current || error) return

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && canAutoPlay) {
          playVideo()
        } else if (!loop) {
          pauseVideo()
        }
      })
    }, options)

    observer.observe(videoRef.current)

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [canAutoPlay, loop, error])

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((e) => {
          console.warn("Could not play video:", e)
          setIsPlaying(false)
        })
    }
  }

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo()
    } else {
      playVideo()
    }
  }

  // If there's an error, show fallback content
  if (error) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        {fallbackImage ? (
          <img src={fallbackImage || "/placeholder.svg"} alt="Video thumbnail" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full min-h-[300px] bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Video could not be loaded</p>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => window.open(src, "_blank")}
            className="bg-red-800 text-white rounded-full p-3 shadow-lg hover:bg-red-900 transition-colors"
            aria-label="Open video in new tab"
          >
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
              className="h-6 w-6"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        preload={preload}
      >
        <source src={src} type={`video/${src.split(".").pop()}`} />
        Your browser does not support the video tag.
      </video>

      {!controls && (
        <div className="absolute inset-0 cursor-pointer flex items-center justify-center" onClick={togglePlay}>
          {!isPlaying && (
            <button
              className="bg-white/80 text-red-800 rounded-full p-3 shadow-lg hover:bg-white transition-colors"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
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
                className="h-6 w-6"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
    </div>
  )
}
