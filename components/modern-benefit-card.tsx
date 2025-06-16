"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Award, TrendingUp, Users, ShoppingBag, MapPin, PenToolIcon as Tool, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernBenefitCardProps {
  icon: string
  title: string
  description: string
  index: number
}

export default function ModernBenefitCard({ icon, title, description, index }: ModernBenefitCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "award":
        return Award
      case "trending-up":
        return TrendingUp
      case "users":
        return Users
      case "shopping-bag":
        return ShoppingBag
      case "map-pin":
        return MapPin
      case "tool":
        return Tool
      default:
        return Award
    }
  }

  const Icon = getIcon()

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: index * 0.1,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.1 + 0.2,
        duration: 0.3,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: index * 0.1 + 0.3,
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className={cn(
        "bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300",
        isHovered
          ? "shadow-lg border-blue-200 transform -translate-y-2"
          : "hover:shadow-md hover:border-blue-100 hover:-translate-y-1",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        variants={iconVariants}
        className={cn(
          "w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-all duration-300",
          isHovered ? "bg-blue-800 text-white" : "bg-blue-100 text-blue-800",
        )}
      >
        <Icon className="h-7 w-7" />
      </motion.div>
      <motion.div variants={textVariants}>
        <h3 className="text-xl font-bold mb-3 text-blue-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>

      {isHovered && (
        <motion.div
          className="w-full h-1 bg-gradient-to-r from-blue-800 to-amber-500 rounded-full mt-5"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  )
}
