class Entity extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, key, type) {
		super(scene, x, y, key);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.world.enableBody(this, 0);
		this.setData("type", type);
		this.setData("isDead", false);
	}
}

class Player extends Entity {
	constructor(scene, x, y, key) {
		super(scene, x, y, key, "Player");
		this.setData("speed", 200);
		this.play("spaceShipPlayer");
	}

	moveUp() {
		this.body.velocity.y = -this.getData("speed");
	}

	moveDown() {
		this.body.velocity.y = this.getData("speed");
	}

	moveBack() {
		this.body.velocity.x = -this.getData("speed");
	}

	moveFront() {
		this.body.velocity.x = this.getData("speed");
	}

	update() {
		this.body.setVelocity(0, 0);
		this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
		this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height)
	}
}

class Asteroid extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "asteriod", "Asteroid");
		this.body.velocity.x = Phaser.Math.Between(50, 100);
	}
}

class MotherShip extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "motherShip", "MotherShip");
		this.play("motherShip");
		this.body.setVelocity(-20,0)
	}
}