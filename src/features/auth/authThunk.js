import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../api/auth";
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await loginRequest({ email, password });
            return {
                ...response.data.user,
                jwt: response.data.jwt
            }
        } catch (err) {
            const msg = err.response.data.message || "Failed to login"
            return rejectWithValue(msg);
        }
    }
)