import startPhaserGame from './gameMockup';

let phaserGame;

beforeEach(() => {
  phaserGame = startPhaserGame();
});

describe('testing the phaser game', () => {
  test('check if game object exists for it to start', () => {
    expect(typeof (phaserGame)).toBe('object');
  });
});