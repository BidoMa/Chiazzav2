"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface AnimatedCTAProps {
  text: string
  href: string
  icon?: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
}

export default function AnimatedCTA({ text, href, icon, variant = "primary" }: AnimatedCTAProps) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    if (isHovered) {
      controls.start({
        opacity: 0.7,
        scale: 1,
        transition: { duration: 0.3 },
      })
    } else {
      controls.start({
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 },
      })
    }
  }, [isHovered, controls])

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-800 hover:bg-blue-900 text-white"
      case "secondary":
        return "bg-amber-500 hover:bg-amber-600 text-white"
      case "outline":
        return "border-blue-800 text-blue-800 hover:bg-blue-50 border"
      default:
        return "bg-blue-800 hover:bg-blue-900 text-white"
    }
  }

  return (
    <div className="relative" ref={buttonRef}>
      <Button
        className={`group transition-all duration-300 transform hover:translate-y-[-2px] ${getButtonStyle()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        size="lg"
      >
        <a href={href} className="flex items-center relative z-10">
          {icon && <span className="mr-2">{icon}</span>}
          {text}
          <ChevronRight
            className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
          />
        </a>
      </Button>

      <motion.div
        className="absolute -inset-1 rounded-lg blur-sm -z-10 bg-gradient-to-r from-amber-400 via-blue-500 to-amber-400"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={controls}
      />
    </div>
  )
}
