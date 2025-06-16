import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InvestmentCardProps {
  title: string
  price: string
  description: string
  features: string[]
  recommended: boolean
}

export default function InvestmentCard({ title, price, description, features, recommended }: InvestmentCardProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden border ${recommended ? "border-red-200 shadow-lg" : "border-gray-200"} transition-transform hover:shadow-xl`}
    >
      {recommended && <div className="bg-red-800 text-white text-center py-2 text-sm font-medium">Recomendado</div>}
      <div className={`p-6 ${recommended ? "bg-white" : "bg-white"}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-red-800">{price}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={`w-full ${recommended ? "bg-red-800 hover:bg-red-900 text-white" : "bg-white border border-red-800 text-red-800 hover:bg-red-50"}`}
        >
          <a href="#contacto">Solicitar información</a>
        </Button>
      </div>
    </div>
  )
}
