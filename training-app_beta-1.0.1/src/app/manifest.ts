import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Training',
    short_name: 'Training',
    description: 'Tu aplicación de entrenamiento personal',
    start_url: '/',
    display: 'fullscreen', // Esto oculta la barra de URL
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
        {
          src: '/favicon.ico',
          sizes: 'any',
          type: 'image/x-icon',
        },
        {
          src: '/icon-192.png', // Asumiremos que crearás esta imagen luego
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png', // Y esta también
          sizes: '512x512',
          type: 'image/png',
        },
      ],
  }
}