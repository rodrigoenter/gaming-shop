import { baseURL } from "../database/database";

export const subirFavoritos = async (userId, favoritos) => {
    const res = await fetch(`${baseURL}/favoritos/${userId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoritos),
    });

    if (!res.ok) throw new Error("Error al guardar favoritos");
};

export const obtenerFavoritos = async (userId) => {
    const res = await fetch(`${baseURL}/favoritos/${userId}.json`);
    if (!res.ok) throw new Error("Error al obtener favoritos");
    return await res.json();
};