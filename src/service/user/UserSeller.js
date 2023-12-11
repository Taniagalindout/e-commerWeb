import { createURL } from "../../utils/environment";

import axios from 'axios';


export const createSeller = async (data) => {
  
  const response = await axios.post(createURL(['/auth/registerSeller']), data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
