class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.path = './assets/';
        this.load.image('rocket', "rocket.png");;
        this.load.image('spaceship', 'spaceship.png');
        this.load.image('smallShip', 'smallShip.png');
        this.load.image('starfield', 'starfield.png');
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        // Scrolling background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // Green Rectangle at the top
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0);

        // The small ship is created up here b/c he is no longer the same color as the borders, and as such needs to be under them
        this.smallShip01 = new SmallSpaceship(this, game.config.width + borderUISize*6, borderUISize*7 + borderPadding*6, 'smallShip', 0, 50).setOrigin(0, 0);

        // White borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // Wiring up keys for movement
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // SPACESHIP!
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // Animating the explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start :0, end: 9, first: 0}),
            frameRate:30
        })

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // Timer fun
        this.gameOver = false;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
        }, null, this);
        
        // Speed the ships up after half of the initial game time has elapsed
        this.clock2 = this.time.delayedCall(game.settings.gameTimer/2, () => {
            this.ship01.speedup(2);
            this.ship02.speedup(2);
            this.ship03.speedup(2);
            this.smallShip01.speedup(4);
        }, null, this);

        // Creating the seconds left timer
        this.p1Time = game.settings.gameTimer/1000
        this.timeDisplay = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, borderUISize + borderPadding*2, this.p1Time, scoreConfig);
        scoreConfig.fixedWidth = 0;
    }

    update() {
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.smallShip01.update();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start('menuScene');
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplosion(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplosion(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplosion(this.ship01)
        }
        if (this.checkCollision(this.p1Rocket, this.smallShip01)) {
            this.p1Rocket.reset()
            this.shipExplosion(this.smallShip01)
        }

        // Update the timer
        this.p1Time = Math.ceil((this.clock.delay - this.clock.elapsed)/1000);
        this.timeDisplay.text = this.p1Time;
      }

      checkCollision(rocket, ship){
        // Man i hate this line of code. I mistyped it so many times
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height &&rocket.height + rocket.y > ship. y) {
            return true;
          } else {
            return false;
          }
      }

      shipExplosion(ship){
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');

        // Increase the timer
        this.clock.delay += (ship.points * game.settings.pointsToSecRatio * 1000)
      }
}