import test from 'node:test';
import assert from 'node:assert/strict';
import { parseEnv, compare } from '../src/index.js';

test('parses comments, quotes, export and inline comments', () => {
  const m = parseEnv('# c\nA=1\nexport B="two words"\nC=x # note\n\nD=\n');
  assert.equal(m.get('A'), '1');
  assert.equal(m.get('B'), 'two words');
  assert.equal(m.get('C'), 'x');
  assert.equal(m.get('D'), '');
});

test('detects missing, empty and extra keys', () => {
  const r = compare(parseEnv('A=\nB=\nC=1'), parseEnv('A=\nC=1\nZ=9'));
  assert.deepEqual(r.missing, ['B']);
  assert.deepEqual(r.empty, ['A']);
  assert.deepEqual(r.extra, ['Z']);
  assert.equal(r.ok, false);
});

test('ok when everything present', () => {
  assert.equal(compare(parseEnv('A=1'), parseEnv('A=2')).ok, true);
});
