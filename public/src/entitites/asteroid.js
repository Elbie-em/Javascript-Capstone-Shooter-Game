import Phaser from 'phaser';
import Entity from './entities';

class Asteroid extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'asteriod', 'Asteriod');
    this.body.setVelocity(50, 30);
    this.states = {
      MOVE_FORWARD: 'MOVE_FORWARD',
      ATTACK: 'ATTACK',
    };
    this.state = this.states.MOVE_FORWARD;
  }

  update() {
    if (!this.getData('isDead') && this.scene.player) {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y,
      ) < 320) {
        this.state = this.states.ATTACK;
      }

      if (this.state === this.states.ATTACK) {
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        const angle = Math.atan2(dy, dx);

        const SPEED = 100;
        this.body.setVelocity(
          Math.cos(angle) * SPEED,
          Math.sin(angle) * SPEED,
        );
      }

      if (this.x < this.scene.player.x) {
        this.angle -= 5;
      } else {
        this.angle += 5;
      }
    }
  }
}

export default Asteroid;