class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: "GameScene" });
	}

	preload() {
		this.load.image("babyShip", "../assets/babyShip.png");
		this.load.image("asteriod", "../assets/asteriod.png");
		this.load.spritesheet("spaceShipPlayer", "../assets/playerSprite.png", {
			frameWidth: 132,
			frameHeight: 22
		});
		this.load.spritesheet("motherShip", "../assets/motherShip.png", {
			frameWidth: 234,
			frameHeight: 77
		});
	}

	create() {

		this.anims.create({
			key: "motherShip",
			frames: this.anims.generateFrameNumbers("motherShip"),
			frameRate: 20,
			repeat: -1
		});

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

		this.enemies = this.add.group();
		this.enemyAmunition = this.add.group();
		this.playerAmunition = this.add.group();

		this.time.addEvent({
			delay: 5000,
			callback: () => {
				let enemy = null;

				if (Phaser.Math.Between(0, 10) >= 3) {
					enemy = new MotherShip(
						this,
						this.game.config.width + 100,
						Phaser.Math.Between(50, 200)
					);
				}
				else if (Phaser.Math.Between(0, 10) >= 5) {
					if (this.getEnemiesByType("Asteriod").length < 5) {

						enemy = new Asteroid(
							this,
							this.game.config.width + 100,
							Phaser.Math.Between(50, 250)
						);
					}
				}
				else {
					enemy = new UFO(
						this,
						this.game.config.width + 100,
						Phaser.Math.Between(50, 500)
					);
				}

				if (enemy !== null) {

					this.enemies.add(enemy);
				}
			},
			callbackScope: this,
			loop: true
		});

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

		for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];

      enemy.update();
    }
	}

	getEnemiesByType(type) {
		let arr = [];
		for (let i = 0; i < this.enemies.getChildren().length; i++) {
			let enemy = this.enemies.getChildren()[i];
			if (enemy.getData("type") === type) {
				arr.push(enemy);
			}
		}
		return arr;
	}
}