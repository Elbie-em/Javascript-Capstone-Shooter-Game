class GameMenuScene extends Phaser.Scene {
    constructor() {
      super({ key: "GameMenuScene" });
    }
  
    create() {
      this.scene.start("GameScene");
    }
  }