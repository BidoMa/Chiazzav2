import { Factory, Store, User, Home, DollarSign, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Factory,
    title: "Un solo proveedor (fábrica propia)",
    description:
      "Contamos con nuestra propia fábrica, lo que garantiza calidad constante, precios competitivos y abastecimiento seguro para tu franquicia.",
  },
  {
    icon: Store,
    title: "Sin cocina ni producción en el local",
    description:
      "Tu local no necesita cocina ni equipos de producción. Recibís los productos listos para la venta, simplificando la operación y reduciendo costos.",
  },
  {
    icon: User,
    title: "Un empleado por turno",
    description:
      "El modelo está diseñado para funcionar eficientemente con una sola persona por turno, minimizando costos laborales y facilitando la gestión.",
  },
  {
    icon: Home,
    title: "Locales chicos, fáciles de manejar",
    description:
      "Espacios compactos y funcionales que reducen costos de alquiler y mantenimiento, mientras maximizan la rentabilidad por metro cuadrado.",
  },
  {
    icon: DollarSign,
    title: "Inversión accesible",
    description:
      "Modelo de inversión diseñado para ser accesible, con costos iniciales optimizados y estructura financiera clara y transparente.",
  },
  {
    icon: TrendingUp,
    title: "Recuperable en 18–24 meses",
    description:
      "Retorno de inversión proyectado entre 18 y 24 meses, basado en nuestro modelo de negocio probado y la demanda del mercado.",
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Beneficios de nuestra franquicia</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Descubrí las ventajas únicas que hacen de Chiazza la oportunidad de negocio ideal para emprendedores que
            buscan éxito y rentabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <benefit.icon className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
