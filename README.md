# Avarch Website

Official website for [Avarch](https://avarch.org), built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 22.23.4`
- npm

### Installation

```bash
npm install
```

### Development Server

Start the local development server at `http://localhost:4321`:

```bash
npm run dev
```

### Production Build

Build the static site to the `dist/` directory:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
├── .github/workflows/   # GitHub Actions deployment workflow
├── design/              # Design assets and legacy archive
├── public/              # Static public assets (CNAME, favicon, manifest, robots.txt)
│   └── CNAME            # Custom domain configuration (avarch.org)
├── src/
│   ├── assets/          # Processed images and media
│   ├── components/      # Reusable Astro UI components
│   ├── data/            # Site data, team, founder bio, FAQ
│   ├── layouts/         # Page layout templates
│   ├── lib/             # Helper utilities
│   ├── pages/           # Site routes & pages
│   └── styles/          # Global styles & Tailwind entrypoint
├── astro.config.mjs     # Astro configuration & redirects
└── tsconfig.json        # TypeScript configuration
```

## 🌐 Deployment (GitHub Pages)

The website is hosted on **GitHub Pages** with the custom domain **`avarch.org`**.

- **Automatic Deployments**: Any push to the `main` branch automatically triggers `.github/workflows/deploy.yml` which builds and deploys the site using `withastro/action`.
- **Custom Domain**: Configured via `public/CNAME` (`avarch.org`) which Astro outputs to `dist/CNAME` during build.
- **Redirects**: Legacy HTML routes (`/about.html`, `/projects.html`, etc.) are redirected to modern clean URLs via `astro.config.mjs`.

> **Note**: In repository settings on GitHub (`Settings` -> `Pages`), ensure **Source** is set to **GitHub Actions**.
