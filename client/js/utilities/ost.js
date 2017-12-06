var Ost = function(src){
    this.soundCollection = src || {
        smallExplosion: "/client/audio/bangSmall.wav",
        medExplosion:   "/client/audio/bangMedium.wav",
        bigExplosion:   "/client/audio/bangLarge.wav",
        fireBullet:     "/client/audio/fire.wav",
        thrust:         "/client/audio/thrust.wav",
    };
    this.src = {};
    //this.soundCollection = {};
};

/**
*    This method is to be used for traversal through source collection
*    @returns {object} A Howl instance from howler.js library
*/
Ost.prototype._setupSound = function(x){
    const config = {
        src: x,
        autoplay: false,
        loop: false,
        volume: 0.5,
    };
    return new Howl(config);
}

Ost.prototype.init = function(){
    const method = this._setupSound;
    const soundsArray = Object.keys(this.soundCollection);
    for (var x in soundsArray){
    	var current = soundsArray[x];
    	console.log(current);
        this.src[current] = this._setupSound(current);
    }
};

//Sound.soundCollection[1].play();

ga = new Ost();
ga.init();
