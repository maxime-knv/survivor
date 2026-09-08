import { Link } from 'react-router-dom'
import { FileCheck2, HandCoins, Store, Users } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import LoadingState from '../components/ui/LoadingState'
import { getPartners } from '../services/partnersService'
import { getPartnerApplications } from '../services/partnerApplicationService'
import { getEmployees } from '../services/adminService'
import { getEmployers } from '../services/employersService'
import { useAsync } from '../services/useAsync'
import { formatCurrency } from '../utils/format'

export default function AdminDashboardPage() {
    const { data: partners, loading: partnersLoading } = useAsync(getPartners, [])
    const { data: employees, loading: employeesLoading } = useAsync(getEmployees, [])
    const { data: employers, loading: employersLoading } = useAsync(getEmployers, [])

    const { data: applications, loading: applicationsLoading } = useAsync(getPartnerApplications, [])

    if (partnersLoading || employeesLoading || employersLoading || applicationsLoading) {
        return (
            <>
                <PageHeader title="Tableau de bord national" />
                <LoadingState label="Chargement du tableau de bord..." />
            </>
        )
    }

    const pendingApplications = applications.filter((application) => application.status === 'PENDING').length
    const totalMonthlyTopUp = employers.reduce((sum, employer) => sum + employer.monthlyTopUp, 0)

    return (
        <>
            <PageHeader title="Tableau de bord national" />

            <SimulationBadge />

            <div className="admin-metrics-grid">
                <div className="panel admin-metric-card">
                    <Store size={18} />
                    <strong>{partners.length}</strong>
                    <span>Partenaires actifs</span>
                </div>
                <div className="panel admin-metric-card">
                    <FileCheck2 size={18} />
                    <strong>{pendingApplications}</strong>
                    <span>Demandes en attente</span>
                </div>
                <div className="panel admin-metric-card">
                    <Users size={18} />
                    <strong>{employees.length}</strong>
                    <span>Salariés suivis</span>
                </div>
                <div className="panel admin-metric-card">
                    <HandCoins size={18} />
                    <strong>{formatCurrency(totalMonthlyTopUp)}</strong>
                    <span>Abondements / mois</span>
                </div>
            </div>

            <aside className="panel quick-panel">
                <h3>Accès rapides</h3>
                <div className="quick-actions">
                    <Link to="/admin/demandes-partenaires" className="action-item">
                        <span className="action-icon"><FileCheck2 size={18} strokeWidth={2.3} /></span>
                        <span>Demandes partenaires</span>
                    </Link>
                    <Link to="/admin/comptes" className="action-item">
                        <span className="action-icon"><Users size={18} strokeWidth={2.3} /></span>
                        <span>Comptes</span>
                    </Link>
                    <Link to="/admin/abondements" className="action-item">
                        <span className="action-icon"><HandCoins size={18} strokeWidth={2.3} /></span>
                        <span>Abondements</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}
