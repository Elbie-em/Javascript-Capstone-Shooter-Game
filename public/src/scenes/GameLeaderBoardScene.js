import Phaser from 'phaser';
import * as ScoreProcessor from '../config/scoreProcessor';

class GameLeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameLeaderBoardScene' });
  }

  preload() {
    this.load.image('background3', '../assets/bg.png');
    this.load.image('btnExit', '../assets/btnExit.png');
    this.load.image('btnExitHover', '../assets/btnExitHover.png');
  }

  create() {
    this.add.image(540, 300, 'background3');
    this.title = this.add.text(this.game.config.width * 0.35, 30, 'LEADER BOARD', {
      fontFamily: 'impact',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.btnExit = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
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


    const showBoard = async () => {
      const data = await ScoreProcessor.getScores();
      const scores = await data;
      scores.sort((a, b) => b.score - a.score);
      for (let i = 0; i < 10; i += 1) {
        this.score = this.add.text(this.game.config.width * 0.40, 100 + (i * 40), `${i + 1}:   ${scores[i].user}   ${scores[i].score} points`, {
          fontFamily: 'impact',
          fontSize: 25,
          color: '#ffffff',
          align: 'center',
        });
      }
    };

    showBoard();
  }
}

export default GameLeaderBoardScene;