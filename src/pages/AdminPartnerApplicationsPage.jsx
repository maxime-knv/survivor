import { useEffect, useState } from 'react'
import { CheckCircle2, ShieldCheck, ShieldX } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import LoadingState from '../components/ui/LoadingState'
import EmptyState from '../components/ui/EmptyState'
import { getPartnerCategories } from '../services/partnersService'
import { getPartnerApplications, reviewPartnerApplication } from '../services/partnerApplicationService'
import { useAsync } from '../services/useAsync'

export default function AdminPartnerApplicationsPage() {
    const { data: partnerCategories, loading: categoriesLoading } = useAsync(getPartnerCategories, [])

    const [applications, setApplications] = useState([])
    const [applicationsLoading, setApplicationsLoading] = useState(true)
    const [notice, setNotice] = useState('')
    const [motifDrafts, setMotifDrafts] = useState({})
    const [errors, setErrors] = useState({})
    const [loadError, setLoadError] = useState(null)

    useEffect(() => {
        let cancelled = false
        getPartnerApplications().then((list) => {
            if (!cancelled) {
                setApplications(list)
                setApplicationsLoading(false)
            }
        }).catch((error) => {
            if (!cancelled) {
                setLoadError(error)
                setApplicationsLoading(false)
            }
        })
        return () => {
            cancelled = true
        }
    }, [])

    async function handleReview(id, status) {
        const motif = (motifDrafts[id] || '').trim()
        if (!motif) {
            setErrors((prev) => ({ ...prev, [id]: 'Un motif est requis pour justifier la décision.' }))
            return
        }
        setErrors((prev) => ({ ...prev, [id]: null }))
        try {
            await reviewPartnerApplication(id, status, motif)
            setApplications(await getPartnerApplications())
            setNotice(status === 'APPROVED' ? 'Partenaire validé.' : 'Demande refusée.')
        } catch (error) {
            setErrors((prev) => ({ ...prev, [id]: error.message }))
        }
    }

    if (loadError) throw loadError
    if (categoriesLoading || applicationsLoading) {
        return (
            <>
                <PageHeader title="Demandes d’inscription partenaires" />
                <LoadingState label="Chargement des demandes..." />
            </>
        )
    }

    return (
        <>
            <PageHeader title="Demandes d’inscription partenaires" />

            <SimulationBadge />

            {notice ? (
                <div className="success-notice" role="status">
                    <CheckCircle2 size={18} /> {notice}
                </div>
            ) : null}

            <section className="panel ledger-panel">
                <div className="ledger-header">
                    <div>
                        <h2>Demandes reçues</h2>
                        <p>
                            Contrôle par un agent sur pièces justificatives (SIRET, objet social) : chaque décision
                            requiert un motif écrit, tracé et non modifiable.
                        </p>
                    </div>
                </div>

                {applications.length === 0 ? (
                    <EmptyState title="Aucune demande en attente" description="Les nouvelles inscriptions partenaires apparaîtront ici." />
                ) : (
                    applications.map((application) => {
                        const categoryLabel = partnerCategories.find((category) => category.id === application.categoryId)?.label
                        return (
                            <div key={application.id} className="activity-row">
                                <div className="activity-left">
                                    <div>
                                        <div className="activity-name">{application.companyName}</div>
                                        <div className="activity-time">
                                            SIRET {application.siret} · {categoryLabel} · {application.city}
                                        </div>
                                        <div className="activity-time">{application.objetSocial}</div>
                                        {application.status !== 'PENDING' ? (
                                            <div className="activity-time">
                                                {application.decidedAt} par {application.decidedBy}, motif : {application.motif}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                {application.status === 'PENDING' ? (
                                    <div className="admin-review-actions">
                                        <div className="input-row note-row">
                                            <input
                                                type="text"
                                                placeholder="Motif de la décision (obligatoire)"
                                                value={motifDrafts[application.id] || ''}
                                                onChange={(event) =>
                                                    setMotifDrafts((prev) => ({ ...prev, [application.id]: event.target.value }))
                                                }
                                            />
                                        </div>
                                        {errors[application.id] ? (
                                            <p className="field-error" role="alert">{errors[application.id]}</p>
                                        ) : null}
                                        <button className="link-btn" type="button" onClick={() => handleReview(application.id, 'APPROVED')}>
                                            <ShieldCheck size={14} /> Valider
                                        </button>
                                        <button className="link-btn danger" type="button" onClick={() => handleReview(application.id, 'REJECTED')}>
                                            <ShieldX size={14} /> Refuser
                                        </button>
                                    </div>
                                ) : (
                                    <span className={application.status === 'REJECTED' ? 'status-pill failed' : 'status-pill'}>
                                        {application.status === 'APPROVED' ? 'Validé' : 'Refusé'}
                                    </span>
                                )}
                            </div>
                        )
                    })
                )}
            </section>
        </>
    )
}
