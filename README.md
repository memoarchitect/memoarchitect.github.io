# MEMO Architect Organization Site

Static GitHub Pages site for `memoarchitect.com`.

## Version policy

The website uses SemVer in `package.json` and releases at exactly the same
version as Memo Architect. `memo-meta/scripts/check-release-versions.sh` enforces
that equality while allowing independent patch versions for MEMO and Memo Tools
on the same `MAJOR.MINOR` compatibility line.

Run the dependency-free site check before release:

```bash
npm run check
```

## GitHub Pages setup

In the `memoarchitect/memoarchitect.github.io` repository, GitHub Pages deploys
from `main` and `/root` with the custom domain `memoarchitect.com`.

The `CNAME` file should stay at the repository root.
