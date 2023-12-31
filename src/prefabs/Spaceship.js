class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.scaleFactor = 1
    }

    update(){
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width){
            this.reset()
        }
    }

    reset(){
        this.x = game.config.width
    }

    speedup(x = 1){
        this.moveSpeed += x;
    }
}