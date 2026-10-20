import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { text } from 'node:stream/consumers';
import { pathToFileURL } from 'node:url';
import { createElement } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'vite';

// Render the actual portfolio components, including lazy sections, at build time.
// The browser still mounts its interactive app with its own language/theme preferences.
const temporary = await mkdtemp(join(cwd(), '.prerender-'));
try {
  await build({
    build: {
      ssr: 'src/App.tsx',
      outDir: temporary,
      copyPublicDir: false,
      ssrEmitAssets: true
    }
  });
  const { default: App } = await import(pathToFileURL(join(temporary, 'App.js')).href);
  const { prelude, postponed } = await prerenderToNodeStream(createElement(App));
  assert.equal(postponed, null, 'The static document must finish every section.');
  // Resolve lazy imports first, then serialize without streaming reveal instructions.
  await text(prelude);
  const markup = renderToStaticMarkup(createElement(App));
  assert.match(markup, /<h1\b/, 'The static document must contain the real hero.');
  assert.match(markup, /href="https:\/\/doifynow.com"/, 'Keep product links in initial HTML.');
  assert.ok(
    !/<script\b|role="status"/.test(markup),
    `Static content must not need reveal scripts: ${markup.match(/.{0,40}(?:<script\b|role="status").{0,120}/g)}`
  );

  // Lazy components have separate CSS chunks. Load their styles for non-JS readers too.
  const manifest = JSON.parse(await readFile('build/.vite/manifest.json', 'utf8'));
  const css = [...new Set(Object.values(manifest).flatMap((chunk) => chunk.css ?? []))];
  let html = await readFile('build/index.html', 'utf8');
  assert.ok(html.includes('<div id="root"></div>'), 'Only replace an empty source root.');
  const styles = css
    .filter((file) => !html.includes(`href="/${file}"`))
    .map((file) => `<link rel="stylesheet" href="/${file}" />`)
    .join('\n');
  html = html.replace('</head>', `${styles}\n</head>`);
  html = html.replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
  html = html.replace(
    '    <noscript>You need to enable JavaScript to run this app.</noscript>\n',
    ''
  );
  await writeFile('build/index.html', html);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
