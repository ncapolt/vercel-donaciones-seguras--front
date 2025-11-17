// Configuración de la API
// Usa la variable de entorno si está disponible, sino usa la URL de producción
export const API_URL = import.meta.env.VITE_API_URL || 'https://vercel-donaciones-seguras.vercel.app';

// Función helper para hacer fetch a la API
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

