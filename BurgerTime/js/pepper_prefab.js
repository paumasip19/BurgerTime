var burgertime = burgertime || {};

burgertime.pepper_prefab = function(_game,_x,_y,_direc,_tag){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    
    this.scale.setTo(1.5);
    this.anchor.setTo(0.5);
    this.game = _game;
    this.direc = _direc;
    
    if(this.direc=='R'||this.direc=='L')
    {
        this.rotation = 90;    
    }
    
    this.game.add.existing(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.aliveTimer = 1;
};

burgertime.pepper_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.pepper_prefab.prototype.constructor = burgertime.pepper_prefab;

burgertime.pepper_prefab.prototype.update = function(){
    
    //TIMER OKAY
    if(this.aliveTimer < 0){
        this.kill();
    }
    else 
    {
        this.aliveTimer -= this.game.time.physicsElapsed;
    }
}