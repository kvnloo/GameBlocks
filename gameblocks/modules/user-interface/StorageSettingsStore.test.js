import assert from 'node:assert/strict';
import test from 'node:test';
import { JsonSettingsStore } from './StorageSettingsStore.js';

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem(key, value) {
      data[key] = String(value);
    },
  };
}

test('load merges saved keys onto defaults, not dirty in-memory settings', () => {
  const storage = memoryStorage({
    demo: JSON.stringify({ volume: 0.2 }),
  });
  const store = new JsonSettingsStore(storage, 'demo', { volume: 1, muted: false });
  store.update({ volume: 0.9, extra: 'stale' });
  const loaded = store.load();
  assert.equal(loaded.volume, 0.2);
  assert.equal(loaded.muted, false);
  assert.equal(loaded.extra, undefined);
});

test('load with empty storage restores defaults', () => {
  const store = new JsonSettingsStore(memoryStorage(), 'demo', { volume: 1 });
  store.update({ volume: 0 });
  const loaded = store.load();
  assert.equal(loaded.volume, 1);
});
