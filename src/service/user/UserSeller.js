import { createURL } from "../../utils/environment";

export const createSeller = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === 'ine') {
      formData.append('ine', data[key]);
    } else {
      formData.append(`seller[${key}]`, data[key]);
    }
  });

  const response = await fetch(createURL(['/auth/registerSeller']), {
    method: 'POST',
    body: formData,
  });

  return response.json();
};
