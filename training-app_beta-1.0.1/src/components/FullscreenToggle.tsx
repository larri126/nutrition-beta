// src/components/FullscreenToggle.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Maximize } from 'lucide-react';

export default function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Definimos la función de chequeo
    const checkFullscreenStatus = () => {
      // El operador !! convierte el resultado en un booleano (true/false) real
      setIsFullscreen(!!document.fullscreenElement);
    };

    // 1. ¡CRUCIAL! Verificamos el estado INMEDIATAMENTE al cargar el componente
    checkFullscreenStatus();

    // 2. Nos suscribimos a cambios futuros
    document.addEventListener('fullscreenchange', checkFullscreenStatus);
    
    // Limpieza
    return () => document.removeEventListener('fullscreenchange', checkFullscreenStatus);
  }, []);

  const handleEnterFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error: ${err.message}`);
      });
    }
  };

  // Si ya estamos en pantalla completa, ocultamos el botón
  if (isFullscreen) return null;

  return (
    <button
      onClick={handleEnterFullscreen}
      className="fixed top-4 right-4 z-50 p-3 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full backdrop-blur-md transition-all border border-zinc-700 hover:scale-110 shadow-lg group"
      aria-label="Pantalla Completa"
    >
      <Maximize className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
    </button>
  );
}