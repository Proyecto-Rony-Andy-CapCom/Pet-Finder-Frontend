"use client";

import { useState, ReactNode } from "react";
import {
  Search, MapPin, Heart, Bell, PawPrint, Plus, MessageCircle,
  Home as HomeIcon, ListChecks, Settings, LogOut, ChevronRight,
  Clock, CheckCircle2, AlertCircle, Camera, TrendingUp, Menu, X
} from "lucide-react";

// ── Tipos ─────────────────────────────────────────────────────────────────
type EstadoReporte = "Activo" | "En proceso" | "Resuelto";
type TipoActividad = "avistamiento" | "mensaje" | "validacion" | "resuelto";

interface Reporte {
  id: number;
  nombre: string;
  tipo: string;
  estado: EstadoReporte;
  zona: string;
  fecha: string;
  avistamientos: number;
}

interface Actividad {
  id: number;
  texto: string;
  tiempo: string;
  tipo: TipoActividad;
}

// ── Datos de ejemplo (vendrían del backend) ─────────────────────────────────
const reportesActivos: Reporte[] = [
  { id: 1, nombre: "Luna", tipo: "Perro · Labrador", estado: "Activo", zona: "Centro, Dolores Hidalgo", fecha: "Hace 2 días", avistamientos: 4 },
  { id: 2, nombre: "Michi", tipo: "Gato · Doméstico", estado: "En proceso", zona: "Col. San Antonio", fecha: "Hace 5 horas", avistamientos: 1 },
  { id: 3, nombre: "Rocky", tipo: "Perro · Criollo", estado: "Resuelto", zona: "Zona Centro", fecha: "Hace 1 semana", avistamientos: 7 },
];

const actividad: Actividad[] = [
  { id: 1, texto: "Nuevo avistamiento reportado cerca de tu zona de búsqueda de Luna.", tiempo: "Hace 12 min", tipo: "avistamiento" },
  { id: 2, texto: "María G. te envió un mensaje sobre Michi.", tiempo: "Hace 1 h", tipo: "mensaje" },
  { id: 3, texto: "Refugio Patitas Felices validó tu reporte de adopción.", tiempo: "Hace 3 h", tipo: "validacion" },
  { id: 4, texto: "Tu reporte de Rocky fue marcado como resuelto.", tiempo: "Ayer", tipo: "resuelto" },
];

const estadoStyles: Record<EstadoReporte, string> = {
  Activo: "bg-amber-100 text-amber-700 border-amber-200",
  "En proceso": "bg-cyan-100 text-cyan-700 border-cyan-200",
  Resuelto: "bg-teal-100 text-teal-700 border-teal-200",
};

const actividadIcon: Record<TipoActividad, ReactNode> = {
  avistamiento: <MapPin className="h-4 w-4" />,
  mensaje: <MessageCircle className="h-4 w-4" />,
  validacion: <CheckCircle2 className="h-4 w-4" />,
  resuelto: <Heart className="h-4 w-4" />,
};

// ── Subcomponentes ───────────────────────────────────────────────────────────
interface NavItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active ? "bg-teal-600 text-white shadow-sm" : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  trend?: string;
}

function StatCard({ icon, value, label, trend }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">{icon}</span>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-teal-600">
            <TrendingUp className="h-3 w-3" /> {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function PetFinderDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { label: string; icon: ReactNode }[] = [
    { label: "Dashboard", icon: <HomeIcon className="h-4 w-4" /> },
    { label: "Mis reportes", icon: <ListChecks className="h-4 w-4" /> },
    { label: "Buscar mascotas", icon: <Search className="h-4 w-4" /> },
    { label: "Adopciones", icon: <Heart className="h-4 w-4" /> },
    { label: "Mensajes", icon: <MessageCircle className="h-4 w-4" /> },
    { label: "Configuración", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-100 transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col p-5">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-7 w-7 text-teal-500" />
              <span className="text-lg font-extrabold text-gray-800">Pet<span className="text-teal-500">Finder</span></span>
            </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map(item => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={activeNav === item.label}
                onClick={() => setActiveNav(item.label)}
              />
            ))}
          </nav>

          <button className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-amber-900 shadow-sm hover:bg-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Reportar mascota
          </button>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">RC</div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">Ronaldo Chávez</p>
              <p className="truncate text-xs text-gray-400">ronaldo@petfinder.mx</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar reportes, zonas o mascotas…"
                className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-teal-300 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-teal-50 hover:text-teal-600 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-amber-900">3</span>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">RC</div>
          </div>
        </header>

        <main className="p-6 space-y-6">

          {/* Saludo */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Hola, Ronaldo 👋</h1>
            <p className="text-sm text-gray-500 mt-1">Esto es lo que pasa hoy con tus reportes y tu comunidad.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={<ListChecks className="h-5 w-5" />} value="3" label="Reportes activos" trend="+1 esta semana" />
            <StatCard icon={<MapPin className="h-5 w-5" />} value="12" label="Avistamientos nuevos" trend="+5 hoy" />
            <StatCard icon={<MessageCircle className="h-5 w-5" />} value="4" label="Mensajes sin leer" />
            <StatCard icon={<Heart className="h-5 w-5" />} value="1,240" label="Mascotas reunidas (red)" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Mis reportes */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Mis reportes</h2>
                <button className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
                  Ver todos <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {reportesActivos.map(r => (
                  <div key={r.id} className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">{r.nombre}</p>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${estadoStyles[r.estado]}`}>{r.estado}</span>
                      </div>
                      <p className="text-xs text-gray-500">{r.tipo} · {r.zona}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span className="text-xs text-gray-400">{r.fecha}</span>
                      <span className="text-xs font-medium text-teal-600">{r.avistamientos} avistamientos</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actividad reciente */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-800">Actividad reciente</h2>
              <div className="space-y-4">
                {actividad.map(a => (
                  <div key={a.id} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                      {actividadIcon[a.tipo]}
                    </span>
                    <div>
                      <p className="text-sm text-gray-700 leading-snug">{a.texto}</p>
                      <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <Clock className="h-3 w-3" /> {a.tiempo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mapa de avistamientos + Alerta */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Mapa de avistamientos cercanos</h2>
                <span className="text-xs text-gray-400">Radio de búsqueda: 5 km</span>
              </div>
              <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #0d9488 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                <div className="relative flex flex-col items-center text-teal-600">
                  <MapPin className="h-8 w-8 mb-1" />
                  <span className="text-sm font-medium">Vista previa del mapa interactivo</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-amber-900 mb-3">
                  <AlertCircle className="h-5 w-5" />
                </span>
                <h2 className="font-bold text-amber-900 mb-1">¿Encontraste una mascota?</h2>
                <p className="text-sm text-amber-800/80">Repórtala en segundos y ayúdanos a reunirla con su familia.</p>
              </div>
              <button className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-amber-900 hover:bg-amber-300 transition-colors">
                <Plus className="h-4 w-4" /> Crear reporte
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}