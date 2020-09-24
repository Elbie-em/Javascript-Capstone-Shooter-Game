import Phaser from '../phaser';
import * as Doman from '../config/doman'
class GameMenuScene extends Phaser.Scene {
	constructor() {
		super({ key: "GameMenuScene" });
	}

	preload() {
		this.load.image("background3", "../assets/bg.png");
		this.load.image("alien", "../assets/Alien.png");
		this.load.image("astronaut", "../assets/astronaut.png");
		this.load.image("btnStart", "../assets/btnStart.png");
		this.load.image("btnStartHover", "../assets/btnStartHover.png");
		this.load.image("btnHelp", "../assets/btnHelp.png");
		this.load.image("btnHelpHover", "../assets/btnHelpHover.png");
		this.load.image("btnLeaderBoard", "../assets/btnLeaderBoard.png");
		this.load.image("btnLeaderBoardHover", "../assets/btnLeaderBoardHover.png");
		this.load.audio("menuMusic", "../assets/menuMusic.mp3");
	}

	create() {
		this.add.image(540, 300, 'background3');
		this.add.image(150, 300, 'astronaut');
		this.add.image(900, 300, 'alien');

		this.sfx = {
			menuMusic: this.sound.add('menuMusic')
		};

		this.sfx.menuMusic.play();
		this.sfx.menuMusic.loop = true;
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
			if (localStorage.getItem('user').length > 0){
				this.sfx.menuMusic.stop();
				this.scene.start("GameScene");
				Doman.dismissComponent('user-form');
			}else{
				alert('fill in username');
			}
			
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
			if (localStorage.getItem('user').length > 0){
				this.scene.start("GameHelpScene");
				Doman.dismissComponent('user-form');
			}else{
				alert('fill in username');
			}
			
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
			if (localStorage.getItem('user').length > 0){
				this.scene.start("GameLeaderBoardScene");
				Doman.dismissComponent('user-form');
			}else{
				alert('fill in username')
			}
			
		}, this);

		this.gameTitile = this.add.text(this.game.config.width * 0.25, 155, "Eazer Rackhams Revenge", {
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
		this.saveUser();
	}

    saveUser () {
		const userName = Doman.element('username');
		const save = Doman.element('btnProceed');
		save.onclick = () => {
			if(userName.value !== '') {
				localStorage.setItem('user',userName.value);
				Doman.dismissComponent('user-form');
			}else{
				alert('fill in username');
			}
		}
	}
}

export default GameMenuScene;