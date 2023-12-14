import { createURL } from "../../utils/environment";
import axios from 'axios';

export const createProduct = async (data, token) => {
  try {
    const response = await axios.post(createURL(['/products']), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al registrar el producto:', error);
    throw error;
  }
};



