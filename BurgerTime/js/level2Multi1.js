var burgertime = burgertime || {};

burgertime.level2 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.heroGravity;

        
        this.game.world.setBounds(0,0,gameOptions.level2Width,gameOptions.level2Height);
        this.game.renderer.renderSession.roundPixels = true;
        
        
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        
        this.load.image('Map', ruta+'SpritesheetMaps.png');    
        this.load.tilemap('level2','assets/levels/Level2.json',null,Phaser.Tilemap.TILED_JSON);
        
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
        
        
        this.map = this.game.add.tilemap('level2');
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
        
        this.upBread1 = new burgertime.ingredient_prefab(this.game,75, 0-5,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread2 = new burgertime.ingredient_prefab(this.game,315,0-5,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread3 = new burgertime.ingredient_prefab(this.game,555,0-5,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread4 = new burgertime.ingredient_prefab(this.game,800,0-5,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        
        this.lettuce1 = new burgertime.ingredient_prefab(this.game,75, 55-5,'Lettuce1','Lettuce2','Lettuce3', this.chef, this);
        this.lettuce2 = new burgertime.ingredient_prefab(this.game,315,180-5,'Lettuce1','Lettuce2','Lettuce3', this.chef, this);
        this.letuce3 = new burgertime.ingredient_prefab(this.game,555,420-5,'Lettuce1','Lettuce2','Lettuce3', this.chef, this);
        this.lettuce4 = new burgertime.ingredient_prefab(this.game,800,120-5,'Lettuce1','Lettuce2','Lettuce3', this.chef, this);
        
        this.burger1 = new burgertime.ingredient_prefab(this.game,75, 120-5,'Meat1','Meat2','Meat3', this.chef, this);
        this.burger2 = new burgertime.ingredient_prefab(this.game,315,55-5,'Meat1','Meat2','Meat3', this.chef, this);
        this.burger3 = new burgertime.ingredient_prefab(this.game,555,300-5,'Meat1','Meat2','Meat3', this.chef, this);
        this.burger4 = new burgertime.ingredient_prefab(this.game,800,180-5,'Meat1','Meat2','Meat3', this.chef, this);
        
        this.downBread1 = new burgertime.ingredient_prefab(this.game,75, 240-5,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread2 = new burgertime.ingredient_prefab(this.game,315,480-5,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread3 = new burgertime.ingredient_prefab(this.game,555,480-5,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread4 = new burgertime.ingredient_prefab(this.game,800,240-5,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
    },
    musicChange:function(){
        this.music.play();
    },
    update:function(){          
        
        if(this.chef.lives == 0)
        {
            var h = this.saveData();
            this.state.start('level2Multi2');
            //this.state.start('menu');
        }
        
        if(this.upBread1.isDone &&
           this.upBread2.isDone &&
           this.upBread3.isDone &&
           this.upBread4.isDone) {
            this.levelCompleted = true;
        }
        
        //this.game.physics.arcade.collide(this.chef,this.stairs,this.stairTouch, null, this);
        this.game.physics.arcade.collide(this.chef,this.floor,this.platformTouch, null, this);
        this.game.physics.arcade.collide(this.chef,this.floor,this.platformTouch, null, this);
        this.game.physics.arcade.collide(this.chef, this.collisionMap);
        
        
        if(this.game.physics.arcade.overlap(this.chef, this.stair1)  || 
           this.game.physics.arcade.overlap(this.chef, this.stair2)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair3)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair4)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair5)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair6)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair7)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair8)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair9)  ||
           this.game.physics.arcade.overlap(this.chef, this.stair10) ||
           this.game.physics.arcade.overlap(this.chef, this.stair11))
        {
              this.chef.body.allowGravity = false;
        }
        else
        {
              this.chef.body.allowGravity = true;
        }
        
        //this.game.physics.arcade.collide(this.chef, this.burgerColisions);
        this.game.physics.arcade.collide(this.chef,this.salchicha,this.killChef,null,this); this.game.physics.arcade.collide(this.chef,this.salchicha2,this.killChef,null,this); this.game.physics.arcade.collide(this.chef,this.salchicha3,this.killChef,null,this);
        
        this.score.text=this.chef.points;
        this.peppersText.text=this.chef.pepper;
        this.lifesText.text=this.chef.lives;

        var c = this.ingredientColisions();
        var e = this.ingredientFloorColisions();
        
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
        if(!this.chef.dead){
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
                        this.pepperThrow = new burgertime.pepper_prefab(this.game,this.chef.left,this.chef.y,this.chef.lastMove,'PimientaTirada');
                    }
                    else{
                        this.chef.pepper--; 
                        this.pepperThrow = new burgertime.pepper_prefab(this.game,this.chef.left,this.chef.y,this.chef.lastMove,'PimientaTirada');
                    }                 
                }
            }
        }
        //console.log(this.chef.lives);
        if(this.chef.dead && !this.chef.doOnce){                // Si Chef Muere, la condicion es cuando colisiona con enemigo
            this.chef.doOnce = true;
            this.music.pause();
            this.death.play();
            this.chef.lives -= 1;
            this.animacion = this.chef.animations.play('death',5,false,false);
            this.animacion.onComplete.add(function(){
                if(this.chef.lives <= 0){
                    this.dead = true;
                }
                else{
                    //this.chef.body.position.x = this.chef.initPosX;
                    //this.chef.body.position.y = this.chef.initPosY;
                    this.chef.frame = 3;
                    this.chef.body.enable = true;
                    this.chef.body.position.x = this.game.world.centerX+150;
                    this.chef.body.position.y = this.game.world.centerX+100;
                    var w = this.saveData();
                    if(gameOptions.firstTime == 2){
                        this.state.start('level1Multi2');
                    }
                    else{
                        this.state.start(gameOptions.levelPlayer2);
                    }
                    
                    this.chef.dead = false;
                    this.chef.doOnce = false;
                }
            },this);
        }
        
        if(this.dead){ 
            //  PLayer Gasta Vida
            //this.chef.lives = 3;
            this.dead = false;
            
        }
        
        if(this.levelCompleted){
            this.music.pause();
            this.complete.play();
            this.chef.points = 0;
            this.levelCompleted = false;
            var s = this.setScore(); //Guarda score para siguiente nivel
            //next level
            this.state.start('level2Multi1');
        }
        
        if(this.enemies != 3){
            this.spawnEnemy1();
            this.enemies++;
        }
        
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
    saveData:function(){
        var t = JSON.parse(localStorage.getItem('actualUser'));
        /*if(parseInt(this.scoreHI.text) < parseInt(this.score.text))
        {
            t.highScore = this.score.text;
            //console.log(t.highScore);
            localStorage.setItem('actualUser', JSON.stringify(t));
        
            localStorage.setItem('user' + t.username, JSON.stringify(t));
        }*/
        
        if(this.chef.lives <= 0){
            t.score1 = 0;
            t.lives1 = 3;
            t.pepper1 = 3;
        }else{
           t.score1 = this.chef.points; 
           t.lives1 = this.chef.lives;
           t.pepper1 = this.chef.pepper;
            t.level = 'level2Multi1';
            
            //Save upBread
           t.upBread11 = this.upBread1.ingredient1.body.position.y;
           t.upBread12 = this.upBread1.ingredient2.body.position.y;
           t.upBread13 = this.upBread1.ingredient3.body.position.y;
           t.upBread14 = this.upBread1.ingredient4.body.position.y;
           t.upBread15 = this.upBread1.ingredient5.body.position.y;
           t.upBread11isTouched = this.upBread1.ingredient1.ingredientIsTouched;
           t.upBread12isTouched = this.upBread1.ingredient2.ingredientIsTouched;
           t.upBread13isTouched = this.upBread1.ingredient3.ingredientIsTouched;
           t.upBread14isTouched = this.upBread1.ingredient4.ingredientIsTouched;
           t.upBread15isTouched = this.upBread1.ingredient5.ingredientIsTouched;
            
            t.upBread21 = this.upBread2.ingredient1.body.position.y;
           t.upBread22 = this.upBread2.ingredient2.body.position.y;
           t.upBread23 = this.upBread2.ingredient3.body.position.y;
           t.upBread24 = this.upBread2.ingredient4.body.position.y;
           t.upBread25 = this.upBread2.ingredient5.body.position.y;
           t.upBread21isTouched = this.upBread2.ingredient1.ingredientIsTouched;
           t.upBread22isTouched = this.upBread2.ingredient2.ingredientIsTouched;
           t.upBread23isTouched = this.upBread2.ingredient3.ingredientIsTouched;
           t.upBread24isTouched = this.upBread2.ingredient4.ingredientIsTouched;
           t.upBread25isTouched = this.upBread2.ingredient5.ingredientIsTouched;
            
            t.upBread31 = this.upBread3.ingredient1.body.position.y;
           t.upBread32 = this.upBread3.ingredient2.body.position.y;
           t.upBread33 = this.upBread3.ingredient3.body.position.y;
           t.upBread34 = this.upBread3.ingredient4.body.position.y;
           t.upBread35 = this.upBread3.ingredient5.body.position.y;
           t.upBread31isTouched = this.upBread3.ingredient1.ingredientIsTouched;
           t.upBread32isTouched = this.upBread3.ingredient2.ingredientIsTouched;
           t.upBread33isTouched = this.upBread3.ingredient3.ingredientIsTouched;
           t.upBread34isTouched = this.upBread3.ingredient4.ingredientIsTouched;
           t.upBread35isTouched = this.upBread3.ingredient5.ingredientIsTouched;
            
            t.upBread41 = this.upBread4.ingredient1.body.position.y;
           t.upBread42 = this.upBread4.ingredient2.body.position.y;
           t.upBread43 = this.upBread4.ingredient3.body.position.y;
           t.upBread44 = this.upBread4.ingredient4.body.position.y;
           t.upBread45 = this.upBread4.ingredient5.body.position.y;
           t.upBread41isTouched = this.upBread4.ingredient1.ingredientIsTouched;
           t.upBread42isTouched = this.upBread4.ingredient2.ingredientIsTouched;
           t.upBread43isTouched = this.upBread4.ingredient3.ingredientIsTouched;
           t.upBread44isTouched = this.upBread4.ingredient4.ingredientIsTouched;
           t.upBread45isTouched = this.upBread4.ingredient5.ingredientIsTouched;
            
            //Save lettuce
            t.lettuce11 = this.lettuce1.ingredient1.position.y;
            t.lettuce12 = this.lettuce1.ingredient2.position.y;
            t.lettuce13 = this.lettuce1.ingredient3.position.y;
            t.lettuce14 = this.lettuce1.ingredient4.position.y;
            t.lettuce15 = this.lettuce1.ingredient5.position.y;
            t.lettuce11isTouched = this.lettuce1.ingredient1.ingredientIsTouched;
            t.lettuce12isTouched = this.lettuce1.ingredient2.ingredientIsTouched;
            t.lettuce13isTouched = this.lettuce1.ingredient3.ingredientIsTouched;
            t.lettuce14isTouched = this.lettuce1.ingredient4.ingredientIsTouched;
            t.lettuce15isTouched = this.lettuce1.ingredient5.ingredientIsTouched;
            
            t.lettuce21 = this.lettuce2.ingredient1.position.y;
            t.lettuce22 = this.lettuce2.ingredient2.position.y;
            t.lettuce23 = this.lettuce2.ingredient3.position.y;
            t.lettuce24 = this.lettuce2.ingredient4.position.y;
            t.lettuce25 = this.lettuce2.ingredient5.position.y;
            t.lettuce21isTouched = this.lettuce2.ingredient1.ingredientIsTouched;
            t.lettuce22isTouched = this.lettuce2.ingredient2.ingredientIsTouched;
            t.lettuce23isTouched = this.lettuce2.ingredient3.ingredientIsTouched;
            t.lettuce24isTouched = this.lettuce2.ingredient4.ingredientIsTouched;
            t.lettuce25isTouched = this.lettuce2.ingredient5.ingredientIsTouched;
            
            t.lettuce31 = this.lettuce3.ingredient1.position.y;
            t.lettuce32 = this.lettuce3.ingredient2.position.y;
            t.lettuce33 = this.lettuce3.ingredient3.position.y;
            t.lettuce34 = this.lettuce3.ingredient4.position.y;
            t.lettuce35 = this.lettuce3.ingredient5.position.y;
            t.lettuce31isTouched = this.lettuce3.ingredient1.ingredientIsTouched;
            t.lettuce32isTouched = this.lettuce3.ingredient2.ingredientIsTouched;
            t.lettuce33isTouched = this.lettuce3.ingredient3.ingredientIsTouched;
            t.lettuce34isTouched = this.lettuce3.ingredient4.ingredientIsTouched;
            t.lettuce35isTouched = this.lettuce3.ingredient5.ingredientIsTouched;
            
            t.lettuce41 = this.lettuce4.ingredient1.position.y;
            t.lettuce42 = this.lettuce4.ingredient2.position.y;
            t.lettuce43 = this.lettuce4.ingredient3.position.y;
            t.lettuce44 = this.lettuce4.ingredient4.position.y;
            t.lettuce45 = this.lettuce4.ingredient5.position.y;
            t.lettuce41isTouched = this.lettuce4.ingredient1.ingredientIsTouched;
            t.lettuce42isTouched = this.lettuce4.ingredient2.ingredientIsTouched;
            t.lettuce43isTouched = this.lettuce4.ingredient3.ingredientIsTouched;
            t.lettuce44isTouched = this.lettuce4.ingredient4.ingredientIsTouched;
            t.lettuce45isTouched = this.lettuce4.ingredient5.ingredientIsTouched;
            
            //Save burger
            t.burger11 = this.burger1.ingredient1.position.y;
            t.burger12 = this.burger1.ingredient2.position.y;
            t.burger13 = this.burger1.ingredient3.position.y;
            t.burger14 = this.burger1.ingredient4.position.y;
            t.burger15 = this.burger1.ingredient5.position.y;
            t.burger11isTouched = this.burger1.ingredient1.ingredientIsTouched;
            t.burger12isTouched = this.burger1.ingredient2.ingredientIsTouched;
            t.burger13isTouched = this.burger1.ingredient3.ingredientIsTouched;
            t.burger14isTouched = this.burger1.ingredient4.ingredientIsTouched;
            t.burger15isTouched = this.burger1.ingredient5.ingredientIsTouched;
            
            t.burger21 = this.burger2.ingredient1.position.y;
            t.burger22 = this.burger2.ingredient2.position.y;
            t.burger23 = this.burger2.ingredient3.position.y;
            t.burger24 = this.burger2.ingredient4.position.y;
            t.burger25 = this.burger2.ingredient5.position.y;
            t.burger21isTouched = this.burger2.ingredient1.ingredientIsTouched;
            t.burger22isTouched = this.burger2.ingredient2.ingredientIsTouched;
            t.burger23isTouched = this.burger2.ingredient3.ingredientIsTouched;
            t.burger24isTouched = this.burger2.ingredient4.ingredientIsTouched;
            t.burger25isTouched = this.burger2.ingredient5.ingredientIsTouched;
            
            t.burger31 = this.burger3.ingredient1.position.y;
            t.burger32 = this.burger3.ingredient2.position.y;
            t.burger33 = this.burger3.ingredient3.position.y;
            t.burger34 = this.burger3.ingredient4.position.y;
            t.burger35 = this.burger3.ingredient5.position.y;
            t.burger31isTouched = this.burger3.ingredient1.ingredientIsTouched;
            t.burger32isTouched = this.burger3.ingredient2.ingredientIsTouched;
            t.burger33isTouched = this.burger3.ingredient3.ingredientIsTouched;
            t.burger34isTouched = this.burger3.ingredient4.ingredientIsTouched;
            t.burger35isTouched = this.burger3.ingredient5.ingredientIsTouched;
            
            t.burger41 = this.burger4.ingredient1.position.y;
            t.burger42 = this.burger4.ingredient2.position.y;
            t.burger43 = this.burger4.ingredient3.position.y;
            t.burger44 = this.burger4.ingredient4.position.y;
            t.burger45 = this.burger4.ingredient5.position.y;
            t.burger41isTouched = this.burger4.ingredient1.ingredientIsTouched;
            t.burger42isTouched = this.burger4.ingredient2.ingredientIsTouched;
            t.burger43isTouched = this.burger4.ingredient3.ingredientIsTouched;
            t.burger44isTouched = this.burger4.ingredient4.ingredientIsTouched;
            t.burger45isTouched = this.burger4.ingredient5.ingredientIsTouched;
            
            //Save downBread
            t.downBread11 = this.downBread1.ingredient1.position.y;
            t.downBread12 = this.downBread1.ingredient2.position.y;
            t.downBread13 = this.downBread1.ingredient3.position.y;
            t.downBread14 = this.downBread1.ingredient4.position.y;
            t.downBread15 = this.downBread1.ingredient5.position.y;
            t.downBread11isTouched = this.downBread1.ingredient1.ingredientIsTouched;
            t.downBread12isTouched = this.downBread1.ingredient2.ingredientIsTouched;
            t.downBread13isTouched = this.downBread1.ingredient3.ingredientIsTouched;
            t.downBread14isTouched = this.downBread1.ingredient4.ingredientIsTouched;
            t.downBread15isTouched = this.downBread1.ingredient5.ingredientIsTouched;
            
            t.downBread21 = this.downBread2.ingredient1.position.y;
            t.downBread22 = this.downBread2.ingredient2.position.y;
            t.downBread23 = this.downBread2.ingredient3.position.y;
            t.downBread24 = this.downBread2.ingredient4.position.y;
            t.downBread25 = this.downBread2.ingredient5.position.y;
            t.downBread21isTouched = this.downBread2.ingredient1.ingredientIsTouched;
            t.downBread22isTouched = this.downBread2.ingredient2.ingredientIsTouched;
            t.downBread23isTouched = this.downBread2.ingredient3.ingredientIsTouched;
            t.downBread24isTouched = this.downBread2.ingredient4.ingredientIsTouched;
            t.downBread25isTouched = this.downBread2.ingredient5.ingredientIsTouched;
            
            t.downBread31 = this.downBread3.ingredient1.position.y;
            t.downBread32 = this.downBread3.ingredient2.position.y;
            t.downBread33 = this.downBread3.ingredient3.position.y;
            t.downBread34 = this.downBread3.ingredient4.position.y;
            t.downBread35 = this.downBread3.ingredient5.position.y;
            t.downBread31isTouched = this.downBread3.ingredient1.ingredientIsTouched;
            t.downBread32isTouched = this.downBread3.ingredient2.ingredientIsTouched;
            t.downBread33isTouched = this.downBread3.ingredient3.ingredientIsTouched;
            t.downBread34isTouched = this.downBread3.ingredient4.ingredientIsTouched;
            t.downBread35isTouched = this.downBread3.ingredient5.ingredientIsTouched;
            
            t.downBread41 = this.downBread4.ingredient1.position.y;
            t.downBread42 = this.downBread4.ingredient2.position.y;
            t.downBread43 = this.downBread4.ingredient3.position.y;
            t.downBread44 = this.downBread4.ingredient4.position.y;
            t.downBread45 = this.downBread4.ingredient5.position.y;
            t.downBread41isTouched = this.downBread4.ingredient1.ingredientIsTouched;
            t.downBread42isTouched = this.downBread4.ingredient2.ingredientIsTouched;
            t.downBread43isTouched = this.downBread4.ingredient3.ingredientIsTouched;
            t.downBread44isTouched = this.downBread4.ingredient4.ingredientIsTouched;
            t.downBread45isTouched = this.downBread4.ingredient5.ingredientIsTouched;
        }
        localStorage.setItem('actualUser', JSON.stringify(t));
        
        localStorage.setItem('user' + t.username, JSON.stringify(t));
        
    },
    loadData:function(){
        var t = JSON.parse(localStorage.getItem('actualUser'));
        console.log(t.highScore);
        if(gameOptions.firstTime == 1){
            this.chef.points = 0;
            this.chef.lives = 3;
            this.chef.pepper = 3;
            gameOptions.levelPlayer1 = 'level1Multi1';
            gameOptions.firstTime++;
        }else{
           //this.scoreHI.text = t.highScore;
            this.chef.points = t.score1;
            this.chef.lives = t.lives1; 
            this.chef.pepper = t.pepper1;
            gameOptions.levelPlayer1 = t.level;
            
            //Load upBread
            this.upBread1.ingredient1.position.y = t.upBread11;
            this.upBread1.ingredient2.position.y = t.upBread12;
            this.upBread1.ingredient3.position.y = t.upBread13;
            this.upBread1.ingredient4.position.y = t.upBread14;
            this.upBread1.ingredient5.position.y = t.upBread15;
            this.upBread1.ingredient1.ingredientIsTouched = t.upBread11isTouched;
            this.upBread1.ingredient2.ingredientIsTouched = t.upBread12isTouched;
            this.upBread1.ingredient3.ingredientIsTouched = t.upBread13isTouched;
            this.upBread1.ingredient4.ingredientIsTouched = t.upBread14isTouched;
            this.upBread1.ingredient5.ingredientIsTouched = t.upBread15isTouched;
            
            this.upBread2.ingredient1.position.y = t.upBread21;
            this.upBread2.ingredient2.position.y = t.upBread22;
            this.upBread2.ingredient3.position.y = t.upBread23;
            this.upBread2.ingredient4.position.y = t.upBread24;
            this.upBread2.ingredient5.position.y = t.upBread25;
            this.upBread2.ingredient1.ingredientIsTouched = t.upBread21isTouched;
            this.upBread2.ingredient2.ingredientIsTouched = t.upBread22isTouched;
            this.upBread2.ingredient3.ingredientIsTouched = t.upBread23isTouched;
            this.upBread2.ingredient4.ingredientIsTouched = t.upBread24isTouched;
            this.upBread2.ingredient5.ingredientIsTouched = t.upBread25isTouched;
            
            this.upBread3.ingredient1.position.y = t.upBread31;
            this.upBread3.ingredient2.position.y = t.upBread32;
            this.upBread3.ingredient3.position.y = t.upBread33;
            this.upBread3.ingredient4.position.y = t.upBread34;
            this.upBread3.ingredient5.position.y = t.upBread35;
            this.upBread3.ingredient1.ingredientIsTouched = t.upBread31isTouched;
            this.upBread3.ingredient2.ingredientIsTouched = t.upBread32isTouched;
            this.upBread3.ingredient3.ingredientIsTouched = t.upBread33isTouched;
            this.upBread3.ingredient4.ingredientIsTouched = t.upBread34isTouched;
            this.upBread3.ingredient5.ingredientIsTouched = t.upBread35isTouched;
            
            this.upBread4.ingredient1.position.y = t.upBread41;
            this.upBread4.ingredient2.position.y = t.upBread42;
            this.upBread4.ingredient3.position.y = t.upBread43;
            this.upBread4.ingredient4.position.y = t.upBread44;
            this.upBread4.ingredient5.position.y = t.upBread45;
            this.upBread4.ingredient1.ingredientIsTouched = t.upBread41isTouched;
            this.upBread4.ingredient2.ingredientIsTouched = t.upBread42isTouched;
            this.upBread4.ingredient3.ingredientIsTouched = t.upBread43isTouched;
            this.upBread4.ingredient4.ingredientIsTouched = t.upBread44isTouched;
            this.upBread4.ingredient5.ingredientIsTouched = t.upBread45isTouched;
            
            //Load lettuce
            this.lettuce1.ingredient1.position.y = t.lettuce11;
            this.lettuce1.ingredient2.position.y = t.lettuce12;
            this.lettuce1.ingredient3.position.y = t.lettuce13;
            this.lettuce1.ingredient4.position.y = t.lettuce14;
            this.lettuce1.ingredient5.position.y = t.lettuce15;
            this.lettuce1.ingredient1.ingredientIsTouched = t.lettuce11isTouched;
            this.lettuce1.ingredient2.ingredientIsTouched = t.lettuce12isTouched;
            this.lettuce1.ingredient3.ingredientIsTouched = t.lettuce13isTouched;
            this.lettuce1.ingredient4.ingredientIsTouched = t.lettuce14isTouched;
            this.lettuce1.ingredient5.ingredientIsTouched = t.lettuce15isTouched;
            
            this.lettuce2.ingredient1.position.y = t.lettuce21;
            this.lettuce2.ingredient2.position.y = t.lettuce22;
            this.lettuce2.ingredient3.position.y = t.lettuce23;
            this.lettuce2.ingredient4.position.y = t.lettuce24;
            this.lettuce2.ingredient5.position.y = t.lettuce25;
            this.lettuce2.ingredient1.ingredientIsTouched = t.lettuce21isTouched;
            this.lettuce2.ingredient2.ingredientIsTouched = t.lettuce22isTouched;
            this.lettuce2.ingredient3.ingredientIsTouched = t.lettuce23isTouched;
            this.lettuce2.ingredient4.ingredientIsTouched = t.lettuce24isTouched;
            this.lettuce2.ingredient5.ingredientIsTouched = t.lettuce25isTouched;
            
            this.lettuce3.ingredient1.position.y = t.lettuce31;
            this.lettuce3.ingredient2.position.y = t.lettuce32;
            this.lettuce3.ingredient3.position.y = t.lettuce33;
            this.lettuce3.ingredient4.position.y = t.lettuce34;
            this.lettuce3.ingredient5.position.y = t.lettuce35;
            this.lettuce3.ingredient1.ingredientIsTouched = t.lettuce31isTouched;
            this.lettuce3.ingredient2.ingredientIsTouched = t.lettuce32isTouched;
            this.lettuce3.ingredient3.ingredientIsTouched = t.lettuce33isTouched;
            this.lettuce3.ingredient4.ingredientIsTouched = t.lettuce34isTouched;
            this.lettuce3.ingredient5.ingredientIsTouched = t.lettuce35isTouched;
            
            this.lettuce4.ingredient1.position.y = t.lettuce41;
            this.lettuce4.ingredient2.position.y = t.lettuce42;
            this.lettuce4.ingredient3.position.y = t.lettuce43;
            this.lettuce4.ingredient4.position.y = t.lettuce44;
            this.lettuce4.ingredient5.position.y = t.lettuce45;
            this.lettuce4.ingredient1.ingredientIsTouched = t.lettuce41isTouched;
            this.lettuce4.ingredient2.ingredientIsTouched = t.lettuce42isTouched;
            this.lettuce4.ingredient3.ingredientIsTouched = t.lettuce43isTouched;
            this.lettuce4.ingredient4.ingredientIsTouched = t.lettuce44isTouched;
            this.lettuce4.ingredient5.ingredientIsTouched = t.lettuce45isTouched;
            
            //Load burger
            this.burger1.ingredient1.position.y = t.burger11;
            this.burger1.ingredient2.position.y = t.burger12;
            this.burger1.ingredient3.position.y = t.burger13;
            this.burger1.ingredient4.position.y = t.burger14;
            this.burger1.ingredient5.position.y = t.burger15;
            this.burger1.ingredient1.ingredientIsTouched = t.burger11isTouched;
            this.burger1.ingredient2.ingredientIsTouched = t.burger12isTouched;
            this.burger1.ingredient3.ingredientIsTouched = t.burger13isTouched;
            this.burger1.ingredient4.ingredientIsTouched = t.burger14isTouched;
            this.burger1.ingredient5.ingredientIsTouched = t.burger15isTouched;
            
            this.burger2.ingredient1.position.y = t.burger21;
            this.burger2.ingredient2.position.y = t.burger22;
            this.burger2.ingredient3.position.y = t.burger23;
            this.burger2.ingredient4.position.y = t.burger24;
            this.burger2.ingredient5.position.y = t.burger25;
            this.burger2.ingredient1.ingredientIsTouched = t.burger21isTouched;
            this.burger2.ingredient2.ingredientIsTouched = t.burger22isTouched;
            this.burger2.ingredient3.ingredientIsTouched = t.burger23isTouched;
            this.burger2.ingredient4.ingredientIsTouched = t.burger24isTouched;
            this.burger2.ingredient5.ingredientIsTouched = t.burger25isTouched;
            
            this.burger3.ingredient1.position.y = t.burger31;
            this.burger3.ingredient2.position.y = t.burger32;
            this.burger3.ingredient3.position.y = t.burger33;
            this.burger3.ingredient4.position.y = t.burger34;
            this.burger3.ingredient5.position.y = t.burger35;
            this.burger3.ingredient1.ingredientIsTouched = t.burger31isTouched;
            this.burger3.ingredient2.ingredientIsTouched = t.burger32isTouched;
            this.burger3.ingredient3.ingredientIsTouched = t.burger33isTouched;
            this.burger3.ingredient4.ingredientIsTouched = t.burger34isTouched;
            this.burger3.ingredient5.ingredientIsTouched = t.burger35isTouched;
            
            this.burger4.ingredient1.position.y = t.burger41;
            this.burger4.ingredient2.position.y = t.burger42;
            this.burger4.ingredient3.position.y = t.burger43;
            this.burger4.ingredient4.position.y = t.burger44;
            this.burger4.ingredient5.position.y = t.burger45;
            this.burger4.ingredient1.ingredientIsTouched = t.burger41isTouched;
            this.burger4.ingredient2.ingredientIsTouched = t.burger42isTouched;
            this.burger4.ingredient3.ingredientIsTouched = t.burger43isTouched;
            this.burger4.ingredient4.ingredientIsTouched = t.burger44isTouched;
            this.burger4.ingredient5.ingredientIsTouched = t.burger45isTouched;
            
            //Load downBread
            this.downBread1.ingredient1.position.y = t.downBread11;
            this.downBread1.ingredient2.position.y = t.downBread12;
            this.downBread1.ingredient3.position.y = t.downBread13;
            this.downBread1.ingredient4.position.y = t.downBread14;
            this.downBread1.ingredient5.position.y = t.downBread15;
            this.downBread1.ingredient1.ingredientIsTouched = t.downBread11isTouched;
            this.downBread1.ingredient2.ingredientIsTouched = t.downBread12isTouched;
            this.downBread1.ingredient3.ingredientIsTouched = t.downBread13isTouched;
            this.downBread1.ingredient4.ingredientIsTouched = t.downBread14isTouched;
            this.downBread1.ingredient5.ingredientIsTouched = t.downBread15isTouched;
            
            this.downBread2.ingredient1.position.y = t.downBread21;
            this.downBread2.ingredient2.position.y = t.downBread22;
            this.downBread2.ingredient3.position.y = t.downBread23;
            this.downBread2.ingredient4.position.y = t.downBread24;
            this.downBread2.ingredient5.position.y = t.downBread25;
            this.downBread2.ingredient1.ingredientIsTouched = t.downBread21isTouched;
            this.downBread2.ingredient2.ingredientIsTouched = t.downBread22isTouched;
            this.downBread2.ingredient3.ingredientIsTouched = t.downBread23isTouched;
            this.downBread2.ingredient4.ingredientIsTouched = t.downBread24isTouched;
            this.downBread2.ingredient5.ingredientIsTouched = t.downBread25isTouched;
            
            this.downBread3.ingredient1.position.y = t.downBread31;
            this.downBread3.ingredient2.position.y = t.downBread32;
            this.downBread3.ingredient3.position.y = t.downBread33;
            this.downBread3.ingredient4.position.y = t.downBread34;
            this.downBread3.ingredient5.position.y = t.downBread35;
            this.downBread3.ingredient1.ingredientIsTouched = t.downBread31isTouched;
            this.downBread3.ingredient2.ingredientIsTouched = t.downBread32isTouched;
            this.downBread3.ingredient3.ingredientIsTouched = t.downBread33isTouched;
            this.downBread3.ingredient4.ingredientIsTouched = t.downBread34isTouched;
            this.downBread3.ingredient5.ingredientIsTouched = t.downBread35isTouched;
            
            this.downBread4.ingredient1.position.y = t.downBread41;
            this.downBread4.ingredient2.position.y = t.downBread42;
            this.downBread4.ingredient3.position.y = t.downBread43;
            this.downBread4.ingredient4.position.y = t.downBread44;
            this.downBread4.ingredient5.position.y = t.downBread45;
            this.downBread4.ingredient1.ingredientIsTouched = t.downBread41isTouched;
            this.downBread4.ingredient2.ingredientIsTouched = t.downBread42isTouched;
            this.downBread4.ingredient3.ingredientIsTouched = t.downBread43isTouched;
            this.downBread4.ingredient4.ingredientIsTouched = t.downBread44isTouched;
            this.downBread4.ingredient5.ingredientIsTouched = t.downBread45isTouched;
        }
    },
    lessLive:function(){
        this.chef.lives--;
    },
    render:function(){
        //this.powerUp.body.setSize(22, 28, 20, 16);
        //this.game.debug.body(this.powerUp);
        this.game.debug.body(this.chef);
    }
};
