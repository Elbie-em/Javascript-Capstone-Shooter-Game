import Phaser from 'phaser';
import GameMenuScene from './scenes/GameMenuScene';
import GameScene from './scenes/GameScene';
import GameLeaderBoardScene from './scenes/GameLeaderBoardScene';
import GameHelpScene from './scenes/GameHelpScene';
import GameOverScene from './scenes/GameOverScene';
import './css/styles.css';


const config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 600,
  autoCenter: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: -20, y: 0 },
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [
    GameMenuScene,
    GameScene,
    GameLeaderBoardScene,
    GameHelpScene,
    GameOverScene,
  ],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars