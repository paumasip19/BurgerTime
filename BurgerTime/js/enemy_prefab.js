var burgertime = burgertime || {};
burgertime.enemy_prefab = function(_game,_x,_y,_speedX,_speedY,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'salchicha');
    //console.log('3');
    this.scale.setTo(2);
    this.anchor.setTo(.5);
    //this.animations.add('right',[0,1],10,false);
    this.animations.add('walk',[0,1],10,false);
    this.animations.add('down',[2,3],10,false);
    this.animations.add('up',[4,5],10,false);
    
    this.animations.play('walk');
    this.speedX = _speedX;
    this.speedY = _speedY;
    this.level = _level;
    this.game.add.existing(this);
    //_game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this);
    this.lastMove = 'D';
    this.canMove = true;
    this.body.setSize(12, 15, 0, 0);
    this.moveHor = true;
    this.moveVer = false;
};

burgertime.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.enemy_prefab.prototype.constructor = burgertime.enemy_prefab;

burgertime.enemy_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.floor);
    this.game.physics.arcade.collide(this, this.level.floor, this.enableGravity, null, this);
    this.game.physics.arcade.collide(this, this.level.stairs, this.goStairs, null, this);
    if(this.level.chef.body.position.x > this.body.position.x){
    this.body.velocity.x = this.speedX;
        this.animations.play('walk');
    this.scale.x = -2;
    }else{
        this.body.velocity.x = -this.speedX;
        this.scale.x = 2;
    }
};

burgertime.enemy_prefab.prototype.enableGravity = function(){
    //this.body.allowGravity = true;
};

burgertime.enemy_prefab.prototype.goStairs = function(){
    //this.body.allowGravity = false;
    if(this.level.chef.body.position.y > this.body.position.y){
    this.body.velocity.y = this.speedY;
    this.animations.play('down');
    }else{
        this.body.velocity.y = -this.speedY;
        this.animations.play('up');
    }
    
}