"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeEmbed({ videoId, title, className }: YouTubeEmbedProps) {
  const [playerLoaded, setPlayerLoaded] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl ${className}`}>
      {!playerLoaded ? (
        <div className="relative w-full h-full cursor-pointer" onClick={() => setPlayerLoaded(true)}>
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={`Thumbnail for ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority // Prioritize loading the thumbnail
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
            <Play className="h-16 w-16 text-white opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </div>
      ) : (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}
