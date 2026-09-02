// Libellé unique et volontairement explicite : aucune valeur monétaire de l'espace
// salarié ne doit être affichée sans ce rappel, à la demande du service juridique.
export default function SimulationBadge() {
    return (
        <div className="simulation-badge" role="status">
            Environnement de démonstration : montants simulés, aucune valeur réelle
        </div>
    )
}
