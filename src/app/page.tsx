export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-24">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-blue-600">
          Bienvenido a Pet Finder
        </h1>
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">
          Hecho por Ronaldo Chavez
        </h2>
        <p className="mb-8 text-xl text-gray-700">
          La plataforma dedicada a ayudar a las mascotas perdidas a volver a casa.
        </p>
        <label htmlFor="search" className="sr-only">
          Buscar Mascota
        </label>
        <input
          id="search"
          type="text"
          placeholder="Buscar por nombre, raza o ubicación..."
          className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
        <div className="flex justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
            Reportar Mascota
          </button>
          <button className="rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50">
            Buscar Mascota
          </button>
        </div>
      </div>
    </main>
  );
}