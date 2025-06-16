import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  location: string
  rating: number
}

export default function TestimonialCard({ quote, author, role, location, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-transform hover:shadow-lg">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="italic text-gray-600 mb-6">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="ml-3">
          <p className="font-medium">{author}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{role}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
