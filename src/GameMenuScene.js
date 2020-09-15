class GameMenuScene extends Phaser.Scene {
	constructor() {
		super({ key: "GameMenuScene" });
	}

	preload() {
		this.load.image("background3", "../assets/bg.png");
		this.load.image("btnStart", "../assets/btnStart.png");
		this.load.image("btnStartHover", "../assets/btnStartHover.png");
		this.load.image("btnHelp", "../assets/btnHelp.png");
		this.load.image("btnHelpHover", "../assets/btnHelpHover.png");
		this.load.image("btnLeaderBoard", "../assets/btnLeaderBoard.png");
		this.load.image("btnLeaderBoardHover", "../assets/btnLeaderBoardHover.png");
	}

	create() {
		this.add.image(540, 300, 'background3');
		this.btnStart = this.add.sprite(
			this.game.config.width * 0.5,
			this.game.config.height * 0.4,
			"btnStart"
		);
		this.btnHelp = this.add.sprite(
			this.game.config.width * 0.5,
			this.game.config.height * 0.5,
			"btnHelp"
		);
		this.btnLeaderBoard = this.add.sprite(
			this.game.config.width * 0.5,
			this.game.config.height * 0.6,
			"btnLeaderBoard"
		);


		this.btnStart.setInteractive();
		this.btnHelp.setInteractive();
		this.btnLeaderBoard.setInteractive();

		this.btnStart.on("pointerover", () => {
			this.btnStart.setTexture("btnStartHover");
		}, this);

		this.btnStart.on("pointerout", () => {
			this.btnStart.setTexture("btnStart");
		});

		this.btnStart.on("pointerdown", () => {
			this.btnStart.setTexture("btnStartHover");
		}, this);

		this.btnStart.on("pointerup", () => {
			this.btnStart.setTexture("btnStart");
			this.scene.start("GameScene");
		}, this);

		this.btnHelp.on("pointerover", () => {
			this.btnHelp.setTexture("btnHelpHover");
		}, this);

		this.btnHelp.on("pointerout", () => {
			this.btnHelp.setTexture("btnHelp");
		});

		this.btnHelp.on("pointerdown", () => {
			this.btnHelp.setTexture("btnHelpHover");
		}, this);

		this.btnHelp.on("pointerup", () => {
			this.btnHelp.setTexture("btnHelp");
			//this.scene.start("GameHelpScene");
		}, this);

		this.btnLeaderBoard.on("pointerover", () => {
			this.btnLeaderBoard.setTexture("btnLeaderBoardHover");
		}, this);

		this.btnLeaderBoard.on("pointerout", () => {
			this.btnLeaderBoard.setTexture("btnLeaderBoard");
		});

		this.btnLeaderBoard.on("pointerdown", () => {
			this.btnLeaderBoard.setTexture("btnLeaderBoardHover");
		}, this);

		this.btnLeaderBoard.on("pointerup", () => {
			this.btnLeaderBoard.setTexture("btnLeaderBoard");
			//this.scene.start("GameLeaderBoardScene");
		}, this);

		this.gameTitile = this.add.text(this.game.config.width * 0.25, 128, "Eazer Rackhams Revenge", {
			fontFamily: 'impact',
			fontSize: 54,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		});

		this.gameCredits = this.add.text(this.game.config.width * 0.35, 500, "A Game Created By: Elbie Moonga\n©2020", {
			fontFamily: 'cursive',
			fontSize: 20,
			color: '#ffffff',
			align: 'center'
		});
	}
}