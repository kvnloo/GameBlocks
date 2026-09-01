import assert from 'node:assert/strict';
import test from 'node:test';
import { SNAKE_DEATH_REASONS, SNAKE_PLAY_EVENTS, SnakePlay } from './SnakePlay.js';

test('reset restores players and clears items', () => {
  const play = new SnakePlay({ minRight: 0, maxRight: 7, minForward: 0, maxForward: 7 });
  play.addPlayer({
    playerId: 'a',
    segments: [
      { right: 2, forward: 2 },
      { right: 2, forward: 1 },
    ],
  });
  play.addItem({ cell: { right: 4, forward: 4 }, growth: 1 });
  play.movePlayer({
    playerId: 'a',
    segments: [
      { right: 9, forward: 2 },
      { right: 2, forward: 2 },
    ],
  });
  const events = play.step();
  assert.equal(events[0].type, SNAKE_PLAY_EVENTS.PLAYER_DIED);
  assert.equal(events[0].reason, SNAKE_DEATH_REASONS.WALL);
  assert.equal(play.getPlayerState('a').alive, false);
  assert.equal(play.getItemState().length, 1);

  play.reset();
  const restored = play.getPlayerState('a');
  assert.equal(restored.alive, true);
  assert.deepEqual(restored.segments, [
    { right: 2, forward: 2 },
    { right: 2, forward: 1 },
  ]);
  assert.equal(play.getItemState().length, 0);
});
