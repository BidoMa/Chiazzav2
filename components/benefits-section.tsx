"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ModernBenefitCard from "@/components/modern-benefit-card"
import AnimatedCTA from "@/components/animated-cta"

export default function BenefitsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const benefits = [
    {
      icon: "award",
      title: "Un solo proveedor (fábrica propia)",
      description:
        "Contamos con nuestra propia fábrica, lo que garantiza calidad constante, precios competitivos y suministro confiable para tu negocio.",
    },
    {
      icon: "tool",
      title: "Sin cocina ni producción en el local",
      description:
        "No necesitas equipamiento de cocina ni personal especializado en producción. Todo llega listo desde nuestra fábrica.",
    },
    {
      icon: "users",
      title: "Un empleado por turno",
      description:
        "Modelo operativo simple que requiere solo una persona por turno, reduciendo costos laborales y simplificando la gestión.",
    },
    {
      icon: "map-pin",
      title: "Locales chicos, fáciles de manejar",
      description: "Espacios compactos y eficientes que minimizan costos de alquiler y facilitan la operación diaria.",
    },
    {
      icon: "trending-up",
      title: "Inversión accesible",
      description:
        "Modelo de inversión diseñado para ser accesible, con costos iniciales optimizados y estructura financiera clara.",
    },
    {
      icon: "shopping-bag",
      title: "Recuperable en 18–24 meses",
      description:
        "Retorno de inversión proyectado entre 18 y 24 meses, basado en nuestro modelo de negocio probado y rentable.",
    },
  ]

  return (
    <section id="beneficios" className="py-20 bg-amber-50 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-blue-800/5 rounded-full blur-3xl"
          style={{ y, opacity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]), opacity }}
        />

        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-blue-800 text-white text-sm font-medium px-4 py-1.5 rounded-full">
              Franquicia Premium
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Beneficios de nuestra franquicia</h2>
          <p className="text-gray-600">
            Unirse a Chiazza significa formar parte de una marca reconocida con un modelo de negocio probado y rentable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <ModernBenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedCTA text="¡Quiero ser parte de Chiazza!" href="#contacto" variant="primary" />
        </motion.div>
      </div>
    </section>
  )
}
