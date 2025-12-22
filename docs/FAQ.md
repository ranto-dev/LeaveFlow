# FAQ - Conception et Architecture technique du projet

## I. Conception

Pour ce projet, on a choisi la notation `UML` pour modéliser de manière unifier. Ici, on a choisi d'utilsier deux types de diagramme:

- diagramme de cas d'utilisation
- diagramme de classe

### 1. Diagramme de cas d'utilisation

<img src="./conception/LeaveFlow - use case diagram.jpg" alt="diagramme de cas d'utilisation" width="100%" />

### 2. Digramme de classe

<img src="./conception/LeaveFlow - class diagram.jpg" alt="diagramme de classe" width="100%" />

## II. Architecture techniqeue

Pour ce projet, on a choisi d'utiliser une artichecture **Trois tière** c'est-à-dire on a séparé totalement notre projet en 3 partie:

- pour la partie **Frontend**, dont ici, le dossier `client` (Typescript & eact)
- pour la partie **API REST**, dont notre cas ici le répertoire `backend` (Node & Express.js)
- pour la partie **Base de donnée** qui est `MongoDB`

Voici l'architechure de base du projet

```raw
LeaveFlow/
    |- .github/workflows/ci.yml # pour la partie CI avec github actions
    |- backend/ # le répértoire contenant les fichiers sources pour la partie servers
    |- client/ # le répértoire contenan les fichiers source pour la partie frontend
    |- docs/ # répértoire dédiée à la documentation du projet
    |- docker-compose.yml # fichier pour l'orchestration des conteneur docker
    |- README.md
```

### 1. **La partie frontend**

On a choisi de développer cette partie avec une téchnologie de pointe: **Typescript** et **React.js** qui sont des technologies très connues dont le monde pour la développement d'application web, très populaire aussi grace à son preuve dans des grandes entreprises. On a utilisé **TailwindCSS** avec **DaisyUI** pour une UI Design plus moderne et intuitive

```raw
client/
    |- node_modules/ # contenant toute les modules et bibliothèque utilisé dans l'application
    |- public/ # repéroire publique
    |- src/ # Contenant toute les fichiers sources de l'application
        |- api/ # une répértoire dédiée aux codes pour l'appel à l'api
        |- assets/
        |- components/ # il contient toute les composants réutilisable dans ce projet
        |- context/ # composant source pour l'euthentification provider
        |- pages/ # répértoire contentant toute la page, constituant le projet
        |- routes/ # répértoire dédiée à la gestion de sécurité, autorisation des routes
        |- typescript/ # on a choisi de répértorier tout les typages de donné dans ce donnée
        |- App.tsx # Composant principale
        |- index.css # fichier contenant l'importation de tailwindcss et daisyUI
        |- main.tsx
    |- index.html # le point d'entrée HTML du projet
    |- Dockerfile # contruction d'une image docker pour le projet
    |- ... # autre fichier de configuration par default de Vite.js et React.js
    |- package.json # fichier pour la gestion des packages du projet
    |- -vite.config.ts # le fichier de configuration global du projet
```

### 2. **la partie backend**

```raw
backend/
    |- node_modules/ # contenant toute les modules et bibliothèque utilisé dans l'application
    |- src/ # Contenant toute les fichiers sources de l'application
        |- config
            |- db.js # fichier contenant la connexion à la base de donnée
        |- controllers
            |- auth.controller.js # controller pour la gestion d'authentification
            |- leave.controller.js # controller pour la gestion des demandes de congé
            |- user.controller.js # controller pour la gestion des tilisateurs
        |- middlewares
            |- auth.middleware.js # middleware pour la gestion d'autorisation au mement de l'authentification
            |- role.middleware.js # middleware pour la gestion de role
        |- models
            |- LeaveRequest.js # schema de la collection pour la demande de congé
            |- User.js # schema de la collection pour l'utilisateur
        |- routes
            |- admin.routes.js
            |- auth.routes.js
            |- employee.routes.js
            |- manager.routes.js
        |- server.js
    |- test/ # base de test
    |- .env # fichier contenant les variables d'environement
    |- .gitignore
    |- Dockerfile # contruction d'une image docker pour le projet
    |- package.json # fichier de gstion des packages du proket
```

### 3. **le fichier** `docker-compose.yml`

Ce fichier permet de gérer une stack, il nous permet de run tout les conteneurs docker utilisé par notre application. nous permet aussi d'installé les dépendances de notre projet (node, mongodb) en créant des conteneurs.

```yml
# choix de la version à employer
version: "3.9"

# déclaration des services à exécuter
services:
  # contruction d'un conteneur avec une image de mongodb
  mongo:
    image: mongo:latest
    container_name: leaveflow-mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  # contruction d'une registry contenant notre code backend
  backend:
    build: ./backend
    container_name: leaveflow-backend
    restart: always
    env_file:
      - ./backend/.env
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    volumes:
      - ./backend:/app
      - /app/node_modules

  # contruction d'une registry contenant notre code frontend
  client:
    build: ./client
    container_name: leaveflow-frontend
    restart: always
    ports:
      - "5173:5173"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  mongo_data:
```

### 4. **Le workflows avec github actions**

Actuellement, il est important de penser à ajouter un `workflows` permettant de faire ce qu'on appel `CI` c'et-à-dire Continuous Integration. Dans notre cas, on se content tout simplement de run des tests unitaires et une build d'image. Ces actions se déclanchent uniquement si

- il y a y une `push` vers la branch `main`
- lorsqu'il y a une pull request
