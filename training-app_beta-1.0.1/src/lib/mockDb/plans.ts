// src/lib/mockDb/plans.ts

export const PLANS = {
    user: [
      {
        id: 'basic',
        name: 'Básico',
        price: 0,
        features: ['Rutinas con limitaciones', 'Sin entrenador', 'Acceso a perfil'],
        isFree: true,
      },
      {
        id: 'plus',
        name: 'Plus',
        price: 9.99,
        features: ['Rutinas ilimitadas', 'Estadísticas avanzadas', 'Mejora progresiva'],
        isFree: false,
      }
    ],
    trainer: [
      {
        id: 'initial',
        name: 'Inicial',
        price: 29.99,
        features: ['Cantidad muy limitada de alumnos', 'Gestión básica'],
      },
      {
        id: 'advanced',
        name: 'Avanzado',
        price: 49.99,
        features: ['Mayor cantidad de alumnos', 'Herramientas de gestión'],
      },
      {
        id: 'professional',
        name: 'Profesional',
        price: 99.99,
        features: ['Máximo de alumnos permitidos', 'Suite completa'],
      }
    ]
  };