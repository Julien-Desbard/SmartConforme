# Smart Relance

Une application web moderne de suivi et gestion de relances, construite avec **Next.js** et containerisée avec **Docker**.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Docker](#docker)
- [Développement](#développement)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)
- [Contribution](#contribution)
- [Licence](#licence)

## 🎯 Vue d'ensemble

Smart Relance est une application fullstack conçue pour optimiser la gestion des relances commerciales et administratives. L'application offre une interface utilisateur intuitive et réactive, construite avec les dernières technologies web.

### Technologies principales

- **Frontend**: [Next.js](https://nextjs.org) 16.x avec React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4 + Radix UI
- **Tests**: Jest + React Testing Library
- **Linting**: ESLint
- **Containerisation**: Docker & Docker Compose
- **Gestionnaire de paquets**: pnpm

## 📦 Prérequis

### Déploiement avec Docker (recommandé)

- Docker 20.10+
- Docker Compose 2.0+

### Développement local

- Node.js 22.19.0 ou supérieur
- pnpm 10.16.1 ou supérieur

## 🚀 Installation

### Cloner le repository

```bash
git clone <your-repository-url>
cd smart_relance
cd front
```

### Installation des dépendances (développement local)

```bash
pnpm install
```

## ⚡ Démarrage rapide

### Avec Docker Compose (production)

```bash
cd front
docker compose up --build
```

L'application sera accessible sur `http://localhost:3000`

### Développement local

```bash
cd front
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🐳 Docker

### Build l'image Docker

```bash
cd front
docker build -t smart_relance:latest .
```

### Lancer un conteneur

```bash
docker run -p 3000:3000 -e NODE_ENV=production smart_relance:latest
```

### Configuration Docker Compose

Le projet inclut un fichier `docker-compose.yaml` pré-configuré. Modifiez les variables d'environnement selon vos besoins :

```yaml
services:
  server:
    build:
      context: .
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
```

**Variables d'environnement disponibles** :

Copiez `.env.example` en `.env.local` et configurez vos variables :

```bash
cp .env.example .env.local
```

## 💻 Développement

### Scripts disponibles

```bash
# Développement avec hot-reload
pnpm dev

# Build pour la production
pnpm build

# Démarrer le serveur de production
pnpm start

# Linter le code
pnpm lint

# Exécuter les tests
pnpm test

# Mode watch pour les tests
pnpm test:watch
```

### Structure du projet

```
front/
├── src/
│   ├── app/           # App router (Next.js 13+)
│   ├── components/    # Composants React réutilisables
│   ├── lib/          # Utilitaires et helpers
│   └── ...
├── public/           # Fichiers statiques
├── Dockerfile        # Configuration Docker
├── compose.yaml      # Configuration Docker Compose
├── next.config.ts    # Configuration Next.js
├── tailwind.config.js # Configuration Tailwind CSS
├── tsconfig.json     # Configuration TypeScript
├── jest.config.mjs   # Configuration Jest
└── package.json      # Dépendances du projet
```

## 🧪 Tests

### Exécuter les tests

```bash
pnpm test
```

### Mode watch

```bash
pnpm test:watch
```

### Couverture de tests

```bash
pnpm test -- --coverage
```

Les rapports de couverture sont générés dans le dossier `coverage/`.

## 📝 Linting et formatage

### Vérifier le code

```bash
pnpm lint
```

### Corriger les erreurs de linting

```bash
pnpm lint --fix
```

## 🔄 CI/CD

Le projet utilise GitHub Actions pour l'intégration continue. Le workflow est défini dans [.github/workflows/front-ci-cd.yml](.github/workflows/front-ci-cd.yml).

**Pipeline CI/CD** :

- ✅ Lint
- ✅ Tests
- ✅ Build

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez lire notre [template de Pull Request](pr_template.md) pour plus de détails sur le processus de contribution.

### Processus de contribution

1. Fork le repository
2. Créez une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Bonnes pratiques

- Assurez-vous que le linting passe : `pnpm lint`
- Assurez-vous que tous les tests passent : `pnpm test`
- Écrivez des tests pour les nouvelles fonctionnalités
- Suivez le template de PR fourni

## 📄 Licence

Ce projet est privé et propriétaire.

---

**Besoin d'aide ?**

Pour toute question ou problème, veuillez consulter la [documentation Next.js](https://nextjs.org/docs) ou ouvrir une issue dans le repository.
