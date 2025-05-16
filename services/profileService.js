import { baseURL } from "../database/database";

export const subirImagenPerfil = async (userId, imageUri) => {
    try {
        const response = await fetch(`${baseURL}/perfil/${userId}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageUri }),
        });

        if (!response.ok) {
            throw new Error("Error al guardar imagen de perfil");
        }

    } catch (error) {
        throw new Error(error.message || "Error al subir imagen de perfil");
    }
};

export const obtenerImagenPerfil = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/perfil/${userId}.json`);
        if (!response.ok) {
            throw new Error("Error al obtener imagen de perfil");
        }
        const data = await response.json();
        return data?.image || null;
    } catch (error) {
        throw new Error(error.message || "Error al obtener imagen de perfil");
    }
};