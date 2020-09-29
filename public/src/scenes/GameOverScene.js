import Phaser from 'phaser';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {
    this.load.image('background3', '../assets/bg.png');
    this.load.image('btnRestart', '../assets/btnRestart.png');
    this.load.image('btnRestartHover', '../assets/btnRestartHover.png');
    this.load.image('btnExit', '../assets/btnExit.png');
    this.load.image('btnExitHover', '../assets/btnExitHover.png');
  }

  create() {
    this.add.image(540, 300, 'background3');
    this.title = this.add.text(this.game.config.width * 0.38, 128, 'GAME OVER', {
      fontFamily: 'impact',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.4,
      'btnRestart',
    );

    this.btnExit = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'btnExit',
    );

    this.btnRestart.setInteractive();
    this.btnExit.setInteractive();

    this.btnRestart.on('pointerover', () => {
      this.btnRestart.setTexture('btnRestartHover');
    }, this);

    this.btnRestart.on('pointerout', () => {
      this.btnRestart.setTexture('btnRestart');
    });

    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('btnRestartHover');
    }, this);

    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('btnRestart');
      this.scene.start('GameScene');
    }, this);

    this.btnExit.on('pointerover', () => {
      this.btnExit.setTexture('btnExitHover');
    }, this);

    this.btnExit.on('pointerout', () => {
      this.btnExit.setTexture('btnExit');
    });

    this.btnExit.on('pointerdown', () => {
      this.btnExit.setTexture('btnExitHover');
    }, this);

    this.btnExit.on('pointerup', () => {
      this.btnExit.setTexture('btnExit');
      this.scene.start('GameMenuScene');
    }, this);
  }
}

export default GameOverScene;