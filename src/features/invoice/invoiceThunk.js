import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchInvoices } from "../../api/invoice";
export const fetchInvoices = createAsyncThunk(
    'invoice/fetchAll',
    async ({ filter }, { getState, rejectWithValue }) => {
        const token = getState().auth.user?.jwt;
        if (!token) {
            return rejectWithValue("token not found");
        }
        try {
            const response = await searchInvoices(filter, token);
            const page = response.data.invoices;
            return {
                items: page.content,
                total: page.totalElement
            }
        } catch (err) {
            const msg = err.response.data.message || 'invoice list fetch failed';
            return rejectWithValue(msg)
        }
    }
)