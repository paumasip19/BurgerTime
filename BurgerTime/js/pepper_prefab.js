var burgertime = burgertime || {};

burgertime.pepper_prefab = function(_game,_x,_y,_direc){
    Phaser.Sprite.call(this,_game,_x,_y,'PimientaTirada');
    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.direc = _direc;
    
    if(this.direc=='R'||this.direc=='L')
    {
        this.rotation = 90;    
    }
    
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
};

burgertime.pepper_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.pepper_prefab.prototype.constructor = burgertime.pepper_prefab;

burgertime.pepper_prefab.prototype.update = function(){

    this.killYourself = this.game.time.events.add(Phaser.Timer.SECOND*1,this.kill(),this);
    
    //TIMER OKAY
    /*if(this.timeElapsedActivate > 3){
                this.activatePowerUp();
                /*if(!this.bonusPause.isPlaying()){
                    this.bonusPause.play();
                }*/
                /*this.timeElapsedDeactivate = 0;
            }
            else {
                this.timeElapsedActivate += this.game.time.physicsElapsed;
            }*/
}