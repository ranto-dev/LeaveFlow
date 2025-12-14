# LeaveFlow - Une mini plateforme de gestion de congés

## I. Objectif du projet

une application simple et fonctionnelle permettant

- aux employés de soumettre et gérer leurs demandes de congés
- aux gestionnaire de traiter ces demandes.

## II. Fonctionnalités disponibles

### 2.1 Authentification (Employé & Gestionnaire)

- connexion avec email + mot de passe (0Auth2)
- Séparation des roles (Employer / Manager)
- Interface adaptés selon le role

### 2.2 Espace gestionnaire (Manager)

- **Visualisation** de toutes les demandes de congés
- **Tri dynamique** :par date et par statut (En attente, Accepté, Refusé)
- **Traitement des demandes** : Accepter | Refuser | Suppression d’une demande
- **Historique** ou aperçu global des congés (facultatif mais apprécié)

### 2.3 Espace Employé

- **Demande de congé** :

  - type de congé : maladie, absence, vacances
  - solde disponible
  - dates début + fin
  - commentaire facultatif

- **Modification et suppression d’une demande uniquement si elle n’a pas encore été traitée**
- **Consultation** du solde de congés restant
- **Possibilité** d’ajouter un solde (simulation : pas besoin de workflow)

## III. Stack

- **frontend**: Tailwindcss avec DaisyUI / Typescript & React.js avec framer motion
- **backend**: Node & Express.js
- **base de donnée**: MongoDB
- **CI/CD**: Docker, Git, GitHub

### IV. Livrable

- Code source complet
- Documentation d'installaton (le fichier `docs/comment ça marche.md`)
- Explication de l'architecture ( répértoire de conception `docs/conception`)
