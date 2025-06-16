"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    zonaInteres: "",
    mensaje: "",
    aceptaTerminos: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, zonaInteres: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, aceptaTerminos: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones para continuar.")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitted(true)
    } catch (err) {
      setError("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
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
            className="h-6 w-6 text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-700 mb-2">¡Gracias por tu interés!</h3>
        <p className="text-gray-600">
          Hemos recibido tu información y nos pondremos en contacto contigo a la brevedad.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">
            Nombre<span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellido">
            Apellido<span className="text-red-500">*</span>
          </Label>
          <Input
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Tu apellido"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Correo electrónico<span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="celular">
          Celular<span className="text-red-500">*</span>
        </Label>
        <Input
          id="celular"
          name="celular"
          type="tel"
          value={formData.celular}
          onChange={handleChange}
          placeholder="+54 11 1234 5678"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zonaInteres">
          Zona de interés<span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={handleSelectChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="capital-federal">Capital Federal</SelectItem>
            <SelectItem value="gran-buenos-aires">Gran Buenos Aires</SelectItem>
            <SelectItem value="cordoba">Córdoba</SelectItem>
            <SelectItem value="rosario">Rosario</SelectItem>
            <SelectItem value="mendoza">Mendoza</SelectItem>
            <SelectItem value="otra">Otra provincia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensaje">Mensaje (opcional)</Label>
        <Textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Cuéntanos más sobre tu interés en nuestra franquicia..."
          rows={4}
        />
      </div>

      <div className="flex items-start space-x-2 pt-2">
        <Checkbox id="aceptaTerminos" checked={formData.aceptaTerminos} onCheckedChange={handleCheckboxChange} />
        <Label
          htmlFor="aceptaTerminos"
          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Acepto los{" "}
          <a href="#" className="text-red-800 hover:underline">
            términos y condiciones
          </a>{" "}
          y la{" "}
          <a href="#" className="text-red-800 hover:underline">
            política de privacidad
          </a>
        </Label>
      </div>

      {error && <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">{error}</div>}

      <Button type="submit" className="w-full bg-red-800 hover:bg-red-900 text-white" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </span>
        ) : (
          "Solicitar información"
        )}
      </Button>
    </form>
  )
}
