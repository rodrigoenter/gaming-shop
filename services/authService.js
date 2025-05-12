import { apiKey } from "../database/database";

const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

export const signUp = async ({ email, password }) => {
    const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    if (!response.ok) throw await response.json();
    return response.json();
};

export const login = async ({ email, password }) => {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    if (!response.ok) throw await response.json();
    return response.json();
};