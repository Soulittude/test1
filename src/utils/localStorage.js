export const loadAuthState = () => {
    try {
        const serialized = localStorage.getItem('auth');
        if (!serialized) return undefined;
        return JSON.parse(serialized);
    } catch (e) {
        console.warn("Failed to load auth state: ", e);
        return undefined
    }
}
export const saveAuthState = (authState) => {
    try {
        const serialized = JSON.stringify(authState);
        localStorage.setItem('auth', serialized);
    } catch (e) {
        console.warn("Failed to save auth: ", e);
    }
}