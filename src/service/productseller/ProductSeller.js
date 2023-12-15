import { createURL } from "../../utils/environment";
import axios from 'axios';

export const createProduct = async (data, token) => {
  try {
    console.log('Token en createProduct:', token); // Agrega esta línea para mostrar el token en la consola

    const response = await axios.post(createURL(['/products']), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZW5kb3JAZ21haWwuY29tIiwiaWF0IjoxNzAyNjU5NzkyLCJleHAiOjE3MDUyNTE3OTJ9.GDOP-StpvwLp6VnuNzMzMpHUHacIAoedM5IJcDztOr9jFbVB2J6y_-Ytb9dId27W6UEuesOfnPPSQoBeFCMyzQ`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al registrar el producto:', error);
    throw error;
  }
};
