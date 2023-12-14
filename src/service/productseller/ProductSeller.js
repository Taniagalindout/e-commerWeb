import { createURL } from "../../utils/environment";
import axios from 'axios';

export const createProduct = async (data) => {
  try {
    const response = await axios.post(createURL(['/products']), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Puedes devolver solo la parte de datos si es relevante
  } catch (error) {
    // Manejo de errores aquí
    console.error('Error al registrar el producto:', error);
    throw error; // Puedes lanzar el error para que sea manejado en el código que llama a esta función
  }
};
