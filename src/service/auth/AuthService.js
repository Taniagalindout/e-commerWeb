import { createURL } from "../../utils/environment";

export const login = async (data) => {
    try {
      const cache = await caches.open('login-cache');
      const cachedResponse = await cache.match('/auth/login');
  
      if (cachedResponse) {
        return cachedResponse.json(); // Devuelve los datos almacenados en caché si están disponibles
      } else {
        const response = await fetch(createURL(['/auth/login']), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        await cache.put('/auth/login', response.clone()); // Guarda la respuesta en caché para futuras solicitudes
        return response.json(); // Devuelve los datos obtenidos del servidor
      }
    } catch (error) {
      console.error('Error en la función login:', error);
      throw error;
    }
  };
  