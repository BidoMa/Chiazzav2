"use client"

import Image from "next/image"

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* This inner div is taller than the viewport and positioned to allow parallax effect */}
      <div className="relative w-full h-[150vh] top-[-25vh]">
        <Image
          src="/chiazza-store-hero.jpeg"
          alt="Chiazza Store Front"
          fill
          priority // Added priority prop for LCP optimization
          sizes="100vw" // Added sizes prop for responsive image loading
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80 z-10"></div>
      </div>
    </div>
  )
}
