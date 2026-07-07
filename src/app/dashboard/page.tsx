"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 1. Buscamos el token en el almacenamiento del navegador
    const token = localStorage.getItem("token");

    // 2. Si no hay token, lo mandamos de regreso al login
    if (!token) {
      router.push("/login");
    } else {
      // Si sí hay token, le damos acceso a la pantalla
      setIsAuthenticated(true);
    }
  }, [router]);

  // Mientras verifica el token, mostramos una pantalla de carga para evitar "parpadeos"
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Mi Panel de Usuario</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
          >
            Cerrar Sesión
          </button>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-600">
            ¡Bienvenido! Si estás viendo esta pantalla, significa que tu JWT es válido y lograste pasar la seguridad.
          </p>
          {/* Aquí irá todo el contenido de Pet Finder para usuarios logueados */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-teal-100 bg-teal-50 p-6">
              <h3 className="font-bold text-teal-800">Mis Mascotas Reportadas</h3>
              <p className="mt-2 text-sm text-teal-600">No tienes reportes activos.</p>
            </div>
            <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-6">
              <h3 className="font-bold text-cyan-800">Alertas en mi zona</h3>
              <p className="mt-2 text-sm text-cyan-600">2 mascotas perdidas cerca de ti.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}