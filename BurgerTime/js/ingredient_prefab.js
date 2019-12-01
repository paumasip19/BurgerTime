var burgertime = burgertime || {};

burgertime.ingredient_prefab = function(_game,_x,_y,_tag1,_tag2,_tag3, _chef){
    //Phaser.Sprite.call(this,_game,_x,_y,_tag1);
    //this.game.add.existing(this);
    //this.game.physics.arcade.enable(this);
    
    this.chef = _chef;
    
    this.ingredient1 = this.game.add.sprite(_x,_y,_tag1,0);
    this.ingredient2 = this.game.add.sprite(_x + 30, _y,_tag2,0);
    this.ingredient3 = this.game.add.sprite(_x + 60,_y,_tag2,0);
    this.ingredient4 = this.game.add.sprite(_x + 90,_y,_tag2,0);
    this.ingredient5 = this.game.add.sprite(_x + 120,_y,_tag3,0);

    this.ingredient1.enableBody = true;
    this.ingredient2.enableBody = true;
    this.ingredient3.enableBody = true;
    this.ingredient4.enableBody = true;
    this.ingredient5.enableBody = true;

    this.game.physics.arcade.enable(this.ingredient1);
    this.game.physics.arcade.enable(this.ingredient2);
    this.game.physics.arcade.enable(this.ingredient3);
    this.game.physics.arcade.enable(this.ingredient4);
    this.game.physics.arcade.enable(this.ingredient5);

    this.ingredient1.body.immovable = true;
    this.ingredient1.body.allowGravity = false;
    this.ingredient2.body.immovable = true;
    this.ingredient2.body.allowGravity = false;
    this.ingredient3.body.immovable = true;
    this.ingredient3.body.allowGravity = false;
    this.ingredient4.body.immovable = true;
    this.ingredient4.body.allowGravity = false;
    this.ingredient5.body.immovable = true;
    this.ingredient5.body.allowGravity = false;
    
    this.ingredient1IsTouched = false;
    this.ingredient2IsTouched = false;
    this.ingredient3IsTouched = false;
    this.ingredient4IsTouched = false;
    this.ingredient5IsTouched = false;
    
    this.allTouched = false;
    
    //HACER HERENCIA DE CADA TROZO PARA HACERLO GENERICO
    //SOBRETODO PARA LLAMADA DE SPRITES
};

burgertime.ingredient_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.ingredient_prefab.prototype.constructor = burgertime.ingredient_prefab;

//LLAMAR SI TOCA UN INGREDIENTE
burgertime.ingredient_prefab.prototype.fall = function(){
    
    /*if(touchesEnemy)
    {
        //GivePointsToChef
        //UpdateHUD
    }
    if(touchesIngredient)
    {
        //stopMoving
    }*/
};
