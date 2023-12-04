import { createURL } from "../../utils/environment";

export const updateUser = async (token, userId, userData) => {
    const url = createURL([`/users/${userId}`]);

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    console.log(response);
    return response.json();
}
