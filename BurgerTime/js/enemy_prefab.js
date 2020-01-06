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
    
    this.InitPositionsX = _x;
    this.InitPositionsY = _y;
    
    this.animations.play('walk');
    this.speedX = _speedX;
    this.speedY = _speedY;
    this.level = _level;
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.canMove = true;
    this.body.setSize(12, 15, 0, 0);

    this.direction = 0;
    this.timeStunned = 5;
    this.canChangeDirec = true;
    
    this.timerDirec = 1;
    
    this.camesFromUnder = false;
    this.timeToSwitchSides = 5;
    
    this.stunned = false;
    this.dead = false;
    this.alreadyDead = false;
    this.oneTime = false;
    
    this.firstDir()
    
    this.upDown = false;
};

burgertime.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.enemy_prefab.prototype.constructor = burgertime.enemy_prefab;

burgertime.enemy_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.floor, this.enableGravity, null, this);
    this.game.physics.arcade.collide(this, this.level.collisionMap);
    this.game.physics.arcade.collide(this, this.level.pepperThrow, this.stunEnemy,null, this);

    if(!this.dead && !this.alreadyDead && !this.stunned)
    {
        if(this.direction == 2) // RIGHT
        {
            this.body.velocity.y = 0;
            this.body.velocity.x = this.speedX;
            this.animations.play('walk');
            this.scale.x = -2;
        }
        
        if(this.direction == -2) // LEFT
        {
            this.body.velocity.y = 0;
            this.body.velocity.x = -this.speedX;
            this.animations.play('walk');
            this.scale.x = 2;
        }
        
        if(this.direction == 1) // UP
        {
            this.body.velocity.x = 0;
            this.body.velocity.y = -this.speedY;
            this.animations.play('up');
        }
        
        if(this.direction == -1) // DOWN
        {
            this.body.velocity.x = 0;
            this.body.velocity.y = this.speedY;
            this.animations.play('down');
        }
    }
    
    if(this.stunned){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.play('stunned');
        if(this.timeStunned <= 0){
            //this.animations.stop('stunned');
            this.stunned = false;
            this.timeStunned = 5;
            this.body.enable = true;
        }
        else{
            this.timeStunned -= this.game.time.physicsElapsed;
            this.body.enable = false;
        }
    }
    
    if(this.dead){
        this.anim = this.animations.play('dead', 10, false, true);
        this.anim.onComplete.add(function(){this.alreadyDead = true;},this);
    }
    
    if(this.alreadyDead){
        this.level.chef.points += 100;
        this.level.enemies--;
        this.level.salchicha.kill();
        this.alreadyDead = false;
    }

};

burgertime.enemy_prefab.prototype.firstDir = function()
{
    if(this.level.chef.body.position.x > this.x){
        this.direction = 2;
    }
    else if(this.level.chef.body.position.x < this.x){
        this.direction = -2;
    }
};

burgertime.enemy_prefab.prototype.enableGravity = function()
{
    this.body.allowGravity = true;
};

burgertime.enemy_prefab.prototype.stunEnemy = function()
{
    this.stunned = true;
};

burgertime.enemy_prefab.prototype.changeDirec = function()
{
    if(this.level.chef.body.position.y > this.body.position.y)
        {
            this.direction = -1;
        }
        else
        {
            this.direction = 1;
        }
};

burgertime.enemy_prefab.prototype.recolocate = function()
{
      this.x = this.InitPositionsX;
      this.y = this.InitPositionsY;
      this.scale.setTo(2);
      this.animations.play('walk');
      this.canMove = true;
      this.direction = 0;
      this.timeStunned = 5;
      this.canChangeDirec = true;
      this.timerDirec = 1;
      this.camesFromUnder = false;
      this.timeToSwitchSides = 5;
      this.stunned = false;
      this.dead = false;
      this.alreadyDead = false;
      this.oneTime = false;
      this.firstDir()
      this.upDown = false;
};

burgertime.enemy_prefab.prototype.goStairs = function()
{
        if(this.upDown == false)
        {
            this.timeToSwitchSides = 5;
            this.body.allowGravity = false;
            this.upDown = true;
            if(this.level.chef.body.position.y > this.body.position.y)
            {
                this.direction = -1;
            }
            else
            {
                this.direction = 1;
                if(this.body.position.y - this.level.chef.body.position.y > 40) // Si viene por debajo del player
                {
                   this.camesFromUnder = true;
                }
            }
        }
}