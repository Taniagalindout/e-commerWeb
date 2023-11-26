import { createURL } from "../../utils/environment";

export const login = async (data) => {
    const response = await fetch(createURL([`/auth/login`]), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}