# Guide d'utilisation — Démonstration sur tablette

Ce guide décrit, étape par étape, comment faire une démonstration de Ticket Tout sur une tablette. Il ne décrit que ce qui fonctionne réellement dans l'application aujourd'hui.

## Avant de commencer

- Ouvrir l'application dans le navigateur de la tablette.
- Vérifier que la page d'accueil se charge (voir étape 1).
- Le bandeau orange **« Environnement de démonstration : montants simulés, aucune valeur réelle »** est normal : il rappelle qu'aucun argent réel n'est utilisé.

## Étape 1 — Ouvrir l'accueil

En ouvrant l'application, l'écran **Tableau de bord** s'affiche automatiquement.

On y voit :
- le solde disponible (par exemple **14 248,50 €**) ;
- les crédits reçus et les dépenses du mois ;
- un bloc **Actions rapides** avec les boutons *Code QR*, *Partenaires*, *Historique*, *Aide* ;
- un partenaire mis en avant (*Coup de cœur du Ministre*) ;
- les transactions récentes.

![Accueil](screenshots/01-home.png)

## Étape 2 — Repérer le menu de navigation

En haut de l'écran, une barre de menu affiche six liens : **Accueil**, **Code QR**, **Mes QR codes**, **Partenaires**, **Historique**, **Aide**.

⚠️ **Important pour la démonstration** : seuls **Accueil** et **Mes QR codes** ouvrent un écran aujourd'hui. Les liens *Code QR*, *Partenaires*, *Historique* et *Aide* affichent une page blanche s'ils sont cliqués — ce sont des écrans pas encore branchés. Ne pas cliquer dessus devant un public ; voir le plan B (`demo-contingency-plan.md`) en cas de clic accidentel.

## Étape 3 — Créer un code QR (fonctionnalité pas encore accessible)

La création d'un nouveau code QR est **prévue** mais **n'est pas activée** dans le menu à ce jour : le lien *Code QR* du menu ne mène à aucun écran fonctionnel.

Pour la démonstration, la bibliothèque contient déjà des codes QR d'exemple, générés automatiquement à l'ouverture de l'application. C'est avec ces exemples que l'on illustre la consultation, l'aperçu et le téléchargement (étapes 4 à 6).

*Aucune capture d'écran n'est fournie pour cette étape, car l'écran n'est pas accessible aujourd'hui.*

## Étape 4 — Consulter la bibliothèque des QR codes

Depuis n'importe quel écran, toucher **Mes QR codes** dans le menu du haut.

L'écran **Mes codes QR** affiche une carte par code QR, avec pour chacune :
- une étiquette **Valide** (verte) ou **Expiré** (rouge) ;
- la date de création ;
- l'image du code QR ;
- le montant (par exemple **12,00 €**) ;
- le libellé (par exemple *Déjeuner équipe*, ou *Sans libellé*) ;
- l'heure de validité ou d'expiration (par exemple *Valide jusqu'à 10:53*) ;
- un bouton **Télécharger PNG**.

![Bibliothèque des QR codes](screenshots/02-qr-library.png)

## Étape 5 — Ouvrir l'aperçu d'un code QR

Toucher l'image d'un code QR dans une carte.

Une fenêtre s'ouvre par-dessus l'écran, avec :
- le code QR en grand ;
- le libellé du code (par exemple *Déjeuner équipe*) ;
- le montant et la validité (par exemple *12,00 €, valide jusqu'à 10:53*) ;
- un bouton **Télécharger PNG** ;
- une croix **X** en haut à droite pour fermer l'aperçu.

![Aperçu d'un code QR](screenshots/03-qr-preview.png)

Pour fermer l'aperçu : toucher la croix **X**, ou toucher en dehors de la fenêtre.

## Étape 6 — Télécharger un code QR

Depuis la carte de la bibliothèque **ou** depuis la fenêtre d'aperçu, toucher le bouton **Télécharger PNG**.

![Téléchargement d'un code QR](screenshots/04-qr-download.png)

Le navigateur enregistre alors une image du code QR sur l'appareil (nom de fichier du type `qr-tickettout-...png`). Aucun nouvel écran ne s'affiche : le téléchargement se fait directement en arrière-plan, comme n'importe quel téléchargement de fichier dans un navigateur.

## Fin de la démonstration

Pour revenir à tout moment à l'écran de départ, toucher **Accueil** dans le menu du haut.
