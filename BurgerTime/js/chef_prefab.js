var burgertime = burgertime || {};

burgertime.chef_prefab = function(_game,_x,_y,_speedX,_speedY,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'chef');
    //console.log('3');
    this.scale.setTo(2);
    this.anchor.setTo(.5);
    //this.animations.add('right',[0,1],10,false);
    this.animations.add('walk',[0,1,2],15,false);
    this.animations.add('down',[3,4],10,false);
    this.animations.add('up',[5,6],10,false);
    this.animations.add('death',[13,14,15,16,17,18], 10,false);
    //this.animations.play('walk');
    this.speedX = _speedX;
    this.speedY = _speedY;
    this.level = _level;
    this.game.add.existing(this);
    //_game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this);
    this.points = 0;
    this.lives = 3;
    this.pepper = 3;
};

burgertime.chef_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.chef_prefab.prototype.constructor = burgertime.chef_prefab;

/*burgertime.chef_prefab.prototype.update = function(){
   
};*/











