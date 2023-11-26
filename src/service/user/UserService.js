import { createURL } from "../../utils/environment";

export const createUser = async (data) => {
    console.log(data)
    const response = await fetch(createURL([`/auth/register`]), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}