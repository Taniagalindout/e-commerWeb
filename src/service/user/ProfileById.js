import { createURL } from "../../utils/environment";

export const getProfileById = async (id, token) => {

    const response = await fetch(createURL([`/users/${id}`]), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response.json();
}
