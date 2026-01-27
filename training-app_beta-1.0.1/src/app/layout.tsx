// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FullscreenToggle from "@/components/FullscreenToggle"; 
// 1. IMPORTAMOS EL PROVEEDOR (Asegúrate que la ruta sea correcta)
import { NotifyProvider } from "@/context/NotifyContext"; 

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Training App",
  description: "App de entrenamiento",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* 2. ENVOLVEMOS TODO CON EL PROVEEDOR */}
        <NotifyProvider>
            
          {/* El botón de pantalla completa */}
          <FullscreenToggle />
          
          {children}

        </NotifyProvider>
      </body>
    </html>
  );
}