class GameMenuScene extends Phaser.Scene {
    constructor() {
      super({ key: "GameMenuScene" });
		}
		
		preload() {
			this.load.image("background3", "../assets/bg.png");
			this.load.image("btnStart", "../assets/btnStart.png");
			this.load.image("btnStartHover", "../assets/btnStartHover.png");
		}
  
    create() {
			this.add.image(540, 300, 'background3');
      this.btnStart = this.add.sprite(
				this.game.config.width * 0.5,
				this.game.config.height * 0.5,
				"btnStart"
			);
			this.btnStart.setInteractive();

			this.btnStart.on("pointerover", () => {
				this.btnStart.setTexture("btnStartHover"); 
				//this.sfx.btnOver.play();
			}, this);
    }
  }