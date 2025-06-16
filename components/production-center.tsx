"use client"

import Image from "next/image"
import { useState } from "react"
import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function ProductionCenter() {
  const images = [
    { src: "/local-chiazza.jpg", alt: "Interior de un local Chiazza" },
    { src: "/alfajores-covered.jpeg", alt: "Alfajores siendo cubiertos de chocolate en producción" },
    { src: "/alfajores-production.jpeg", alt: "Línea de producción de alfajores" },
    { src: "/chocolate-pouring.jpeg", alt: "Chocolate siendo vertido en moldes" },
    { src: "/alfajor-packaging.jpeg", alt: "Empaques de alfajores Chiazza" },
  ]

  const [currentImage, setCurrentImage] = useState(images[0])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">NUESTROS LOCALES Y CENTRO DE PRODUCCIÓN</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Descubrí la calidad y el diseño de nuestros locales, donde la experiencia Chiazza cobra vida. Además, tener
            nuestro propio centro de producción abre todas las posibilidades a crear los más ricos productos y mantener
            la calidad que nos caracteriza.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-amber-50 rounded-3xl shadow-lg border border-amber-100 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image Gallery */}
            <div className="flex flex-col items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative aspect-video md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-gray-50 cursor-pointer">
                    <Image
                      src={currentImage.src || "/placeholder.svg"}
                      alt={currentImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{currentImage.alt.split(" - ")[0]}</h3>
                      <p className="text-sm text-white/90">
                        {currentImage.alt.split(" - ")[1] || "Explora la calidad Chiazza"}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <Image
                    src={currentImage.src || "/placeholder.svg"}
                    alt={currentImage.alt}
                    width={1000}
                    height={1000}
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </DialogContent>
              </Dialog>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      currentImage.src === img.src
                        ? "border-blue-900 shadow-md"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setCurrentImage(img)}
                  >
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Mantener la misma calidad que nos caracteriza hace 20 años.</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Facilitar la gestión de compras, contar siempre con la mejor materia prima.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Disminuir los costos operativos y obtener una mejor rentabilidad.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Asegurar la calidad e imagen de marca sólida en todas nuestras tiendas.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    Investigar y desarrollar nuevas recetas para seguir impulsando la innovación.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
