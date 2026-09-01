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

test('wrap heuristic stays non-negative when cells differ by more than the board size', () => {
  const planner = new GridPathPlanner({ navigation, columns: 8, rows: 8, wrap: true });
  const h = planner.heuristic({ right: 0, forward: 0 }, { right: 10, forward: 0 });
  assert.equal(h, 2);
  assert.ok(h >= 0);
});

test('wrap heuristic is the shorter torus arc', () => {
  const planner = new GridPathPlanner({ navigation, columns: 10, rows: 10, wrap: true });
  assert.equal(planner.heuristic({ right: 0, forward: 0 }, { right: 9, forward: 0 }), 1);
  assert.equal(planner.heuristic({ right: 0, forward: 0 }, { right: 1, forward: 0 }), 1);
});
