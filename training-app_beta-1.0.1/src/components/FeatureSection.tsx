// src/components/FeatureSection.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface FeatureSectionProps {
  title: string;
  description: string;
  imageColor?: string; // Color provisional para simular la imagen
  isReversed?: boolean; // Para alternar izquierda/derecha
}

export default function FeatureSection({ 
  title, 
  description, 
  imageColor = "bg-zinc-800", 
  isReversed = false 
}: FeatureSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 mb-8">
      {/* Contenedor tipo Bento Grid */}
      <div className={twMerge(
        "flex flex-col md:flex-row gap-6 items-center p-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm",
        isReversed ? "md:flex-row-reverse" : "" // Lógica de alternancia
      )}>
        
        {/* Embed Imagen (Izquierda o Derecha según isReversed) */}
        <div className={twMerge("w-full md:w-1/2 h-64 rounded-2xl flex items-center justify-center shadow-inner", imageColor)}>
          <span className="text-zinc-500 font-medium">Imagen Web</span>
        </div>

        {/* Embed Descripción */}
        <div className="w-full md:w-1/2 text-left space-y-4 px-2">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}