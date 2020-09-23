import Phaser from '../phaser';

class GameHelpScene extends Phaser.Scene {
  constructor() {
		super({ key: "GameHelpScene" });
  }
  
  preload() {
    this.load.image("background3", "../assets/bg.png");
    this.load.image("btnExit", "../assets/btnExit.png");
		this.load.image("btnExitHover", "../assets/btnExitHover.png");
  }

  create() {
    this.add.image(540, 300, 'background3');
    this.title = this.add.text(this.game.config.width * 0.35, 50, "INSTRUCTIONS", {
			fontFamily: 'impact',
			fontSize: 60,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
    });

    this.btnExit = this.add.sprite(
			this.game.config.width * 0.5,
			this.game.config.height * 0.9,
			"btnExit"
    );
    
    this.btnExit.setInteractive();
    this.btnExit.on("pointerover", () => {
			this.btnExit.setTexture("btnExitHover");
		}, this);

		this.btnExit.on("pointerout", () => {
			this.btnExit.setTexture("btnExit");
		});

		this.btnExit.on("pointerdown", () => {
			this.btnExit.setTexture("btnExitHover");
		}, this);

		this.btnExit.on("pointerup", () => {
			this.btnExit.setTexture("btnExit");
			this.scene.start("GameMenuScene");
		}, this);
    
    
  }
}

export default GameHelpScene