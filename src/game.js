const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 400,
	autoCenter: true,
	backgroundColor: "#000000",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 300 }
		}
	},
	scene: [GameScene]
};

const game = new Phaser.Game(config);