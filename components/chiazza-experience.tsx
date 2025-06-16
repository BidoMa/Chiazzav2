"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, useInView, useAnimation } from "framer-motion"
import { Coffee, ChevronRight } from "lucide-react"
import PlayButton from "./play-button"

export default function ChiazzaExperience() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    const video = document.querySelector("video")
    if (video) {
      // Intenta reproducir el video inmediatamente
      const playPromise = video.play()

      // El navegador puede no permitir la reproducción automática
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay was prevented:", error)
          // Podemos mostrar un botón de reproducción manual aquí si es necesario
        })
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const highlightVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { duration: 0.8, delay: 0.5 },
    },
  }

  return (
    <div className="bg-amber-50/50 rounded-2xl overflow-hidden shadow-lg" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <motion.div
          className="p-8 md:p-10 flex flex-col justify-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-bold text-red-800 mb-1 inline-block" variants={itemVariants}>
            La experiencia Chiazza
          </motion.h3>

          <motion.div className="h-1 bg-amber-400 rounded mb-4 w-0" variants={highlightVariants} />

          <motion.p className="text-gray-600 mb-4" variants={itemVariants}>
            En Chiazza no solo ofrecemos chocolates de alta calidad, sino una experiencia completa para los sentidos.
            Nuestros locales combinan la tradición chocolatera con un ambiente moderno y acogedor.
          </motion.p>

          <motion.p className="text-gray-600 mb-4" variants={itemVariants}>
            Cada franquicia Chiazza ofrece además una selección de café de especialidad preparado por baristas expertos,
            creando el maridaje perfecto con nuestros chocolates artesanales.
          </motion.p>

          <motion.p className="text-gray-600 mb-6" variants={itemVariants}>
            Esta combinación única ha conquistado a nuestros clientes, quienes nos eligen día a día por la calidad de
            nuestros productos y la calidez de nuestra atención.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3" variants={itemVariants}>
            <Button className="bg-red-800 hover:bg-red-900 text-white group transition-all duration-300 transform hover:translate-y-[-2px]">
              <a href="#contacto" className="flex items-center">
                Conocer más sobre la franquicia
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-red-800 text-red-800 hover:bg-red-50 transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              <a href="#proceso" className="flex items-center">
                <Coffee className="mr-2 h-4 w-4" />
                Ver proceso de apertura
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative h-full min-h-[450px] overflow-hidden"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            transition: { duration: 1, delay: 0.5 },
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <video
              className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/video-poster.png"
              id="chiazza-experience-video"
            >
              <source src="/cafe-especialidad.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            <PlayButton videoSelector="#chiazza-experience-video" />
          </div>

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8, delay: 1 } }}
          >
            <div className="p-6 w-full">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 1.2 } }}
              >
                <h4 className="text-xl font-bold mb-1 text-white">Café de especialidad y chocolates premium</h4>
                <p className="text-white/90 text-sm">
                  Baristas expertos y mucho amor para brindarte lo mejor en cada visita
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated corner accent */}
          <motion.div
            className="absolute top-0 right-0 w-16 h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 1.5 } }}
          >
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-transparent border-r-amber-400"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
