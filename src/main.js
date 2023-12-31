/*
Moore Macauley
Rocket Patrol 2: Rock Harder: the Revengeance
Featuring Legally Distinct Deamon Hunter from the Satan May Weep Series and Knuckles
Roughly 2.5 hours. Spent an afternoon from roughly 15-16, then from 17-18:30

Some speed and timing values may be sightly funky, as my monitor run at 144fps, and I think that's making everything run faster

Mods:
Speedup after 30 seconds (1)
For this one, I actually made it happen after half the original time on the clock had elipsed, to make it more dynamic for the expert difficultly

Player rocket control after firing (1)

Create 4 new explosion sound effects and randomize which one plays on impact (3)
You can find these as explosion1-4.wav. All were made with https://sfxr.me/

Add a seconds left timer (3)

Implement parallax scrolling for the background (3)
planet.png is closer than the starfield, and as such, moves much more slowly

Implement a new timing/scoring mechanism that adds time to the clock for sucessful hits (5)
For this one, I added a new property to the game settings object, the points to time ratio. When a ship is destroyed the timer is increced by the earned points * the ratio 
seconds. To do this, all I did was add to the delay of the object returned by the delayedCall. With the settings I have right now, destroying a ship on normal grants 
1/10 of the earned points in seconds, while hard grants 1/30th of a second per point.

Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
Not remotely important, but I like my angry little small spaceship. He's cute :). He's also worth 50 points, and has a new property added to both him and the normal ships to 
scale the explosion to fit him.

Total -> 21 (just in case I lose a point for something dumb)

KNOWN BUGS:
The explosion animation exists on top of the boundaries, if a ship is destoryed right at the edge of the canvas. 
This was also a problem with the professor's normal rocket patrol example, so I figure it's fine.
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
