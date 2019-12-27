var burgertime = burgertime || {};

burgertime.ingredientPart_prefab = function(_game,_x,_y,_tag,_chef,_level){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    this.game.add.existing(this);
    
    this.chef = _chef;
    this.level = _level;

    this.enableBody = true;

    this.game.physics.arcade.enable(this);

    this.body.immovable = true;
    this.body.allowGravity = false;
    
    this.ingredientIsTouched = false;
    
    //HACER HERENCIA DE CADA TROZO PARA HACERLO GENERICO
    //SOBRETODO PARA LLAMADA DE SPRITES
};

burgertime.ingredientPart_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.ingredientPart_prefab.prototype.constructor = burgertime.ingredientPart_prefab;

//LLAMADA EN UPDATE DEL PREFAB EN CASO DE COLISION
burgertime.ingredientPart_prefab.prototype.update = function(){
   
    if(this.ingredientIsTouched == false)
        {
           this.game.physics.arcade.collide(this,this.chef,this.touchBurger,null,this);
        }
    
};



burgertime.ingredientPart_prefab.prototype.touchBurger = function(){
    if(this.ingredientIsTouched == false)
        {
            this.position.y += 10;
            this.ingredientIsTouched = true;
            this.level.walkIngredient.play();
            console.log("Yes");
        }
};
