import Entity from './entities';

class BabyShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "babyShip");
    this.body.setVelocity(-200, 20)
  }
}

export default BabyShip;