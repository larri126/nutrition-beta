// src/components/auth/AuthEmbed.tsx
import React, { useRef, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Home, ArrowLeft, ChevronsDown, X } from 'lucide-react';
import Link from 'next/link';

interface AuthEmbedProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  showHome?: boolean;
  onBack?: () => void;
}

export default function AuthEmbed({ 
  title, 
  subtitle, 
  children, 
  className, 
  showHome = false, 
  onBack 
}: AuthEmbedProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [isIndicatorDismissed, setIsIndicatorDismissed] = useState(false);

  // Comprobar scroll automáticamente
  // Comprobar si hay scroll automáticamente
  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current;
        // CAMBIO: Añadimos un margen de 2px para evitar falsos positivos
        setCanScroll(scrollHeight > clientHeight + 2);
      }
    };

    // Ejecutamos la comprobación
    checkScroll();
    
    // Un pequeño timeout ayuda a que el DOM termine de pintarse antes de medir
    const timer = setTimeout(checkScroll, 100); 
    
    window.addEventListener('resize', checkScroll);
    return () => {
        window.removeEventListener('resize', checkScroll);
        clearTimeout(timer);
    };
  }, [children]); // Se actualiza si cambia el contenido

  return (
    <div className={twMerge(
      "relative w-full max-w-md rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl backdrop-blur-sm transition-all duration-300 flex flex-col", 
      className
    )}>
      
      {/* 1. Cabecera Fija */}
      <div className="flex justify-between items-center p-6 pb-2 select-none relative h-14 shrink-0 z-20">
        <div className="flex items-center">
          {onBack ? (
            <button 
              onClick={onBack}
              className="p-1 -ml-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          ) : (
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
              {title}
            </h3>
          )}
        </div>

        {showHome && (
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-zinc-500 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
          </Link>
        )}

        <div className="flex items-center">
          {subtitle && (
            <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* 2. Contenedor con Scroll */}
      <div 
        ref={contentRef}
        className="relative flex-1 overflow-y-auto no-scrollbar p-6 pt-2 space-y-4"
        onScroll={() => { if(!isIndicatorDismissed) setIsIndicatorDismissed(true) }} 
      >
        {children}
      </div>

      {/* 3. Indicador Flotante + Botón Cerrar */}
      {canScroll && !isIndicatorDismissed && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="relative">
            
            {/* A. Botón Cerrar (X) - Estático y con su propio estilo embed */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsIndicatorDismissed(true);
              }}
              className="absolute -top-3 -right-4 z-40 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-white rounded-full p-1.5 shadow-md hover:scale-110 transition-all"
            >
              <X className="w-3 h-3" />
            </button>

            {/* B. Embed Indicador - Animado (Bota entero) */}
            <div className="animate-bounce bg-zinc-950/90 border border-zinc-800 rounded-xl py-3 px-6 shadow-2xl backdrop-blur-md flex flex-col items-center gap-1 cursor-default">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium select-none">Desliza</span>
                <ChevronsDown className="w-4 h-4 text-zinc-400" />
            </div>

          </div>
        </div>
      )}
      
      {/* Degradado inferior */}
      {canScroll && !isIndicatorDismissed && (
         <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/80 to-transparent pointer-events-none z-10 rounded-b-2xl" />
      )}

    </div>
  );
}