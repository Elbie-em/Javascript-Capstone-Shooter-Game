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
		super(scene, x, y, "asteriod", "Asteriod");
		this.body.velocity.x = Phaser.Math.Between(50, 100);
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
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;

        var angle = Math.atan2(dy, dx);

        var speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
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
    this.play("ufo");
  }
}