import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';
import { loadAuthState, saveAuthState } from "../utils/localStorage";

const preloadedAuth = loadAuthState();

const store = configureStore({
    reducer: {
        auth: authReducer,
        invoice: invoiceReducer
    },
    preloadedState: {
        auth: preloadedAuth || undefined
    }
})

store.subscribe(() => {
    saveAuthState(store.getState().auth);
})