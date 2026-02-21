# Sammie's Personal Homepage

This is a personal homepage built with Vue 3, TypeScript, Vite, Element Plus, and Pinia. It serves as a central hub for my projects and links.

## Features

- 🎨 Modern UI with gradient background and glassmorphism effects
- 📱 Fully responsive design for mobile, tablet, and desktop
- ⚡️ Fast loading with Vite
- 📦 Component-based architecture
- 🚀 Ready for GitHub Pages deployment

## Tech Stack

- **Framework:** Vue 3 + Composition API
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Element Plus
- **State Management:** Pinia
- **Icons:** Lucide Vue Next
- **Build Tool:** Vite

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── LinkCard.vue
│   └── PersonalProfile.vue
├── views/             # Page components
│   └── HomePage.vue
├── stores/            # Pinia state management
│   └── profile.ts
├── router/            # Vue Router configuration
│   └── index.ts
└── App.vue            # Root component
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Deployment

This project is configured for GitHub Pages.

1. Push the code to your GitHub repository `szysammie/szysammie.github.io`.
2. Go to repository Settings -> Pages.
3. Select `gh-pages` branch (or configure a workflow to deploy from `dist`).

Since this is a user site (`username.github.io`), the `base` in `vite.config.ts` is set to `/`.

To deploy manually:

```bash
npm run build
# Then push the contents of dist/ to the gh-pages branch or master branch depending on your setup
```

Or use the `gh-pages` package (already configured):

```bash
npm run deploy
```
