import { createURL } from "../../utils/environment";

export const changePassword = async (token, data) => {
  const url = `http://localhost:8080/api/auth/changePassword/${token}`;

  try {
    const response = await fetch(createURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return response.json();
  } catch (error) {
    console.error('There was a problem with the request:', error);
    throw error;
  }
};
