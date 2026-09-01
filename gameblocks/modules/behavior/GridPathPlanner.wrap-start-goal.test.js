import assert from 'node:assert/strict';
import test from 'node:test';
import { GridPathPlanner, gridCellKey } from './GridPathPlanner.js';

const navigation = {
  vectors: {
    north: { right: 0, forward: 1 },
    east: { right: 1, forward: 0 },
    south: { right: 0, forward: -1 },
    west: { right: -1, forward: 0 },
  },
  neighborOrder: ['north', 'east', 'south', 'west'],
};

test('wrap findPath maps off-board start and goal onto the torus', () => {
  const planner = new GridPathPlanner({ navigation, columns: 10, rows: 10, wrap: true });
  const path = planner.findPath({ right: -5, forward: 0 }, { right: 0, forward: 0 });
  assert.ok(path);
  assert.deepEqual(path[0], { right: 5, forward: 0 });
  assert.deepEqual(path.at(-1), { right: 0, forward: 0 });
  for (const cell of path) {
    assert.ok(cell.right >= 0 && cell.right < 10);
    assert.ok(cell.forward >= 0 && cell.forward < 10);
  }
  assert.equal(gridCellKey(path[0]), '5:0');
});

test('wrap floodFill maps off-board start onto the torus', () => {
  const planner = new GridPathPlanner({ navigation, columns: 8, rows: 8, wrap: true });
  const fill = planner.floodFill({ right: -1, forward: 0 }, [], true, true, 1);
  assert.equal(fill.count, 1);
  assert.deepEqual(fill.cells[0], { right: 7, forward: 0 });
});

test('bounded findPath keeps off-board start off-board and fails', () => {
  const planner = new GridPathPlanner({ navigation, columns: 10, rows: 10, wrap: false });
  const path = planner.findPath({ right: -5, forward: 0 }, { right: 0, forward: 0 });
  assert.equal(path, null);
});
