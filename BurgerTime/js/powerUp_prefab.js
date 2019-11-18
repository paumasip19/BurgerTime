var burgertime = burgertime || {};

burgertime.powerUp_prefab = function(_game,_x,_y, _chef){
    Phaser.Sprite.call(this,_game,_x,_y,'PowerUp1');
    
    this.x = _x;
    this.y = _y;
    
    this.powerPoints = 100;
    this.chef = _chef;
    this.game = _game;
    
    this.isActive = false;
    
    this.scale.setTo(0);
    this.anchor.setTo(0);
    
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
};

burgertime.powerUp_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.powerUp_prefab.prototype.constructor = burgertime.powerUp_prefab;

burgertime.powerUp_prefab.prototype.update = function(){
    if(this.isActive == true){
        this.game.time.events.add(Phaser.Timer.SECOND*3,deactivate,this); 
    }
    else{
        this.game.time.events.add(Phaser.Timer.SECOND*3,activate,this);  
    } 
},
 activate = function(){
    this.scale.setTo(3);
    this.anchor.setTo(.5);
    this.isActive = true;
},
 deactivate = function(){
    this.scale.setTo(0);
    this.anchor.setTo(0);
    this.isActive = false;
},
 addPoints = function(){
    this.chef.points += this.powerPoints;
    deactivate();
}