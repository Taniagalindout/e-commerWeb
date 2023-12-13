// Importa las dependencias necesarias según tu implementación
import { createURL } from "../../utils/environment";

// Función para obtener productos por categoría
export const getProductsByCategory = async (categoryName, token) => {
    try {
        const response = await fetch(createURL([`/products/category/${categoryName}`]), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener productos por categoría: ${response.statusText}`);
        }

        const responseData = await response.json();
        return { ok: true, data: responseData };
    } catch (error) {
        console.error("Error in getProductsByCategory:", error);
        return { ok: false, error: error.message };
    }
};

// Función original para obtener todos los productos
export const getProducts = async (token) => {
    try {
        const response = await fetch(createURL(["/products"]), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.statusText}`);
        }

        const responseData = await response.json();
        return { ok: true, data: responseData };
    } catch (error) {
        console.error("Error in getProducts:", error);
        return { ok: false, error: error.message };
    }
};
