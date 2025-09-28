"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function ProductShowcase() {
  const images = [
    { src: "/mejor-alfajor-principal.png", alt: "Alfajor de Chocolate Blanco Premiado" },
    { src: "/chocolate-pouring.jpeg", alt: "Chocolate siendo vertido en moldes" },
    { src: "/alfajores-production.jpeg", alt: "Alfajores en línea de producción" },
    { src: "/fruttichia.jpeg", alt: "Producto Fruttichia" },
    { src: "/alfajor-packaging.jpeg", alt: "Empaques de Alfajores Chiazza" },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="space-y-16">
      {/* Simple Product Section */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros productos</h2>
          <p className="text-gray-600 text-lg">
            Descubrí la variedad de chocolates artesanales que ofrecemos en nuestras tiendas, elaborados con los mejores
            ingredientes y técnicas tradicionales
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Alfajores Chiazza</h3>
              <div className="w-16 h-1 bg-blue-900 mb-6"></div>
              <p className="text-blue-900 font-medium mb-4">
                Disfrutá nuestros alfajores artesanales en todas sus variedades
              </p>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Premiados por su sabor y calidad, nuestros alfajores combinan el mejor chocolate con rellenos
                irresistibles. ¡Probá la experiencia Chiazza en cada bocado!
              </p>
              <p>
                Elaborados artesanalmente con ingredientes seleccionados, cada alfajor es el resultado de una receta
                perfeccionada a lo largo de los años. Nuestra pasión por el chocolate y la excelencia se refleja en cada
                detalle, desde la textura suave de las tapas hasta el equilibrio perfecto del relleno.
              </p>
              <p>
                Ya sea para acompañar un café, regalar o disfrutar en cualquier momento, los alfajores Chiazza son el
                deleite de quienes buscan calidad y tradición en cada bocado. Descubrí por qué somos elegidos por los
                amantes del chocolate en todo el país.
              </p>
            </div>

            <div className="pt-4">
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium">
                <a href="#contacto" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  Quiero información
                </a>
              </Button>
            </div>
          </div>

          {/* Right Image Gallery */}
          <div className="flex flex-col items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative aspect-square md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-gray-50 cursor-pointer">
                  <Image
                    src={images[currentImageIndex].src || "/placeholder.svg"}
                    alt={images[currentImageIndex].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentImageIndex === 0}
                    loading={currentImageIndex === 0 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0">
                <Image
                  src={images[currentImageIndex].src || "/placeholder.svg"}
                  alt={images[currentImageIndex].alt}
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-contain max-h-[80vh]"
                  loading="lazy"
                />
              </DialogContent>
            </Dialog>

            {/* Dots for navigation */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    currentImageIndex === index ? "bg-blue-900" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
