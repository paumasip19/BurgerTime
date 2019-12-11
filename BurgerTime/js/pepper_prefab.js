var burgertime = burgertime || {};

burgertime.pepper_prefab = function(_game,_x,_y,_direc){
    Phaser.Sprite.call(this,_game,_x,_y,'PimientaTirada');
    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.direc = _direc
    
    if(direc=='R'||direc=='L')
    {
        this.rotation = 90;    
    }
    
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
};

burgertime.pepper_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.pepper_prefab.prototype.constructor = burgertime.pepper_prefab;

burgertime.pepper_prefab.prototype.update = function(){

    this.killYourself = this.game.time.events.add(Phaser.Timer.SECOND*1,this.kill(),this);
        
}