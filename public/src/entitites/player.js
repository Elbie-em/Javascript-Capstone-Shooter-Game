import Phaser from 'phaser';
import Entity from './entities';
import PlayerAmunition from './playerAmunition';
import * as Doman from '../config/doman';

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.play('spaceShipPlayer');
    this.setData('isFiring', false);
    this.setData('fireDelay', 10);
    this.setData('fireTick', this.getData('fireDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveBack() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveFront() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isFiring')) {
      if (this.getData('fireTick') < this.getData('fireDelay')) {
        this.setData('fireTick', this.getData('fireTick') + 1);
      } else {
        const surge = new PlayerAmunition(this.scene, this.x + 50, this.y);
        this.scene.playerAmunition.add(surge);

        this.scene.sfx.cannon.play();
        this.setData('fireTick', 0);
      }
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        const scoreForm = Doman.element('element');

        scoreForm.hidden = false;
      },
      callbackScope: this,
      loop: false,
    });
  }
}

export default Player;