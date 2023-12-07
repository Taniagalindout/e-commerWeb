import { createURL } from "../../utils/environment";

export const createSeller = async (data) => {
  console.log(data)

      const response = await fetch(createURL(['/auth/registerSeller']), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      return response.json();
  };
  