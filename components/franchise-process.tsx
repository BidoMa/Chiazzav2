export default function FranchiseProcess() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>

      <div className="space-y-12">
        {/* Step 1 */}
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex md:justify-end md:w-1/2 md:pr-8">
            <div className="md:text-right">
              <div className="text-lg font-bold text-blue-800 mb-1">1. Contacto inicial</div>
              <p className="text-gray-600">
                Completá el formulario de contacto y un asesor se comunicará contigo para brindarte información
                detallada.
              </p>
            </div>
          </div>
          <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center transform -translate-y-1 md:-translate-x-1/2 z-10">
            <span className="text-white font-bold">1</span>
          </div>
          <div className="pl-12 md:pl-0 md:w-1/2 md:pl-8"></div>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="md:w-1/2 md:pr-8"></div>
          <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center transform -translate-y-1 md:-translate-x-1/2 z-10">
            <span className="text-white font-bold">2</span>
          </div>
          <div className="pl-12 md:pl-0 md:w-1/2 md:pl-8">
            <div className="text-lg font-bold text-blue-800 mb-1">2. Entrevista personal</div>
            <p className="text-gray-600">
              Conoceremos tus objetivos y expectativas, y te presentaremos en detalle nuestra propuesta de franquicia.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex md:justify-end md:w-1/2 md:pr-8">
            <div className="md:text-right">
              <div className="text-lg font-bold text-blue-800 mb-1">3. Evaluación de ubicación</div>
              <p className="text-gray-600">
                Te ayudaremos a seleccionar la mejor ubicación para tu franquicia, analizando factores clave para el
                éxito.
              </p>
            </div>
          </div>
          <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center transform -translate-y-1 md:-translate-x-1/2 z-10">
            <span className="text-white font-bold">3</span>
          </div>
          <div className="pl-12 md:pl-0 md:w-1/2 md:pl-8"></div>
        </div>

        {/* Step 4 */}
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="md:w-1/2 md:pr-8"></div>
          <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center transform -translate-y-1 md:-translate-x-1/2 z-10">
            <span className="text-white font-bold">4</span>
          </div>
          <div className="pl-12 md:pl-0 md:w-1/2 md:pl-8">
            <div className="text-lg font-bold text-blue-800 mb-1">4. Firma del contrato</div>
            <p className="text-gray-600">
              Una vez acordados los términos, se procede a la firma del contrato de franquicia y el pago del canon de
              entrada.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex md:justify-end md:w-1/2 md:pr-8">
            <div className="md:text-right">
              <div className="text-lg font-bold text-blue-800 mb-1">5. Capacitación</div>
              <p className="text-gray-600">
                Recibirás capacitación completa sobre todos los aspectos del negocio, desde la elaboración hasta la
                gestión.
              </p>
            </div>
          </div>
          <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center transform -translate-y-1 md:-translate-x-1/2 z-10">
            <span className="text-white font-bold">5</span>
          </div>
          <div className="pl-12 md:pl-0 md:w-1/2 md:pl-8"></div>
        </div>

        {/* Step 6 */}
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="md:w-1/2 md:pr-8"></div>
          <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center transform -translate-y-1 md:-translate-x-1/2 z-10">
            <span className="text-white font-bold">6</span>
          </div>
          <div className="pl-12 md:pl-0 md:w-1/2 md:pl-8">
            <div className="text-lg font-bold text-blue-800 mb-1">6. Apertura</div>
            <p className="text-gray-600">
              Te acompañamos durante todo el proceso de apertura, desde la adecuación del local hasta la inauguración.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
