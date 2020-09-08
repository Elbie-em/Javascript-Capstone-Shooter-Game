class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        this.load.spritesheet("spaceShipPlayer", "assets/playerSprite.png", {
            frameWidth: 132,
            frameHeight: 20
        });
    }

    create() {
        this.anims.create({
            key: "spaceShipPlayer",
            frames: this.anims.generateFrameNumbers("spaceShipPlayer"),
            frameRate: 20,
            repeat: -1
        });
    }
}