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

test('wrap heuristic uses torus distance for in-range cells', () => {
  const planner = new GridPathPlanner({ navigation, columns: 10, rows: 10, wrap: true });
  assert.equal(planner.heuristic({ right: 0, forward: 0 }, { right: 9, forward: 0 }), 1);
  assert.equal(planner.heuristic({ right: 0, forward: 0 }, { right: 1, forward: 0 }), 1);
});

test('wrap heuristic stays non-negative when cells are outside the board', () => {
  const planner = new GridPathPlanner({ navigation, columns: 10, rows: 10, wrap: true });
  const cost = planner.heuristic({ right: 0, forward: 0 }, { right: 15, forward: 0 });
  assert.equal(cost, 5);
  assert.ok(cost >= 0);
});
