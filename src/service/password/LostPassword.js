import { createURL } from "../../utils/environment";

export const lostpass = async (data) => {
    const response = await fetch(createURL([`/auth/sendMailToken`]),{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}