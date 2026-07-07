"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../../services/authService";

// Reutilizamos tu PawIcon para mantener la marca
const PawIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor">
    <ellipse cx="16" cy="18" rx="6" ry="8" />
    <ellipse cx="30" cy="12" rx="5" ry="7" />
    <ellipse cx="44" cy="16" rx="5" ry="7.5" />
    <ellipse cx="54" cy="28" rx="5" ry="7" />
    <path d="M32 26c-10 0-20 7-18 18 1 6 6 10 12 12 4 1 8 1 12 0 6-2 11-6 12-12 2-11-8-18-18-18z" />
  </svg>
);

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({ correo, password });
      // Guardamos el token en localStorage
      localStorage.setItem("token", data.token);
      // Redirigimos al Dashboard
      router.push("/dashboard"); 
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 font-sans">
      {/* Fondo con estilo de tu Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-500" />
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Tarjeta de Login (Glassmorphism sutil) */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/95 px-8 py-10 shadow-2xl backdrop-blur-md sm:px-10">
        
        {/* Cabecera del form */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="group mb-4 flex items-center justify-center rounded-full bg-teal-50 p-3 transition-colors hover:bg-teal-100">
            <PawIcon className="h-8 w-8 text-teal-500 group-hover:text-teal-600" />
          </Link>
          <h2 className="text-2xl font-extrabold text-gray-800">Bienvenido de vuelta</h2>
          <p className="mt-2 text-sm text-gray-500">
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Contraseña
              </label>
              <a href="#" className="text-xs font-medium text-teal-600 hover:text-teal-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-teal-500 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-teal-300"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              "Ingresar a mi cuenta"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link href="/registro" className="font-semibold text-teal-600 hover:text-teal-500">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}