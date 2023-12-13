import { createURL } from "../../utils/environment";

export const getSellers = async (token) => {
    const response = await fetch(createURL([`/sellers`]), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);
    return response.json();
}

