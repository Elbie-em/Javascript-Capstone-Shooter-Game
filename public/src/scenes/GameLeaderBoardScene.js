import Phaser from '../phaser';

class GameLeaderBoardScene extends Phaser.Scene {
  constructor() {
		super({ key: "GameLeaderBoardScene" });
  }
  
  preload() {
    this.load.image("background3", "../assets/bg.png");
  }

  create() {
    this.add.image(540, 300, 'background3');
    this.title = this.add.text(this.game.config.width * 0.35, 90, "LEADER BOARD", {
			fontFamily: 'impact',
			fontSize: 60,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		});
  }
}

export default GameLeaderBoardScene