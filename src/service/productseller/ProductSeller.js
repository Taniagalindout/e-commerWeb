import { createURL } from "../../utils/environment";
import axios from 'axios';

export const createProduct = async (data, token) => {
  try {
    console.log('Token en createProduct:', token); // Agrega esta línea para mostrar el token en la consola

    const response = await axios.post(createURL(['/products']), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c3VhcmlvNEBnbWFpbC5jb20iLCJpYXQiOjE3MDI2ODExNDIsImV4cCI6MTcwNTI3MzE0Mn0.g3Faw-ELy8dzr3iEkmXeMETUaNYTExIZ6Bhnb20k-gPabLZ_xjR_-rUMSBSkQF-6JNKy1aZdhIFF-dZzFJyQ5w`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al registrar el producto:', error);
    throw error;
  }
};
