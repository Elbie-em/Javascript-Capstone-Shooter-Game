const config = {
	type: Phaser.AUTO,
	width: 1080,
	height: 600,
	autoCenter: true,
	backgroundColor: "#000000",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: -20, y: 0 }
		}
	},
	scene: [
		GameMenuScene,
		GameScene,
	],
	pixelArt: true,
	roundPixels: true
};

const game = new Phaser.Game(config);