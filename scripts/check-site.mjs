import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const htmlFiles = readdirSync(root).filter((name) => name.endsWith('.html'));
const failures = [];
const packagePages = {
  'memo.html': {
    packageName: '@memoarchitect/ontology',
    version: pkg.memoVersions.ontology,
    docsUrl: 'https://memoarchitect.com/memo/',
    repoUrl: 'https://github.com/memoarchitect/memo',
  },
  'memo-tools.html': {
    packageName: '@memoarchitect/tools',
    version: pkg.memoVersions.tools,
    docsUrl: 'https://memoarchitect.com/memo-tools/',
    repoUrl: 'https://github.com/memoarchitect/memo-tools',
  },
  'memo-architect.html': {
    packageName: '@memoarchitect/architect',
    version: pkg.memoVersions.architect,
    docsUrl: 'https://memoarchitect.com/memo-architect/',
    repoUrl: 'https://github.com/memoarchitect/memo-architect',
  },
};

for (const name of htmlFiles) {
  const path = resolve(root, name);
  const html = readFileSync(path, 'utf8');

  const product = packagePages[name];
  if (product && !html.includes(`npm install --save-exact ${product.packageName}@${product.version}`)) {
    failures.push(`${name}: missing npm installation command for ${product.packageName}@${product.version}`);
  }
  if (product && !html.includes(product.docsUrl)) {
    failures.push(`${name}: missing its MkDocs URL ${product.docsUrl}`);
  }
  if (product && !html.includes(product.repoUrl)) {
    failures.push(`${name}: missing its GitHub repository URL ${product.repoUrl}`);
  }
  if (product && !html.includes('Pre-1.0 stability notice.')) {
    failures.push(`${name}: missing the pre-1.0 stability notice`);
  }
  if (html.includes('memoarchitect.github.io')) {
    failures.push(`${name}: use the canonical memoarchitect.com documentation URL`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|#|\/)/.test(target)) continue;
    const local = target.split(/[?#]/, 1)[0];
    if (local && !existsSync(resolve(root, local))) {
      failures.push(`${name}: missing local target ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} website pages; product versions and local links resolve.`);
