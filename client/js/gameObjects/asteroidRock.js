/**
*    @param {object} spr - A reference to an extended pixi game sprite
*/
var asteroidRock = function(spr){
    spr.name = "asteroidRock"
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;

    //choose random direction to spin
    spr.rotateDirection = Math.round(Math.random()) ? 1 : -1;

    /**
    *   @returns {bool} returns true to indicate tests this method is successfully overwritten
    */
    spr.create = function(){
        switch (spr.sizeState){

            case "small":
                spr.scale.x = .20;
                spr.scale.y = .20;
                spr.turnSpd = Math.floor(Math.random() * 30)/ 100;
                spr.vx = (Math.floor(Math.random() * 20)/40) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 20)/40) * spr.rotateDirection;
                break;

            case "medium":
                spr.scale.x  = 0.5;
                spr.scale.y = 0.5;
                spr.turnSpd = Math.floor(Math.random() * 50)/ 1000;
                spr.vx = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 5)/15) * spr.rotateDirection;
                break;

            default:
            case "big":
                spr.turnSpd = Math.floor(Math.random() * 100)/ 10000;
                spr.vx = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                spr.vy = (Math.floor(Math.random() * 10)/20) * spr.rotateDirection;
                break;
        }
        return true;
    }

    /**
    *    This method destroys a rock and splits it smaller chunks depending on size
    *   @returns {number} returns id of gameObject
    */
    spr.explode = function(){
        switch (spr.sizeState){
            case "small":
                break;

            case "medium":
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                spr.spitAsteroid('small');
                break;

            default:
                spr.spitAsteroid('medium');
                spr.spitAsteroid('medium');
                break;
        }
        spr.destroySelf();
        return spr.id;
    }

    /**
    *    This method creates a new asteroidRock
    *    @param {string} size - a string key that determines the size of asteroidRock
    *    @returns {obj} - an astroid gameObject
    */
    spr.spitAsteroid = function(size) {
        var babyAst = new _sprite(spr.texture); //turn texture into sprite
        babyAst = _objPolymorph(babyAst);       //give sprite global game object attributes
        _gameMaster.initGameSprite(babyAst);    //register new sprite into game
        asteroidRock(babyAst);  //give sprite asteroidRock specific fields

        var randomDir = Math.round(Math.random()) ? 1 : -1;
        //assign size and location
        babyAst.sizeState = size;
        babyAst.x = spr.x + (Math.random() * 25) * randomDir;
        babyAst.y = spr.y + (Math.random() * 25) * randomDir;
        babyAst.create();
        app.stage.addChild(babyAst);
        return babyAst;
    }

    /**
    *    @param {number} delta - A time based value that sustains relative space/time accuracy
    */
    spr.update = function(delta){
        spr.screenWrap();
        spr.x += spr.vx * delta;
        spr.y += spr.vy * delta;
        spr.rotation += spr.turnSpd * spr.rotateDirection;
    }
}
