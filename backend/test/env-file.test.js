import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

test('development and production scripts load the backend .env file', () => {
  for (const scriptName of ['dev', 'start']) {
    assert.match(
      packageJson.scripts[scriptName],
      /^node --env-file-if-exists=\.env(?:\s|$)/,
      `${scriptName} must load .env before executing the server`,
    );
  }
});

test('Node env-file loading works and shell variables take precedence', () => {
  const directory = mkdtempSync(join(tmpdir(), 'civicloop-env-test-'));
  const key = 'CIVICLOOP_ENV_FILE_TEST';
  writeFileSync(join(directory, '.env'), `${key}=from-file\n`);

  try {
    const cleanEnvironment = { ...process.env };
    delete cleanEnvironment[key];
    const args = [
      '--env-file-if-exists=.env',
      '--input-type=module',
      '--eval',
      `process.stdout.write(process.env.${key} ?? '')`,
    ];

    const fromFile = execFileSync(process.execPath, args, {
      cwd: directory,
      env: cleanEnvironment,
      encoding: 'utf8',
    });
    assert.equal(fromFile, 'from-file');

    const fromShell = execFileSync(process.execPath, args, {
      cwd: directory,
      env: { ...cleanEnvironment, [key]: 'from-shell' },
      encoding: 'utf8',
    });
    assert.equal(fromShell, 'from-shell');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
