import Phaser from '../phaser';

class GameHelpScene extends Phaser.Scene {
  constructor() {
		super({ key: "GameHelpScene" });
  }
  
  preload() {
    this.load.image("background3", "../assets/bg.png");
  }

  create() {
    this.add.image(540, 300, 'background3');
    this.title = this.add.text(this.game.config.width * 0.35, 90, "INSTRUCTIONS", {
			fontFamily: 'impact',
			fontSize: 60,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		});
  }
}

export default GameHelpScene