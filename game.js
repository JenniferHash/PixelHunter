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
    }

    create() {
        this.add.image(400, 300, 'background');
        
        const welcomeText = this.add.text(400, 100, 'Welcome to PixelHunter!', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        welcomeText.setOrigin(0.5, 0.5);

        const instructionText = this.add.text(400, 500, 'Game initialized successfully', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        instructionText.setOrigin(0.5, 0.5);

        console.log('Phaser game initialized successfully!');
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