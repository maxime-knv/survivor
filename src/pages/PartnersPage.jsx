import { Panel, PanelGroup } from 'rsuite'
import 'rsuite/Panel/styles/index.css'
import PageHeader from '../components/ui/PageHeader'
import { partners, partnerCategories } from '../data/partners'

function categoryLabel(categoryId) {
    return partnerCategories.find((category) => category.id === categoryId)?.label ?? 'Partenaire'
}

export default function PartnerPage() {
    return (
        <>
            <PageHeader title="Nos partenaires" />
            <p className="partners-intro">
                Nous travaillons main dans la main avec des partenaires de confiance pour offrir le meilleur
                à nos bénéficiaires. Intéressé par un partenariat ? Contactez-nous.
            </p>
            <PanelGroup className="partner-grid">
                {partners.map((partner) => (
                    <Panel
                        key={partner.id}
                        className="partner-card"
                        bordered
                        header={
                            <div className="partner-card-top">
                                <span className="partner-name">{partner.name}</span>
                                <span className="partner-category-tag">{categoryLabel(partner.categoryId)}</span>
                            </div>
                        }
                    >
                        <p className="partner-city">{partner.city}</p>
                        <p className="partner-description">{partner.description}</p>
                    </Panel>
                ))}
            </PanelGroup>
        </>
    )
}
