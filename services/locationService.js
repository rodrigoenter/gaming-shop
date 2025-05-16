import { baseURL } from "../database/database";

export const guardarDireccionUsuario = async (userId, direccion) => {
    try {
        await fetch(`${baseURL}/direcciones/${userId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(direccion),
        });
    } catch (error) {
        throw new Error("Error al guardar dirección");
    }
};

export const obtenerDireccionUsuario = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/direcciones/${userId}.json`);
        if (!response.ok) throw new Error("No se pudo obtener la dirección");
        return await response.json();
    } catch (error) {
        return null;
    }
};