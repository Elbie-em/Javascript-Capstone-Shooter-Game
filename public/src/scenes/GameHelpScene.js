import Phaser from 'phaser';

class GameHelpScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameHelpScene' });
  }

  preload() {
    this.load.image('background3', '../assets/bg.png');
    this.load.image('btnExit', '../assets/btnExit.png');
    this.load.image('btnExitHover', '../assets/btnExitHover.png');
  }

  create() {
    this.add.image(540, 300, 'background3');
    this.title = this.add.text(this.game.config.width * 0.35, 50, 'INSTRUCTIONS', {
      fontFamily: 'impact',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.instructions = this.add.text(this.game.config.width * 0.18, 130, this.instructionsText(), {
      fontFamily: 'monospace',
      fontSize: 18,
      color: '#ffffff',
      align: 'center',
    });

    this.gameControls = this.add.text(this.game.config.width * 0.35, 200, this.controlsText(), {
      fontFamily: 'monospace',
      fontSize: 18,
      color: '#ffffff',
      align: 'center',
    });

    this.btnExit = this.add.sprite(
      this.game.config.width * 0.53,
      this.game.config.height * 0.7,
      'btnExit',
    );

    this.btnExit.setInteractive();
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

  instructionsText() { // eslint-disable-line class-methods-use-this
    const text = "Fly through space and destroy your enemies before they destroy you.\nShoot the mother ships and their baby ships before you collide\nAvoid and shoot the asteroids and UFO's before they get to you";
    return text;
  }

  controlsText() { // eslint-disable-line class-methods-use-this
    const text = 'CONTROLS\n1. Shooting - Spacebar\n2. Moving up - Up Arrow key\n3. Moving down - Down Arrow key\n4. Moving forward - Right Arrow key\n5. Moving back - Left Arrow key';
    return text;
  }
}

export default GameHelpScene;