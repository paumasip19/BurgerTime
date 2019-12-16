var burgertime = burgertime || {};

burgertime.stairBox_prefab = function(_game,_x,_y,_h,_tag){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    
    this.scale.setTo(1);
    this.anchor.setTo(0);
    this.game = _game;
    this.height = _h;
    
    this.game.add.existing(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;

};

burgertime.stairBox_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.stairBox_prefab.prototype.constructor = burgertime.stairBox_prefab;