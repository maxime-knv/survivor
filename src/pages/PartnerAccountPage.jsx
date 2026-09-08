import { BadgeCheck } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import LoadingState from '../components/ui/LoadingState'
import { getPartnerAccount } from '../services/partnerAccountService'
import { useAsync } from '../services/useAsync'

export default function PartnerAccountPage() {
    const { data: account, loading } = useAsync(getPartnerAccount, [])

    if (loading || !account) {
        return (
            <>
                <PageHeader title="Mon compte partenaire" />
                <LoadingState label="Chargement de votre compte..." />
            </>
        )
    }

    return (
        <>
            <PageHeader title="Mon compte partenaire">
                {account.official ? (
                    <span className="official-badge"><BadgeCheck size={15} /> Partenaire vérifié</span>
                ) : null}
            </PageHeader>

            <SimulationBadge />

            <section className="panel form-panel">
                <h2>Établissement</h2>
                <p className="form-intro">Ces informations seront connectées à votre profil administratif.</p>
                <div className="account-fields">
                    <div><span>Nom de l’établissement</span><strong>{account.name}</strong></div>
                    <div><span>SIRET</span><strong>{account.siret}</strong></div>
                    <div><span>Catégorie</span><strong>{account.category}</strong></div>
                    <div><span>Email de contact</span><strong>{account.email}</strong></div>
                    <div><span>Téléphone</span><strong>{account.phone}</strong></div>
                    <div><span>Statut</span><strong>{account.status}</strong></div>
                </div>
                {account.decidedAt ? (
                    <p className="form-intro">
                        Décision du {account.decidedAt} par {account.decidedBy}, motif : {account.motif}
                    </p>
                ) : null}
                {account.official ? (
                    <div className="official-badge large"><BadgeCheck size={18} /> Badge Partenaire Vérifié actif</div>
                ) : null}
            </section>
        </>
    )
}
