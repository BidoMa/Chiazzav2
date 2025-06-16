import { Award, TrendingUp, Users, ShoppingBag, MapPin, PenToolIcon as Tool, type LucideIcon } from "lucide-react"

interface BenefitCardProps {
  icon: string
  title: string
  description: string
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-red-100">
      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-red-800" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-red-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
