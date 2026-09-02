import PageHeader from '../components/ui/PageHeader'
import '../styles/Partners.css'
import { partners } from '../data/partners'

import { Panel, PanelGroup } from 'rsuite'

export default function PartnerPage() {
    return (
        <>
            <PageHeader title="Nos Partenaires" />
            <p className='partners-title'>Nous travaillons main dans la main avec des partenaires de confiance pour offrir le meilleur à nos clients. Intéressé par un partenariat ? Contactez-nous.</p>
            <PanelGroup>
                {partners.map((partner) => (
                    <div className='partner-panel' key={partner.id}>
                        <Panel header={partner.name}>
                            <p>description: {partner.description}</p>
                            <p>localisation: {partner.city}</p>
                        </Panel>
                    </div>
                ))}
            </PanelGroup>
        </>
    )
}
