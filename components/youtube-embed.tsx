"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handlePlay = () => {
    setIsLoaded(true)
  }

  if (isLoaded) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <div className={`relative cursor-pointer ${className}`} onClick={handlePlay}>
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <button
          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-colors duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label={`Reproducir video: ${title}`}
        >
          <Play className="h-8 w-8 ml-1" fill="currentColor" />
        </button>
      </div>
    </div>
  )
}
