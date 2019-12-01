var burgertime = burgertime || {};

burgertime.ingredient_prefab = function(_game,_x,_y,,_level){
    //Phaser.Sprite.call(this,_game,_x,_y,'chef');

    this.level = _level;
    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);
};

burgertime.ingredient_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.ingredient_prefab.prototype.constructor = burgertime.ingredient_prefab;