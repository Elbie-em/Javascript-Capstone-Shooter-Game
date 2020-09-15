class Entity extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, key, type) {
		super(scene, x, y, key);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.world.enableBody(this, 0);
		this.setData("type", type);
		this.setData("isDead", false);
	}

	explode(canDestroy) {
		if (!this.getData("isDead")) {
			this.setTexture("explosion");
			this.play("explosion");

			this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();

			if (this.shootTimer !== undefined) {
				if (this.shootTimer) {
					this.shootTimer.remove(false);
				}
			}

			this.setAngle(0);
			this.body.setVelocity(0, 0);

			this.on('animationcomplete', () => {

				if (canDestroy) {
					this.destroy();
				}
				else {
					this.setVisible(false);
				}

			}, this);

			this.setData("isDead", true);
		}
	}
}

class Player extends Entity {
	constructor(scene, x, y, key) {
		super(scene, x, y, key, "Player");
		this.setData("speed", 200);
		this.play("spaceShipPlayer");
		this.setData("isFiring", false);
		this.setData("fireDelay", 10);
		this.setData("fireTick", this.getData("fireDelay") - 1);
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

		if (this.getData("isFiring")) {
			if (this.getData("fireTick") < this.getData("fireDelay")) {
				this.setData("fireTick", this.getData("fireTick") + 1);
			}
			else { // when the "manual timer" is triggered:
				let surge = new PlayerAmunition(this.scene, this.x + 50, this.y);
				this.scene.playerAmunition.add(surge);

				this.scene.sfx.cannon.play();
				this.setData("fireTick", 0);
			}
		}
	}

	onDestroy() {
		this.scene.time.addEvent({
			delay: 1000,
			callback: () => {
				this.scene.scene.start("GameOverScene");
			},
			callbackScope: this,
			loop: false
		});
	}
}

class PlayerAmunition extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "playerAmunition");
		this.body.velocity.x = 300;
	}
}


class Asteroid extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "asteriod", "Asteriod");
		this.body.setVelocity(50, 30)
		this.states = {
			MOVE_FORWARD: "MOVE_FORWARD",
			ATTACK: "ATTACK"
		};
		this.state = this.states.MOVE_FORWARD;
	}

	update() {
		if (!this.getData("isDead") && this.scene.player) {
			if (Phaser.Math.Distance.Between(
				this.x,
				this.y,
				this.scene.player.x,
				this.scene.player.y
			) < 320) {

				this.state = this.states.ATTACK;
			}

			if (this.state == this.states.ATTACK) {
				let dx = this.scene.player.x - this.x;
				let dy = this.scene.player.y - this.y;

				let angle = Math.atan2(dy, dx);

				const SPEED = 100;
				this.body.setVelocity(
					Math.cos(angle) * SPEED,
					Math.sin(angle) * SPEED
				);
			}

			if (this.x < this.scene.player.x) {
				this.angle -= 5;
			}
			else {
				this.angle += 5;
			}
		}
	}
}

class MotherShip extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "motherShip", "MotherShip");
		this.play("motherShip");
		this.body.setVelocity(-20, 0)
		this.shootTimer = this.scene.time.addEvent({
			delay: 1000,
			callback: () => {
				var babyShip = new BabyShip(
					this.scene,
					this.x,
					this.y + 20
				);
				babyShip.setScale(this.scaleX);
				this.scene.enemyAmunition.add(babyShip);
			},
			callbackScope: this,
			loop: true
		});
	}

	onDestroy() {
		if (this.shootTimer !== undefined) {
			if (this.shootTimer) {
				this.shootTimer.remove(false);
			}
		}
	}
}

class BabyShip extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "babyShip");
		this.body.setVelocity(-200, 20)
	}
}

class UFO extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "ufo", "UFO");
		this.body.setVelocity(-50, -5)
		this.play("ufo");
	}
}

class Galaxy extends Entity {
  constructor(scene, x, y) {
		super(scene, x, y, "galaxy","Galaxy");
		this.body.setVelocity(-50, 0);
  }
}

