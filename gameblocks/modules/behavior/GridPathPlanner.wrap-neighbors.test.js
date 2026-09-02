import assert from 'node:assert/strict';
import test from 'node:test';
import { GridPathPlanner } from './GridPathPlanner.js';

const navigation = {
  vectors: {
    north: { right: 0, forward: 1 },
    east: { right: 1, forward: 0 },
    south: { right: 0, forward: -1 },
    west: { right: -1, forward: 0 },
  },
  neighborOrder: ['north', 'east', 'south', 'west'],
};

test('wrap neighbors from the origin use torus edges, not clamp', () => {
  const planner = new GridPathPlanner({ navigation, columns: 10, rows: 10, wrap: true });
  const neighbors = Object.fromEntries(
    planner.getNeighbors({ right: 0, forward: 0 }).map((entry) => [entry.direction, entry.cell])
  );
  assert.deepEqual(neighbors.west, { right: 9, forward: 0 });
  assert.deepEqual(neighbors.south, { right: 0, forward: 9 });
  assert.deepEqual(neighbors.east, { right: 1, forward: 0 });
});

test('wrap neighbors from far out-of-board cells use modulo, not the far edge', () => {
  const planner = new GridPathPlanner({ navigation, columns: 10, rows: 10, wrap: true });
  const neighbors = Object.fromEntries(
    planner.getNeighbors({ right: -5, forward: 0 }).map((entry) => [entry.direction, entry.cell])
  );
  // -5 + 1 = -4 → 6 on a period-10 torus. Clamp-to-edge would have produced 9.
  assert.deepEqual(neighbors.east, { right: 6, forward: 0 });
  assert.deepEqual(neighbors.west, { right: 4, forward: 0 });
});
