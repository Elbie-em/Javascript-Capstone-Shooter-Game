import Entity from './entities';

class Galaxy extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'galaxy', 'Galaxy');
    this.body.setVelocity(-50, 0);
  }
}

export default Galaxy;