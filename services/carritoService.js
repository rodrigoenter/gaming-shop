import { baseURL } from "../database/database";

export const subirCarrito = async (userId, carritoItems) => {
    try {
        const response = await fetch(`${baseURL}/carrito/${userId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carritoItems),
        });

        if (!response.ok) {
            throw new Error("Error al subir el carrito.");
        }
    } catch (error) {
        console.error("subirCarrito error:", error.message);
    }
};

export const cargarCarrito = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/carrito/${userId}.json`);
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("cargarCarrito error:", error.message);
        return [];
    }
};
