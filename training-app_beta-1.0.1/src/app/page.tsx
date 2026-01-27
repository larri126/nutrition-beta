// src/app/page.tsx
import Link from 'next/link';
import { ChevronsDown } from 'lucide-react';
import FeatureSection from '@/components/FeatureSection';
import AnimatedTitle from '@/components/AnimatedTitle'; // <--- 1. Importamos el nuevo componente

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col">
     
      {/* --- PARTE INICIAL --- */}
      <section className="h-screen flex flex-col justify-center items-center relative px-4 text-center">
        
        <div className="z-10 cursor-pointer">
          {/* El Título ahora es el Botón con la animación programada */}
          <Link href="/auth">
             {/* 2. Usamos el componente aquí en lugar del h1 directo */}
             <AnimatedTitle />
          </Link>
        </div>

        {/* Texto "Desliza" con flechas */}
        <div className="absolute bottom-10 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Desliza</span>
          <ChevronsDown className="w-6 h-6 text-zinc-400" />
        </div>
      </section>

      {/* --- PARTE MEDIA: Embeds --- */}
      <section className="py-20 space-y-4">
        
        <FeatureSection 
          title="Entrenamiento Inteligente"
          description="Accede a rutinas personalizadas diseñadas por expertos. Visualiza tu progreso con una interfaz oscura y minimalista."
          imageColor="bg-blue-900/20 border border-blue-800/50"
          isReversed={false} 
        />

        <FeatureSection 
          title="Nutrición a Medida"
          description="Planes de alimentación adaptados a tus objetivos. Controla tus macros y mantén el equilibrio perfecto."
          imageColor="bg-emerald-900/20 border border-emerald-800/50"
          isReversed={true}
        />

        <FeatureSection 
          title="Seguimiento Constante"
          description="Comunicación directa con tu entrenador y herramientas de monitoreo para asegurar que alcanzas tus metas."
          imageColor="bg-purple-900/20 border border-purple-800/50"
          isReversed={false}
        />
      </section>

      {/* --- PARTE FINAL: Footer --- */}
      <footer className="mt-auto py-10 border-t border-zinc-900">
        <div className="w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 text-sm text-zinc-500">
            © {new Date().getFullYear()} Training SaaS. Todos los derechos reservados.
          </div>

          {/* Soporte */}
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
            <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <span>Soporte Técnico</span>
            </Link>
          </div>

        </div>
      </footer>

    </main>
  );
}