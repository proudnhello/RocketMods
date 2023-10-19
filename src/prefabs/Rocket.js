class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        this.isFiriring = false;
        this.moveSpeed = 1;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        // Movement
        if(!this.isFiriring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }else if(keyRIGHT.isDown && this.x >= borderUISize + this.width){
                this.x += this.moveSpeed;
            }
        }

        // Turn off movement if firing
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiriring = true;
            this.sfxRocket.play();
        }

        if(this.isFiriring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }

        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiriring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}