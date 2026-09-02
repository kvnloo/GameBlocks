import assert from 'node:assert/strict';
import test from 'node:test';
import { SnakeMotionController } from './SnakeMotionController.js';

test('reset without args uses the last startCell, not the constructor origin', () => {
  const snake = new SnakeMotionController({
    initialLength: 3,
    startCell: { right: 0, forward: 0 },
    initialDirection: { right: 1, forward: 0 },
  });
  snake.reset({
    startCell: { right: 4, forward: 2 },
    direction: { right: 0, forward: 1 },
    initialLength: 3,
  });
  assert.deepEqual(snake.head, { right: 4, forward: 2 });
  snake.move({ left: false, right: false, forward: true, backward: false });
  assert.deepEqual(snake.head, { right: 4, forward: 3 });
  snake.reset();
  assert.deepEqual(snake.head, { right: 4, forward: 2 });
  assert.deepEqual(snake.getDirection(), { right: 0, forward: 1 });
});
