import { Factory, ChefHat, Users, Building2, DollarSign, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Factory,
    title: "Un solo proveedor (fábrica propia)",
    description:
      "Trabajás directamente con nuestra fábrica, garantizando calidad constante, precios competitivos y abastecimiento seguro sin intermediarios.",
  },
  {
    icon: ChefHat,
    title: "Sin cocina ni producción en el local",
    description:
      "No necesitás equipamiento de cocina ni personal especializado en producción. Recibís los productos listos para la venta, simplificando tu operación.",
  },
  {
    icon: Users,
    title: "Un empleado por turno",
    description:
      "Nuestro modelo está diseñado para funcionar eficientemente con una sola persona por turno, minimizando costos laborales y facilitando la gestión.",
  },
  {
    icon: Building2,
    title: "Locales chicos, fáciles de manejar",
    description:
      "Espacios compactos y funcionales que reducen costos de alquiler y mantenimiento, mientras maximizan la rentabilidad por metro cuadrado.",
  },
  {
    icon: DollarSign,
    title: "Inversión accesible",
    description:
      "Modelo de franquicia con una inversión inicial competitiva, diseñado para emprendedores que buscan una oportunidad de negocio sólida y rentable.",
  },
  {
    icon: TrendingUp,
    title: "Recuperable en 18–24 meses",
    description:
      "Retorno de inversión proyectado entre 18 y 24 meses, basado en nuestro modelo probado y el desempeño de franquicias existentes.",
  },
]

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Beneficios de nuestra franquicia</h2>
          <p className="text-gray-600">Descubrí las ventajas de formar parte de la red de franquicias Chiazza</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-amber-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-amber-100"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-800 rounded-lg p-3 mr-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
