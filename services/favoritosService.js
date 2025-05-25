import { baseURL } from "../database/database";

export const subirFavoritos = async (userId, favoritos) => {
    if (!userId || !favoritos) throw new Error("Datos inválidos");

    const res = await fetch(`${baseURL}/favoritos/${userId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoritos),
    });

    if (!res.ok) throw new Error("Error al guardar favoritos");
};

export const obtenerFavoritos = async (userId) => {
    if (!userId) throw new Error("User ID inválido");

    const res = await fetch(`${baseURL}/favoritos/${userId}.json`);

    if (!res.ok) throw new Error(`Error al obtener favoritos: ${res.status}`);

    const data = await res.json();

    return data ?? [];
};