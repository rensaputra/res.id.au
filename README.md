# Rendy's Portfolio Website

[![CI](https://github.com/rensaputra/res.id.au/actions/workflows/ci.yml/badge.svg)](https://github.com/rensaputra/res.id.au/actions/workflows/ci.yml) [![pages-build-deployment](https://github.com/rensaputra/res.id.au/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/rensaputra/res.id.au/actions/workflows/pages/pages-build-deployment)  
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![GitHub Profile](https://img.shields.io/badge/github-rensaputra-blue?logo=github)](https://github.com/rensaputra) [![LinkedIn Profile](https://img.shields.io/badge/LinkedIn-rendyekasaputra-blue.svg?logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMTguMTIzIDIxOC4xMjdoLTM3LjkzMXYtNTkuNDAzYzAtMTQuMTY1LS4yNTMtMzIuNC0xOS43MjgtMzIuNC0xOS43NTYgMC0yMi43NzkgMTUuNDM0LTIyLjc3OSAzMS4zNjl2NjAuNDNoLTM3LjkzVjk1Ljk2N2gzNi40MTN2MTYuNjk0aC41MWEzOS45MDcgMzkuOTA3IDAgMCAxIDM1LjkyOC0xOS43MzNjMzguNDQ1IDAgNDUuNTMzIDI1LjI4OCA0NS41MzMgNTguMTg2bC0uMDE2IDY3LjAxM1pNNTYuOTU1IDc5LjI3Yy0xMi4xNTcuMDAyLTIyLjAxNC05Ljg1Mi0yMi4wMTYtMjIuMDA5LS4wMDItMTIuMTU3IDkuODUxLTIyLjAxNCAyMi4wMDgtMjIuMDE2IDEyLjE1Ny0uMDAzIDIyLjAxNCA5Ljg1MSAyMi4wMTYgMjIuMDA4QTIyLjAxMyAyMi4wMTMgMCAwIDEgNTYuOTU1IDc5LjI3bTE4Ljk2NiAxMzguODU4SDM3Ljk1Vjk1Ljk2N2gzNy45N3YxMjIuMTZaTTIzNy4wMzMuMDE4SDE4Ljg5QzguNTgtLjA5OC4xMjUgOC4xNjEtLjAwMSAxOC40NzF2MjE5LjA1M2MuMTIyIDEwLjMxNSA4LjU3NiAxOC41ODIgMTguODkgMTguNDc0aDIxOC4xNDRjMTAuMzM2LjEyOCAxOC44MjMtOC4xMzkgMTguOTY2LTE4LjQ3NFYxOC40NTRjLS4xNDctMTAuMzMtOC42MzUtMTguNTg4LTE4Ljk2Ni0xOC40NTMiIGZpbGw9IiMwQTY2QzIiLz48L3N2Zz4K)](https://www.linkedin.com/in/rendyekasaputra/)

Personal portfolio site and technical documentation repository. These are my personal technical notes, put together as I learn new concepts, explore different tools, and prepare for certifications. I created this documentation primarily as a way to retain information and to give myself a reliable reference to revisit from time to time. By writing things down, I hope to better understand and remember them.

This space serves as a comprehensive collection of concepts, hands-on labs, and best practices that I've compiled along my learning journey.

## Installation

Check out the code and install dependencies:

```bash
gh repo clone rensaputra/res.id.au
cd res.id.au
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

> **Note on Search functionality:** The local search plugin (`@easyops-cn/docusaurus-search-local`) only generates its search index during the production build. Therefore, search will **not** work when running `npm start`. To test search locally, you must run `npm run build` followed by `npm run serve`.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Wayback Machine Integration

The deployment pipeline automatically submits the website to the [Internet Archive's Wayback Machine](https://web.archive.org/) after a successful deployment to ensure older versions of the notes are preserved.

This is performed asynchronously via a fire-and-forget `curl` request to the [Wayback Machine Save Page API](https://gist.github.com/regstuff/82e690db2f1d91ba59f6681c1abad6cf) to prevent the deployment workflow from blocking or failing due to rate limits.

To avoid heavy rate limiting from the Internet Archive, the request will conditionally authenticate using the [SPN2 API](https://archive.org/account/s3.php) if keys are provided. To enable this, add the following secrets to your GitHub repository:

- `IA_ACCESS_KEY`
- `IA_SECRET_KEY`

### IndexNow Integration

The deployment pipeline is configured to automatically submit updated URLs to search engines via the IndexNow protocol whenever a successful deployment occurs.

To enable this feature, you must configure a repository secret:

1. Generate an IndexNow key (e.g., using an online generator or creating a random UUID).
2. Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**.
3. Create a new repository secret named `INDEXNOW_KEY` and paste your key as the value.

If the secret is not set, the IndexNow submission steps in the deployment workflow will simply be skipped.
