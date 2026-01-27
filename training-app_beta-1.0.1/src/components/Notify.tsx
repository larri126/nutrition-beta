// src/components/Notify.tsx
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Definimos los tipos de notificación
type NotifyType = 'success' | 'error' | 'info';

interface NotifyProps {
  message: string;
  type?: NotifyType;
  isVisible: boolean;
  onClose: () => void;
}

export default function Notify({ message, type = 'info', isVisible, onClose }: NotifyProps) {
  // Cierra la notificación automáticamente después de 3 segundos
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // Estilos base tipo "Bento Grid" oscuro
  const baseStyles = "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 w-fit max-w-[90vw]";
  
  // Variantes de color en escala de grises/oscuro [cite: 7]
  const typeStyles = {
    success: "bg-zinc-900/90 border-zinc-700 text-zinc-100",
    error: "bg-zinc-900/90 border-zinc-700 text-red-200", // Un toque rojo sutil para errores
    info: "bg-zinc-900/90 border-zinc-700 text-zinc-300",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-zinc-400" />,
    error: <AlertCircle className="w-5 h-5 text-zinc-400" />,
    info: <Info className="w-5 h-5 text-zinc-400" />,
  };

  return (
    <div className={twMerge(baseStyles, typeStyles[type])}>
      <div className="shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-zinc-500" />
      </button>
    </div>
  );
}