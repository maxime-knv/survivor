import { ShieldCheck, Wallet, QrCode, ArrowRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

const helpTopics = [
  {
    icon: ShieldCheck,
    tag: 'Sécurité des cartes',
    title: 'Comment contester une transaction inconnue sur votre carte',
    description: 'Verrouillez instantanément votre carte Ticket Tout et déposez une réclamation en quelques minutes.',
  },
  {
    icon: Wallet,
    tag: 'Outils de budget',
    title: 'Définir des plafonds et budgets mensuels',
    description: 'Gardez le cap avec des alertes automatiques et des limites par catégorie de dépense.',
  },
  {
    icon: QrCode,
    tag: 'Paiements partenaires',
    title: 'Utiliser un code QR sécurisé chez un partenaire',
    description: 'Générez un code personnalisé, à usage unique, pour régler rapidement chez un partenaire référencé.',
  },
]

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Aide et support" />

      <div className="help-grid">
        {helpTopics.map((topic) => (
          <article key={topic.title} className="panel help-card">
            <div className="help-card-icon">
              <topic.icon size={22} strokeWidth={1.8} />
            </div>
            <div className="help-copy">
              <div className="tag">{topic.tag}</div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="panel contact-banner">
        <div>
          <h3>Vous avez encore besoin d’aide pour votre carte ou votre compte ?</h3>
          <p>Notre équipe d’assistance est disponible pour répondre à vos demandes.</p>
        </div>
        <a className="primary-btn" href="mailto:support@tickettout.exemple">
          Contacter le support <ArrowRight size={18} strokeWidth={2.5} />
        </a>
      </div>
    </>
  )
}
