const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 600,
    autoCenter: true,
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 300 }
        }
    },
    scene: [GameScene],
    pixelArt: true,
    roundPixels: true
};

const game = new Phaser.Game(config);