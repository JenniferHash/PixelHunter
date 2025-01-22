const Phaser = require('phaser');

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('background', 'data:image/svg+xml;base64,' + btoa(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#3498db"/>
                <text x="400" y="300" font-family="Arial" font-size="24" fill="white" text-anchor="middle">PixelHunter Game</text>
            </svg>
        `));
        
        this.load.image('square', 'data:image/svg+xml;base64,' + btoa(`
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="50" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
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

        const instructionText = this.add.text(400, 500, 'Click the moving square!', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        instructionText.setOrigin(0.5, 0.5);

        this.square = this.add.image(400, 300, 'square');
        this.square.setInteractive();
        
        this.square.on('pointerdown', () => {
            console.log('Square clicked!');
        });

        this.moveSquare();

        console.log('Phaser game initialized successfully!');
    }

    update() {
        
    }

    moveSquare() {
        const newX = Phaser.Math.Between(50, 750);
        const newY = Phaser.Math.Between(50, 550);
        
        this.tweens.add({
            targets: this.square,
            x: newX,
            y: newY,
            duration: Phaser.Math.Between(1000, 2000),
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(Phaser.Math.Between(500, 1500), () => {
                    this.moveSquare();
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