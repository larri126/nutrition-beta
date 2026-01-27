// src/lib/mockDb/users.ts

// Simulamos una base de datos de usuarios existentes
export const MOCK_USERS = [
    {
      username: 'usuario1',
      email: 'test@test.com',
      password: '123',
      role: 'user',
      name: 'Usuario Test'
    },
    {
      username: 'entrenador1',
      email: 'coach@test.com',
      password: '123',
      role: 'trainer',
      name: 'Entrenador Test'
    }
  ];
  
  // Función helper para simular búsqueda (Login)
  export const findUser = (identifier: string) => {
    return MOCK_USERS.find(u => 
      u.email === identifier || u.username === identifier || u.name === identifier
    );
  };