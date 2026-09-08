import { request } from './http'

export const getEmployees = () => request('/users/employees')
export const getAdminPartners = () => request('/users/partners')
