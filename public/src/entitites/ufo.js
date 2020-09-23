import Entity from './entities';

class UFO extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "ufo", "UFO");
		this.body.setVelocity(-50, -5)
		this.play("ufo");
	}
}

export default UFO;