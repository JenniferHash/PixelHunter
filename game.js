const Phaser = require('phaser');

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22', '#1abc9c', '#34495e'];
    }

    preload() {
        this.load.image('background', 'data:image/svg+xml;base64,' + btoa(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#3498db"/>
                <text x="400" y="300" font-family="Arial" font-size="24" fill="white" text-anchor="middle">PixelHunter Game</text>
            </svg>
        `));
        
        this.colors.forEach((color, index) => {
            this.load.image(`square_${index}`, 'data:image/svg+xml;base64,' + btoa(`
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <rect width="50" height="50" fill="${color}" stroke="#000" stroke-width="2"/>
                </svg>
            `));
        });
        
        this.load.image('player', 'data:image/svg+xml;base64,' + btoa(`
            <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" fill="#ffffff" stroke="#000" stroke-width="3"/>
                <circle cx="20" cy="20" r="5" fill="#000"/>
                <circle cx="40" cy="20" r="5" fill="#000"/>
                <path d="M 15 40 Q 30 50 45 40" stroke="#000" stroke-width="2" fill="none"/>
            </svg>
        `));
    }

    create() {
        this.add.image(400, 300, 'background');
        
        const welcomeText = this.add.text(400, 100, 'Welcome to PixelHunter!', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        welcomeText.setOrigin(0.5, 0.5);

        const instructionText = this.add.text(400, 500, 'Use WASD to move, click the squares!', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        instructionText.setOrigin(0.5, 0.5);

        this.player = this.add.image(400, 300, 'player');
        
        this.currentColorIndex1 = 0;
        this.currentColorIndex2 = 1;
        
        this.square1 = this.add.image(300, 250, `square_${this.currentColorIndex1}`);
        this.square1.setInteractive();
        
        this.square2 = this.add.image(500, 350, `square_${this.currentColorIndex2}`);
        this.square2.setInteractive();
        
        this.square1.on('pointerdown', () => {
            console.log('Square 1 clicked!');
        });
        
        this.square2.on('pointerdown', () => {
            console.log('Square 2 clicked!');
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');

        this.moveSquare(this.square1, 1);
        this.moveSquare(this.square2, 2);

        console.log('Phaser game initialized successfully!');
    }

    update() {
        const playerSpeed = 200;
        
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.x -= playerSpeed * this.game.loop.delta / 1000;
        }
        if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.x += playerSpeed * this.game.loop.delta / 1000;
        }
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.y -= playerSpeed * this.game.loop.delta / 1000;
        }
        if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.y += playerSpeed * this.game.loop.delta / 1000;
        }
        
        this.player.x = Phaser.Math.Clamp(this.player.x, 30, 770);
        this.player.y = Phaser.Math.Clamp(this.player.y, 30, 570);
    }

    moveSquare(square, squareId) {
        const newX = Phaser.Math.Between(50, 750);
        const newY = Phaser.Math.Between(50, 550);
        
        const colorIndex = Phaser.Math.Between(0, this.colors.length - 1);
        square.setTexture(`square_${colorIndex}`);
        
        this.tweens.add({
            targets: square,
            x: newX,
            y: newY,
            duration: Phaser.Math.Between(1000, 2000),
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(Phaser.Math.Between(500, 1500), () => {
                    this.moveSquare(square, squareId);
                });
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2c3e50',
    scene: GameScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);