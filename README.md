# Sistema de Registro de Faltas de Conducta Estudiantil (SisConducI)

## 📋 Descripción

SisConducI es un sistema integral de gestión de faltas de conducta estudiantil que permite registrar, consultar y reportar violaciones de conducta en instituciones educativas. El sistema asigna puntos automáticamente basados en la severidad de la falta y expide automaticamente a estudiantes que acumulen 90 o más puntos.

## ✨ Características Principales

### 1. **Módulo de Registro (Registro)**
- Registrar nuevas faltas de conducta estudiantil
- Información del estudiante (nombre, ID, grado)
- Selección de tipo de falta (violencia, intimidación, plagio, falta de respeto, mal comportamiento, ausentismo)
- Asignación automática de puntos según severidad:
  - **Violencia**: 30 puntos
  - **Intimidación (Bullying)**: 25 puntos
  - **Plagio/Deshonestidad Académica**: 20 puntos
  - **Falta de Respeto**: 15 puntos
  - **Mal Comportamiento**: 10 puntos
  - **Ausentismo**: 5 puntos
- Descripción detallada del incidente
- Fecha del incidente
- Guardado automático de registros

### 2. **Módulo de Consulta (Consultar)**
- Búsqueda de estudiantes por nombre o ID
- Vista detallada del historial de faltas del estudiante
- Visualización de puntos acumulados
- Indicador automático de expulsión (≥90 puntos)
- Filtrado por tipo de falta
- Historial completo de infracciones

### 3. **Módulo de Reportes (Reportes)**
- **Estadísticas Generales**: Total de estudiantes, faltas registradas, promedio de puntos
- **Estudiantes en Riesgo**: Listado de estudiantes con ≥90 puntos (expulsión)
- **Estudiantes en Advertencia**: Estudiantes con 60-89 puntos
- **Distribución de Faltas**: Gráfico de barras mostrando frecuencia por tipo
- **Progreso Visual**: Barras de progreso para cada categoría de riesgo
- **Exportación de Reportes**: Descarga de reportes en texto plano

## 🛠️ Tecnología Utilizada

- **Frontend**: Next.js 16 + React 19
- **Estilos**: Tailwind CSS v4
- **Lenguaje**: TypeScript
- **Estado**: React Hooks (useState, useEffect)
- **Almacenamiento**: Estado en componentes (listo para integración con backend)

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
\`\`\`bash
cd student-conduct-system
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

4. **Acceder a la aplicación**
\`\`\`
http://localhost:3000
\`\`\`

## 📱 Estructura del Proyecto

\`\`\`
app/
├── page.tsx                 # Página principal con navegación
├── layout.tsx              # Layout base de la aplicación
└── globals.css             # Estilos globales

components/
├── navigation.tsx          # Barra de navegación entre módulos
├── registration-form.tsx   # Formulario de registro de faltas
├── consultation-panel.tsx  # Panel de consulta de estudiantes
└── reporting-dashboard.tsx # Dashboard de reportes
\`\`\`

## 🚀 Uso de la Aplicación

### 1. Registrar una Falta

1. Navega a la pestaña **"Registro"**
2. Completa los campos del formulario:
   - **Nombre del Estudiante**: Nombre completo
   - **ID del Estudiante**: Número de identificación
   - **Grado**: Nivel académico
   - **Tipo de Falta**: Selecciona de la lista desplegable
   - **Descripción**: Detalle del incidente
   - **Fecha del Incidente**: Cuándo ocurrió
3. Haz clic en **"Registrar Falta"**
4. La falta se guardará y los puntos se asignarán automáticamente

### 2. Consultar Historial de Estudiante

1. Navega a la pestaña **"Consultar"**
2. Usa la barra de búsqueda para encontrar por:
   - **Nombre**: Nombre completo o parcial del estudiante
   - **ID**: Número de identificación
3. Selecciona el estudiante de los resultados
4. Visualiza:
   - Puntos totales acumulados
   - Estatus (Normal, Advertencia, Expulsado)
   - Historial completo de faltas
   - Detalles de cada incidente

### 3. Generar Reportes

1. Navega a la pestaña **"Reportes"**
2. Visualiza en tiempo real:
   - **Estadísticas Generales**: Resumen de datos
   - **Estudiantes en Riesgo**: Quiénes están cerca/en expulsión
   - **Estudiantes en Advertencia**: Quiénes están en zona amarilla
   - **Gráfico de Distribución**: Tipos de faltas más frecuentes
3. **Exportar Reporte**: Haz clic en "Descargar Reporte" para obtener texto plano

## 💡 Reglas de Negocio

| Rango de Puntos | Estado | Acción |
|---|---|---|
| 0-59 | Normal | Sin restricciones |
| 60-89 | Advertencia | Se requiere intervención educativa |
| 90+ | Expulsado | Expulsión automática |

## 🔄 Integración con Backend

El sistema actual funciona con datos en memoria. Para integración con backend:

1. **Reemplazar estado local** con llamadas a API
2. **Endpoints recomendados**:
   - `POST /api/faltas` - Crear falta
   - `GET /api/estudiantes?search=` - Buscar estudiantes
   - `GET /api/estudiantes/:id/faltas` - Obtener faltas de estudiante
   - `GET /api/reportes` - Obtener datos de reportes

3. **Estructura de datos sugerida**:

\`\`\`typescript
interface Falta {
  id: string;
  estudianteId: string;
  nombreEstudiante: string;
  tipoFalta: string;
  puntos: number;
  descripcion: string;
  fecha: string;
}

interface Estudiante {
  id: string;
  nombre: string;
  grado: string;
  puntosAcumulados: number;
  faltas: Falta[];
  estatus: 'normal' | 'advertencia' | 'expulsado';
}
\`\`\`

## 📊 Ejemplo de Datos

El sistema viene con datos de ejemplo para demostración:
- 5 estudiantes registrados
- 15 faltas distribuidas
- Diferentes tipos de infracciones
- Variados rangos de puntos

## 🎨 Customización

### Cambiar Puntos de Severidad
Edita en `components/registration-form.tsx`:
\`\`\`typescript
const OFFENSE_POINTS: Record<string, number> = {
  'violencia': 30,
  'intimidación': 25,
  // ... más infracciones
}
\`\`\`

### Modificar Umbrales de Expulsión
Edita en `components/consultation-panel.tsx`:
\`\`\`typescript
const isExpelled = studentTotal >= 90; // Cambiar 90 por otro valor
\`\`\`

### Cambiar Colores y Tema
Edita en `app/globals.css`:
\`\`\`css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #2563eb;
  /* ... más variables */
}
\`\`\`

## 🐛 Troubleshooting

| Problema | Solución |
|---|---|
| Datos no persisten al recargar | Los datos se guardan en memoria. Integra con backend para persistencia |
| Búsqueda no funciona | Verifica que el nombre o ID sean correctos |
| Reportes vacíos | Registra faltas primero desde el módulo de Registro |

## 📝 Notas Técnicas

- **Responsivo**: Funciona en desktop, tablet y móvil
- **Idioma**: Interfaz completa en español
- **Sin dependencias externas pesadas**: Usa componentes nativos de React
- **Preparado para escalabilidad**: Arquitectura modular lista para crecimiento
- **Accesibilidad**: Cumple con estándares WCAG básicos

## 🔐 Consideraciones de Seguridad

Antes de usar en producción:
1. Implementar autenticación de usuarios
2. Validar datos en servidor
3. Usar HTTPS para transmisión de datos
4. Cifrar información sensible (IDs de estudiantes)
5. Implementar logs de auditoría
6. Cumplir con regulaciones de protección de datos

## 📚 Próximas Mejoras

- [ ] Integración con base de datos
- [ ] Autenticación de usuarios
- [ ] Exportación a Excel/PDF
- [ ] Notificaciones a padres/tutores
- [ ] Panel de análisis avanzado
- [ ] Historial de cambios (auditoría)
- [ ] Múltiples instituciones

## 👥 Soporte

Para preguntas o problemas:
1. Revisa la sección de Troubleshooting
2. Consulta la documentación técnica
3. Contacta al equipo de desarrollo

## 📄 Licencia

Este proyecto es de uso interno para instituciones educativas.

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025  
**Estado**: Listo para implementación
