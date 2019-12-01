var burgertime = burgertime || {};

burgertime.ingredientPart_prefab = function(_game,_x,_y,_tag1,_tag2,_tag3, _chef){
    Phaser.Sprite.call(this,_game,_x,_y,_tag1);
    //this.game.add.existing(this);
    
    this.chef = _chef;

    this.enableBody = true;

    this.game.physics.arcade.enable(this);

    this.body.immovable = true;
    this.body.allowGravity = false;
    
    this.ingredientIsTouched = false;
    
    //HACER HERENCIA DE CADA TROZO PARA HACERLO GENERICO
    //SOBRETODO PARA LLAMADA DE SPRITES
};

burgertime.ingredientPart_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.ingredientPart_prefab.prototype.constructor = burgertime.ingredient_prefab;

//LLAMADA EN UPDATE DEL PREFAB EN CASO DE COLISION
burgertime.ingredientPart_prefab.prototype.colisionIngredientPlayer = function(){
    if(this.ingredientIsTouched)
        {
            this.position.y += 10;
            this.ingredientIsTouched = true;
        }
};
