import { createURL } from "../../utils/environment";

export const getOrderItems = async (token) => {
    try {
        const response = await fetch(createURL(['/order-items']), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error('Error fetching order items:', error);
        throw error;
    }
}
