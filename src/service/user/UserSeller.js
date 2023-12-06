import { createURL } from "../../utils/environment";

export const createSeller = async (data, token) => {
    try {
      const response = await fetch(createURL(['/sellers']), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to create seller');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  