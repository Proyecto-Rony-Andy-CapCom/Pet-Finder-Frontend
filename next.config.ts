import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // esto genera la carpeta /out en vez de necesitar servidor Node
  images: {
    unoptimized: true, // necesario porque next/image no funciona con export estático
  },
};

export default nextConfig;