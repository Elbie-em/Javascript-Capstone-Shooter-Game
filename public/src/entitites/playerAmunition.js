import Entity from './entities';


class PlayerAmunition extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "playerAmunition");
		this.body.velocity.x = 300;
	}
}

export default PlayerAmunition;