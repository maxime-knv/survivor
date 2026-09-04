# Ticket Tout — Où en est le prototype

*Document de présentation, mis à jour le 03/09/2026.*

## En une phrase

Ticket Tout est une application web qui permet à un salarié de créer un code QR représentant un montant à dépenser, de le consulter et de le télécharger. Pour l'instant, c'est une **maquette interactive** : elle montre comment l'application fonctionnera, mais elle n'est reliée à aucun vrai compte bancaire ni à aucun vrai serveur.

## Ce qui est déjà fonctionnel

- **Tableau de bord (page d'accueil)** : affiche un solde disponible, les crédits et dépenses du mois, un partenaire mis en avant, et les dernières transactions.
- **Bibliothèque de codes QR ("Mes QR codes")** : affiche les codes QR déjà générés, avec leur montant, leur libellé, leur statut (valide ou expiré) et l'heure d'expiration.
- **Aperçu agrandi d'un code QR** : cliquer sur un code QR l'affiche en grand dans une fenêtre, avec son montant et sa validité.
- **Téléchargement d'un code QR** : un bouton « Télécharger PNG » enregistre une image du code QR sur l'appareil.
- **Règle métier appliquée** : chaque code QR est valable 30 minutes après sa création, puis passe automatiquement au statut « Expiré ».

## Écrans disponibles aujourd'hui

Seuls deux écrans sont réellement accessibles en cliquant dans l'application :

1. **Accueil** (tableau de bord)
2. **Mes QR codes** (bibliothèque)

La barre de navigation en haut affiche aussi « Code QR », « Partenaires », « Historique » et « Aide », mais ces boutons ne mènent nulle part pour le moment : cliquer dessus affiche une page blanche. Ce sont des écrans prévus mais pas encore branchés.

## Ce qui fonctionne « en mode prototype »

- Les codes QR affichés sont des **exemples de démonstration**, préchargés automatiquement dès la première ouverture de l'application.
- Un bandeau orange « Environnement de démonstration : montants simulés, aucune valeur réelle » rappelle en permanence qu'aucun argent réel n'est en jeu.
- Les données (solde, transactions, codes QR) sont stockées dans le navigateur de l'appareil, pas sur un serveur central.

## Ce qui n'est pas encore connecté à un vrai backend

- Il n'y a **aucun serveur** derrière l'application : toutes les informations (compte, transactions, codes QR) sont simulées et stockées uniquement sur l'appareil utilisé.
- Aucune vérification réelle n'est faite quand un partenaire scanne un code QR : ce scénario n'est pas encore développé.
- Il n'y a pas encore de compte utilisateur avec connexion/mot de passe : un seul profil de démonstration est utilisé.
- L'écran permettant de créer un nouveau code QR existe dans le code du projet mais n'est pas encore activé dans l'application.

## Limites connues

- Naviguer vers « Code QR », « Partenaires », « Historique » ou « Aide » depuis le menu affiche une page vide.
- Si le navigateur ou l'appareil est changé, les codes QR créés ne suivent pas (ils sont propres à l'appareil).
- Aucune protection ou authentification n'existe : n'importe qui ayant accès à l'appareil voit les mêmes données.
- L'application n'a pas été vérifiée pour l'accessibilité (le pied de page l'indique lui-même : « Accessibilité : non conforme »).

## Prévu la semaine prochaine

- Activer l'écran de création d'un nouveau code QR (formulaire montant + libellé), déjà codé mais désactivé.
- Avancer sur les écrans « Partenaires » et « Historique » pour qu'ils affichent du contenu réel de démonstration.
- Continuer à préparer l'application pour qu'elle puisse, plus tard, se connecter à un vrai serveur sans tout reconstruire.
