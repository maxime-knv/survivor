import { Link } from 'react-router-dom'
export default function ScanSuccess() {
  return <main className="page-container panel">
    <h1>Validation du paiement</h1>
    <p>Le scan seul ne valide pas un paiement. Le partenaire doit vérifier le code et confirmer le montant dans son espace.</p>
    <Link to="/partenaire/transactions">Ouvrir l’encaissement partenaire</Link>
  </main>
}
