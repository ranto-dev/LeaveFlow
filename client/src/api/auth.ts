import axios from "axios";

export const api = axios.create({
  baseURL: `http:${window.location.hostname}:3000/api`,
  withCredentials: true,
});

export const login = (email: string, motDePasse: string) =>
  api.post("/auth/login", { email, motDePasse });

export const logout = () => api.post("/auth/logout");

export const getMe = () => api.get("/auth/me");

/**
 * 
 * Voici un résumé des classes Daisy UI les plus **classiques, courantes et indispensables** que vous utiliserez dans la majorité de vos projets, regroupées par fonctionnalité :

## 💎 Résumé des Classes Daisy UI Indispensables

| Catégorie | Classe(s) Principale(s) | Description et Usage Typique |
| :--- | :--- | :--- |
| **Boutons (Buttons)** | `btn` | La classe de base pour tout bouton. |
| | `btn-primary`, `btn-secondary` | Boutons principaux (action forte) et secondaires (action moyenne). |
| | `btn-accent`, `btn-info`, `btn-success`, `btn-warning`, `btn-error` | Boutons de couleur contextuelle (confirmation, information, danger, etc.). |
| | `btn-lg`, `btn-md`, `btn-sm`, `btn-xs` | Tailles (Large, Medium - défaut, Small, Extra Small). |
| | `btn-outline` | Bouton transparent avec juste une bordure de couleur. |
| **Alertes & Messages** | `alert` | Conteneur de base pour les messages d'alerte. |
| | `alert-info`, `alert-success`, `alert-warning`, `alert-error` | Couleurs contextuelles pour l'alerte (Information, Succès, Avertissement, Erreur). |
| **Navigation** | `navbar` | Conteneur pour la barre de navigation supérieure. |
| | `menu` | Conteneur pour les listes de liens de navigation (menus simples ou latéraux). |
| | `menu-item` | Élément individuel dans un `menu`. |
| **Cartes (Cards)** | `card` | Le conteneur de base pour une carte ou un panneau. |
| | `card-body` | Le corps principal (padding interne) de la carte. |
| | `card-title` | Le titre dans le corps de la carte. |
| **Formulaires** | `input` | Le style de base pour les champs de saisie de texte. |
| | `input-bordered` | Ajoute une bordure visible à l'input. |
| | `select` | Le style de base pour les listes déroulantes (`<select>`). |
| | `label` | Classe simple pour une étiquette de formulaire. |
| **Conteneurs & Layout** | `container` | Conteneur centré et responsive (si vous n'utilisez pas de framework plus complet comme Bootstrap ou les utilitaires Tailwind `max-w-*`). |
| | `hero` | Conteneur de style "hero section" (grande section de bannière). |
| **Étiquettes/Badges** | `badge` | Le conteneur de base pour une petite étiquette colorée. |
| | `badge-primary`, `badge-error`, `badge-outline` | Couleurs contextuelles et styles (similaire aux boutons). |
| **Modale** | `modal` | Le conteneur principal de la fenêtre modale. |
| | `modal-box` | Le contenu de la modale (la boîte visible). |

---

### 💡 Le principe des Modificateurs

Daisy UI utilise le même principe que Tailwind CSS, mais en ajoutant des classes sémantiques. Rappelez-vous que la plupart des composants suivent ce modèle :

1.  **Classe de Base :** (`btn`, `card`, `alert`, `input`) – Définit l'aspect général.
2.  **Modificateur de Couleur/Rôle :** (`*-primary`, `*-error`, `*-success`) – Applique la couleur de thème.
3.  **Modificateur de Style/Taille :** (`*-outline`, `*-ghost`, `*-lg`, `*-sm`) – Change la taille ou le style visuel.

**Exemple :** Un grand bouton de succès en mode "outline" : `btn btn-success btn-outline btn-lg`

**Souhaitez-vous un aperçu des classes utilitaires de Tailwind CSS les plus utilisées en complément (comme les marges, le flexbox, etc.) ?**
 */
