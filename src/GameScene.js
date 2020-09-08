class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: "GameScene" });
	}

	preload() {
		this.load.spritesheet("spaceShipPlayer", "../assets/playerSprite.png", {
			frameWidth: 132,
			frameHeight: 22
		});
	}

	create() {
		this.anims.create({
			key: "spaceShipPlayer",
			frames: this.anims.generateFrameNumbers("spaceShipPlayer"),
			frameRate: 20,
			repeat: -1
		});

		this.player = new Player(
			this,
			this.game.config.width * 0.5,
			this.game.config.height * 0.5,
			"spaceShipPlayer"
		); 

	}

	update() {
		this.player.update();
		const cursors = this.input.keyboard.createCursorKeys();

		if (cursors.up.isDown) {
			this.player.moveUp();
		}
		else if (cursors.down.isDown) {
			this.player.moveDown();
		}
		
		if (cursors.left.isDown) {
			this.player.moveBack();
		}
		else if (cursors.right.isDown) {
			this.player.moveFront();
		}
	}
}