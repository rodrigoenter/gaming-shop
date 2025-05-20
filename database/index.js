import { openDatabaseAsync } from 'expo-sqlite';

const openDB = async () => {
    return await openDatabaseAsync("app.db");
};

export const initDB = async () => {
    try {
        const db = await openDB();
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId TEXT NOT NULL UNIQUE,
                token TEXT NOT NULL
            );
        `);
    } catch (error) {
        throw error;
    }
};

export const insertSession = async (userId, token) => {
    try {
        const db = await openDB();
        await db.runAsync(
            `INSERT OR REPLACE INTO sessions (userId, token) VALUES (?, ?)`,
            [userId, token]
        );
    } catch (error) {
        throw error;
    }
};

export const fetchSession = async () => {
    try {
        const db = await openDB();
        const result = await db.getFirstAsync(
            "SELECT * FROM sessions LIMIT 1"
        );
        return result || null;
    } catch (error) {
        return null;
    }
};

export const deleteSession = async () => {
    try {
        const db = await openDB();
        await db.execAsync("DELETE FROM sessions");
    } catch (error) {
        throw error;
    }
};