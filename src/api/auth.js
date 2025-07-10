import axios from 'axios';

export const authClient = axios.create({
    baseURL: '/api/auth',                  // ← note the /api prefix
    headers: { 'Content-Type': 'application/json' },
});

export function loginRequest({ email, password }) {
    return authClient.post('/login/dev', { email, password });
}
