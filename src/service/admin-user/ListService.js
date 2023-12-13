import { createURL } from "../../utils/environment";

export const getUsers = async (token) => {
    const response = await fetch(createURL([`/users`]), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);
    return response.json();
}