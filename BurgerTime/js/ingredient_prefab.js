var burgertime = burgertime || {};

burgertime.ingredient_prefab = function(_game,_x,_y,_tag1,_tag2,_tag3, _chef){
    Phaser.Sprite.call(this,_game,_x+10000,_y,_tag1);
    
    this.chef = _chef;
    
    this.ingredient1 = new burgertime.ingredientPart_prefab(_game,_x,_y,_tag1,_chef);
    this.ingredient2 = new burgertime.ingredientPart_prefab(_game,_x+30,_y,_tag2,_chef);
    this.ingredient3 = new burgertime.ingredientPart_prefab(_game,_x+60,_y,_tag2,_chef);
    this.ingredient4 = new burgertime.ingredientPart_prefab(_game,_x+90,_y,_tag2,_chef);
    this.ingredient5 = new burgertime.ingredientPart_prefab(_game,_x+120,_y,_tag3,_chef);
    this.allTouched = false;
    this.tempPos = 0;
    this.lastTempPos = 0;
    this.game.add.existing(this);
    
    
    //HACER HERENCIA DE CADA TROZO PARA HACERLO GENERICO
    //SOBRETODO PARA LLAMADA DE SPRITES
};

burgertime.ingredient_prefab.prototype = Object.create(Phaser.Sprite.prototype);
burgertime.ingredient_prefab.prototype.constructor = burgertime.ingredient_prefab;

burgertime.ingredient_prefab.prototype.update = function(){
    if(this.ingredient1.ingredientIsTouched == true &&
      this.ingredient2.ingredientIsTouched == true &&
      this.ingredient3.ingredientIsTouched == true &&
      this.ingredient4.ingredientIsTouched == true &&
      this.ingredient5.ingredientIsTouched == true){
        this.allTouched = true;
    }
    
    //this.game.physics.arcade.collide(this.ingredient1,this.in1.ingredient1,this.stopMoving, null, this);
    //this.game.physics.arcade.collide(this.ingredient1,this.in2.ingredient1,this.stopMoving, null, this);
    
    if(this.allTouched == true)
    {
        var i = this.fall();     
    }
};

burgertime.ingredient_prefab.prototype.stopMoving = function(){
    this.ingredient1.ingredientIsTouched = false;
    this.ingredient2.ingredientIsTouched = false;
    this.ingredient3.ingredientIsTouched = false;
    this.ingredient4.ingredientIsTouched = false;
    this.ingredient5.ingredientIsTouched = false;
    this.allTouched = false;
};

//LLAMAR SI TOCA UN INGREDIENTE
burgertime.ingredient_prefab.prototype.fall = function(){
    
    /*if(touchesEnemy)
    {
        //GivePointsToChef
        //UpdateHUD
    }*/
    
    this.ingredient1.position.y += 1;
        this.ingredient2.position.y += 1;
        this.ingredient3.position.y += 1;
        this.ingredient4.position.y += 1;
        this.ingredient5.position.y += 1;
    /*if()
    {
        
    }
    else
    {
        this.ingredient1.position.y += 1;
        this.ingredient2.position.y += 1;
        this.ingredient3.position.y += 1;
        this.ingredient4.position.y += 1;
        this.ingredient5.position.y += 1;
    }*/
};

burgertime.ingredient_prefab.prototype.updateTempPos = function(_yPos){
    
    if(this.tempPos != _yPos)
    {
        this.tempPos = _yPos;
        console.log("Hola");
    }
};


