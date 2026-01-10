# Documentation d'installation

**Comment ça marche?**

## 1. Installation de docker

Pour que ce projet puisse demarrer sur votre machine, il est **nécessaire** que vous ayez une version de `docker` qui marche sur votre machine. Pour installer `docker`, on peut se rendre sur la site officielle [https://docs.docker.com](https://docs.docker.com). On choisi la version de docker compatible pour notre machine

- windows & MAC - la version **docker desktop**
- linux - la version **docker community**

Dans mon cas, je suis sur Fedora linux alors j'ai installé la version de docker via la commande suivante:

```bash
# récupérer docker dans le dépot officielle de fedora
sudo dnf install docker

# active le service docker
sudo systemctl enable docker

# demarrer le service docker
sudo systemctl start docker

# verifier le statut du service docKer
sudo systemctl status docker
```

Une fois docker installé, on peut se rendre dans une terminale ou CMD et taper la commande suivante.

```bash
# afficher la version de docker
docker --version

# afficher la version de docker-compose
docker compose --version
```

## 2. Cloner le repositorie github

Avant, il est **nécessaire** qu'on a une version de `git` installé sur notre machine

```bash
# afficher la version de git sur notre terminal ou CMD
git --version
```

Ensuite on effectue la commande suivante pour cloner le projet

- si on utilise une `ssh`

  ```bash
  git clone git@github.com:ranto-dev/LeaveFlow.git
  ```

- sinon, on peut le cloner directement en utilisant le protocole `https`

  ```bash
  git clone https://github.com/ranto-dev/LeaveFlow.git
  ```

## 3. Premier lancement du projet

- Accéder à la réperoire du projet

```bash
cd ./LeaveFlow
```

- Lancer le projet en utilisant `docker-compose`

```bash
sudo docker-compose up --build
```

**_Notice_**:

- Verifier que vous avez une connexion internet stable parcequ'on a besoin de `pull` l'image docker et **installer** les dépendances du projet
- on a utilisé des variables d'environement dans notre projet. Alors il faudra qu'on créer dans le répéroire `backend` un fichier comportant les variables d'environement

fichier `backend/.env`

```bash
PORT=3000
MONGO_URI=mongodb://mongo:27017/LeaveFlow
JWT_SECRET=123456
NODE_ENV=development
CLIENT_URI=http://localhost:5173
```

On peut ensuite tester et lancer l'application

- lancer l'interface utilisateur dans un navigateur via l'url [http://localhost:5173](http://localhost:5173)
- tester l'api avec **insomnia**, **postman** ou **Rest client** de VSCode via l'url [http://localhost:3000](http://localhost:3000)
- Tester la connexion à `MongoDB`

  ```bash
  # exécuter bash dans le container docker de mongodb
  sudo docker exec -it leaveflow-mongo bash

  # lancer mongodb
  mongosh

  # Executer une commande de test
  > show dbs
  ```

### 4. Premier contact avec l'application

Par default, notre base de donne est vide. Mais, dès qu'on lance pour la première fois l'application l'api (le backend), le script **seedAdmin** s'executera et insert un administrateur par default dont les identifiant sont les suivantes:

```raw
email: rantoandrianandraina@gmail.com
mot de passe : ranto123
```

alors, dès que l'interface de connexion se charche, on peut déjà ce se connecter en tant que ADMINISTRATEUR. Ensuite, pour que nous puissions bénéficier des fonctionnalités clés de l'application, il faudra qu'in ajoute plusieurs utilisateurs dont leur role est varié entre **EMPLOYE** et **GESTIONNAIRTE**.

Pour qu'on puisse tester l'application de manière rapide et logique, on peut se référer à des exemples des données fictife,

- Base de test pour les utilisateurs: fichier [`docs/user.json`](./user.json).
- Base de test pour les demandes de congé: fichier [`docs/leaveRequest.json`](./leaveRequest.json)
