import { Star, Users, ThumbsUp, Award } from "lucide-react"

export default function CustomerSatisfaction() {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 border border-amber-100 shadow-sm">
      <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Lo que nuestros clientes aman</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-amber-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Calidad Premium</h4>
          <p className="text-gray-600 text-sm">
            El 98% de nuestros clientes califica nuestros productos como excelentes en sabor y calidad
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-amber-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Experiencia Única</h4>
          <p className="text-gray-600 text-sm">
            Atención personalizada y ambiente acogedor que invita a nuestros clientes a regresar
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <ThumbsUp className="h-6 w-6 text-amber-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Recomendación</h4>
          <p className="text-gray-600 text-sm">9 de cada 10 clientes recomiendan Chiazza a sus amigos y familiares</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-amber-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Reconocimiento</h4>
          <p className="text-gray-600 text-sm">
            Premiados como la mejor chocolatería artesanal de Argentina por 3 años consecutivos
          </p>
        </div>
      </div>
    </div>
  )
}
