// src/components/AnimatedTitle.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export default function AnimatedTitle() {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const loop = setInterval(() => {
      // 1. Activar animación (Click)
      setIsPressed(true);

      // 2. Mantener presionado por 1 segundo (1000ms)
      setTimeout(() => {
        setIsPressed(false); // Suelta la tecla
      }, 1000); 

    }, 6000); // 1s (activo) + 5s (espera) = 6s ciclo total

    return () => clearInterval(loop);
  }, []);

  return (
    <div 
      className={twMerge(
        // Transición suave de medio segundo para entrar y salir
        "transition-all duration-500 ease-in-out p-4 rounded-xl border-2",
        isPressed 
          ? "scale-95 border-zinc-700 bg-zinc-900/60 shadow-inner" // Estado Click (1s)
          : "scale-100 border-transparent bg-transparent" // Estado Reposo (5s)
      )}
    >
      <h1 className="text-6xl md:text-9xl font-bold tracking-tighter bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent select-none">
        TRAINING
      </h1>
    </div>
  );
}