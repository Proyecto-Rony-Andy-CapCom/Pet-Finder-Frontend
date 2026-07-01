"use client";

import { useState, useEffect } from "react";

// ── Icons (inline SVGs to avoid extra deps) ──────────────────────────────────
const PawIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor">
    <ellipse cx="16" cy="18" rx="6" ry="8" />
    <ellipse cx="30" cy="12" rx="5" ry="7" />
    <ellipse cx="44" cy="16" rx="5" ry="7.5" />
    <ellipse cx="54" cy="28" rx="5" ry="7" />
    <path d="M32 26c-10 0-20 7-18 18 1 6 6 10 12 12 4 1 8 1 12 0 6-2 11-6 12-12 2-11-8-18-18-18z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth="2" />
    <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" strokeWidth="2" />
  </svg>
);

const HeartIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BellIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
  </svg>
);

// ── Privacy Modal ────────────────────────────────────────────────────────────
function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const sections = [
    {
      num: "I", title: "Identidad del Responsable",
      content: (
        <div className="space-y-2 text-sm text-gray-600">
          <p>En cumplimiento con la <strong className="text-gray-800">Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>, Pet Finder pone a su disposición el presente Aviso de Privacidad Integral.</p>
          <div className="mt-3 rounded-lg bg-teal-50 p-3 space-y-1 border border-teal-100">
            {[
              ["Razón Social", "Pet Finder — Plataforma de Reunificación y Adopción"],
              ["Domicilio", "Dolores Hidalgo, Guanajuato, México"],
              ["Correo", "privacidad@petfinder.mx"],
              ["Sitio web", "https://www.petfinder.mx"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 text-sm">
                <span className="font-semibold text-teal-700 min-w-[90px]">{k}:</span>
                <span className="text-gray-700">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: "II", title: "Datos Personales que Recabamos",
      content: (
        <div className="space-y-2 text-sm text-gray-600">
          <p>Para los fines descritos en este aviso, recabamos las siguientes categorías:</p>
          <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2">
            {[
              ["Identificación", "Nombre completo, fecha de nacimiento, género, fotografía de perfil."],
              ["Contacto", "Correo electrónico, teléfono, dirección general (ciudad, estado, país)."],
              ["Acceso y sesión", "Usuario, contraseña cifrada (BCrypt), tokens JWT de autenticación."],
              ["Geolocalización", "Coordenadas GPS asociadas a reportes de mascotas y zona de búsqueda activa."],
              ["Datos de mascotas", "Especie, raza, color, descripción física, fotografías, estado del reporte."],
              ["Entidades aliadas", "Razón social, RFC, número de registro oficial, documentación de validación."],
              ["Interacción", "Historial de publicaciones, registros de contacto cifrados, casos resueltos."],
              ["Navegación", "IP anonimizada, tipo de dispositivo, logs en formato JSON sin datos sensibles."],
            ].map(([cat, desc]) => (
              <div key={cat} className="rounded-lg border border-gray-100 bg-gray-50 p-2.5">
                <p className="font-semibold text-teal-700 text-xs uppercase tracking-wide">{cat}</p>
                <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic mt-2">Pet Finder no recaba datos sensibles de manera ordinaria (salvo que el usuario los incluya voluntariamente en descripciones libres).</p>
        </div>
      )
    },
    {
      num: "III", title: "Finalidades del Tratamiento",
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-800 mb-2">Finalidades primarias (necesarias para el servicio):</p>
            <ul className="space-y-1.5">
              {[
                "Registro, autenticación y administración de cuentas de usuario y entidades aliadas.",
                "Creación, edición y gestión del ciclo de vida de reportes de mascotas (extraviadas, encontradas, adopción, celo).",
                "Motor de búsqueda y filtrado avanzado (especie, raza, color, ubicación, estado).",
                "Geolocalización interactiva: cálculo de proximidad y notificaciones de avistamientos.",
                "Canal de comunicación seguro y cifrado entre usuarios involucrados en rescates o adopciones.",
                "Envío de notificaciones sobre cambios de estado en reportes activos.",
                "Cumplimiento de obligaciones legales ante autoridades competentes.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white"><CheckIcon /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-2">Finalidades secundarias (requieren consentimiento adicional):</p>
            <ul className="space-y-1.5">
              {[
                "Análisis estadístico anonimizado sobre patrones de extravío y tasas de reunificación.",
                "Envío de comunicaciones sobre campañas de adopción y actualizaciones de la plataforma.",
                "Generación de reportes agregados no identificables para organizaciones de bienestar animal.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-400 text-white"><CheckIcon /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-gray-500 italic">Puede revocar este consentimiento enviando un correo a privacidad@petfinder.mx con el asunto «Revocación de finalidades secundarias».</p>
          </div>
        </div>
      )
    },
    {
      num: "IV", title: "Transferencia de Datos",
      content: (
        <div className="text-sm text-gray-600 space-y-2">
          <p>Pet Finder podrá compartir datos únicamente en los supuestos amparados por el artículo 37 de la LFPDPPP:</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="p-2 text-left rounded-tl-lg">Destinatario</th>
                  <th className="p-2 text-left">Finalidad</th>
                  <th className="p-2 text-center rounded-tr-lg">Consentimiento</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Autoridades gubernamentales", "Obligaciones legales o requerimientos judiciales", "No"],
                  ["Proveedores de infraestructura (AWS/GCP/Azure)", "Alojamiento seguro bajo contrato de confidencialidad", "No"],
                  ["Servicio de correo transaccional", "Notificaciones críticas del sistema", "No"],
                  ["Refugios y clínicas aliadas validadas", "Coordinación de adopciones o rescates", "Sí"],
                  ["Organizaciones de bienestar animal", "Datos estadísticos anonimizados", "No"],
                ].map(([dest, fin, cons], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2 border-b border-gray-100 font-medium text-gray-700">{dest}</td>
                    <td className="p-2 border-b border-gray-100">{fin}</td>
                    <td className={`p-2 border-b border-gray-100 text-center font-semibold ${cons === "Sí" ? "text-amber-600" : "text-green-600"}`}>{cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      num: "V", title: "Medidas de Seguridad",
      content: (
        <div className="text-sm text-gray-600 space-y-2">
          <p>Implementamos medidas técnicas, administrativas y físicas para proteger sus datos:</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-2">
            {[
              ["HTTPS / TLS 1.2+", "Todas las comunicaciones van cifradas en tránsito."],
              ["BCrypt (factor ≥ 12)", "Las contraseñas nunca se almacenan en texto plano."],
              ["JWT + Refresh Token", "Autenticación sin estado con tokens validados en base de datos."],
              ["Rate Limiting", "Protección contra fuerza bruta por IP y por usuario."],
              ["Antiinyección activa", "Sanitización contra SQL Injection, XSS y CSRF."],
              ["Payload cifrado", "Los mensajes de contacto se almacenan encriptados."],
              ["Logs seguros (JSON)", "Sin información sensible en texto plano en registros."],
              ["Validación de imágenes", "Cada archivo es validado y escaneado antes de almacenarse."],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-2 rounded-lg bg-teal-50 border border-teal-100 p-2.5">
                <span className="mt-0.5 text-teal-600"><ShieldIcon /></span>
                <div>
                  <p className="font-semibold text-teal-800 text-xs">{title}</p>
                  <p className="text-xs text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: "VI", title: "Derechos ARCO",
      content: (
        <div className="text-sm text-gray-600 space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["A", "Acceso", "Conocer qué datos tenemos y para qué los usamos."],
              ["R", "Rectificación", "Corregir datos inexactos o desactualizados."],
              ["C", "Cancelación", "Solicitar la eliminación completa de su cuenta y datos."],
              ["O", "Oposición", "Oponerse al tratamiento para finalidades específicas."],
            ].map(([letter, name, desc]) => (
              <div key={letter} className="rounded-xl border border-teal-200 bg-teal-50 p-3 text-center">
                <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-lg">{letter}</div>
                <p className="font-semibold text-teal-800 text-sm">{name}</p>
                <p className="text-xs text-gray-600 mt-1">{desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 space-y-1.5">
            <p className="font-semibold text-blue-800 text-sm">Procedimiento:</p>
            {[
              "Enviar solicitud a privacidad@petfinder.mx con asunto «Solicitud ARCO».",
              "Indicar nombre completo, correo registrado y derecho a ejercer.",
              "Adjuntar copia de identificación oficial vigente.",
              "Respuesta en máximo 20 días hábiles; cambios en 15 días hábiles adicionales.",
              "En caso de inconformidad, acudir ante el INAI (www.inai.org.mx).",
            ].map((step, i) => (
              <div key={i} className="flex gap-2 text-xs text-blue-700">
                <span className="font-bold shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: "VII", title: "Cookies y Tecnologías de Rastreo",
      content: (
        <div className="text-sm text-gray-600 space-y-2">
          <p>Utilizamos cookies con las siguientes finalidades:</p>
          <div className="space-y-2 mt-1">
            {[
              ["Esenciales", "No desactivables", "Necesarias para sesión y autenticación JWT.", "bg-red-50 border-red-100 text-red-700"],
              ["Rendimiento", "Opcionales", "Miden tiempos de respuesta de forma anonimizada.", "bg-amber-50 border-amber-100 text-amber-700"],
              ["Preferencias", "Opcionales", "Guardan configuración: tema, zona de búsqueda predeterminada.", "bg-blue-50 border-blue-100 text-blue-700"],
            ].map(([type, opt, desc, colors]) => (
              <div key={type} className={`flex items-start gap-3 rounded-lg border p-2.5 ${colors}`}>
                <div className="min-w-[90px]">
                  <p className="font-semibold text-xs">{type}</p>
                  <span className="text-xs opacity-70">{opt}</span>
                </div>
                <p className="text-xs text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic">Pet Finder no instala cookies publicitarias de redes de terceros. Las cookies no esenciales pueden gestionarse desde el panel de preferencias de la aplicación.</p>
        </div>
      )
    },
    {
      num: "VIII", title: "Cambios al Aviso y Consentimiento",
      content: (
        <div className="text-sm text-gray-600 space-y-3">
          <p>Cualquier modificación al aviso será notificada mediante:</p>
          <ul className="space-y-1.5">
            {[
              "Publicación en https://www.petfinder.mx/privacidad con fecha de actualización.",
              "Correo electrónico al registrado en la cuenta cuando los cambios sean sustanciales.",
              "Aviso emergente en la aplicación al primer inicio de sesión posterior.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white"><CheckIcon /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-teal-300 bg-teal-50 p-3 text-sm text-teal-800">
            <strong>Consentimiento:</strong> Al registrarse en Pet Finder y marcar la casilla correspondiente durante el alta, el usuario manifiesta haber leído y aceptado en su totalidad los términos del presente Aviso de Privacidad.
          </div>
          <p className="text-xs text-gray-500 text-right">Última actualización: Junio 2026 · Versión 1.0</p>
        </div>
      )
    },
  ];

  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="shrink-0 bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <ShieldIcon />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Aviso de Privacidad</h2>
              <p className="text-teal-100 text-xs">Pet Finder · Versión 1.0 · Junio 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/aviso_privacidad_petfinder.pdf"
              download
              className="flex items-center gap-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 text-white text-xs font-medium"
            >
              <DownloadIcon />
              Descargar PDF
            </a>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {sections.map((sec, i) => (
            <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                onClick={() => setOpenSection(openSection === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">
                    {sec.num}
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">{sec.title}</span>
                </div>
                <svg
                  className={`h-4 w-4 text-gray-500 transition-transform ${openSection === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeWidth="2" strokeLinecap="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openSection === i && (
                <div className="px-4 py-4 border-t border-gray-100">
                  {sec.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-gray-500">Fundamento legal: LFPDPPP y lineamientos INAI</p>
          <button
            onClick={onClose}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 text-center">
      <div className="mb-2 text-white/80">{icon}</div>
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="text-sm text-teal-100">{label}</p>
    </div>
  );
}

// ── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
        {icon}
      </div>
      <h3 className="mb-2 font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [search, setSearch] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}

      <div className="flex min-h-screen flex-col bg-gray-50 font-sans">

        {/* ── Navbar ────────────────────────────────────────────────────── */}
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <PawIcon className="h-8 w-8 text-teal-500" />
              <span className="text-xl font-extrabold text-gray-800">Pet<span className="text-teal-500">Finder</span></span>
            </div>
            <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 sm:flex">
              <a href="#features" className="hover:text-teal-600 transition-colors">Funcionalidades</a>
              <a href="#how" className="hover:text-teal-600 transition-colors">¿Cómo funciona?</a>
              <button
                onClick={() => setShowPrivacy(true)}
                className="hover:text-teal-600 transition-colors flex items-center gap-1"
              >
                <ShieldIcon />
                Privacidad
              </button>
            </nav>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-teal-500 px-4 py-1.5 text-sm font-semibold text-teal-600 hover:bg-teal-50 transition-colors">
                Iniciar sesión
              </button>
              <button className="rounded-lg bg-teal-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-teal-600 transition-colors shadow-sm">
                Registrarse
              </button>
            </div>
          </div>
        </header>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-500 pt-16 pb-24 text-white">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute top-10 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-teal-900/30 blur-2xl" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-teal-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-200" />
              </span>
              Plataforma activa · Reunificando mascotas con sus familias
            </div>

            <h1 className="mb-4 text-5xl font-extrabold leading-tight md:text-6xl">
              Encuentra a tu<br />
              <span className="text-cyan-200">mascota perdida</span>
            </h1>
            <p className="mb-2 text-lg text-teal-100 max-w-2xl mx-auto">
              La plataforma tecnológica que conecta familias, refugios y comunidades para reunir mascotas con sus hogares.
            </p>
            <p className="mb-10 text-sm text-teal-200">Desarrollado por Ronaldo Chávez · Universidad Tecnológica del Norte de Guanajuato</p>

            {/* Search bar */}
            <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  type="text"
                  placeholder="Buscar por nombre, raza o ubicación…"
                  className="w-full rounded-xl border-0 pl-10 pr-4 py-3.5 text-gray-800 shadow-lg outline-none ring-2 ring-transparent focus:ring-teal-300 transition-all"
                />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-amber-900 shadow-lg hover:bg-amber-300 transition-colors">
                <SearchIcon />
                Buscar
              </button>
            </div>

            {/* Quick tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
              {["🐶 Perros", "🐱 Gatos", "📍 Mi zona", "❤️ Adopción", "🔔 Alertas"].map(tag => (
                <button key={tag} className="rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1 text-white text-xs font-medium backdrop-blur-sm">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative mx-auto mt-14 max-w-3xl px-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard value="1,240+" label="Mascotas reunidas" icon={<HeartIcon />} />
              <StatCard value="380+" label="En adopción" icon={<PawIcon className="h-5 w-5" />} />
              <StatCard value="56" label="Refugios aliados" icon={<MapPinIcon />} />
              <StatCard value="24/7" label="Alertas activas" icon={<BellIcon />} />
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 60" className="w-full fill-gray-50">
              <path d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,34.7C1200,37,1320,43,1380,45.3L1440,48L1440,60L1380,60C1320,60,1200,60,1080,60C960,60,840,60,720,60C600,60,480,60,360,60C240,60,120,60,60,60L0,60Z" />
            </svg>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────── */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-700">Funcionalidades</span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-800">Todo lo que necesitas en un solo lugar</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">Diseñado con tecnología de grado de ingeniería para responder en tiempo real cuando más importa.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<MapPinIcon />} title="Geolocalización Interactiva" desc="Mapa en tiempo real con pines geolocalizados. Encuentra reportes activos en tu radio de búsqueda con precisión milimétrica." />
            <FeatureCard icon={<SearchIcon />} title="Búsqueda Avanzada" desc="Filtra por especie, raza, color, estado y distancia. Resultados inteligentes en menos de 2 segundos." />
            <FeatureCard icon={<BellIcon />} title="Alertas en Tiempo Real" desc="Notificaciones instantáneas cuando se reporta una mascota en tu zona. Nunca pierdas un avistamiento cercano." />
            <FeatureCard icon={<HeartIcon />} title="Red de Adopción" desc="Conecta con refugios y clínicas veterinarias aliadas. Catálogo actualizado de mascotas disponibles para adoptar." />
            <FeatureCard icon={<ShieldIcon />} title="Comunicación Segura" desc="Canal cifrado entre usuarios para coordinar rescates y adopciones sin exponer datos personales a terceros." />
            <FeatureCard icon={<PawIcon className="h-5 w-5" />} title="Gestión de Reportes" desc="Crea, edita y da seguimiento a reportes activos. Ciclo de vida completo: Activo → En Proceso → Resuelto." />
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <section id="how" className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-700">¿Cómo funciona?</span>
              <h2 className="mt-4 text-3xl font-extrabold text-gray-800">Reunificación en 3 pasos</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { step: "01", title: "Crea un reporte", desc: "Sube fotos, describe a tu mascota y marca la ubicación donde fue vista por última vez.", color: "teal" },
                { step: "02", title: "La comunidad alerta", desc: "Usuarios cercanos reciben notificación en tiempo real. La IA cruza avistamientos con tu reporte.", color: "cyan" },
                { step: "03", title: "Contacto seguro", desc: "Comunícate directamente a través del canal cifrado de Pet Finder para coordinar el rescate.", color: "amber" },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-${color}-100 text-${color}-600 text-2xl font-extrabold shadow-sm`}>
                    {step}
                  </div>
                  <h3 className="mb-2 font-bold text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-r from-teal-600 to-cyan-500 py-16 text-center text-white">
          <div className="mx-auto max-w-2xl px-6">
            <PawIcon className="mx-auto mb-4 h-12 w-12 text-white/70" />
            <h2 className="mb-3 text-3xl font-extrabold">¿Perdiste a tu mascota?</h2>
            <p className="mb-8 text-teal-100">Actúa ahora. Cada minuto cuenta. Nuestra red de alertas notifica a cientos de personas en tu zona en segundos.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-white px-8 py-3.5 font-bold text-teal-700 shadow-lg hover:bg-teal-50 transition-colors">
                Reportar mascota perdida
              </button>
              <button className="rounded-xl border-2 border-white/50 px-8 py-3.5 font-bold text-white hover:bg-white/10 transition-colors">
                Explorar reportes activos
              </button>
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="bg-gray-900 text-gray-400 py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-2">
                <PawIcon className="h-7 w-7 text-teal-400" />
                <span className="text-lg font-extrabold text-white">Pet<span className="text-teal-400">Finder</span></span>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <span className="text-gray-500">Dolores Hidalgo, Guanajuato, México</span>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  <ShieldIcon />
                  Aviso de Privacidad
                </button>
                <a
                  href="/aviso_privacidad_petfinder.pdf"
                  download
                  className="flex items-center gap-1 hover:text-teal-300 transition-colors"
                >
                  <DownloadIcon />
                  Descargar PDF
                </a>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
              © 2026 Pet Finder · Desarrollado por Ronaldo Chávez · UTNG · Todos los derechos reservados.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}