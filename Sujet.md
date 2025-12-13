# Projet : Mini Portail RH – Gestion des Congés

## 🎯 Objectif du projet

Développer une application simple et fonctionnelle permettant :

- aux employés de soumettre et gérer leurs demandes de congés,
- aux gestionnaires de traiter ces demandes.

L’objectif est d’évaluer votre capacité à concevoir une application CRUD complète, avec une gestion des rôles (employé / manager).

## Fonctionnalités attendues

### 🔐 1.1 Authentification (Employé & Gestionnaire)

- Connexion avec email + mot de passe
- Séparation des rôles (Employé / Manager)
- Interface adaptée selon le rôle

### 👨‍💼 2. Espace Gestionnaire (Manager)

\*\*Fonctionnalités obligatoires

- **Visualisation** de toutes les demandes de congés
- **Tri dynamique** :par date et par statut (En attente, Accepté, Refusé)
- **Traitement des demandes** : Accepter | Refuser | Suppression d’une demande
- **Historique** ou aperçu global des congés (facultatif mais apprécié)

### 👨‍💻 3. Espace Employé

Fonctionnalités obligatoires

- **Demande de congé** :

  - type de congé : maladie, absence, vacances
  - solde disponible
  - dates début + fin
  - commentaire facultatif

- **Modification et suppression d’une demande uniquement si elle n’a pas encore été traitée**
- **Consultation** du solde de congés restant
- **Possibilité** d’ajouter un solde (simulation : pas besoin de workflow)

#### 🗃️ 4. Spécifications techniques

\*\*Obligatoire

- **Tech**: MERN
- Les autres spécifications techniques sont à votre choix et seront considérés comme bonus

#### 📦 5. Livrables demandés

- Code source complet
- Documentation d’installation bien claire
- Explication de l’architecture bien claire
