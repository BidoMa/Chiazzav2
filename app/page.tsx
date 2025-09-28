"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Coffee, Star, Award, Users, X } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import ProductShowcase from "@/components/product-showcase"
import { Separator } from "@/components/ui/separator"
import HubspotForm from "@/components/hubspot-form"
import HubspotFormContact from "@/components/hubspot-form-contact"
import AnimatedCTA from "@/components/animated-cta"
import BenefitsSection from "@/components/benefits-section"
import ScrollIndicator from "@/components/scroll-indicator"
import ProductionCenter from "@/components/production-center"
import HeroBackground from "@/components/hero-background"
import YouTubeEmbed from "@/components/youtube-embed"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 py-4 border-b border-b-blue-800 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/chiazza-logo-new.webp"
                alt="Chocolates CHIAZZA"
                width={180}
                height={60}
                className="h-12 w-auto invert-0"
                priority
              />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#productos" className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
                Productos
              </a>
              <a href="#beneficios" className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
                Beneficios
              </a>
              <a href="#locales" className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
                Locales
              </a>
              <a href="#testimonios" className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
                Testimonios
              </a>
              <a href="#contacto" className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
                Contacto
              </a>
            </nav>
            <Button className="bg-white text-blue-900 hover:bg-blue-100 hidden md:flex rounded-full min-w-[48px] min-h-[48px]">
              <a href="#contacto">Solicitar información</a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden min-w-[48px] min-h-[48px] text-white"
              aria-label="Abrir menú de navegación"
              onClick={toggleMobileMenu}
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
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-blue-900">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-blue-800">
                <Image
                  src="/chiazza-logo-new.webp"
                  alt="Chocolates CHIAZZA"
                  width={150}
                  height={50}
                  className="h-10 w-auto invert-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white min-w-[48px] min-h-[48px]"
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col p-4 space-y-4">
                <a
                  href="#productos"
                  className="text-lg font-medium text-white hover:text-blue-200 transition-colors py-3 border-b border-blue-800"
                  onClick={closeMobileMenu}
                >
                  Productos
                </a>
                <a
                  href="#beneficios"
                  className="text-lg font-medium text-white hover:text-blue-200 transition-colors py-3 border-b border-blue-800"
                  onClick={closeMobileMenu}
                >
                  Beneficios
                </a>
                <a
                  href="#locales"
                  className="text-lg font-medium text-white hover:text-blue-200 transition-colors py-3 border-b border-blue-800"
                  onClick={closeMobileMenu}
                >
                  Locales
                </a>
                <a
                  href="#testimonios"
                  className="text-lg font-medium text-white hover:text-blue-200 transition-colors py-3 border-b border-blue-800"
                  onClick={closeMobileMenu}
                >
                  Testimonios
                </a>
                <a
                  href="#contacto"
                  className="text-lg font-medium text-white hover:text-blue-200 transition-colors py-3 border-b border-blue-800"
                  onClick={closeMobileMenu}
                >
                  Contacto
                </a>
                <div className="pt-4">
                  <Button
                    className="bg-white text-blue-900 hover:bg-blue-100 w-full rounded-full min-h-[48px]"
                    onClick={closeMobileMenu}
                  >
                    <a href="#contacto" className="w-full">
                      Solicitar información
                    </a>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Scroll Progress Indicator */}
      <ScrollIndicator />

      {/* Hero Section */}
      <section className="relative text-white min-h-screen flex items-center">
        <HeroBackground />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block mb-6 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
                <span className="text-sm font-medium">Oportunidad de negocio</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Abrí tu chocolatería simple de operar con el respaldo de Chiazza
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Un solo proveedor, sin producción y con apenas un empleado por turno
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedCTA text="Solicitar información" href="#contacto" variant="primary" />
                <AnimatedCTA
                  text="Conocer más"
                  href="#beneficios"
                  variant="primary"
                  icon={<Coffee className="h-4 w-4" />}
                />
              </div>
            </div>
            <div className="block">
              <Suspense fallback={<div className="min-h-[400px] bg-white/10 rounded-xl animate-pulse"></div>}>
                <HubspotForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-800">20+</p>
              <p className="text-sm text-gray-600 mt-1">Años de experiencia</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-800">10+</p>
              <p className="text-sm text-gray-600 mt-1">Locales en Argentina</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-800">+50</p>
              <p className="text-sm text-gray-600 mt-1">Productos exclusivos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6">
          <ProductShowcase />

          <div className="flex justify-center mt-12">
            <AnimatedCTA
              text="Convertite en franquiciado"
              href="#contacto"
              variant="primary"
              icon={<Star className="h-4 w-4" />}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Suspense fallback={<div className="min-h-[600px] bg-amber-50 animate-pulse"></div>}>
        <BenefitsSection />
      </Suspense>

      {/* Production Center Section */}
      <section id="locales">
        <ProductionCenter />
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Lo que dicen nuestros franquiciados</h2>
            <p className="text-gray-600">Conocé las experiencias de quienes ya forman parte de la familia Chiazza</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Unirme a la familia Chiazza fue la mejor decisión para mi carrera como emprendedor. El producto es excepcional y el apoyo constante."
              author=""
              role="Franquiciado desde 2023"
              location="Buenos Aires"
              rating={5}
            />
            <TestimonialCard
              quote="Los clientes adoran nuestros productos y regresan constantemente. La rentabilidad ha superado mis expectativas iniciales."
              author=""
              role="Franquiciada desde 2024"
              location="Buenos Aires"
              rating={5}
            />
            <TestimonialCard
              quote="El equipo de Chiazza me ha brindado todo el soporte necesario desde el primer día. La capacitación fue completa y práctica."
              author=""
              role="Franquiciado desde 2024"
              location="Buenos Aires"
              rating={5}
            />
          </div>

          <div className="flex justify-center mt-12">
            <AnimatedCTA
              text="Quiero mi franquicia"
              href="#contacto"
              variant="primary"
              icon={<Award className="h-4 w-4" />}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Preguntas frecuentes</h2>
            <p className="text-gray-600">Respondemos tus dudas sobre nuestra franquicia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Cuánto tiempo toma abrir una franquicia?</h3>
              <p className="text-gray-600">
                El proceso completo desde la firma del contrato hasta la apertura suele tomar entre 3 y 4 meses,
                dependiendo de factores como la ubicación y las adecuaciones necesarias.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Qué experiencia previa necesito?</h3>
              <p className="text-gray-600">
                No es necesaria experiencia previa en el rubro. Brindamos capacitación completa y acompañamiento
                constante para asegurar el éxito de tu negocio.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Cuál es el retorno de inversión esperado?</h3>
              <p className="text-gray-600">
                El ROI estimado es de 18-24 meses. Depende de la ubicación y la gestión del franquiciado.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Ofrecen exclusividad territorial?</h3>
              <p className="text-gray-600">
                Sí, ofrecemos exclusividad territorial según el formato de franquicia elegido, garantizando un radio de
                operación sin competencia de otras tiendas Chiazza.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Qué soporte post-apertura brindan?</h3>
              <p className="text-gray-600">
                Brindamos soporte continuo que incluye visitas periódicas, capacitaciones de actualización, asistencia
                en marketing y publicidad, y asesoramiento operativo permanente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Acompañan en la búsqueda del local?</h3>
              <p className="text-gray-600">
                Chiazza te acompaña en la búsqueda y armado de local. Brindando apoyo y asesoramiento para elegir la
                ubicación más adecuada.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <AnimatedCTA text="Resolver mis dudas" href="#contacto" variant="primary" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">¿Listo para comenzar?</h2>
                <p className="text-gray-600 mb-4">
                  Completá el formulario y un asesor se pondrá en contacto contigo para brindarte toda la información
                  sobre cómo abrir tu propia franquicia Chiazza.
                </p>
              </div>

              <div className="relative h-[300px] md:h-[400px] shadow-xl overflow-hidden rounded-xl">
                <YouTubeEmbed
                  videoId="gXgC6TYPurc"
                  title="Chocolates CHIAZZA | Franquicias Disponibles"
                  className="w-full h-full"
                />
              </div>
            </div>

            <Suspense fallback={<div className="min-h-[400px] bg-white rounded-xl shadow-lg animate-pulse"></div>}>
              <HubspotFormContact />
            </Suspense>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">¿Listo para ser parte de Chiazza?</h2>
              <p className="text-white/80">
                Comenzá hoy mismo tu camino hacia tu propia franquicia de chocolates premium
              </p>
            </div>
            <AnimatedCTA
              text="Solicitar información"
              href="#contacto"
              variant="chiazzaRed"
              icon={<Users className="h-4 w-4" />}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/chiazza-logo.png"
                alt="Chocolates CHIAZZA"
                width={180}
                height={60}
                className="h-12 w-auto mb-4 brightness-0 invert"
                loading="lazy"
              />
              <p className="text-sm text-gray-400 mb-4">
                El mejor chocolate artesanal de Argentina con más de 15 años de experiencia.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/chocolateschiazza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Visitar Facebook de Chiazza"
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/chocolateschiazza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Visitar Instagram de Chiazza"
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
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#productos" className="text-gray-400 hover:text-white">
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-gray-400 hover:text-white">
                    Beneficios
                  </a>
                </li>
                <li>
                  <a href="#locales" className="text-gray-400 hover:text-white">
                    Locales
                  </a>
                </li>
                <li>
                  <a href="#testimonios" className="text-gray-400 hover:text-white">
                    Testimonios
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-gray-400 hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="bg-gray-800" />
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Chiazza. Todos los derechos reservados. Canudas Profesionales en Franquicia
              ©2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
