import axios from 'axios';

export const invoiceClient = axios.create({
    baseURL: '/api/invoice',
    headers: { 'Content-Type': 'application/json' },
});

export function searchInvoices(filter, token) {
    return invoiceClient.post('/search', filter, {
        headers: { 'R-Auth': token },
    });
}
