// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

/** @type {Record<string, [number, number][]>} */
const frauncesAxes = { opsz: [[9, 144]], SOFT: [[0, 100]] };

// https://astro.build/config
export default defineConfig({
  site: 'https://avarch.org',

  // Inlined so the first paint doesn't wait on a separate stylesheet request.
  build: { inlineStylesheets: 'always' },

  // Keep links from the previous (v3) site working. Targets for about, projects and
  // contact need the trailing slash: /contact would resolve back to contact.html/
  // on static hosts and loop forever.
  redirects: {
    '/about.html': '/about/',
    '/aboutfounder.html': '/founder',
    '/projects.html': '/projects/',
    '/etherworld.html': '/projects/etherworld',
    '/blockaction.html': '/projects/blockaction',
    '/associate-partner.html': '/partners',
    '/contact.html': '/contact/',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  // Downloaded at build time and served from the site itself.
  fonts: [
    // Fraunces is registered twice so each size gets its own fallback (see global.css):
    // at display size it is 25% narrower than Georgia, at text size 4% wider, and a
    // mismatched fallback reflows the page when the real font arrives.
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Fraunces Text Fallback', 'Georgia', 'serif'],
      optimizedFallbacks: false,
      options: { experimental: { variableAxis: frauncesAxes } },
    },
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces-display',
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Fraunces Display Fallback', 'Georgia', 'serif'],
      optimizedFallbacks: false,
      options: { experimental: { variableAxis: frauncesAxes } },
    },
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-geist',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  // The .html entries are redirects, not pages.
  integrations: [sitemap({ filter: (page) => !page.endsWith('.html/') && !page.endsWith('.html') && !page.includes('/colours') })],
});