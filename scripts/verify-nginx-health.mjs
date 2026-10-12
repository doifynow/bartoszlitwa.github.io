import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { log } from 'node:console';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dockerfile = readFileSync(new URL('../Dockerfile', import.meta.url), 'utf8');
const image = dockerfile.match(/^FROM (nginx:\S+) AS final$/m)?.[1];
assert.ok(image, 'Use the same pinned Nginx image as the production Dockerfile.');
const container = `portfolio-health-contract-${randomUUID()}`;
function docker(args) {
  return spawnSync('docker', args, { encoding: 'utf8', timeout: 60_000 });
}
function requireSuccess(result) {
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  return result;
}
requireSuccess(
  docker([
    'create',
    '--name',
    container,
    '--network',
    'none',
    '--memory',
    '64m',
    '--cpus',
    '0.25',
    image
  ])
);
try {
  for (const [source, destination] of [
    ['nginx.conf', '/etc/nginx/conf.d/default.conf'],
    ['nginx-security-headers.conf', '/etc/nginx/portfolio-security-headers.conf']
  ]) {
    requireSuccess(docker(['cp', `${root}${source}`, `${container}:${destination}`]));
  }
  requireSuccess(docker(['start', container]));
  requireSuccess(docker(['exec', container, 'nginx', '-t']));
  const health = requireSuccess(
    docker(['exec', container, 'wget', '-S', '-O', '-', 'http://127.0.0.1/health'])
  );
  assert.equal(health.stdout, 'healthy\n');
  assert.match(health.stderr, /HTTP\/1\.1 200 OK/);
  assert.match(health.stderr, /Cache-Control: no-store/i);
  assert.match(health.stderr, /X-Robots-Tag: noindex, nofollow/i);
  assert.match(health.stderr, /Content-Security-Policy:/i);
  const missing = docker([
    'exec',
    container,
    'wget',
    '-S',
    '-O',
    '-',
    'http://127.0.0.1/health-contract-missing'
  ]);
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /HTTP\/1\.1 404 Not Found/);
  log('Nginx health, security headers, cache policy and missing-route behavior passed.');
} finally {
  requireSuccess(docker(['rm', '-f', container]));
}
