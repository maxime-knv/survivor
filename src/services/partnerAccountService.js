import { request } from './http'
export const getPartnerAccount = () => request('/partner/account')
export const getReceivedTransactions = () => request('/partner/transactions')
export const submitTransaction = ({ reference }) => request('/partner/preview', { method: 'POST', body: JSON.stringify({ reference }) })
export const validateTransaction = (reference) => request('/partner/validate', { method: 'POST', body: JSON.stringify({ reference }) })
// Les actions admin disposent d'une route distincte protégée.
export const setPartnerStatus = (status, id) => request('/users/partners/' + id, { method: 'PATCH', body: JSON.stringify({ status }) })
