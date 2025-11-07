"use client"

import { useMemo } from "react"

interface ReportingDashboardProps {
  records: any[]
}

const OFFENSE_LABELS: Record<string, string> = {
  violence: "Violencia",
  bullying: "Acoso/Bullying",
  cheating: "Deshonestidad Académica",
  disrespect: "Falta de Respeto",
  absence: "Inasistencia Injustificada",
  lateness: "Retrasos Reiterados",
}

export function ReportingDashboard({ records }: ReportingDashboardProps) {
  const stats = useMemo(() => {
    const totalRecords = records.length
    const totalPoints = records.reduce((sum, r) => sum + (r.points || 0), 0)
    const totalStudentsWithOffenses = new Set(records.map((r) => r.studentId)).size

    const offenseBreakdown: Record<string, number> = {}
    const offensePoints: Record<string, number> = {}
    records.forEach((record) => {
      offenseBreakdown[record.offenseType] = (offenseBreakdown[record.offenseType] || 0) + 1
      offensePoints[record.offenseType] = (offensePoints[record.offenseType] || 0) + (record.points || 0)
    })

    // Calculate expulsion risk students
    const studentPoints: Record<string, number> = {}
    records.forEach((record) => {
      studentPoints[record.studentId] = (studentPoints[record.studentId] || 0) + (record.points || 0)
    })

    const atRiskStudents = Object.entries(studentPoints).filter(([_, points]) => points >= 90)
    const warningStudents = Object.entries(studentPoints).filter(([_, points]) => points >= 60 && points < 90)

    return {
      totalRecords,
      totalPoints,
      totalStudentsWithOffenses,
      offenseBreakdown,
      offensePoints,
      atRiskStudents,
      warningStudents,
    }
  }, [records])

  const exportToPDF = () => {
    const content = `
REPORTE DE FALTAS DE CONDUCTA ESTUDIANTIL
Generado: ${new Date().toLocaleDateString("es-ES")}

ESTADÍSTICAS GENERALES
- Total de registros: ${stats.totalRecords}
- Total de estudiantes: ${stats.totalStudentsWithOffenses}
- Puntos totales acumulados: ${stats.totalPoints}

ESTUDIANTES EN RIESGO DE EXPULSIÓN (≥90 puntos)
${stats.atRiskStudents.length === 0 ? "Ninguno" : stats.atRiskStudents.map(([id, points]) => `- ${id}: ${points} puntos`).join("\n")}

ESTUDIANTES EN ADVERTENCIA (60-89 puntos)
${stats.warningStudents.length === 0 ? "Ninguno" : stats.warningStudents.map(([id, points]) => `- ${id}: ${points} puntos`).join("\n")}

DESGLOSE POR TIPO DE FALTA
${Object.entries(stats.offenseBreakdown)
  .map(([type, count]) => `- ${OFFENSE_LABELS[type]}: ${count} registros (${stats.offensePoints[type]} puntos)`)
  .join("\n")}
    `.trim()

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", `reporte_conducta_${new Date().toISOString().split("T")[0]}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reportes y Estadísticas</h1>
        <p className="text-muted-foreground">Análisis integral del sistema de conducta estudiantil</p>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay registros para generar reportes</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Total de Registros</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalRecords}</p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Estudiantes Registrados</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalStudentsWithOffenses}</p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Puntos Acumulados</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalPoints}</p>
            </div>

            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive">
              <p className="text-sm text-muted-foreground mb-1">En Riesgo de Expulsión</p>
              <p className="text-3xl font-bold text-destructive">{stats.atRiskStudents.length}</p>
            </div>
          </div>

          {/* At Risk Students */}
          {stats.atRiskStudents.length > 0 && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive">
              <h3 className="font-semibold text-destructive mb-3">Estudiantes en Riesgo de Expulsión</h3>
              <div className="space-y-2">
                {stats.atRiskStudents.map(([studentId, points]) => (
                  <p key={studentId} className="text-sm text-foreground">
                    {studentId}: <span className="font-bold text-destructive">{points} puntos</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Warning Students */}
          {stats.warningStudents.length > 0 && (
            <div className="p-4 rounded-lg bg-accent/10 border border-accent">
              <h3 className="font-semibold text-accent mb-3">Estudiantes en Advertencia (60-89 puntos)</h3>
              <div className="space-y-2">
                {stats.warningStudents.map(([studentId, points]) => (
                  <p key={studentId} className="text-sm text-foreground">
                    {studentId}: <span className="font-bold text-accent">{points} puntos</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Offense Breakdown */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Desglose por Tipo de Falta</h3>
            <div className="space-y-3">
              {Object.entries(stats.offenseBreakdown).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {OFFENSE_LABELS[type as keyof typeof OFFENSE_LABELS]}
                    </p>
                    <div className="w-full bg-border rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(count / stats.totalRecords) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-semibold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{stats.offensePoints[type]} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToPDF}
            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Descargar Reporte en Texto
          </button>
        </div>
      )}
    </div>
  )
}
