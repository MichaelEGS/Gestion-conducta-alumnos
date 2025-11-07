"use client"

import type React from "react"

import { useState } from "react"

interface RegistrationFormProps {
  onSubmit: (record: any) => void
}

const OFFENSE_TYPES = [
  { id: "violence", label: "Violencia", points: 30 },
  { id: "bullying", label: "Acoso/Bullying", points: 25 },
  { id: "cheating", label: "Deshonestidad Académica", points: 20 },
  { id: "disrespect", label: "Falta de Respeto", points: 15 },
  { id: "absence", label: "Inasistencia Injustificada", points: 10 },
  { id: "lateness", label: "Retrasos Reiterados", points: 5 },
]

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    offenseType: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    registeredBy: "",
  })

  const selectedOffense = OFFENSE_TYPES.find((o) => o.id === formData.offenseType)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      points: selectedOffense?.points || 0,
      timestamp: new Date().toISOString(),
    })
    setFormData({
      studentName: "",
      studentId: "",
      offenseType: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      registeredBy: "",
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Registrar Nueva Falta</h1>
        <p className="text-muted-foreground">Completa el formulario para registrar una falta de conducta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Nombre del Estudiante *</label>
            <input
              type="text"
              required
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Juan García"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">ID/Matrícula del Estudiante *</label>
            <input
              type="text"
              required
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: EST2024001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Tipo de Falta *</label>
          <select
            required
            value={formData.offenseType}
            onChange={(e) => setFormData({ ...formData, offenseType: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Selecciona un tipo de falta</option>
            {OFFENSE_TYPES.map((offense) => (
              <option key={offense.id} value={offense.id}>
                {offense.label} ({offense.points} puntos)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Descripción de la Falta *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
            placeholder="Describe detalladamente los hechos ocurridos"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Fecha de la Falta *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Registrado Por *</label>
            <input
              type="text"
              required
              value={formData.registeredBy}
              onChange={(e) => setFormData({ ...formData, registeredBy: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nombre del docente/personal"
            />
          </div>
        </div>

        {selectedOffense && (
          <div className="p-4 rounded-lg bg-accent/10 border border-accent">
            <p className="text-sm text-foreground">
              <strong>Puntos asignados:</strong> {selectedOffense.points} puntos
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          Registrar Falta
        </button>
      </form>
    </div>
  )
}
