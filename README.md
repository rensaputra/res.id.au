[![CI](https://github.com/rensaputra/res.id.au/actions/workflows/ci.yml/badge.svg)](https://github.com/rensaputra/res.id.au/actions/workflows/ci.yml) [![Deploy](https://github.com/rensaputra/res.id.au/actions/workflows/deploy.yml/badge.svg)](https://github.com/rensaputra/res.id.au/actions/workflows/deploy.yml) [![pages-build-deployment](https://github.com/rensaputra/res.id.au/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/rensaputra/res.id.au/actions/workflows/pages/pages-build-deployment)

# Rendy's Portfolio Website

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

## API Documentation

Interactive API reference docs are served under the `/api` route, generated from an OpenAPI spec using [`docusaurus-openapi-docs`](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs). The API lives in its own docs plugin instance, separate from the `/docs` section.

**Source of truth:** the OpenAPI spec at `openapi/visitor-counter-api.json`. Edit this file to change the API docs.

**Generated output is not committed.** The reference pages (`api/*.api.mdx`, `api/*.info.mdx`, `api/*.tag.mdx`, `api/sidebar.ts`, and the `*.json` fragments) are regenerated on every build and are gitignored. Only the hand-authored `api/sidebars.ts` wrapper is tracked — it keys the generated sidebar array under `apiSidebar` so the navbar link and docs instance can resolve it.

Because generation runs automatically, `npm run build` produces the API docs with no extra steps:

```bash
npm run build   # runs `docusaurus gen-api-docs myapi` then `docusaurus build`
```

For local iteration on the spec, regenerate the pages manually, then start the dev server:

```bash
npm run gen-api     # regenerate from openapi/visitor-counter-api.json
npm run clean-api   # remove the generated files
npm start
```

> **Note:** After editing the spec, run `npm run gen-api` to see changes reflected under `/api`. To group operations into a named sidebar category instead of `UNTAGGED`, add a `tags` array to each operation in the spec.

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

### Amazon S3 + CloudFront Deployment

The production site at **`res.id.au`** is hosted on Amazon S3 and served through a CloudFront distribution. The deployment workflow (`.github/workflows/deploy.yml`) syncs the built site to the S3 bucket and invalidates the CloudFront cache. It authenticates with AWS using GitHub's OIDC provider, so no long-lived AWS access keys are stored in the repository.

GitHub Pages is still deployed in parallel and serves a secondary copy at **`dev.res.id.au`** (the domain is set by `static/CNAME`).

| Hostname        | Hosted on       | Purpose                                   |
| --------------- | --------------- | ----------------------------------------- |
| `res.id.au`     | S3 + CloudFront | Canonical production site                 |
| `dev.res.id.au` | GitHub Pages    | Secondary copy and `pr-*` preview staging |

The workflow is split into three jobs:

| Job            | Description                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build`        | Builds the site, adds the IndexNow key file, and uploads `build/` as a short-lived artifact.                                                                                    |
| `deploy-pages` | Deploys to the `gh-pages` branch (preserving open PR previews), then submits to IndexNow and Wayback.                                                                           |
| `deploy-s3`    | Runs in the `prod` [GitHub environment](https://docs.github.com/en/actions/deployment/targeting-different-environments), syncs the artifact to S3, then invalidates CloudFront. |

Both deploy jobs run in parallel after `build`, so a failure in one does not block the other. The S3 sync runs in two passes:

- `build/assets/` (hashed filenames) is uploaded with `Cache-Control: public, max-age=31536000, immutable`.
- Everything else (HTML, sitemap, etc.) is uploaded with `Cache-Control: public, max-age=0, must-revalidate`.

The `CNAME` file (used only by GitHub Pages for `dev.res.id.au`) is sourced from `static/CNAME` at build time, so it is present in both deployments. It is harmless on S3 since CloudFront serves `res.id.au` regardless.

#### 1. GitHub OIDC Provider in IAM

This only needs to be done once per AWS account.

1. Open the **IAM console** > **Identity providers** > **Add provider**.
2. Choose **OpenID Connect**.
3. Set **Provider URL** to `https://token.actions.githubusercontent.com`.
4. Set **Audience** to `sts.amazonaws.com`.
5. Click **Add provider**.

Or with the AWS CLI:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com
```

#### 2. IAM Role

Create a role (e.g. `GithubActionDeployS3`) that GitHub Actions can assume.

**Trust policy:** allows only jobs running in the `prod` environment of this repository to assume the role. Replace `<ACCOUNT_ID>` with your AWS account ID:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:rensaputra/res.id.au:environment:prod"
        }
      }
    }
  ]
}
```

> **Note:** When a job uses a GitHub environment, the OIDC `sub` claim is `repo:<owner>/<repo>:environment:<name>` instead of `repo:<owner>/<repo>:ref:refs/heads/main`. The branch restriction is enforced by the environment's deployment branch rule (see step 3) rather than by IAM. If the `sub` doesn't match, the job fails with `Not authorized to perform sts:AssumeRoleWithWebIdentity`.

To update the trust policy of an existing role:

```bash
aws iam update-assume-role-policy \
  --role-name GithubActionDeployS3 \
  --policy-document file://trust-policy.json
```

**Permissions policy:** grants the minimum access needed by `aws s3 sync --delete`. Note that `s3:ListBucket` applies to the bucket ARN, while object actions apply to `bucket/*`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::res.id.au"
    },
    {
      "Sid": "ReadWriteObjects",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::res.id.au/*"
    },
    {
      "Sid": "InvalidateCloudFront",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"],
      "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
    }
  ]
}
```

> **Note:** The `cloudfront:*` permissions are only needed if the site is served through CloudFront (see the [CloudFront](#cloudfront) section). `cloudfront:GetInvalidation` is required because the workflow waits for the invalidation to complete.

Or with the AWS CLI, after saving the policies above as `trust-policy.json` and `s3-deploy-policy.json`:

```bash
aws iam create-role \
  --role-name GithubActionDeployS3 \
  --assume-role-policy-document file://trust-policy.json

aws iam put-role-policy \
  --role-name GithubActionDeployS3 \
  --policy-name S3DeployResIdAu \
  --policy-document file://s3-deploy-policy.json
```

> **Note:** If the bucket uses SSE-KMS with a customer-managed key, also grant `kms:GenerateDataKey` and `kms:Decrypt` on that key.

#### 3. GitHub Environment and Variables

1. Go to your GitHub repository **Settings** > **Environments** > **New environment** and name it `prod`.
2. Under **Deployment branches and tags**, choose **Selected branches and tags** and add `main`. This prevents other branches from deploying to S3.
3. Optionally enable **Required reviewers** or a **Wait timer** to gate each S3 deployment.
4. Under **Environment variables**, add the following:

| Variable                     | Example                                               | Description                                                             |
| ---------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------- |
| `S3_BUCKET`                  | `res.id.au`                                           | Target S3 bucket name                                                   |
| `AWS_REGION`                 | `ap-southeast-2`                                      | Region of the S3 bucket                                                 |
| `AWS_ROLE_ARN`               | `arn:aws:iam::<ACCOUNT_ID>:role/GithubActionDeployS3` | ARN of the IAM role created above                                       |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1A2B3C4D5E6F7`                                      | CloudFront distribution ID. If unset, the invalidation step is skipped. |
| `S3_WEBSITE_URL`             | `https://res.id.au`                                   | Optional. Shown as the deployment link in the repository                |

> **Note:** If these variables were previously defined as repository variables, delete them from **Settings** > **Secrets and variables** > **Actions** > **Variables** so the environment is the single source of truth. Environment variables take precedence over repository variables with the same name.

Each successful run is recorded under **Deployments** > **prod** on the repository home page.

#### Running the S3 Deployment On Demand

The workflow runs automatically on every push to `main`. It can also be triggered manually from **Actions** > **Deploy** > **Run workflow** (on the `main` branch). Leave **Only deploy to S3** ticked to skip the `deploy-pages` job (GitHub Pages, IndexNow and Wayback Machine), or untick it for a full deployment. Runs from other branches are skipped.

Or with the GitHub CLI:

```bash
gh workflow run deploy.yml -f s3_only=true
```

### CloudFront

The S3 bucket is private and served through CloudFront using an [Origin Access Control (OAC)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html). The bucket policy grants `s3:GetObject` only to the CloudFront service principal (`cloudfront.amazonaws.com`), scoped to the distribution ARN via `AWS:SourceArn`; public access is blocked.

#### Subfolder index rewriting

With an OAC (REST API) origin, S3 does not automatically serve `index.html` for directory-style paths, so clean URLs like `/docs/intro/` would return `403`. A **CloudFront Function** on the **viewer request** event rewrites these paths:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Directory-style path (ends in /): append index.html
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  }
  // Extensionless path (no file extension in the last segment): treat as a
  // directory, e.g. /docs/intro -> /docs/intro/index.html
  else if (!uri.includes('.', uri.lastIndexOf('/'))) {
    request.uri += '/index.html';
  }

  return request;
}
```

Create it under **CloudFront** > **Functions**, publish it, then associate it with the default behavior's **Viewer request** event. Keep the distribution's **Default root object** set to `index.html`.

#### Custom error page

Because the bucket policy does not grant `s3:ListBucket`, S3 returns `403 AccessDenied` (not `404`) for missing objects. A **custom error response** on the distribution maps this to the Docusaurus 404 page:

- **HTTP error code:** `403: Forbidden`
- **Response page path:** `/404.html`
- **HTTP Response code:** `404: Not Found`
- **Error caching minimum TTL:** `10` seconds (keep short so new pages are not masked by a cached 404)

#### Cache invalidation

After each S3 sync, the `deploy-s3` job runs `aws cloudfront create-invalidation --paths "/*"` and waits for it to complete, so new HTML is served immediately instead of waiting for edge TTLs to expire. Hashed assets under `assets/` are immutable and would not strictly need invalidating, but a single `/*` invalidation counts as one path against the monthly free tier (1,000 paths) and keeps the step simple.

The step is skipped when `CLOUDFRONT_DISTRIBUTION_ID` is not set, and it requires the `cloudfront:CreateInvalidation` and `cloudfront:GetInvalidation` permissions added to the IAM role above.

#### Custom domain (`res.id.au`)

DNS for `res.id.au` is managed by Cloudflare.

1. Request a public certificate in **AWS Certificate Manager in `us-east-1`** (CloudFront only reads certificates from that region) for `res.id.au`. Validate it with the DNS CNAME ACM provides, added in Cloudflare as **DNS only** (grey cloud).
2. On the distribution, add `res.id.au` as an **Alternate domain name (CNAME)** and attach the issued certificate.
3. In Cloudflare, add a `CNAME` for `res.id.au` targeting the distribution's `*.cloudfront.net` domain, set to **DNS only** (grey cloud). Cloudflare's CNAME flattening serves this at the apex.

> **Note:** `dev.res.id.au` (GitHub Pages) is configured separately: a Cloudflare `CNAME` to `rensaputra.github.io` and the custom domain set under **Settings** > **Pages**.

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

### Visitor Counter Integration

The homepage Hero component displays a visitor counter backed by a REST API (AWS API Gateway + Lambda + DynamoDB). The API base URL is read at build time from the `VISITOR_COUNTER_API_BASE_URL` environment variable and exposed to the client bundle via `customFields` in `docusaurus.config.ts`.

> **Note:** Keep the trailing slash on the URL. The staged API Gateway endpoint requires it to resolve.

**Local development:** copy `.env.example` to `.env` and set the value. The `.env` file is loaded automatically via `dotenv`:

```bash
cp .env.example .env
```

**GitHub Actions:** define the variable so the deployment build points at the correct backend:

1. Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**.
2. Open the **Variables** tab and click **New repository variable**.
3. Name it `VISITOR_COUNTER_API_BASE_URL` and set the value to your API base URL (including the trailing slash).

If the variable is not set, the build falls back to the default stage defined in `docusaurus.config.ts`.
