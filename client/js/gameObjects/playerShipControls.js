
//Be sure to only define keys once otherwise memory leak will occur!
var k = {};
k.upInput = keyboard(38);
k.downInput = keyboard(40);
k.leftInput = keyboard(37);
k.rightInput = keyboard(39);


/**  This utility function setups the player controls for the space ship
*    @param {object} ship - reference to game ship
*    @returns TODO: find a testable return value to work with here
*/
var playerControls = function(ship){

    var notThrusting = !k.upInput.isDown;
    var turningLeft =  k.leftInput.isDown && !k.rightInput.isDown;
    var turningRight =  k.rightInput.isDown && !k.leftInput.isDown;

    k.upInput.press = function(){
        //pressing up
        ship.vx = Math.cos(ship.rotation) * ship.acceleration;
        ship.vy = Math.sin(ship.rotation) * ship.acceleration;
    }
    if (notThrusting){
        ship.vx *= ship.friction;
        ship.vy *= ship.friction;
    }
    if (turningRight) {
        ship.rotation += ship.turnSpd;
    }
    if (turningLeft) {
        ship.rotation -= ship.turnSpd;
    }
}