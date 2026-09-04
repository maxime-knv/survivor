# Ticket Tout

## Bienvenue

Ticket Tout est une application qui permet de gérer et d'utiliser des titres
restaurant dématérialisés grâce à des QR codes.

L'application propose un espace adapté à chaque type d'utilisateur : salarié,
partenaire ou utilisateur disposant uniquement de l'accès à l'accueil.

## Que peut-on faire avec Ticket Tout ?

### Salarié

Le salarié peut :

- consulter la page d'accueil ;
- créer et consulter ses QR codes ;
- télécharger un QR code pour l'utiliser chez un partenaire ;
- consulter les partenaires disponibles ;
- consulter l'historique de ses transactions ;
- accéder à la page d'aide.

### Partenaire

Le partenaire peut consulter la liste et les informations des partenaires
disponibles dans l'application.

### Accès à l'accueil

Certains utilisateurs disposent uniquement de la page d'accueil.

## Utiliser l'application

1. Ouvrez Ticket Tout.
2. Créez un compte avec **Inscription** ou connectez-vous avec **Connexion**.
3. Une fois connecté, utilisez le menu de navigation pour ouvrir les pages
	auxquelles votre profil a accès.
4. Depuis la page **Mes QR codes**, sélectionnez un QR code pour le consulter
	ou le télécharger.
5. Présentez le QR code au partenaire lors du paiement.
6. Consultez **Historique** pour retrouver vos transactions passées.

## Lancer l'application

Pour démarrer Ticket Tout sur votre ordinateur, ouvrez un terminal à la racine
du projet et exécutez :

```bash
npm install
npm run dev
```

Ouvrez ensuite l'adresse indiquée par le terminal, généralement
`http://localhost:5173`.

Le serveur backend doit également être démarré dans un autre terminal :

```bash
cd backend
npm install
npm run dev
```

## Besoin d'aide ?

La page **Aide** contient les informations utiles pour comprendre le
fonctionnement de l'application. En cas de problème, utilisez le lien
**Nous contacter** présent dans le pied de page.
