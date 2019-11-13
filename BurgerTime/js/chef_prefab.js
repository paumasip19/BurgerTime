var burgertime = burgertime || {};

burgertime.chef_prefab = function(_game,_x,_y,_speed,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'chef');
    //console.log('3');
    this.scale.setTo(2);
    this.anchor.setTo(.5);
    this.animations.add('right',[0,1],10,false);
    this.animations.add('left',[2,3],10,false);
    this.animations.add('down',[4,5],10,false);
    this.animations.add('up',[6,7],10,false);
    //this.animations.play('walk');
    this.speed = _speed;
    this.level = _level;
    this.game.physics.arcade.enable(this);
    this.points = 0;
    this.lives = 3;
    this.pepper = 3;
};

burgertime.chef_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.chef_prefab.prototype.constructor = burgertime.chef_prefab;

/*burgertime.chef_prefab.prototype.update = function(){
   
};*/











