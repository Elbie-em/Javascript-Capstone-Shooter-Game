import Entity from './entities';
import BabyShip from './babyShip';

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

export default MotherShip;