# InkTrace

InkTrace is a client-side web application for generating customizable handwriting practice worksheets. It ingests user configuration preferences and custom word lists, rendering them directly in the browser using HTML5 Canvas before exporting print-ready PDFs.

The application runs entirely client-side, persisting user configurations in browser local storage and executing all layout and PDF generation locally.

## Table of Contents

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## Requirements

The codebase has the following system prerequisites:
- Node.js 18 or higher
- npm or a compatible package manager

## Quick Start

To run the application locally, install the dependencies and start the development server:

```bash
npm install
npm run dev
```

The local development server will start and listen on the default Vite address:

```text
http://localhost:5173
```

## Documentation

Reference wiki pages describing worksheet configurations, font proportions, and teaching recipes are documented in the static wiki site served at:

```text
/wiki/
```

## Development

Use the following commands to test, lint, and build the application:

```bash
# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Run lint checks followed by production build
npm run check

# Preview production build locally
npm run preview
```

All compiled production assets are written to the `dist/` directory.

## License

Distributed under the MIT License.
