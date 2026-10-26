# MEMO Architect website

The public website for [memoarchitect.com](https://memoarchitect.com). It
introduces the MEMO product family and directs visitors to the appropriate
product guide:

- **MEMO Ontology** — typed SysML v2 vocabulary and modeling guidance for
  medical-device engineering.
- **MEMO Tools** — model parsing, validation, closure checks, and artifact
  generation.
- **MEMO Architect** — visual review views for diagrams, traceability,
  scenarios, DSM, and DHF work.

## Development

The site is static HTML, CSS, and assets. No build step is required for local
review; open `index.html` through a local web server.

Run the repository check before publishing:

```bash
npm run check
```

## Publishing

GitHub Pages serves the `main` branch from the repository root. The `CNAME`
file configures the production domain and must remain at the repository root.

## Release alignment

The website version follows MEMO Architect’s release version. The
`memo-meta/scripts/check-release-versions.sh` check verifies the intended
release alignment while allowing MEMO Ontology and MEMO Tools to have
independent patch versions within the same major/minor compatibility line.
