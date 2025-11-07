"use client"

import { useState, useMemo } from "react"

interface ConsultationPanelProps {
  records: any[]
}

export function ConsultationPanel({ records }: ConsultationPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = !filterType || record.offenseType === filterType

      return matchesSearch && matchesFilter
    })
  }, [records, searchTerm, filterType])

  const totalPoints = useMemo(() => {
    return filteredRecords.reduce((sum, record) => sum + (record.points || 0), 0)
  }, [filteredRecords])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Consultar Registros</h1>
        <p className="text-muted-foreground">Busca faltas registradas de estudiantes</p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Buscar por nombre o matrícula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Filtrar por tipo de falta</option>
              <option value="violence">Violencia</option>
              <option value="bullying">Acoso/Bullying</option>
              <option value="cheating">Deshonestidad Académica</option>
              <option value="disrespect">Falta de Respeto</option>
              <option value="absence">Inasistencia Injustificada</option>
              <option value="lateness">Retrasos Reiterados</option>
            </select>
          </div>
        </div>

        {filteredRecords.length > 0 && (
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-foreground">
              <strong>Registros encontrados:</strong> {filteredRecords.length} |
              <strong className="ml-4">Puntos acumulados:</strong> {totalPoints}
              {totalPoints >= 90 && <span className="ml-4 text-destructive font-semibold">⚠️ EXPULSIÓN AUTOMÁTICA</span>}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron registros</p>
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Estudiante</p>
                    <p className="font-semibold text-foreground">{record.studentName}</p>
                    <p className="text-xs text-muted-foreground">ID: {record.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Falta</p>
                    <p className="font-semibold text-foreground">{record.offenseType}</p>
                    <p className="text-xs font-bold text-primary">{record.points} puntos</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground">Descripción</p>
                  <p className="text-foreground text-sm">{record.description}</p>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Fecha: {record.date}</span>
                  <span>Registrado por: {record.registeredBy}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
