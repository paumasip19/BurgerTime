var burgertime = burgertime || {};

burgertime.level1 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.scale.setGameSize(gameOptions.level1Width,gameOptions.level1Height);
        
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.heroGravity;

        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
        this.game.renderer.renderSession.roundPixels = true;
        
        
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        
        this.load.image('Map', ruta+'SpritesheetMaps.png'); 
        this.load.tilemap('level1','assets/levels/Level1.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.spritesheet('chef', ruta+'ChefRamsay.png', 12, 25);
        this.load.spritesheet('salchicha', ruta+'Salchicha.png',14, 25);
        this.load.image('PimientaTirada', ruta+'PimientaTirada.png',13, 25);
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
        
        this.loadPeppers();
        
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('Map');
        
        this.collisionMap = this.map.createLayer('Collisions');
        this.map.setCollisionBetween(6,6,true,'Collisions');
        
        this.floor = this.map.createLayer('Floor');
        this.map.setCollisionBetween(3,3,true,'Floor');
        
        this.stairs = this.map.createLayer('Stairs');
        this.map.setCollisionBetween(4,5,true,'Stairs');
        
        this.background = this.map.createLayer('Background');
        //this.map.setCollisionBetween(6,6,true,'Background');*/        
        
        
        this.chef = new burgertime.chef_prefab(this.game,this.game.world.centerX+150,this.game.world.centerY + 100,gameOptions.heroSpeed,gameOptions.heroSpeed,this);
        this.chef.frame = 7;
        
        this.salchicha = new burgertime.enemy_prefab(this.game,this.game.world.centerX,this.game.world.centerY,gameOptions.heroSpeed-50,gameOptions.heroSpeed-50,this);
        this.salchicha.body.allowGravity = false;
        
        this.isPowerUp = false;
        this.dead = false;
        this.startLevel = true;
        this.levelCompleted = false;
        
        this.changeMusic = this.game.time.events.add(Phaser.Timer.SECOND*3,this.musicChange,this);
        
        this.collideStairs = this.game.time.events.add(Phaser.Timer.SECOND*2,this.activateStairs,this);
        
        this.timeElapsedActivate = 0;
        this.timeElapsedDeactivate = 0;
        
        this.timerStairs = this.game.time.events.loop(Phaser.Timer.SECOND,this.activateStairs,this);
        
        this.upBread1 = new burgertime.ingredient_prefab(this.game,75+60, 120+145,'BreadUp1','BreadUp2','BreadUp3', this.chef);
        this.upBread2 = new burgertime.ingredient_prefab(this.game,315+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef);
        this.upBread3 = new burgertime.ingredient_prefab(this.game,555+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef);
        this.upBread4 = new burgertime.ingredient_prefab(this.game,800+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef);
        
        this.lettuce1 = new burgertime.ingredient_prefab(this.game,75+60, 240+145,'Lettuce1','Lettuce2','Lettuce3', this.chef);
        this.lettuce2 = new burgertime.ingredient_prefab(this.game,315+60,300+145,'Lettuce1','Lettuce2','Lettuce3', this.chef);
        this.lettuce3 = new burgertime.ingredient_prefab(this.game,555+60,120+145,'Lettuce1','Lettuce2','Lettuce3', this.chef);
        this.lettuce4 = new burgertime.ingredient_prefab(this.game,800+60,120+145,'Lettuce1','Lettuce2','Lettuce3', this.chef);
        
        this.burger1 = new burgertime.ingredient_prefab(this.game,75+60, 420+145,'Meat1','Meat2','Meat3', this.chef);
        this.burger2 = new burgertime.ingredient_prefab(this.game,315+60,420+145,'Meat1','Meat2','Meat3', this.chef);
        this.burger3 = new burgertime.ingredient_prefab(this.game,555+60,300+145,'Meat1','Meat2','Meat3', this.chef);
        this.burger4 = new burgertime.ingredient_prefab(this.game,800+60,240+145,'Meat1','Meat2','Meat3', this.chef);
        
        this.downBread1 = new burgertime.ingredient_prefab(this.game,75+60, 540+145,'BreadDown1','BreadDown2','BreadDown3', this.chef);
        this.downBread2 = new burgertime.ingredient_prefab(this.game,315+60,540+145,'BreadDown1','BreadDown2','BreadDown3', this.chef);
        this.downBread3 = new burgertime.ingredient_prefab(this.game,555+60,540+145,'BreadDown1','BreadDown2','BreadDown3', this.chef);
        this.downBread4 = new burgertime.ingredient_prefab(this.game,800+60,360+145,'BreadDown1','BreadDown2','BreadDown3', this.chef);
    },
    musicChange:function(){
        this.music.play();
    },
    loadPeppers:function(){
        this.peppers = this.add.group();
        this.peppers.enableBody = true;
    },
    update:function(){          
        
        this.game.physics.arcade.collide(this.chef,this.stairs,this.stairTouch, null, this);
        this.game.physics.arcade.collide(this.chef,this.floor,this.platformTouch, null, this);
        this.game.physics.arcade.collide(this.chef, this.collisionMap);

        //Columna 1
        this.game.physics.arcade.collide(this.upBread1.ingredient1,this.lettuce1.ingredient1, function(){
            var f = this.upBread1.updateTempPos(this.lettuce1.ingredient1.y); 
            this.lettuce1.allTouched = true;
            if(this.upBread1.ingredient1.y == this.upBread1.tempPos){
                    this.upBread1.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.lettuce1.ingredient1,this.burger1.ingredient1, function(){
            var f = this.lettuce1.updateTempPos(this.burger1.ingredient1.y); 
            this.burger1.allTouched = true;
            if(this.lettuce1.ingredient1.y == this.lettuce1.tempPos){
                    this.lettuce1.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.burger1.ingredient1,this.downBread1.ingredient1, function(){
            var f = this.burger1.updateTempPos(this.downBread1.ingredient1.y); 
            this.downBread1.allTouched = true;
            if(this.burger1.ingredient1.y == this.burger1.tempPos){
                    this.burger1.stopMoving();
               }},null, this);
        
        //Columna 2
        this.game.physics.arcade.collide(this.upBread2.ingredient1,this.lettuce2.ingredient1, function(){
            var f = this.upBread2.updateTempPos(this.lettuce2.ingredient1.y); 
            this.lettuce2.allTouched = true;
            if(this.upBread2.ingredient1.y == this.upBread2.tempPos){
                    this.upBread2.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.lettuce2.ingredient1,this.burger2.ingredient1, function(){
            var f = this.lettuce2.updateTempPos(this.burger2.ingredient1.y); 
            this.burger2.allTouched = true;
            if(this.lettuce2.ingredient1.y == this.lettuce2.tempPos){
                    this.lettuce2.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.burger2.ingredient1,this.downBread2.ingredient1, function(){
            var f = this.burger2.updateTempPos(this.downBread2.ingredient1.y); 
            this.downBread2.allTouched = true;
            if(this.burger2.ingredient1.y == this.burger2.tempPos){
                    this.burger2.stopMoving();
               }},null, this);
        
        //Columna 3
        this.game.physics.arcade.collide(this.upBread3.ingredient1,this.lettuce3.ingredient1, function(){
            var f = this.upBread3.updateTempPos(this.lettuce3.ingredient1.y); 
            this.lettuce3.allTouched = true;
            if(this.upBread3.ingredient1.y == this.upBread3.tempPos){
                    this.upBread3.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.lettuce3.ingredient1,this.burger3.ingredient1, function(){
            var f = this.lettuce3.updateTempPos(this.burger3.ingredient1.y); 
            this.burger3.allTouched = true;
            if(this.lettuce3.ingredient1.y == this.lettuce3.tempPos){
                    this.lettuce3.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.burger3.ingredient1,this.downBread3.ingredient1, function(){
            var f = this.burger3.updateTempPos(this.downBread3.ingredient1.y); 
            this.downBread3.allTouched = true;
            if(this.burger3.ingredient1.y == this.burger3.tempPos){
                    this.burger3.stopMoving();
               }},null, this);
        
        //Columna 4
        this.game.physics.arcade.collide(this.upBread4.ingredient1,this.lettuce4.ingredient1, function(){
            var f = this.upBread4.updateTempPos(this.lettuce4.ingredient1.y); 
            this.lettuce4.allTouched = true;
            if(this.upBread4.ingredient1.y == this.upBread4.tempPos){
                    this.upBread4.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.lettuce4.ingredient1,this.burger4.ingredient1, function(){
            var f = this.lettuce4.updateTempPos(this.burger4.ingredient1.y); 
            this.burger4.allTouched = true;
            if(this.lettuce4.ingredient1.y == this.lettuce4.tempPos){
                    this.lettuce4.stopMoving();
               }},null, this);
        this.game.physics.arcade.collide(this.burger4.ingredient1,this.downBread4.ingredient1, function(){
            var f = this.burger4.updateTempPos(this.downBread4.ingredient1.y); 
            this.downBread4.allTouched = true;
            if(this.burger4.ingredient1.y == this.burger4.tempPos){
                    this.burger4.stopMoving();
               }},null, this);
        
     //Power Up
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
                if(this.game.physics.arcade.overlap(this.chef,this.powerUp,this.addPointsPowerUp,null,this)) 
                {
                    this.bonusEarned.play();
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
            this.chef.scale.x = 2.5;
            this.chef.lastMove = 'L';
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
                    this.chef.pepper--; 
                    this.pepperThrow = new burgertime.pepper_prefab(this.game,this.chef.x,this.chef.top,this.chef.lastMove,'PimientaTirada');
                }
                else if(this.chef.lastMove == 'D') { 
                    this.animacionB = this.chef.animations.play('pepperDown',5,false,false);
                    this.animacionB.onComplete.add(function(){this.chef.canMove = true;},this);
                    this.chef.pepper--; 
                    this.pepperThrow = new burgertime.pepper_prefab(this.game,this.chef.x,this.chef.bottom,this.chef.lastMove,'PimientaTirada');
                    
                    
                }
                else {
                    this.animacionC = this.chef.animations.play('pepperSide',5,false,false);
                    this.animacionC.onComplete.add(function(){this.chef.canMove = true;},this);
                    
                    if(this.chef.lastMove == 'R') {
                        this.chef.pepper--; 
                        this.pepperThrow = new burgertime.pepper_prefab(this.game,this.chef.right,this.chef.y,this.chef.lastMove,'PimientaTirada');
                    }
                    else{
                        this.chef.pepper--; 
                        this.pepperThrow = new burgertime.pepper_prefab(this.game,this.chef.left,this.chef.y,this.chef.lastMove,'PimientaTirada');
                    }                 
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
            this.state.start('level1');
        }
        
        if(this.levelCompleted){
            this.music.pause();
            this.complete.play();
            this.chef.points = 0;
            this.levelCompleted = false;
            //next level
        }
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
        this.bonusPause.play();
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
        this.game.debug.body(this.salchicha);
        //this.game.debug.body(this.upBread1.ingredient1);
        //this.game.debug.body(this.lettuce1.ingredient1);
    }
};










