var burgertime = burgertime || {};

burgertime.level3 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.scale.setGameSize(gameOptions.level3Width,gameOptions.level3Height);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.heroGravity;

        
        this.game.world.setBounds(0,0,gameOptions.level3Width,gameOptions.level3Height);
        this.game.renderer.renderSession.roundPixels = true;
        
        
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        
        this.load.image('Map', ruta+'SpritesheetMaps.png');    
        this.load.tilemap('level3','assets/levels/Level3.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.spritesheet('chef', ruta+'ChefRamsay.png', 12, 25);
        this.load.image('PowerUp1', ruta+'PowerUp1.png');
        this.load.image('PowerUp2', ruta+'PowerUp2.png');
        this.load.image('PowerUp3', ruta+'PowerUp3.png');
        this.load.image('BreadDown1', ruta+'DownBread1.png');
        this.load.image('BreadDown2', ruta+'DownBread2.png');
        this.load.image('BreadDown3', ruta+'DownBread3.png');
        this.load.image('Cheese1', ruta+'Cheese1.png');
        this.load.image('Cheese2', ruta+'Cheese2.png');
        this.load.image('Cheese3', ruta+'Cheese3.png');
        this.load.image('Lettuce1', ruta+'Lettuce1.png');
        this.load.image('Lettuce2', ruta+'Lettuce2.png');
        this.load.image('Lettuce3', ruta+'Lettuce3.png');
        this.load.image('Meat1',ruta+'Meat1.png');
        this.load.image('Meat2',ruta+'Meat2.png');
        this.load.image('Meat3',ruta+'Meat3.png');
        this.load.image('Tomatoe1',ruta+'Tomatoe1.png');
        this.load.image('Tomatoe2',ruta+'Tomatoe2.png');
        this.load.image('Tomatoe3',ruta+'Tomatoe3.png');
        this.load.image('BreadUp1',ruta+'UpBread1.png');
        this.load.image('BreadUp2',ruta+'UpBread2.png');
        this.load.image('BreadUp3',ruta+'UpBread3.png');
        this.load.image('Bandeja', ruta+"Recolector.png");
        this.load.image('BandejaNoLeft', ruta+"RecolectorNoLeft.png");
        this.load.image('BandejaNoRight', ruta+"RecolectorNoRight.png");
        
        this.load.audio('mainTheme', 'assets/audio/main_theme.mp3');
        this.load.audio('start', 'assets/audio/game_start.mp3');
        this.load.audio('levelComplete', 'assets/audio/stage_complete.mp3');
        this.load.audio('death', 'assets/audio/death_theme.mp3');
        this.load.audio('bonus_earned','assets/audio/bonus_earned.mp3');
        this.load.audio('bonus_pause', 'assets/audio/bonus_pause.mp3');
        this.load.audio('enemy_crushed', 'assets/audio/enemy_crushed.mp3');
        this.load.audio('enemy_fall_ingredient', 'assets/audio/enemy_crushed.mp3');
        this.load.audio('ingredient_ingredient', 'assets/audio/ingredient_ingredient.mp3');
        this.load.audio('resume', 'assets/audio/resume.mp3');
        this.load.audio('salt_fail', 'assets/audio/salt_fail.mp3');
        this.load.audio('salt_success', 'assets/audio/salt_success.mp3');
        this.load.audio('walk_ingredient', 'assets/audio/walk_ingredient.mp3');
    },
    create:function(){
        
        this.espacio = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.music = this.game.add.audio('mainTheme');
        this.start = this.game.add.audio('start');
        this.complete = this.game.add.audio('levelComplete');
        this.death = this.game.add.audio('death');
        this.bonusEarned = this.game.add.audio('bonus_earned');
        this.bonusPause = this.game.add.audio('bonus_pause');
        this.enemyFallIngredient = this.game.add.audio('enemy_fall_ingredient');
        this.ingredientIngredient = this.game.add.audio('ingredient_ingredient');
        this.resume = this.game.add.audio('resume');
        this.saltFail = this.game.add.audio('salt_fail');
        this.saltSuccess = this.game.add.audio('salt_success');
        this.walkIngredient = this.game.add.audio('walk_ingredient');
        this.start.play();
        
        
        this.map = this.game.add.tilemap('level3');
        this.map.addTilesetImage('Map');
        
        this.floor = this.map.createLayer('Floor');
        this.map.setCollisionBetween(3,3,true,'Floor');
        
        this.stairs = this.map.createLayer('Stairs');
        this.map.setCollisionBetween(4,5,true,'Stairs');
        
        this.background = this.map.createLayer('Background');
        this.map.setCollisionBetween(6,6,true,'Background');
        
        this.chef = new burgertime.chef_prefab(this.game,this.game.world.centerX+150,this.game.world.centerY + 100,gameOptions.heroSpeed,gameOptions.heroSpeed,this);
        this.chef.frame = 7;
        
        //this.breadUp = new burgertime.ingredient_prefab(this.game,100,100,this,'BreadUp1');
        
        this.isPowerUp = false;
        this.dead = false;
        this.startLevel = true;
        this.levelCompleted = false;
        
        this.changeMusic = this.game.time.events.add(Phaser.Timer.SECOND*3,this.musicChange,this);
        
        this.collideStairs = this.game.time.events.add(Phaser.Timer.SECOND*2,this.activateStairs,this);
        
        /*this.timer1 = this.game.time.events.loop(Phaser.Timer.SECOND*2,this.activatePowerUp,this);
        this.timer2 = this.game.time.events.loop(Phaser.Timer.SECOND*3,this.deactivatePowerUp,this);*/
        
        this.timeElapsedActivate = 0;
        this.timeElapsedDeactivate = 0;
        
        this.timerStairs = this.game.time.events.loop(Phaser.Timer.SECOND,this.activateStairs,this);
        
        this.upBread1 = new burgertime.ingredient_prefab(this.game,75, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread2 = new burgertime.ingredient_prefab(this.game,315, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread3 = new burgertime.ingredient_prefab(this.game,555, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread4 = new burgertime.ingredient_prefab(this.game,800, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread5 = new burgertime.ingredient_prefab(this.game,75, 565,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread6 = new burgertime.ingredient_prefab(this.game,800, 565,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        
        this.burger1 = new burgertime.ingredient_prefab(this.game,75, 265,'Meat1','Meat2','Meat3', this.chef, this);
        this.burger2 = new burgertime.ingredient_prefab(this.game,315, 140+65,'Cheese1','Cheese2','Cheese3', this.chef, this);
        this.burger3 = new burgertime.ingredient_prefab(this.game,555, 140+65,'Meat1','Meat2','Meat3', this.chef, this);
        this.burger4 = new burgertime.ingredient_prefab(this.game,800, 265,'Cheese1','Cheese2','Cheese3', this.chef, this);
        this.burger5 = new burgertime.ingredient_prefab(this.game,75, 565+60,'Cheese1','Cheese2','Cheese3', this.chef, this);
        this.burger6 = new burgertime.ingredient_prefab(this.game,800, 565+60,'Meat1','Meat2','Meat3', this.chef, this);
        
        this.downBread1 = new burgertime.ingredient_prefab(this.game,75, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread2 = new burgertime.ingredient_prefab(this.game,315, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread3 = new burgertime.ingredient_prefab(this.game,555, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread4 = new burgertime.ingredient_prefab(this.game,800, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread5 = new burgertime.ingredient_prefab(this.game,75, 565+120,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread6 = new burgertime.ingredient_prefab(this.game,800, 565+120,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        
        this.bandeja1 = this.game.add.sprite(65,470,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja1);
        this.bandeja1.body.allowGravity = false;
        this.bandeja1.body.immovable = true;
        
        this.bandeja2 = this.game.add.sprite(365-60,640,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja2);
        this.bandeja2.body.allowGravity = false;
        this.bandeja2.body.immovable = true;
        
        this.bandeja3 = this.game.add.sprite(605-60,640,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja3);
        this.bandeja3.body.allowGravity = false;
        this.bandeja3.body.immovable = true;
        
        this.bandeja4 = this.game.add.sprite(790,470,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja4);
        this.bandeja4.body.allowGravity = false;
        this.bandeja4.body.immovable = true;
        
        this.bandeja5 = this.game.add.sprite(65,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja5);
        this.bandeja5.body.allowGravity = false;
        this.bandeja5.body.immovable = true;
        
        this.bandeja6 = this.game.add.sprite(790,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja6);
        this.bandeja6.body.allowGravity = false;
        this.bandeja6.body.immovable = true;
    },
    musicChange:function(){
        this.music.play();
    },
    update:function(){          
        
        if(this.chef.lives == 0)
        {
            var h = this.saveData();
            var s = this.updateHighScore();
            this.state.start('menu');
        }
        
        if(this.upBread1.isDone &&
           this.upBread2.isDone &&
           this.upBread3.isDone &&
           this.upBread4.isDone &&
           this.upBread5.isDone &&
           this.upBread6.isDone) {
            this.levelCompleted = true;
        }
        
        this.game.physics.arcade.collide(this.chef,this.stairs,this.stairTouch, null, this);
        this.game.physics.arcade.collide(this.chef,this.floor,this.platformTouch, null, this);
        
        var c = this.ingredientColisions();
        
        if(this.isPowerUp == false){
            if(this.timeElapsedActivate > 3){
                this.activatePowerUp();
                /*if(!this.bonusPause.isPlaying()){
                    this.bonusPause.play();
                }*/
                this.timeElapsedDeactivate = 0;
            }
            else {
                this.timeElapsedActivate += this.game.time.physicsElapsed;
            }
        }else{
            if(this.timeElapsedDeactivate > 3){
                this.deactivatePowerUp();
                this.timeElapsedActivate = 0;
            }
            else {
                this.timeElapsedDeactivate += this.game.time.physicsElapsed;
                if(this.game.physics.arcade.overlap(this.chef,this.powerUp,this.addPointsPowerUp,null,this)) {
                    /*if(!this.bonusEarned.isPlaying()){
                    this.bonusEarned.play();
                    }*/
                    this.timeElapsedActivate = 0;
                } 
            }
        }
       
        //this.activatePowerUp();
        //console.log(this.isPowerUp);
        
        if(this.cursors.left.isDown && this.chef.canMove == true){
            this.chef.body.velocity.x = -this.chef.speedX;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('walk');
            this.chef.scale.x = 2.5
            this.chef.lastMove = 'L';
            ;
        }
        else if(this.cursors.right.isDown && this.chef.canMove == true){
            this.chef.body.velocity.x = this.chef.speedX;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('walk');
            this.chef.scale.x = -2.5;
            this.chef.lastMove = 'R';
        }
        else if(this.cursors.up.isDown && this.chef.canMove == true){
            this.chef.body.velocity.y = -this.chef.speedY;
            this.chef.body.velocity.x = 0;
            this.chef.animations.play('up');
            this.chef.lastMove = 'U';
        }
        else if(this.cursors.down.isDown && this.chef.canMove == true){
            this.chef.body.velocity.y = this.chef.speedY;
            this.chef.body.velocity.x = 0;
            this.chef.animations.play('down');
            this.chef.lastMove = 'D';
            
        }else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            
        }
        
        if(this.espacio.downDuration(1)){        // Lanzamiento de Pimienta
            
          if(this.chef.pepper > 0) {
                this.chef.canMove = false;
                
                if(this.chef.lastMove == 'U') { 
                    this.animacionA = this.chef.animations.play('pepperUp',5,false,false);
                    this.animacionA.onComplete.add(function(){this.chef.canMove = true;},this);
                }
                else if(this.chef.lastMove == 'D') { 
                    this.animacionB = this.chef.animations.play('pepperDown',5,false,false);
                    this.animacionB.onComplete.add(function(){this.chef.canMove = true;},this);
                }
                else {
                    this.animacionC = this.chef.animations.play('pepperSide',5,false,false);
                    this.animacionC.onComplete.add(function(){this.chef.canMove = true;},this);
                }
               this.chef.pepper--;                 
           }
        }
                
        if(this.chef.lives <= 0){                // Si Chef Muere, la condicion es cuando colisiona con enemigo
            this.music.pause();
            this.death.play();
            this.animacion = this.chef.animations.play('death',5,false,true);
            this.animacion.onComplete.add(function(){this.dead = true;},this);
        }
        
        if(this.dead){                          //  PLayer Gasta Vida
            this.music.pause();
            this.death.play();
            this.chef.lives = 3;
            this.dead = false;
            this.state.start('level3');
        }
        
        if(this.levelCompleted){
            this.music.pause();
            this.complete.play();
            this.chef.points = 0;
            this.levelCompleted = false;
            this.state.start('menu');
        }
        
    },
    collideBreadPlayer:function(_bread,_player){
        if(_bread.canBeHit)
        {
            _bread.position.y += 10;
            _bread.canBeHit = false;
        }
        
    },
    stopMoving:function(_ingredient){
        _ingredient.ingredientIsTouched = false;
        _ingredient.ingredientIsTouched = false;
        _ingredient.ingredientIsTouched = false;
        _ingredient.ingredientIsTouched = false;
        _ingredient.ingredientIsTouched = false;
        _ingredient.allTouched = false;
    },
    ingredientColisions:function(){
        this.game.physics.arcade.collide(this.downBread1.ingredient1, this.bandeja1, function(){this.downBread1.ingredientDone();}, null, this);
        this.game.physics.arcade.collide(this.downBread2.ingredient1, this.bandeja2, function(){this.downBread2.ingredientDone();}, null, this);
        this.game.physics.arcade.collide(this.downBread3.ingredient1, this.bandeja3, function(){this.downBread3.ingredientDone();}, null, this);
        this.game.physics.arcade.collide(this.downBread4.ingredient1, this.bandeja4, function(){this.downBread4.ingredientDone();}, null, this);
        this.game.physics.arcade.collide(this.downBread5.ingredient1, this.bandeja5, function(){this.downBread5.ingredientDone();}, null, this);
        this.game.physics.arcade.collide(this.downBread6.ingredient1, this.bandeja6, function(){this.downBread6.ingredientDone();}, null, this);
        

        //Columna 1
        this.game.physics.arcade.collide(this.upBread1.ingredient1,this.burger1.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger1.isDone == false)
            {
                var f = this.upBread1.updateTempPos(this.burger1.tempPos); 
                this.burger1.allTouched = true;
                if(this.upBread1.ingredient1.y == this.upBread1.tempPos){
                        this.upBread1.stopMoving();
                }
            }
            else
            {
                this.upBread1.stopMoving();
                this.upBread1.isDone = true;
            }
               },null, this);
        this.game.physics.arcade.collide(this.burger1.ingredient1,this.downBread1.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.downBread1.isDone == false)
            {
                var f = this.burger1.updateTempPos(this.downBread1.tempPos); 
                this.downBread1.allTouched = true;
                if(this.burger1.ingredient1.y == this.burger1.tempPos){
                    this.burger1.stopMoving();
                }
            }
            else
            {
                this.burger1.stopMoving();
                this.burger1.isDone = true;
            }
            
               },null, this);
        
        //Columna 2
        this.game.physics.arcade.collide(this.upBread2.ingredient1,this.burger2.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger2.isDone == false)
            {
                var f = this.upBread2.updateTempPos(this.burger2.tempPos); 
                this.burger2.allTouched = true;
                if(this.upBread2.ingredient1.y == this.upBread2.tempPos){
                        this.upBread2.stopMoving();
                }
            }
            else
            {
                this.upBread2.stopMoving();
                this.upBread2.isDone = true;
            }
               },null, this);
        this.game.physics.arcade.collide(this.burger2.ingredient1,this.downBread2.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.downBread2.isDone == false)
            {
                var f = this.burger2.updateTempPos(this.downBread2.tempPos); 
                this.downBread2.allTouched = true;
                if(this.burger2.ingredient1.y == this.burger2.tempPos){
                        this.burger2.stopMoving();
                }
            }
            else
            {
                this.burger2.stopMoving();
                this.burger2.isDone = true;
            }
               },null, this);
        
        //Columna 3
        this.game.physics.arcade.collide(this.upBread3.ingredient1,this.burger3.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger3.isDone == false)
            {
                var f = this.upBread3.updateTempPos(this.burger3.tempPos); 
                this.burger3.allTouched = true;
                if(this.upBread3.ingredient1.y == this.upBread3.tempPos){
                        this.upBread3.stopMoving();
                }
            }
            else
            {
                this.upBread3.stopMoving();
                this.upBread3.isDone = true;
            }
               },null, this);
        this.game.physics.arcade.collide(this.burger3.ingredient1,this.downBread3.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.downBread3.isDone == false)
            {
                var f = this.burger3.updateTempPos(this.downBread3.tempPos); 
                this.downBread3.allTouched = true;
                if(this.burger3.ingredient1.y == this.burger3.tempPos){
                        this.burger3.stopMoving();
                }
            }
            else
            {
                this.burger3.stopMoving();
                this.burger3.isDone = true;
            }
               },null, this);
        
        //Columna 4
        this.game.physics.arcade.collide(this.upBread4.ingredient1,this.burger4.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger4.isDone == false)
            {
                var f = this.upBread4.updateTempPos(this.burger4.tempPos); 
                this.burger4.allTouched = true;
                if(this.upBread4.ingredient1.y == this.upBread4.tempPos){
                        this.upBread4.stopMoving();
                }
            }
            else
            {
                this.upBread4.stopMoving();
                this.upBread4.isDone = true;
            }
               },null, this);
        this.game.physics.arcade.collide(this.burger4.ingredient1,this.downBread4.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.downBread4.isDone == false)
            {
                var f = this.burger4.updateTempPos(this.downBread4.tempPos); 
                this.downBread4.allTouched = true;
                if(this.burger4.ingredient1.y == this.burger4.tempPos){
                        this.burger4.stopMoving();
                }
            }
            else
            {
                this.burger4.stopMoving();
                this.burger4.isDone = true;
            }
               },null, this);
        
        //Columna 5
        this.game.physics.arcade.collide(this.upBread5.ingredient1,this.burger5.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger5.isDone == false)
            {
                var f = this.upBread5.updateTempPos(this.burger5.tempPos); 
                this.burger5.allTouched = true;
                if(this.upBread5.ingredient1.y == this.upBread5.tempPos){
                        this.upBread5.stopMoving();
                }
            }
            else
            {
                this.upBread5.stopMoving();
                this.upBread5.isDone = true;
            }
               },null, this);
        this.game.physics.arcade.collide(this.burger5.ingredient1,this.downBread5.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.downBread5.isDone == false)
            {
                var f = this.burger5.updateTempPos(this.downBread5.tempPos); 
                this.downBread5.allTouched = true;
                if(this.burger5.ingredient1.y == this.burger5.tempPos){
                        this.burger5.stopMoving();
                }
            }
            else
            {
                this.burger5.stopMoving();
                this.burger5.isDone = true;
            }
               },null, this);
        
        //Columna 6
        this.game.physics.arcade.collide(this.upBread6.ingredient1,this.burger6.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger6.isDone == false)
            {
                var f = this.upBread6.updateTempPos(this.burger6.tempPos); 
                this.burger6.allTouched = true;
                if(this.upBread6.ingredient1.y == this.upBread6.tempPos){
                        this.upBread6.stopMoving();
                }
            }
            else
            {
                this.upBread6.stopMoving();
                this.upBread6.isDone = true;
            }
               },null, this);
        this.game.physics.arcade.collide(this.burger6.ingredient1,this.downBread6.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.downBread6.isDone == false)
            {
                var f = this.burger6.updateTempPos(this.downBread6.tempPos); 
                this.downBread6.allTouched = true;
                if(this.burger6.ingredient1.y == this.burger6.tempPos){
                        this.burger6.stopMoving();
                }
            }
            else
            {
                this.burger6.stopMoving();
                this.burger6.isDone = true;
            }
               },null, this);
    },
    activatePowerUp:function(){
        this.powerUp = new burgertime.powerUp_prefab(this.game, 400, 400, this.chef);
        this.isPowerUp = true;
    },
    deactivatePowerUp:function(){
        this.powerUp.kill();
        this.isPowerUp = false;
    },
    addPointsPowerUp:function(){
        this.chef.points += this.powerUp.powerPoints;
        this.powerUp.destroy();
        this.isPowerUp = false;
    },
    platformTouch:function(){
        if(this.chef.body.touching.down){
            this.chef.y -= 5;   
        }
    },
    stairTouch:function(_chef,_stairs){
        _chef.body.allowGravity = false;
        this.map.setCollisionBetween(4,5,false,'Stairs');
    },
    activateStairs:function(){
        this.chef.body.allowGravity = true;
        this.map.setCollisionBetween(4,5,true,'Stairs');
    },
    render:function(){
        //this.powerUp.body.setSize(22, 28, 20, 16);
        //this.game.debug.body(this.powerUp);
        this.game.debug.body(this.chef);
    }
};
