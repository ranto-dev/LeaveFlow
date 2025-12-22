# LeaveFlow - Une mini plateforme de gestion de congés

## I. Objectif du projet

une application simple et fonctionnelle permettant

- aux employés de soumettre et gérer leurs demandes de congés
- aux gestionnaire de traiter ces demandes.

## II. Fonctionnalités disponibles

### 2.1 Authentification (Employé & Gestionnaire)

- connexion avec email + mot de passe
- Séparation des roles (Employer / Manager)
- Interface adaptés selon le role

### 2.2 Espace gestionnaire (Manager)

- **Visualisation** de toutes les demandes de congés
- **Tri dynamique** par date et par statut (En attente, Accepté, Refusé)
- **Recherche instantanée**: suivant le nom ou le prénom de l'individu
- **Traitement des demandes** : Accepter | Refuser
- **Aperçu global des congés** sous forme d'une diagramme

### 2.3 Espace Employé

- **Demande de congé** :

  - type de congé : maladie, absence, vacances
  - solde disponible
  - dates début + fin
  - commentaire

- **Modification et suppression d’une demande uniquement si elle n’a pas encore été traitée**
- **Consultation** du solde de congés restant

### 2.4 Espace Admin

- **Visualisation global des demandes de congé**
  - Diagrammme en Pie
  - Liste en tableau
- **Gestion des utilsiateurs**
  - création d'un nouvel utilisateur
  - lister toute les utilisateurs
  - modification d'un utilisateur
  - ainsi que la suppréssion
  - Diagramme des utilisattions par rapport à leurs roles

## III. Stack

- **frontend**: Tailwindcss & DaisyUI / Typescript & React.js avec framer motion
- **backend**: Node & Express.js
- **base de donnée**: MongoDB
- **API testing**: Extension de VSCode - Rest client et insomnia
- **Continuous Integration**: Docker, Git, GitHub

### IV. Livrable

- Code source complet sur [ce repositorie](https://github.com/ranto-dev/LeaveFlow.git)
- Documentation d'installaton (le fichier `docs/comment ça marche.md`)
- Explication de l'architecture ( répértoire de conception `docs/FAQ.md`)
