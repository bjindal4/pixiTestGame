var gameObject = {}
gameObject.id = 0; //game id
gameObject.spd = 1;   //basic sprite movement speed
gameObject.vx = 0; //velocity x
gameObject.vy = 0; //veloctiy y


/**
*    Place holder update method for game object, no return values because this method is arbitrary.
*/
gameObject.update = function(){};


/**
*    Place holder create method for game object, no return value because this method is arbitrary
*    This method throws an error if it's not defined by an instance
*/
gameObject.create = function(){};


/**
*    @param {object} spr - Reference to sprite to extend with gameObject attributes
*    @return {object} - updated gameObject
*/
gameObject.sprConstruct = function(spr) {
    var attributes = Object.keys(gameObject);
    for (var x = 0; x < attributes.length; x++){
        var attr = attributes[x];
        spr[attr] = gameObject[attr];
    }
    return spr;
}


/**
*    This function checks if a sprite is on the border of a stage and sends it to the opposite side of it is.
*    TODO: Make this function more modular and testable, replace the game width/height variables with parameters
*    @param {bool} - Returns true if there's any screen wrap
*/
gameObject.screenWrap = function(){

    //These are static values, they need to be adaptable in the future
    var _gameWidth  = 500;
    var _gameHeight = 500;


    var wrapLeft   = this.x < -this.width/2;
    var wrapRight  = this.x > _gameWidth + this.width/2;
    var wrapTop    = this.y < -this.height/2;
    var wrapBottom = this.y > _gameHeight + this.height/2;

    if (wrapLeft)   this.x  = _gameWidth + this.width/2;
    if (wrapRight)  this.x  = -this.width/2;
    if (wrapTop)    this.y  = _gameHeight + this.height/2;
    if (wrapBottom) this.y = -this.height/2;

    return wrapLeft || wrapRight || wrapTop || wrapBottom
}

/**
*    This method cheks to see if there's a collision with another gameObject
*    @param {object} spr2 - The sprite that's being checked for a collision
*    @returns {bool} - returns true if there is a collision
*/
gameObject.collision = function (spr2) {

    //Abstract context of object that's checking for collision
    var spr1 = this;

    var possibleCollision = false;
    var combinedHalfWidths;
    var combinedHalfHeights;
    var vx;
    var vy;

    //Find the center points of each sprite
    spr1.centerX = spr1.x + spr1.width / 2;
    spr1.centerY = spr1.y + spr1.height / 2;
    spr2.centerX = spr2.x + spr2.width / 2;
    spr2.centerY = spr2.y + spr2.height / 2;

    //Find the half-widths and half-heights of each sprite
    spr1.halfWidth = spr1.width / 2;
    spr1.halfHeight = spr1.height / 2;
    spr2.halfWidth = spr2.width / 2;
    spr2.halfHeight = spr2.height / 2;

    //Calculate the distance vector between the sprites
    vx = spr1.centerX - spr2.centerX;
    vy = spr1.centerY - spr2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = spr1.halfWidth + spr2.halfWidth;
    combinedHalfHeights = spr1.halfHeight + spr2.halfHeight;

    var horizontalCollision = Math.abs(vx) < combinedHalfWidths;
    var verticalCollision   = Math.abs(vy) < combinedHalfHeights;
    possibleCollision = horizontalCollision && verticalCollision;

    return possibleCollision;
};

/**
*    This method traverses all game objects checking for a collision
*    @param {array} sprList -a collection of registered gameObjects
*    @returns {string} - key to
*/
gameObject.singleCollisionCheck = function(sprList){
    for (x = 0; x < sprList.length; x++){
        //collisionCheck
    }
}
