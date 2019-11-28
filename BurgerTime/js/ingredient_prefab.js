var burgertime = burgertime || {};

burgertime.ingredient_prefab = function(_game,_x,_y,_speedX,_speedY,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'chef');

    this.scale.setTo(2);
    this.anchor.setTo(.5);
    
    this.speedX = _speedX;
    this.speedY = _speedY;
    this.level = _level;
    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);
    this.points = 0;
    this.lives = 3;
    this.pepper = 3;
};

burgertime.ingredient_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.ingredient_prefab.prototype.constructor = burgertime.ingredient_prefab;