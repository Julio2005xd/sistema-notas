import React, { useMemo, useState } from 'react';
import {
  Bell, BookOpen, CalendarDays, CheckCircle2, ClipboardList,
  FileText, GraduationCap, LayoutDashboard, LineChart, Lock,
  Search, Settings, ShieldCheck, UserRound, Users, TrendingUp,
  AlertTriangle, Award, Clock, ChevronRight, Sparkles,
} from 'lucide-react';

/* ─────────────────────────── NAVIGATION ─────────────────────────── */

const screens = [
  { id: 'login',         label: 'Inicio de sesión',    icon: Lock,          group: 'acceso' },
  { id: 'student-home',  label: 'Panel estudiante',     icon: GraduationCap, group: 'estudiante' },
  { id: 'student-notes', label: 'Consulta de notas',    icon: BookOpen,      group: 'estudiante' },
  { id: 'teacher-home',  label: 'Panel profesor',       icon: UserRound,     group: 'docente' },
  { id: 'teacher-grades',label: 'Registro de notas',    icon: ClipboardList, group: 'docente' },
  { id: 'publish',       label: 'Publicación',          icon: Bell,          group: 'docente' },
  { id: 'admin-home',    label: 'Panel administrativo', icon: ShieldCheck,   group: 'admin' },
  { id: 'reports',       label: 'Reportes y alertas',   icon: LineChart,     group: 'admin' },
  { id: 'catalogs',      label: 'Gestión general',      icon: Settings,      group: 'admin' },
];

const groups = {
  acceso:     'Acceso',
  estudiante: 'Estudiante',
  docente:    'Docente',
  admin:      'Administración',
};

/* ─────────────────────────── UI ATOMS ──────────────────────────── */

function Badge({ variant = 'ocean', children }) {
  const cls = {
    ocean: 'badge-ocean',
    mint:  'badge-mint',
    sea:   'badge-sea',
  }[variant] ?? 'badge-ocean';
  return <span className={cls}>{children}</span>;
}

function Card({ title, subtitle, children, className = '', accent = false }) {
  return (
    <div className={`rounded-3xl border bg-white shadow-ocean-sm overflow-hidden transition-all duration-200 hover:shadow-ocean-md ${accent ? 'border-[#1C2440]/15' : 'border-ocean-100'} ${className}`}>
      {(title || subtitle) && (
        <div className={`border-b px-5 py-4 ${accent ? 'border-[#1C2440]/10 bg-[#1C2440]/[0.03]' : 'border-ocean-50'}`}>
          {title && (
            <h3 className="text-sm font-semibold text-[#0e1840]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {title}
            </h3>
          )}
          {subtitle && <p className="mt-0.5 text-xs text-ocean-400">{subtitle}</p>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, placeholder, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[#1C2440]/50">
        {label}
      </label>
      <div className="rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] px-4 py-3 text-sm text-[#1C2440]/40">
        {placeholder}
      </div>
    </div>
  );
}

function TableShell({ headers, rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1C2440]/10">
      <table className="min-w-full divide-y divide-[#1C2440]/5 text-sm">
        <thead>
          <tr style={{ background: 'linear-gradient(90deg, #01155e 0%, #000e3f 100%)' }}>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/80">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1C2440]/5 bg-white">
          {rows.map((row, idx) => (
            <tr key={idx} className="transition-colors duration-150 hover:bg-[#1C2440]/[0.03]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[#0e1840]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TopBar({ title, description, badges = [] }) {
  const defaultBadges = [
    { label: 'Prototipo UI',    variant: 'ocean' },
    { label: 'Sistema de Notas', variant: 'sea' },
    { label: 'Vite + React',    variant: 'mint' },
  ];
  const items = badges.length ? badges : defaultBadges;
  return (
    <div className="mb-6 animate-fade-in flex flex-col gap-3 rounded-3xl border border-[#1C2440]/10 bg-white p-5 shadow-ocean-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0e1840]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {title}
        </h2>
        <p className="mt-1 text-sm text-[#1C2440]/50">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((b) => <Badge key={b.label} variant={b.variant}>{b.label}</Badge>)}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color = 'ocean' }) {
  const gradients = {
    ocean: 'linear-gradient(135deg, #01155f 0%, #021357 100%)',
    sea:   'linear-gradient(135deg, #01114d 0%, #00197c 100%)',
    mint:  'linear-gradient(135deg, #7FE033 0%, #64c420 100%)',
    amber: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  };
  return (
    <div className="rounded-3xl border border-[#1C2440]/10 bg-white p-5 shadow-ocean-sm transition-all duration-200 hover:shadow-ocean-md hover:-translate-y-0.5 group">
      <div className="mb-3 inline-flex rounded-2xl p-2.5 shadow-ocean-sm" style={{ background: gradients[color] }}>
        <TrendingUp className="h-4 w-4 text-white" />
      </div>
      <p className="text-xs font-medium text-[#1C2440]/50">{label}</p>
      <p className="mt-1 text-3xl font-bold text-[#0e1840]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
      {sub && <p className="mt-1 text-xs text-[#1C2440]/40">{sub}</p>}
    </div>
  );
}

function StatusPill({ ok, label }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] px-4 py-3 text-sm">
      <span className="text-[#0e1840]">{label}</span>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        ok
          ? 'bg-[#7FE033]/15 text-[#4d9e14] border border-[#7FE033]/30'
          : 'bg-amber-50 text-amber-600 border border-amber-200'
      }`}>
        <CheckCircle2 className="h-3.5 w-3.5" />
        {ok ? 'Listo' : 'Pendiente'}
      </span>
    </div>
  );
}

function QuickAction({ label }) {
  return (
    <div className="group flex cursor-default items-center justify-between rounded-2xl border border-[#1C2440]/10 bg-white px-4 py-3.5 text-sm font-medium text-[#0e1840] shadow-ocean-sm transition-all duration-200 hover:border-[#1C2440]/30 hover:bg-[#1C2440]/[0.03] hover:shadow-ocean-md">
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-[#1C2440]/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#1C2440]/60" />
    </div>
  );
}

/* ─────────────────────────── SCREENS ────────────────────────────── */

function LoginScreen() {
  return (
    <div className="animate-fade-in grid gap-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl">
        <div className="flex h-full flex-col p-8 text-white" style={{ background: 'linear-gradient(160deg, #02124e 0%, #02124e 55%, #041c70 100%)' }}>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/15 p-3 shadow-lg backdrop-blur-sm">
              <LayoutDashboard className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60">Fundacion Universitaria Monserrate</p>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>Sistema de Notas</h3>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
            Acceso por roles para estudiantes, profesores y administrativos.
            Pantalla de referencia para el inicio de sesión institucional.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs font-medium">
            {['Autenticación', 'Roles', 'Seguridad'].map((t) => (
              <div key={t} className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm border border-white/10">{t}</div>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/50">Acceso seguro 256-bit SSL</p>
              <p className="mt-1 text-sm font-semibold" style={{ color: '#7FE033' }}>Protección institucional activa</p>
            </div>
          </div>
        </div>
      </div>

      <Card title="Ingreso al sistema" subtitle="Formulario de acceso institucional" accent>
        <div className="space-y-4">
          <Field label="Usuario institucional" placeholder="usuario@unimonserrate.edu.co" />
          <Field label="Contraseña"            placeholder="••••••••••••" />
          <Field label="Rol"                   placeholder="Estudiante / Profesor / Administrativo" />
          <div className="flex gap-3 pt-2">
            <button
              className="rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-ocean-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ocean-md"
              style={{ background: 'linear-gradient(135deg, #021b75 0%, #011150 100%)' }}
            >
              Entrar
            </button>
            <button className="rounded-2xl border border-[#1C2440]/20 px-6 py-3 text-sm font-semibold text-[#1C2440] hover:bg-[#1C2440]/5 transition-colors duration-200">
              Limpiar
            </button>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] p-4 text-sm text-[#1C2440]/60">
          <span className="font-semibold text-[#0e1840]">Aviso: </span>
          Ingrese sus credenciales institucionales para continuar.
        </div>
      </Card>
    </div>
  );
}

function StudentHome() {
  const stats = [
    { label: 'Créditos inscritos', value: '18',  color: 'ocean' },
    { label: 'Promedio actual',    value: '4.1',  sub: 'sobre 5.0', color: 'sea' },
    { label: 'Cursos activos',     value: '5',    color: 'mint' },
    { label: 'Alertas',            value: '1',    color: 'amber' },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Panel del estudiante" description="Vista general de avance académico y accesos rápidos." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Cursos activos" subtitle="Resumen de asignaturas inscritas" className="xl:col-span-2" accent>
          <TableShell
            headers={['Curso', 'Docente', 'Estado', 'Promedio']}
            rows={[
              ['Matemáticas',    'M. Pérez', 'En curso', '4.5'],
              ['Redes',          'J. Gómez', 'En curso', '4.0'],
              ['Bases de datos', 'L. Torres','En curso', '4.2'],
            ]}
          />
        </Card>
        <Card title="Accesos rápidos" subtitle="Atajos del sistema">
          <div className="space-y-2">
            {['Consultar notas', 'Descargar reporte', 'Ver alertas', 'Calendario académico'].map((item) => (
              <QuickAction key={item} label={item} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StudentNotes() {
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Consulta de calificaciones" description="Pantalla para visualizar notas, observaciones y avance por curso." />
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Filtros de consulta" subtitle="Campos de búsqueda" accent>
          <div className="space-y-4">
            <Field label="Periodo"            placeholder="2026-1" />
            <Field label="Curso"              placeholder="Redes de Computadores" />
            <Field label="Tipo de información" placeholder="Notas / Historial / Observaciones" />
          </div>
        </Card>
        <Card title="Resumen de notas" subtitle="Vista principal del estudiante" className="xl:col-span-2" accent>
          <TableShell
            headers={['Evaluación', 'Ponderación', 'Nota', 'Estado']}
            rows={[
              ['Quiz 1',   '10%', '4.8', <Badge variant="mint">Publicado</Badge>],
              ['Taller 1', '20%', '4.2', <Badge variant="mint">Publicado</Badge>],
              ['Parcial',  '30%', '4.0', <Badge variant="mint">Publicado</Badge>],
              ['Proyecto', '40%', 'Pendiente', <Badge variant="ocean">Por publicar</Badge>],
            ]}
          />
          <div className="mt-4 rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] p-4 text-sm text-[#1C2440]/70">
            <span className="font-semibold text-[#0e1840]">Observación: </span>
            Buen avance, falta una evaluación por publicar.
          </div>
        </Card>
      </div>
    </div>
  );
}

function TeacherHome() {
  const stats = [
    { label: 'Cursos a cargo',        value: '3',  color: 'ocean' },
    { label: 'Evaluaciones abiertas', value: '6',  color: 'sea' },
    { label: 'Notas por publicar',    value: '18', color: 'mint' },
    { label: 'Alertas de riesgo',     value: '2',  color: 'amber' },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Panel del profesor" description="Acceso a módulos de evaluación, notas y publicación." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Módulos docentes" subtitle="Acciones disponibles" accent>
          <div className="grid gap-2 sm:grid-cols-2">
            {['Registrar evaluación', 'Ingresar calificaciones', 'Editar notas', 'Publicar notas', 'Ver reportes', 'Analizar riesgo'].map((item) => (
              <QuickAction key={item} label={item} />
            ))}
          </div>
        </Card>
        <Card title="Calendario de evaluaciones" subtitle="Próximas fechas" accent>
          <div className="space-y-3 text-sm">
            {[
              { ev: 'Quiz 2',         date: '12 Abr', variant: 'ocean' },
              { ev: 'Parcial',        date: '20 Abr', variant: 'sea' },
              { ev: 'Proyecto final', date: '05 May', variant: 'mint' },
            ].map(({ ev, date, variant }) => (
              <div key={ev} className="flex items-center justify-between rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full" style={{
                    background: variant === 'mint' ? '#7FE033' : variant === 'sea' ? '#253059' : '#1C2440'
                  }} />
                  <span className="text-[#0e1840]">{ev}</span>
                </div>
                <Badge variant={variant}>{date}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function TeacherGrades() {
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Registro de notas" description="Pantalla para crear evaluaciones y cargar calificaciones." />
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Datos de evaluación" subtitle="Formulario de registro" accent>
          <div className="space-y-4">
            <Field label="Curso"              placeholder="Bases de Datos" />
            <Field label="Tipo de evaluación" placeholder="Parcial / Quiz / Trabajo / Examen final" />
            <Field label="Ponderación"        placeholder="30%" />
            <Field label="Fecha"              placeholder="20/04/2026" />
            <Field label="Descripción"        placeholder="Parcial 1 del periodo" />
          </div>
        </Card>
        <Card title="Carga de calificaciones" subtitle="Listado de estudiantes" className="xl:col-span-2" accent>
          <TableShell
            headers={['Estudiante', 'Nota', 'Motivo ajuste', 'Estado']}
            rows={[
              ['Ana López',   '4.7',       '-',        <Badge variant="mint">Valida</Badge>],
              ['Carlos Díaz', '3.9',       '-',        <Badge variant="mint">Valida</Badge>],
              ['Sofía Ruiz',  '5.0',       '-',        <Badge variant="mint">Valida</Badge>],
              ['Pedro Gómez', 'Pendiente', 'Revisión', <Badge variant="ocean">Por validar</Badge>],
            ]}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="ocean">Guardar</Badge>
            <Badge variant="sea">Validar</Badge>
            <Badge variant="mint">Importar Excel</Badge>
            <Badge variant="ocean">Editar</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PublishScreen() {
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Publicación y notificaciones" description="Pantalla para aprobar notas y simular envío de avisos." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Estado de publicación" subtitle="Flujo de aprobación" accent>
          <div className="space-y-3">
            {[
              ['Evaluación validada',  true],
              ['Aprobación docente',   true],
              ['Publicación activada', false],
              ['Notificación enviada', false],
            ].map(([label, ok]) => (
              <StatusPill key={label} label={label} ok={ok} />
            ))}
          </div>
        </Card>
        <Card title="Canales de envío" subtitle="Configuración de notificación" accent>
          <div className="space-y-4">
            <Field label="Canal"   placeholder="Correo institucional / SMS / Portal" />
            <Field label="Mensaje" placeholder="Se han publicado nuevas calificaciones" />
            <div className="rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1C2440]/40">Previsualización</p>
              <p className="mt-2 text-sm text-[#1C2440]/70">
                Su curso <span className="font-semibold text-[#0e1840]">Bases de Datos</span> tiene nuevas notas disponibles.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AdminHome() {
  const stats = [
    { label: 'Reportes del día',    value: '12',  color: 'ocean' },
    { label: 'Usuarios activos',    value: '248', color: 'sea' },
    { label: 'Alertas generadas',   value: '4',   color: 'amber' },
    { label: 'Cursos monitoreados', value: '32',  color: 'mint' },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Panel administrativo" description="Acceso a reportes, indicadores y control general del sistema." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Acciones administrativas" subtitle="Módulos del sistema" accent>
          <div className="grid gap-2 sm:grid-cols-2">
            {['Generar reportes', 'Exportar PDF/Excel', 'Consultar trazabilidad', 'Ver alertas académicas', 'Gestionar usuarios', 'Configurar parámetros'].map((item) => (
              <QuickAction key={item} label={item} />
            ))}
          </div>
        </Card>
        <Card title="Resumen institucional" subtitle="Indicadores globales" accent>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Promedio general', value: '4.0', variant: 'ocean' },
              { label: 'Aprobación',       value: '87%', variant: 'mint'  },
              { label: 'En riesgo',        value: '13%', variant: 'sea'   },
            ].map(({ label, value, variant }) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] px-4 py-3">
                <span className="text-[#1C2440]/70">{label}</span>
                <Badge variant={variant}>{value}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ReportsScreen() {
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Reportes y alertas" description="Estadísticas, exportación y seguimiento de riesgo académico." />
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Filtros de reporte" subtitle="Campos de búsqueda" accent>
          <div className="space-y-4">
            <Field label="Periodo" placeholder="2026-1" />
            <Field label="Curso"   placeholder="Redes de Computadores" />
            <Field label="Formato" placeholder="PDF / Excel" />
          </div>
        </Card>
        <Card title="Indicadores del periodo" subtitle="Valores ilustrativos" className="xl:col-span-2" accent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Promedio grupo', value: '4.1', color: '#1C2440' },
              { label: 'Aprobados',      value: '87%', color: '#4d9e14' },
              { label: 'En riesgo',      value: '13%', color: '#253059' },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] p-4 text-center">
                <p className="text-xs font-medium text-[#1C2440]/40">{label}</p>
                <p className="mt-2 text-2xl font-bold" style={{ fontFamily: 'Sora, sans-serif', color }}>{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-center rounded-2xl border border-dashed border-[#1C2440]/15 bg-[#1C2440]/[0.02] p-8 text-center text-sm text-[#1C2440]/35">
            <div>
              <LineChart className="mx-auto mb-2 h-8 w-8 text-[#1C2440]/20" />
              Área destinada a gráfica / estadística del prototipo
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CatalogsScreen() {
  return (
    <div className="space-y-6 animate-fade-in">
      <TopBar title="Gestión general" description="Catálogos de soporte para usuarios, cursos y parámetros académicos." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Módulos de soporte" subtitle="Catálogos de referencia" accent>
          <div className="grid gap-2 sm:grid-cols-2">
            {['Usuarios y roles', 'Cursos', 'Evaluaciones', 'Calificaciones', 'Notificaciones', 'Parámetros académicos'].map((item) => (
              <QuickAction key={item} label={item} />
            ))}
          </div>
        </Card>
        <Card title="Detalle visual" subtitle="Ejemplo de parámetro" accent>
          <div className="space-y-3 text-sm text-[#1C2440]/70">
            {[
              ['Parámetro', 'Ponderaciones por evaluación'],
              ['Regla',     'La suma debe ser 100%'],
              ['Estado',    'Editable solo por usuarios autorizados'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-[#1C2440]/10 bg-[#1C2440]/[0.03] px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#1C2440]/40">{k}: </span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─────────────────────────── ROUTER ─────────────────────────────── */

function ScreenContent({ screen }) {
  switch (screen) {
    case 'login':          return <LoginScreen />;
    case 'student-home':   return <StudentHome />;
    case 'student-notes':  return <StudentNotes />;
    case 'teacher-home':   return <TeacherHome />;
    case 'teacher-grades': return <TeacherGrades />;
    case 'publish':        return <PublishScreen />;
    case 'admin-home':     return <AdminHome />;
    case 'reports':        return <ReportsScreen />;
    case 'catalogs':       return <CatalogsScreen />;
    default:               return <LoginScreen />;
  }
}

/* ─────────────────────────── APP ROOT ───────────────────────────── */

export default function App() {
  const [screen, setScreen] = useState('login');

  const current  = useMemo(() => screens.find((s) => s.id === screen), [screen]);
  const CurrentIcon = current?.icon ?? LayoutDashboard;

  const grouped = useMemo(() => {
    const map = {};
    for (const [key, label] of Object.entries(groups)) {
      map[key] = { label, items: screens.filter((s) => s.group === key) };
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0e1840]">
      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 md:p-6">

        {/* ── SIDEBAR ── */}
        <aside className="hidden w-72 shrink-0 lg:flex lg:flex-col gap-3">

          {/* Brand — navy oscuro */}
          <div className="overflow-hidden rounded-3xl shadow-ocean-md">
            <div className="p-5 text-white" style={{ background: 'linear-gradient(160deg, #01104d 0%, #001255 55%, #001150 100%)' }}>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <img
                    src="/public/favicon.png"
                    alt="Logo"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/50">Prototipo UI</p>
                  <h1 className="text-base font-bold leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Sistema de Notas
                  </h1>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-white/50">
                Pantallas de referencia para la estructura visual del sistema nuevo.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/60">v1.0</span>
                <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(127,224,51,0.2)', color: '#7FE033' }}>
                  Activo
                </span>
              </div>
            </div>
          </div>

          {/* Nav — fondo blanco */}
          <div className="flex-1 overflow-hidden rounded-3xl border border-[#1C2440]/10 bg-white shadow-ocean-sm">
            <nav className="space-y-1 p-3">
              {Object.values(grouped).map(({ label, items }) => (
                <div key={label} className="mb-1">
                  <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-[#1C2440]/30">
                    {label}
                  </p>
                  {items.map((item) => {
                    const Icon  = item.icon;
                    const active = screen === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setScreen(item.id)}
                        className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                          active ? 'text-white shadow-ocean-sm' : 'text-[#1C2440]/60 hover:bg-[#1C2440]/5 hover:text-[#0e1840]'
                        }`}
                        style={active ? { background: 'linear-gradient(135deg, #031969 0%, #011458 100%)' } : {}}
                      >
                        <div className={`rounded-xl p-1.5 ${active ? 'bg-white/15' : 'bg-[#1C2440]/5 group-hover:bg-[#1C2440]/10'}`}>
                          <Icon className={`h-3.5 w-3.5 ${active ? 'text-white' : 'text-[#1C2440]/50'}`} />
                        </div>
                        <span>{item.label}</span>
                        {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="min-w-0 flex-1">

          {/* Mobile topbar */}
          <div className="mb-4 flex items-center justify-between rounded-3xl border border-[#1C2440]/10 bg-white px-4 py-3 shadow-ocean-sm lg:hidden">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl p-2 text-white" style={{ background: '#1C2440' }}>
                <CurrentIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-[#1C2440]/40">Pantalla</p>
                <p className="text-sm font-bold text-[#0e1840]" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {current?.label}
                </p>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {screens.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setScreen(item.id)}
                  className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                  style={screen === item.id
                    ? { background: '#1c4024', borderColor: '#1C2440', color: 'white' }
                    : { borderColor: 'rgba(28,36,64,0.2)', color: '#1C2440' }
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="rounded-3xl border border-[#1C2440]/10 bg-white p-4 shadow-ocean-sm md:p-6">
            <ScreenContent screen={screen} />
          </div>
        </main>
      </div>
    </div>
  );
}
