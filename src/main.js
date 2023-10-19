/*
Moore Macauley
Rocket Patrol 2: Rock Harder: the Revengeance
Featuring Legally Distinct Deamon Hunter from the Satan May Weep Series and Knuckles
~0 hours as of time of writing (here's to hoping I update it later)

Some speed and timing values may be sightly funky, as my monitor run at 144fps, and I think that's making everything run faster

Mods:
Speedup after 30 seconds (1)
For this one, I actually made it happen after half the original time on the clock had elipsed, to make it more dynamic for the expert difficultly
Player rocket control after firing (1)

Add a seconds left timer (3)

Implement a new timing/scoring mechanism that adds time to the clock for sucessful hits (5)
For this one, I added a new property to the game settings object, the points to time ratio. When a ship is destroyed the timer is increced by the earned points * the ratio.
To do this, all I did was add to the delay of the object returned by the delayedCall. With the settings I have right now, destroying a ship on normal grants 1, 2, or 3 seconds, 
while destorying a ship on hard grants 1/3, 2/3, or 1 second.

Total -> 10
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play] 
}

let game = new Phaser.Game(config);

// Defining border sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Reserving keys
let keyF, keyR, keyLEFT, keyRIGHT;
