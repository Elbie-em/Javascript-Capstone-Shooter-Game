import Phaser from 'phaser';
import Player from '../entitites/player';
import MotherShip from '../entitites/motherShip';
import Asteroid from '../entitites/asteroid';
import Galaxy from '../entitites/galaxy';
import UFO from '../entitites/ufo';
import * as ScoreProcessor from '../config/scoreProcessor';
import * as Doman from '../config/doman';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('babyShip', '../assets/babyShip.png');
    this.load.image('galaxy', '../assets/star.png');
    this.load.image('asteriod', '../assets/asteriod.png');
    this.load.image('playerAmunition', '../assets/playerAmunition.png');
    this.load.image('background3', '../assets/bg.png');
    this.load.image('background1', '../assets/bg1.jpeg');
    this.load.spritesheet('galaxy', '../assets/galaxy.png', {
      frameWidth: 10,
      frameHeight: 10,
    });
    this.load.spritesheet('spaceShipPlayer', '../assets/playerSprite.png', {
      frameWidth: 132,
      frameHeight: 22,
    });
    this.load.spritesheet('motherShip', '../assets/motherShip.png', {
      frameWidth: 234,
      frameHeight: 77,
    });
    this.load.spritesheet('ufo', '../assets/ufo.png', {
      frameWidth: 135,
      frameHeight: 85,
    });
    this.load.spritesheet('explosion', '../assets/explosion.png', {
      frameWidth: 210,
      frameHeight: 200,
    });
    this.load.audio('spaceShipCannon', '../assets/spaceShipCannon.mp3');
    this.load.audio('enemyExplosion', '../assets/enemyExplosion.mp3');
    this.load.audio('alert', '../assets/enemyAlert.mp3');
    this.load.audio('playerExplosion', '../assets/playerExplosion.mp3');
    this.load.audio('gameMusic', '../assets/gameMusic.mp3');
  }

  create() {
    this.add.image(540, 300, 'background1');
    this.anims.create({
      key: 'galaxy',
      frames: this.anims.generateFrameNumbers('galaxy'),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'motherShip',
      frames: this.anims.generateFrameNumbers('motherShip'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'spaceShipPlayer',
      frames: this.anims.generateFrameNumbers('spaceShipPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'ufo',
      frames: this.anims.generateFrameNumbers('ufo'),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 5,
      repeat: 0,
    });


    this.sfx = {
      explosions: [
        this.sound.add('enemyExplosion'),
        this.sound.add('playerExplosion'),
      ],
      cannon: this.sound.add('spaceShipCannon'),
      enemyAlert: this.sound.add('alert'),
      gamePlayMusic: this.sound.add('gameMusic'),
    };

    this.sfx.gamePlayMusic.play();
    this.sfx.gamePlayMusic.loop = true;
    this.sfx.enemyAlert.play();
    this.sfx.enemyAlert.loop = true;

    this.score = 0;
    this.scoreText = this.add.text(20, 10, 'Score: 0', {
      fontFamily: 'impact',
      fontSize: 32,
      fontStyle: 'bold',
      color: '#ffffff',
    });

    this.player = new Player(
      this,
      Phaser.Math.Between(50, 200),
      this.game.config.height * 0.5,
      'spaceShipPlayer',
    );

    this.galaxy = this.add.group();
    this.enemies = this.add.group();
    this.enemyAmunition = this.add.group();
    this.playerAmunition = this.add.group();

    this.time.addEvent({
      delay: 100,
      callback: () => {
        const galaxy = new Galaxy(
          this,
          this.game.config.width,
          Phaser.Math.Between(0, 600),
        );
        this.galaxy.add(galaxy);
      },
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new MotherShip(
            this,
            this.game.config.width + 100,
            Phaser.Math.Between(50, 200),
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('Asteriod').length < 5) {
            enemy = new Asteroid(
              this,
              Phaser.Math.Between(200, 800),
              Phaser.Math.Between(-10, 5),
            );
          }
        } else {
          enemy = new UFO(
            this,
            this.game.config.width + 100,
            Phaser.Math.Between(50, 500),
          );
        }

        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerAmunition, this.enemies, (playerAmunition, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        this.score += 2;
        this.scoreText.setText(`Score: ${this.score}`);
        enemy.explode(true);
        playerAmunition.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
        this.sfx.gamePlayMusic.stop();
        this.sfx.enemyAlert.stop();
        const scoreCount = Doman.element('scoreCount');
        scoreCount.innerHTML = `${this.score}`;
        this.processScore();
      }
    });

    this.physics.add.overlap(this.player, this.enemyAmunition, (player, babyShip) => {
      if (!player.getData('isDead') && !babyShip.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        babyShip.destroy();
        this.sfx.gamePlayMusic.stop();
        this.sfx.enemyAlert.stop();
        const scoreCount = Doman.element('scoreCount');
        scoreCount.innerHTML = `${this.score}`;
        this.processScore();
      }
    });

    this.physics.add.overlap(this.playerAmunition, this.enemyAmunition,
      (playerAmunition, babyShip) => {
        if (babyShip) {
          if (babyShip !== undefined) {
            babyShip.destroy(true);
            this.sfx.explosions[0].play();
            playerAmunition.destroy();
            this.score += 1;
            this.scoreText.setText(`Score: ${this.score}`);
          }
        }
      });
  }

  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();
      const cursors = this.input.keyboard.createCursorKeys();

      if (cursors.up.isDown) {
        this.player.moveUp();
      } else if (cursors.down.isDown) {
        this.player.moveDown();
      }

      if (cursors.left.isDown) {
        this.player.moveBack();
      } else if (cursors.right.isDown) {
        this.player.moveFront();
      }

      if (cursors.space.isDown) {
        this.player.setData('isFiring', true);
      } else {
        this.player.setData('fireTick', this.player.getData('fireDelay') - 1);
        this.player.setData('isFiring', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();
      // eslint-disable-next-line max-len
      if (enemy.x < -enemy.displayWidth || enemy.x > this.game.config.width + enemy.displayWidth || enemy.y < -enemy.displayHeight * 4 || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyAmunition.getChildren().length; i += 1) {
      const babyShip = this.enemyAmunition.getChildren()[i];
      babyShip.update();
      // eslint-disable-next-line max-len
      if (babyShip.x < -babyShip.displayWidth || babyShip.x > this.game.config.width + babyShip.displayWidth || babyShip.y < -babyShip.displayHeight * 4 || babyShip.y > this.game.config.height + babyShip.displayHeight) {
        if (babyShip) {
          babyShip.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerAmunition.getChildren().length; i += 1) {
      const surge = this.playerAmunition.getChildren()[i];
      surge.update();
      // eslint-disable-next-line max-len
      if (surge.x < -surge.displayWidth || surge.x > this.game.config.width + surge.displayWidth || surge.y < -surge.displayHeight * 4 || surge.y > this.game.config.height + surge.displayHeight) {
        if (surge) {
          surge.destroy();
        }
      }
    }

    for (let i = 0; i < this.galaxy.getChildren().length; i += 1) {
      const star = this.galaxy.getChildren()[i];
      star.update();

      // eslint-disable-next-line max-len
      if (star.x < -star.displayWidth || star.x > this.game.config.width + star.displayWidth || star.y < -star.displayHeight * 4 || star.y > this.game.config.height + star.displayHeight) {
        if (star) {
          star.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  processScore() {
    const scoreText = Doman.element('scoreCount').innerText;
    const score = parseInt(scoreText, 10);
    let userName = Doman.element('scoreUser');
    userName.innerText = localStorage.getItem('user');
    const sumbitScoreBtn = Doman.element('btnSubmit');

    sumbitScoreBtn.onclick = () => {
      if (userName !== '') {
        ScoreProcessor.postScore(userName, score);
        Doman.dismissComponent('scoreForm');
        this.scene.start('GameOverScene');
      } else {
        alert('Error posting score'); // eslint-disable-line no-alert
      }
    };
  }
}

export default GameScene;