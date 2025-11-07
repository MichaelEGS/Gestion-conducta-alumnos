"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { RegistrationForm } from "@/components/registration-form"
import { ConsultationPanel } from "@/components/consultation-panel"
import { ReportingDashboard } from "@/components/reporting-dashboard"

type View = "home" | "register" | "consult" | "report"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home")
  const [records, setRecords] = useState<any[]>([])

  const handleAddRecord = (record: any) => {
    setRecords([...records, { ...record, id: Date.now() }])
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <div className="container mx-auto px-4 py-8">
        {currentView === "home" && (
          <div className="space-y-12">
            <section className="text-center space-y-6">
              <h1 className="text-4xl font-bold text-foreground">Sistema de Registro de Faltas de Conducta</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Gestión integral de faltas de conducta estudiantil con registro, consulta y generación de reportes
              </p>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
              <button
                onClick={() => setCurrentView("register")}
                className="p-8 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
              >
                <div className="text-3xl mb-4">📝</div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">Registrar Falta</h2>
                <p className="text-sm text-muted-foreground">
                  Registra nuevas faltas de conducta estudiantil en el sistema
                </p>
              </button>

              <button
                onClick={() => setCurrentView("consult")}
                className="p-8 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
              >
                <div className="text-3xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">Consultar Registros</h2>
                <p className="text-sm text-muted-foreground">Busca y consulta faltas registradas de estudiantes</p>
              </button>

              <button
                onClick={() => setCurrentView("report")}
                className="p-8 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
              >
                <div className="text-3xl mb-4">📊</div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">Reportes</h2>
                <p className="text-sm text-muted-foreground">Genera reportes y estadísticas del sistema de conducta</p>
              </button>
            </div>
          </div>
        )}

        {currentView === "register" && <RegistrationForm onSubmit={handleAddRecord} />}

        {currentView === "consult" && <ConsultationPanel records={records} />}

        {currentView === "report" && <ReportingDashboard records={records} />}
      </div>
    </main>
  )
}
