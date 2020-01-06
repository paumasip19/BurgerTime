var burgertime = burgertime || {};

burgertime.ingredient_prefab = function(_game,_x,_y,_tag1,_tag2,_tag3, _chef,_level){
    Phaser.Sprite.call(this,_game,_x+10000,_y,_tag1);
    
    this.chef = _chef;
    this.level = _level;
    
    this.ingredient1 = new burgertime.ingredientPart_prefab(_game,_x,_y,_tag1,_chef,_level);
    this.ingredient2 = new burgertime.ingredientPart_prefab(_game,_x+30,_y,_tag2,_chef,_level);
    this.ingredient3 = new burgertime.ingredientPart_prefab(_game,_x+60,_y,_tag2,_chef,_level);
    this.ingredient4 = new burgertime.ingredientPart_prefab(_game,_x+90,_y,_tag2,_chef,_level);
    this.ingredient5 = new burgertime.ingredientPart_prefab(_game,_x+120,_y,_tag3,_chef,_level);
    this.allTouched = false;
    this.tempPos = _y;
    this.tempUpdated = false;
    this.isDone = false;
    this.game.add.existing(this);
    this.killSal = false;
    
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
      this.ingredient5.ingredientIsTouched == true &&
      this.allTouched == false){
        this.allTouched = true;
        this.chef.points += 50;
    }
    
    if(this.allTouched == true && this.isDone == false)
    {
        var bigger = 1000;
        if(this.ingredient1.y < bigger) bigger = this.ingredient1.y;
        if(this.ingredient2.y < bigger) bigger = this.ingredient2.y;
        if(this.ingredient3.y < bigger) bigger = this.ingredient3.y;
        if(this.ingredient4.y < bigger) bigger = this.ingredient4.y;
        if(this.ingredient5.y < bigger) bigger = this.ingredient5.y;
        
        this.ingredient1.y = bigger;
        this.ingredient2.y = bigger;
        this.ingredient3.y = bigger;
        this.ingredient4.y = bigger;
        this.ingredient5.y = bigger;
        
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
    this.tempUpdated = false;
};

//LLAMAR SI TOCA UN INGREDIENTE
burgertime.ingredient_prefab.prototype.fall = function(){
    this.game.physics.arcade.collide(this.ingredient1, this.level.salchicha, this.killEnemy1, null, this);
    this.game.physics.arcade.collide(this.ingredient2, this.level.salchicha, this.killEnemy1, null, this);
    this.game.physics.arcade.collide(this.ingredient3, this.level.salchicha, this.killEnemy1, null, this);
    this.game.physics.arcade.collide(this.ingredient4, this.level.salchicha, this.killEnemy1, null, this);
    this.game.physics.arcade.collide(this.ingredient5, this.level.salchicha, this.killEnemy1, null, this);
    
    this.game.physics.arcade.collide(this.ingredient1, this.level.salchicha2, this.killEnemy2, null, this);
    this.game.physics.arcade.collide(this.ingredient2, this.level.salchicha2, this.killEnemy2, null, this);
    this.game.physics.arcade.collide(this.ingredient3, this.level.salchicha2, this.killEnemy2, null, this);
    this.game.physics.arcade.collide(this.ingredient4, this.level.salchicha2, this.killEnemy2, null, this);
    this.game.physics.arcade.collide(this.ingredient5, this.level.salchicha2, this.killEnemy2, null, this);
    
    this.game.physics.arcade.collide(this.ingredient1, this.level.salchicha3, this.killEnemy3, null, this);
    this.game.physics.arcade.collide(this.ingredient2, this.level.salchicha3, this.killEnemy3, null, this);
    this.game.physics.arcade.collide(this.ingredient3, this.level.salchicha3, this.killEnemy3, null, this);
    this.game.physics.arcade.collide(this.ingredient4, this.level.salchicha3, this.killEnemy3, null, this);
    this.game.physics.arcade.collide(this.ingredient5, this.level.salchicha3, this.killEnemy3, null, this);
    
    this.ingredient1.position.y += 1;
    this.ingredient2.position.y += 1;
    this.ingredient3.position.y += 1;
    this.ingredient4.position.y += 1;
    this.ingredient5.position.y += 1;
};

burgertime.ingredient_prefab.prototype.updateTempPos = function(_yPos){
    
    if(this.tempUpdated == false)
    {
        this.chef.points += 50;
        this.tempPos = _yPos;
        this.tempUpdated = true;
    }
};

burgertime.ingredient_prefab.prototype.ingredientDone = function(){
    var a = this.stopMoving();
    this.isDone = true;
};
burgertime.ingredient_prefab.prototype.killEnemy1 = function(){
    if(this.level.salchicha.body.enable){
        this.level.salchicha.body.enable = false;
    }
    if(!this.level.salchicha.oneTime){
        this.level.salchicha.dead = true;
        this.level.salchicha.oneTime = true;
    }
};
burgertime.ingredient_prefab.prototype.killEnemy2 = function(){
    if(this.level.salchicha2.body.enable){
        this.level.salchicha2.body.enable = false;
    }
    if(!this.level.salchicha2.oneTime){
        this.level.salchicha2.dead = true;
        this.level.salchicha2.oneTime = true;
    }
};
burgertime.ingredient_prefab.prototype.killEnemy3 = function(){
    if(this.level.salchicha3.body.enable){
        this.level.salchicha3.body.enable = false;
    }
    if(!this.level.salchicha3.oneTime){
        this.level.salchicha3.dead = true;
        this.level.salchicha3.oneTime = true;
    }
};


