"use client"

type View = "home" | "register" | "consult" | "report"

interface NavigationProps {
  currentView: View
  onViewChange: (view: View) => void
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onViewChange("home")}
          className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors"
        >
          <div className="w-2 h-6 bg-primary rounded-sm"></div>
          <span className="text-foreground">SisConducI</span>
        </button>

        <div className="flex items-center gap-2">
          {[
            { id: "register", label: "Registrar" },
            { id: "consult", label: "Consultar" },
            { id: "report", label: "Reportes" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
