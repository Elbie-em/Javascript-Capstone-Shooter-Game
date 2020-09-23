import Phaser from './phaser';
import GameMenuScene from '../src/scenes/GameMenuScene';
import GameScene from '../src/scenes/GameScene';
import GameOverScene from '../src/scenes/GameOverScene';

const config = {
	type: Phaser.AUTO,
	width: 1080,
	height: 600,
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
		GameOverScene
	],
	pixelArt: true,
	roundPixels: true
};

const game = new Phaser.Game(config);