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
    this.animations.add('stunned',[10,11],10,true);
    this.animations.add('dead',[6,7,8,9],10,false);
    
    this.animations.play('walk');
    this.speedX = _speedX;
    this.speedY = _speedY;
    this.level = _level;
    this.game.add.existing(this);
    //this.game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this);
    this.canMove = true;
    this.body.setSize(12, 15, 0, 0);
    this.moveHor = true;
    this.moveVer = false;
    this.direction = '';
    this.timeStunned = 5;
    this.stunned = false;
    this.dead = false;
    this.alreadyDead = false;
    //this.level.stairs.setCollisionBetween(4,5,true,'Stairs');
    
    this.firstDir()
};

burgertime.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.enemy_prefab.prototype.constructor = burgertime.enemy_prefab;

burgertime.enemy_prefab.prototype.update = function(){
    //this.game.physics.arcade.collide(this, this.level.floor);
    this.game.physics.arcade.collide(this, this.level.floor, this.enableGravity, null, this);
    this.game.physics.arcade.collide(this, this.level.collisionMap);
    this.game.physics.arcade.collide(this, this.level.stairs, this.goStairs, null, this);
    this.game.physics.arcade.collide(this, this.level.pepperThrow, this.stunEnemy,null);
    console.log(this.direction);
    /*if(this.level.chef.body.position.x > this.body.position.x){
    this.body.velocity.x = this.speedX;
        this.animations.play('walk');
    this.scale.x = -2;
    }else{
        this.body.velocity.x = -this.speedX;
        this.scale.x = 2;
    }*/
    if(this.direction == 'R'){
        this.body.velocity.x = this.speedX;
        this.animations.play('walk');
        this.scale.x = -2;
    }
    if(this.direction == 'L'){
        this.body.velocity.x = -this.speedX;
        this.animations.play('wlak');
        this.scale.x = 2;
    }
    if(this.direction == 'U'){
        this.body.velocity.y = -this.speedY;
        this.animations.play('up');
    }
    if(this.direction == 'D'){
        this.body.velocity.y = this.speedY;
        this.animations.play('down');
    }
    if(this.stunned){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.stop('walk');
        this.animations.stop('up');
        this.animations.stop('down');
        this.animations.play('stunned');
        if(this.timeStunned <= 0){
        this.stunned = false;
        this.timeStunned = 5;
        }
        else{
            this.timeStunned -= this.game.time.physicsElapsed;
        }
    }
    
    if(this.dead){
        this.animations.play('dead');
        //this.anim.onComplete.add(function(){this.alreadyDead = true;},this);
        this.alreadyDead = true;
        //this.alreadyDead = true;
        this.dead = false;
    }
    
    if(this.alreadyDead){
        console.log('caca');
        
        this.level.chef.points += 100;
        //this.animations.play('dead');
        this.level.salchicha.kill();
        this.alreadyDead = false;
    }
    console.log(this.dead);
    //console.log(this.timeStunned);
    //console.log(this.stunned);
};
burgertime.enemy_prefab.prototype.firstDir = function(){
    if(this.level.chef.body.position.x > this.body.position.x){
        this.direction = 'R';
    }
    else if(this.level.chef.body.position.x < this.body.position.x){
        this.direction = 'L';
    }
};
burgertime.enemy_prefab.prototype.enableGravity = function(){
    this.body.allowGravity = true;
    if(this.level.chef.body.position.x > this.body.position.x){
        this.direction = 'R';
    }
    else if(this.level.chef.body.position.x < this.body.position.x){
        this.direction = 'L';
    }
    //this.level.stairs.setCollisionBetween(4,5,true,'Stairs');
};
burgertime.enemy_prefab.prototype.stunEnemy = function(){
    this.stunned = true;
};
burgertime.enemy_prefab.prototype.goStairs = function(){
    console.log('holi');
    //this.level.stairs.setCollisionBetween(4,5,false,'Stairs');
    this.body.allowGravity = false;
    if(this.level.chef.body.position.y > this.body.position.y){
    //this.body.velocity.y = this.speedY;
        this.direction = 'D';
    //this.animations.play('down');
    }else{
        //this.body.velocity.y = -this.speedY;
        this.direction = 'U';
        //this.animations.play('up');
    }
    
}