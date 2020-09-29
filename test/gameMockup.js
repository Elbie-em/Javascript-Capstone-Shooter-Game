import Phaser from 'phaser';
import GameMenuScene from '../public/src/scenes/GameMenuScene';
import GameScene from '../public/src/scenes/GameScene';
import GameOverScene from '../public/src/scenes/GameOverScene';
import GameHelpScene from '../public/src/scenes/GameHelpScene';
import GameLeaderBoardScene from '../public/src/scenes/GameLeaderBoardScene';

const startPhaserGame = () => {
  const gameMockConfig = {
    type: Phaser.WEBGL,
    width: 1080,
    height: 600,
    backgroundColor :'black',
    autoCenter: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: -20, y: 0 }
      }
    },
    dom: {
          createContainer: true
      },
    scene: [
      GameMenuScene,
      GameScene,
      GameLeaderBoardScene,
      GameHelpScene,
      GameOverScene
    ],
    pixelArt: true,
    roundPixels: true
  };
  
  const game = new Phaser.Game(gameMockConfig);
  return game;
};

export default startPhaserGame;
