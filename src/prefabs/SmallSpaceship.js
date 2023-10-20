class SmallSpaceship extends Spaceship{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame, pointValue);
        this.moveSpeed = game.settings.spaceshipSpeed * game.settings.smallSpeedMultiplier;
        // The size of the explosion
        this.scaleFactor = .5
    }
}