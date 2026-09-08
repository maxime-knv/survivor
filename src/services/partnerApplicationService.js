import { request } from './http'

export function getPartnerApplications() {
    return request('/partner-applications')
}

export function submitPartnerApplication(application) {
    return request('/partner-applications', { method: 'POST', body: JSON.stringify(application) })
}

export function reviewPartnerApplication(id, status, motif) {
    return request(`/partner-applications/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, motif }),
    })
}
