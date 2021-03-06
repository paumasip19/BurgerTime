var burgertime = burgertime || {};

burgertime.level1Multi2 ={
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
        this.load.image('PimientaIcon', ruta+'PeppersIcon.png',13, 25);
        this.load.image('VidasIcon', ruta+'LifesIcon.png',13, 25);
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
        
        this.load.image('TileBlanca', ruta+"Imagen127.png");
        this.load.image('TileTransparente', ruta+"Imagen128.png");
        
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
        this.pButton = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        
        //Trial HighScore
        this.oneButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.oneButton.onDown.add(this.saveData, this);
        this.twoButton = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.twoButton.onDown.add(this.loadData, this);
        this.threeButton = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        this.threeButton.onDown.add(this.lessLive, this);
        
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
        
        this.enemies = 3;
        
        
        this.chef = new burgertime.chef_prefab(this.game,this.game.world.centerX+150,this.game.world.centerY + 100,gameOptions.heroSpeed,gameOptions.heroSpeed,this);
        this.chef.frame = 7;
        
        this.salchicha = new burgertime.enemy_prefab(this.game,this.game.world.centerX - 70,this.game.world.centerY,gameOptions.heroSpeed-50,gameOptions.heroSpeed-50,this);
        this.salchicha.body.allowGravity = false;
        
        this.isPowerUp = false;
        this.dead = false;
        this.startLevel = true;
        this.levelCompleted = false;
        
        this.peppersIcon = this.game.add.tileSprite(this.game.width/6*5-25,this.game.height/20,30,30, 'PimientaIcon');
        this.peppersIcon.anchor.setTo(1,0);
        this.peppersIcon.scale.setTo(1.5);

        this.lifesIcon = this.game.add.tileSprite(this.game.width*0.93,this.game.height/20,30,30, 'VidasIcon');
        this.lifesIcon.anchor.setTo(1,0);
        this.lifesIcon.scale.setTo(1.5);
        
        this.changeMusic = this.game.time.events.add(Phaser.Timer.SECOND*3,this.musicChange,this);
        
        this.collideStairs = this.game.time.events.add(Phaser.Timer.SECOND*2,this.activateStairs,this);
        
        this.timeElapsedActivate = 0;
        this.timeElapsedDeactivate = 0;
        
        this.timerStairs = this.game.time.events.loop(Phaser.Timer.SECOND,this.activateStairs,this);
        
        this.spawnSalchicha1 = this.game.time.events.add(Phaser.Timer.SECOND*2,this.spawnEnemy1,this);
        this.spawnSalchicha1 = this.game.time.events.add(Phaser.Timer.SECOND*3,this.spawnEnemy2,this);
        
        
        this.stair1 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*1,gameOptions.level1Height/35*5,gameOptions.level1Height/35*5,'TileTransparente');
        this.stair2 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*1,gameOptions.level1Height/35*13.5,gameOptions.level1Height/35*11,'TileTransparente');
        this.stair3 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*5,gameOptions.level1Height/35*5,gameOptions.level1Height/35*20,'TileTransparente');
        this.stair4 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*9,gameOptions.level1Height/35*5,gameOptions.level1Height/35*20,'TileTransparente');
        this.stair5 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*13,gameOptions.level1Height/35*5,gameOptions.level1Height/35*20,'TileTransparente');
        this.stair6 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*3,gameOptions.level1Height/35*9,gameOptions.level1Height/35*11,'TileTransparente');
        this.stair7 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*7,gameOptions.level1Height/35*5,gameOptions.level1Height/35*7,'TileTransparente');
        this.stair8 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*11,gameOptions.level1Height/35*9,gameOptions.level1Height/35*7,'TileTransparente');
        this.stair9 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*15,gameOptions.level1Height/35*13.5,gameOptions.level1Height/35*11.5,'TileTransparente');
        this.stair10 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*17,gameOptions.level1Height/35*5,gameOptions.level1Height/35*9,'TileTransparente');
        this.stair11 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*17,gameOptions.level1Height/35*17.5,gameOptions.level1Height/35*7.5,'TileTransparente');
        
        this.changeDir1 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*1+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*5,'TileBlanca');
        this.changeDir3 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*1+30,gameOptions.level1Height/35*12,gameOptions.level1Height/35*12,'TileBlanca');
        this.changeDir6 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*3+30,gameOptions.level1Height/35*8,gameOptions.level1Height/35*11,'TileBlanca');
        this.changeDir9 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*5+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*20,'TileBlanca');
        this.changeDir14 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*7+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*7,'TileBlanca');
        this.changeDir16 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*9+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*20,'TileBlanca');
        this.changeDir20 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*11+30,gameOptions.level1Height/35*8,gameOptions.level1Height/35*7,'TileBlanca');
        this.changeDir22 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*13+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*20,'TileBlanca');
        this.changeDir27 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*15+30,gameOptions.level1Height/35*12.5,gameOptions.level1Height/35*11.5,'TileBlanca');
        this.changeDir30 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*17+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*9,'TileBlanca');
        this.changeDir33 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*17+30,gameOptions.level1Height/35*16.5,gameOptions.level1Height/35*7.5,'TileBlanca');
        
        
        this.upBread1 = new burgertime.ingredient_prefab(this.game,75+60, 120+145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        this.upBread2 = new burgertime.ingredient_prefab(this.game,315+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        this.upBread3 = new burgertime.ingredient_prefab(this.game,555+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        this.upBread4 = new burgertime.ingredient_prefab(this.game,800+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        
        this.lettuce1 = new burgertime.ingredient_prefab(this.game,75+60, 240+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        this.lettuce2 = new burgertime.ingredient_prefab(this.game,315+60,300+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        this.lettuce3 = new burgertime.ingredient_prefab(this.game,555+60,120+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        this.lettuce4 = new burgertime.ingredient_prefab(this.game,800+60,120+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        
        this.burger1 = new burgertime.ingredient_prefab(this.game,75+60, 420+145,'Meat1','Meat2','Meat3', this.chef,this);
        this.burger2 = new burgertime.ingredient_prefab(this.game,315+60,420+145,'Meat1','Meat2','Meat3', this.chef,this);
        this.burger3 = new burgertime.ingredient_prefab(this.game,555+60,300+145,'Meat1','Meat2','Meat3', this.chef,this);
        this.burger4 = new burgertime.ingredient_prefab(this.game,800+60,240+145,'Meat1','Meat2','Meat3', this.chef,this);
        
        this.downBread1 = new burgertime.ingredient_prefab(this.game,75+60, 540+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        this.downBread2 = new burgertime.ingredient_prefab(this.game,315+60,540+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        this.downBread3 = new burgertime.ingredient_prefab(this.game,555+60,540+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        this.downBread4 = new burgertime.ingredient_prefab(this.game,800+60,360+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        
        this.bandeja1 = this.game.add.sprite(125,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja1);
        this.bandeja1.body.allowGravity = false;
        this.bandeja1.body.immovable = true;
        
        this.bandeja2 = this.game.add.sprite(365,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja2);
        this.bandeja2.body.allowGravity = false;
        this.bandeja2.body.immovable = true;
        
        this.bandeja3 = this.game.add.sprite(605,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja3);
        this.bandeja3.body.allowGravity = false;
        this.bandeja3.body.immovable = true;
        
        this.bandeja4 = this.game.add.sprite(845,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja4);
        this.bandeja4.body.allowGravity = false;
        this.bandeja4.body.immovable = true;
        
        this.score=this.game.add.text(this.game.width/3+25,this.game.height/20,'0');
        //this.score.puntos=100; 
        this.score.anchor.setTo(1,0);
        this.score.font = 'arcade';
        this.score.fill='#FFFFFF';
        this.score.fontSize=40;

        this.hiText=this.game.add.text(this.game.width/3+125,this.game.height/20,'HI');
        this.hiText.anchor.setTo(1,0);
        this.hiText.font = 'arcade';
        this.hiText.fill='#FFFFFF';
        this.hiText.fontSize=40;

        this.scoreHI=this.game.add.text(this.game.width/3*2+50,this.game.height/20,'0');
        this.scoreHI.anchor.setTo(1,0);
        this.scoreHI.font = 'arcade';
        this.scoreHI.fill='#FFFFFF';
        this.scoreHI.fontSize=40;

        this.peppersText=this.game.add.text(this.game.width/6*5,this.game.height/20,'0');
        this.peppersText.anchor.setTo(1,0);
        this.peppersText.font = 'arcade';
        this.peppersText.fill='#FFFFFF';
        this.peppersText.fontSize=40;

        this.lifesText=this.game.add.text(this.game.width-50,this.game.height/20,'0');
        this.lifesText.anchor.setTo(1,0);
        this.lifesText.font = 'arcade';
        this.lifesText.fill='#FFFFFF';
        this.lifesText.fontSize=40;
        
        this.player2Text = this.game.add.text(this.game.width/4 - 50, this.game.height/20,'PLAYER2');
        this.player2Text.anchor.setTo(1,0);
        this.player2Text.font = 'aracde';
        this.player2Text.fill = '#FFFFFF';
        this.player2Text.fontSize = 40;
        
        var h = this.loadData();
        
        
    },
    musicChange:function(){
        this.music.play();
    },
    loadPeppers:function(){
        this.peppers = this.add.group();
        this.peppers.enableBody = true;
    },
    update:function(){   
        
        if(this.chef.lives == 0)
        {
            var h = this.saveData();
            gameOptions.firstTime = 1;
            this.state.start('menu');
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
        console.log(gameOptions.levelPlayer1);
        console.log(gameOptions.levelPlayer2);
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
                    if(gameOptions.firstTime == 3){
                        this.state.start('level1Multi1');
                    }
                    else{
                        this.state.start(gameOptions.levelPlayer1);
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
            this.state.start('level2');
            
        }
        
        if(this.enemies != 3){
            this.spawnEnemy1();
            this.enemies++;
        }
    
    },
    spawnEnemy1:function(){
        this.salchicha2 = new burgertime.enemy_prefab(this.game,50,146,gameOptions.heroSpeed-50,gameOptions.heroSpeed-50,this);
        this.salchicha.body.allowGravity = false;
    },
    spawnEnemy2:function(){
        this.salchicha3 = new burgertime.enemy_prefab(this.game,gameOptions.level1Width-60,508,gameOptions.heroSpeed-50,gameOptions.heroSpeed-50,this);
        this.salchicha.body.allowGravity = false;
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
        

        //Columna 1
        this.game.physics.arcade.collide(this.upBread1.ingredient1,this.lettuce1.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.lettuce1.isDone == false)
            {
                var f = this.upBread1.updateTempPos(this.lettuce1.tempPos); 
                this.lettuce1.allTouched = true;
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
        this.game.physics.arcade.collide(this.lettuce1.ingredient1,this.burger1.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger1.isDone == false)
            {
                var f = this.lettuce1.updateTempPos(this.burger1.tempPos); 
                this.burger1.allTouched = true;
                if(this.lettuce1.ingredient1.y == this.lettuce1.tempPos){
                        this.lettuce1.stopMoving();
                }
            }
            else
            {
                this.lettuce1.stopMoving();
                this.lettuce1.isDone = true;
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
        this.game.physics.arcade.collide(this.upBread2.ingredient1,this.lettuce2.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.lettuce2.isDone == false)
            {
                var f = this.upBread2.updateTempPos(this.lettuce2.tempPos); 
                this.lettuce2.allTouched = true;
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
        this.game.physics.arcade.collide(this.lettuce2.ingredient1,this.burger2.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger2.isDone == false)
            {
                var f = this.lettuce2.updateTempPos(this.burger2.tempPos); 
                this.burger2.allTouched = true;
                if(this.lettuce2.ingredient1.y == this.lettuce2.tempPos){
                        this.lettuce2.stopMoving();
                }
            }
            else
            {
                this.lettuce2.stopMoving();
                this.lettuce2.isDone = true;
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
        this.game.physics.arcade.collide(this.upBread3.ingredient1,this.lettuce3.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.lettuce3.isDone == false)
            {
                var f = this.upBread3.updateTempPos(this.lettuce3.tempPos); 
                this.lettuce3.allTouched = true;
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
        this.game.physics.arcade.collide(this.lettuce3.ingredient1,this.burger3.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger3.isDone == false)
            {
                var f = this.lettuce3.updateTempPos(this.burger3.tempPos); 
                this.burger3.allTouched = true;
                if(this.lettuce3.ingredient1.y == this.lettuce3.tempPos){
                        this.lettuce3.stopMoving();
                }
            }
            else
            {
                this.lettuce3.stopMoving();
                this.lettuce3.isDone = true;
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
        this.game.physics.arcade.collide(this.upBread4.ingredient1,this.lettuce4.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.lettuce4.isDone == false)
            {
                var f = this.upBread4.updateTempPos(this.lettuce4.tempPos); 
                this.lettuce4.allTouched = true;
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
        this.game.physics.arcade.collide(this.lettuce4.ingredient1,this.burger4.ingredient1, function(){
            this.ingredientIngredient.play();
            if(this.burger4.isDone == false)
            {
                var f = this.lettuce4.updateTempPos(this.burger4.tempPos); 
                this.burger4.allTouched = true;
                if(this.lettuce4.ingredient1.y == this.lettuce4.tempPos){
                        this.lettuce4.stopMoving();
                }
            }
            else
            {
                this.lettuce4.stopMoving();
                this.lettuce4.isDone = true;
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
    },
    ingredientFloorColisions:function(){
        this.game.physics.arcade.collide(this.upBread1.ingredient1, this.burgerColisions, function(){this.upBread1.x += 1;}, null, this);
    },
    killChef:function(){
        //console.log('les go');
        this.chef.body.enable = false;
        this.chef.dead = true;
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
    saveData:function(){
        var t = JSON.parse(localStorage.getItem('actualUser'));
        /*if(parseInt(this.scoreHI.text) < parseInt(this.score.text))
        {
            t.highScore = this.score.text;
            //console.log(t.highScore);
            localStorage.setItem('actualUser2', JSON.stringify(t));
        
            localStorage.setItem('user2' + t.username, JSON.stringify(t));
        }*/
        
        if(this.chef.lives <= 0){
            t.score2 = 0;
        }else{
           t.score2 = this.chef.points; 
            t.lives2 = this.chef.lives;
            t.pepper2 = this.chef.pepper;
            t.level2 = 'level1Multi2';
            
             //Save upBread
           t.upBread112 = this.upBread1.ingredient1.body.position.y;
           t.upBread122 = this.upBread1.ingredient2.body.position.y;
           t.upBread132 = this.upBread1.ingredient3.body.position.y;
           t.upBread142 = this.upBread1.ingredient4.body.position.y;
           t.upBread152 = this.upBread1.ingredient5.body.position.y;
           t.upBread112isTouched = this.upBread1.ingredient1.ingredientIsTouched;
           t.upBread122isTouched = this.upBread1.ingredient2.ingredientIsTouched;
           t.upBread132isTouched = this.upBread1.ingredient3.ingredientIsTouched;
           t.upBread142isTouched = this.upBread1.ingredient4.ingredientIsTouched;
           t.upBread152isTouched = this.upBread1.ingredient5.ingredientIsTouched;
            
            t.upBread212 = this.upBread2.ingredient1.body.position.y;
           t.upBread222 = this.upBread2.ingredient2.body.position.y;
           t.upBread232 = this.upBread2.ingredient3.body.position.y;
           t.upBread242 = this.upBread2.ingredient4.body.position.y;
           t.upBread252 = this.upBread2.ingredient5.body.position.y;
           t.upBread212isTouched = this.upBread2.ingredient1.ingredientIsTouched;
           t.upBread222isTouched = this.upBread2.ingredient2.ingredientIsTouched;
           t.upBread232isTouched = this.upBread2.ingredient3.ingredientIsTouched;
           t.upBread242isTouched = this.upBread2.ingredient4.ingredientIsTouched;
           t.upBread252isTouched = this.upBread2.ingredient5.ingredientIsTouched;
            
            t.upBread312 = this.upBread3.ingredient1.body.position.y;
           t.upBread322 = this.upBread3.ingredient2.body.position.y;
           t.upBread332 = this.upBread3.ingredient3.body.position.y;
           t.upBread342 = this.upBread3.ingredient4.body.position.y;
           t.upBread352 = this.upBread3.ingredient5.body.position.y;
           t.upBread312isTouched = this.upBread3.ingredient1.ingredientIsTouched;
           t.upBread322isTouched = this.upBread3.ingredient2.ingredientIsTouched;
           t.upBread332isTouched = this.upBread3.ingredient3.ingredientIsTouched;
           t.upBread342isTouched = this.upBread3.ingredient4.ingredientIsTouched;
           t.upBread352isTouched = this.upBread3.ingredient5.ingredientIsTouched;
            
            t.upBread412 = this.upBread4.ingredient1.body.position.y;
           t.upBread422 = this.upBread4.ingredient2.body.position.y;
           t.upBread432 = this.upBread4.ingredient3.body.position.y;
           t.upBread442 = this.upBread4.ingredient4.body.position.y;
           t.upBread452 = this.upBread4.ingredient5.body.position.y;
           t.upBread412isTouched = this.upBread4.ingredient1.ingredientIsTouched;
           t.upBread422isTouched = this.upBread4.ingredient2.ingredientIsTouched;
           t.upBread432sTouched = this.upBread4.ingredient3.ingredientIsTouched;
           t.upBread442sTouched = this.upBread4.ingredient4.ingredientIsTouched;
           t.upBread452sTouched = this.upBread4.ingredient5.ingredientIsTouched;
            
            //Save lettuce
            t.lettuce112 = this.lettuce1.ingredient1.position.y;
            t.lettuce122 = this.lettuce1.ingredient2.position.y;
            t.lettuce132 = this.lettuce1.ingredient3.position.y;
            t.lettuce142 = this.lettuce1.ingredient4.position.y;
            t.lettuce152 = this.lettuce1.ingredient5.position.y;
            t.lettuce112isTouched = this.lettuce1.ingredient1.ingredientIsTouched;
            t.lettuce122isTouched = this.lettuce1.ingredient2.ingredientIsTouched;
            t.lettuce132isTouched = this.lettuce1.ingredient3.ingredientIsTouched;
            t.lettuce142isTouched = this.lettuce1.ingredient4.ingredientIsTouched;
            t.lettuce152isTouched = this.lettuce1.ingredient5.ingredientIsTouched;
            
            t.lettuce212 = this.lettuce2.ingredient1.position.y;
            t.lettuce222 = this.lettuce2.ingredient2.position.y;
            t.lettuce232 = this.lettuce2.ingredient3.position.y;
            t.lettuce242 = this.lettuce2.ingredient4.position.y;
            t.lettuce252 = this.lettuce2.ingredient5.position.y;
            t.lettuce212isTouched = this.lettuce2.ingredient1.ingredientIsTouched;
            t.lettuce222isTouched = this.lettuce2.ingredient2.ingredientIsTouched;
            t.lettuce232isTouched = this.lettuce2.ingredient3.ingredientIsTouched;
            t.lettuce242isTouched = this.lettuce2.ingredient4.ingredientIsTouched;
            t.lettuce252isTouched = this.lettuce2.ingredient5.ingredientIsTouched;
            
            t.lettuce312 = this.lettuce3.ingredient1.position.y;
            t.lettuce322 = this.lettuce3.ingredient2.position.y;
            t.lettuce332 = this.lettuce3.ingredient3.position.y;
            t.lettuce342 = this.lettuce3.ingredient4.position.y;
            t.lettuce352 = this.lettuce3.ingredient5.position.y;
            t.lettuce312isTouched = this.lettuce3.ingredient1.ingredientIsTouched;
            t.lettuce322isTouched = this.lettuce3.ingredient2.ingredientIsTouched;
            t.lettuce332isTouched = this.lettuce3.ingredient3.ingredientIsTouched;
            t.lettuce342isTouched = this.lettuce3.ingredient4.ingredientIsTouched;
            t.lettuce352isTouched = this.lettuce3.ingredient5.ingredientIsTouched;
            
            t.lettuce412 = this.lettuce4.ingredient1.position.y;
            t.lettuce422 = this.lettuce4.ingredient2.position.y;
            t.lettuce432 = this.lettuce4.ingredient3.position.y;
            t.lettuce442 = this.lettuce4.ingredient4.position.y;
            t.lettuce452 = this.lettuce4.ingredient5.position.y;
            t.lettuce412isTouched = this.lettuce4.ingredient1.ingredientIsTouched;
            t.lettuce422isTouched = this.lettuce4.ingredient2.ingredientIsTouched;
            t.lettuce432isTouched = this.lettuce4.ingredient3.ingredientIsTouched;
            t.lettuce442isTouched = this.lettuce4.ingredient4.ingredientIsTouched;
            t.lettuce452isTouched = this.lettuce4.ingredient5.ingredientIsTouched;
            
            //Save burger
            t.burger112 = this.burger1.ingredient1.position.y;
            t.burger122 = this.burger1.ingredient2.position.y;
            t.burger132 = this.burger1.ingredient3.position.y;
            t.burger142 = this.burger1.ingredient4.position.y;
            t.burger152 = this.burger1.ingredient5.position.y;
            t.burger112isTouched = this.burger1.ingredient1.ingredientIsTouched;
            t.burger122isTouched = this.burger1.ingredient2.ingredientIsTouched;
            t.burger132isTouched = this.burger1.ingredient3.ingredientIsTouched;
            t.burger142isTouched = this.burger1.ingredient4.ingredientIsTouched;
            t.burger152isTouched = this.burger1.ingredient5.ingredientIsTouched;
            
            t.burger212 = this.burger2.ingredient1.position.y;
            t.burger222 = this.burger2.ingredient2.position.y;
            t.burger232 = this.burger2.ingredient3.position.y;
            t.burger242 = this.burger2.ingredient4.position.y;
            t.burger252 = this.burger2.ingredient5.position.y;
            t.burger212isTouched = this.burger2.ingredient1.ingredientIsTouched;
            t.burger222isTouched = this.burger2.ingredient2.ingredientIsTouched;
            t.burger232isTouched = this.burger2.ingredient3.ingredientIsTouched;
            t.burger242isTouched = this.burger2.ingredient4.ingredientIsTouched;
            t.burger252isTouched = this.burger2.ingredient5.ingredientIsTouched;
            
            t.burger312 = this.burger3.ingredient1.position.y;
            t.burger322 = this.burger3.ingredient2.position.y;
            t.burger332 = this.burger3.ingredient3.position.y;
            t.burger342 = this.burger3.ingredient4.position.y;
            t.burger352 = this.burger3.ingredient5.position.y;
            t.burger312isTouched = this.burger3.ingredient1.ingredientIsTouched;
            t.burger322isTouched = this.burger3.ingredient2.ingredientIsTouched;
            t.burger332isTouched = this.burger3.ingredient3.ingredientIsTouched;
            t.burger342isTouched = this.burger3.ingredient4.ingredientIsTouched;
            t.burger352isTouched = this.burger3.ingredient5.ingredientIsTouched;
            
            t.burger412 = this.burger4.ingredient1.position.y;
            t.burger422 = this.burger4.ingredient2.position.y;
            t.burger432 = this.burger4.ingredient3.position.y;
            t.burger442 = this.burger4.ingredient4.position.y;
            t.burger452 = this.burger4.ingredient5.position.y;
            t.burger412isTouched = this.burger4.ingredient1.ingredientIsTouched;
            t.burger422isTouched = this.burger4.ingredient2.ingredientIsTouched;
            t.burger432isTouched = this.burger4.ingredient3.ingredientIsTouched;
            t.burger442isTouched = this.burger4.ingredient4.ingredientIsTouched;
            t.burger452isTouched = this.burger4.ingredient5.ingredientIsTouched;
            
            //Save downBread
            t.downBread112 = this.downBread1.ingredient1.position.y;
            t.downBread122 = this.downBread1.ingredient2.position.y;
            t.downBread132 = this.downBread1.ingredient3.position.y;
            t.downBread142 = this.downBread1.ingredient4.position.y;
            t.downBread152 = this.downBread1.ingredient5.position.y;
            t.downBread112isTouched = this.downBread1.ingredient1.ingredientIsTouched;
            t.downBread122isTouched = this.downBread1.ingredient2.ingredientIsTouched;
            t.downBread132isTouched = this.downBread1.ingredient3.ingredientIsTouched;
            t.downBread142isTouched = this.downBread1.ingredient4.ingredientIsTouched;
            t.downBread152isTouched = this.downBread1.ingredient5.ingredientIsTouched;
            
            t.downBread212 = this.downBread2.ingredient1.position.y;
            t.downBread222 = this.downBread2.ingredient2.position.y;
            t.downBread232 = this.downBread2.ingredient3.position.y;
            t.downBread242 = this.downBread2.ingredient4.position.y;
            t.downBread252 = this.downBread2.ingredient5.position.y;
            t.downBread212isTouched = this.downBread2.ingredient1.ingredientIsTouched;
            t.downBread222isTouched = this.downBread2.ingredient2.ingredientIsTouched;
            t.downBread232isTouched = this.downBread2.ingredient3.ingredientIsTouched;
            t.downBread242isTouched = this.downBread2.ingredient4.ingredientIsTouched;
            t.downBread252isTouched = this.downBread2.ingredient5.ingredientIsTouched;
            
            t.downBread312 = this.downBread3.ingredient1.position.y;
            t.downBread322 = this.downBread3.ingredient2.position.y;
            t.downBread332 = this.downBread3.ingredient3.position.y;
            t.downBread342 = this.downBread3.ingredient4.position.y;
            t.downBread352 = this.downBread3.ingredient5.position.y;
            t.downBread312isTouched = this.downBread3.ingredient1.ingredientIsTouched;
            t.downBread322isTouched = this.downBread3.ingredient2.ingredientIsTouched;
            t.downBread332isTouched = this.downBread3.ingredient3.ingredientIsTouched;
            t.downBread342isTouched = this.downBread3.ingredient4.ingredientIsTouched;
            t.downBread352isTouched = this.downBread3.ingredient5.ingredientIsTouched;
            
            t.downBread412 = this.downBread4.ingredient1.position.y;
            t.downBread422 = this.downBread4.ingredient2.position.y;
            t.downBread432 = this.downBread4.ingredient3.position.y;
            t.downBread442 = this.downBread4.ingredient4.position.y;
            t.downBread452 = this.downBread4.ingredient5.position.y;
            t.downBread412isTouched = this.downBread4.ingredient1.ingredientIsTouched;
            t.downBread422isTouched = this.downBread4.ingredient2.ingredientIsTouched;
            t.downBread432isTouched = this.downBread4.ingredient3.ingredientIsTouched;
            t.downBread442isTouched = this.downBread4.ingredient4.ingredientIsTouched;
            t.downBread452isTouched = this.downBread4.ingredient5.ingredientIsTouched;
        }
        localStorage.setItem('actualUser', JSON.stringify(t));
        
        localStorage.setItem('user' + t.username, JSON.stringify(t));
        
    },
    loadData:function(){
        
        var t = JSON.parse(localStorage.getItem('actualUser'));
        console.log(t.highScore);
        if(gameOptions.firstTime == 2){
            this.chef.points = 0;
            this.chef.lives = 3;
            this.chef.pepper = 3;
            gameOptions.levelPlayer2 = 'level1Multi2';
            gameOptions.firstTime++;
        }else{
           //this.scoreHI.text = t.highScore;
            this.chef.points = t.score2;
            this.chef.lives = t.lives2; 
            this.chef.pepper = t.pepper2;
            gameOptions.levelPlayer2 = t.level2;
            
            //Load upBread
            this.upBread1.ingredient1.position.y = t.upBread112;
            this.upBread1.ingredient2.position.y = t.upBread122;
            this.upBread1.ingredient3.position.y = t.upBread132;
            this.upBread1.ingredient4.position.y = t.upBread142;
            this.upBread1.ingredient5.position.y = t.upBread152;
            this.upBread1.ingredient1.ingredientIsTouched = t.upBread112isTouched;
            this.upBread1.ingredient2.ingredientIsTouched = t.upBread122isTouched;
            this.upBread1.ingredient3.ingredientIsTouched = t.upBread132isTouched;
            this.upBread1.ingredient4.ingredientIsTouched = t.upBread142isTouched;
            this.upBread1.ingredient5.ingredientIsTouched = t.upBread152isTouched;
            
            this.upBread2.ingredient1.position.y = t.upBread212;
            this.upBread2.ingredient2.position.y = t.upBread222;
            this.upBread2.ingredient3.position.y = t.upBread232;
            this.upBread2.ingredient4.position.y = t.upBread242;
            this.upBread2.ingredient5.position.y = t.upBread252;
            this.upBread2.ingredient1.ingredientIsTouched = t.upBread212isTouched;
            this.upBread2.ingredient2.ingredientIsTouched = t.upBread222isTouched;
            this.upBread2.ingredient3.ingredientIsTouched = t.upBread232isTouched;
            this.upBread2.ingredient4.ingredientIsTouched = t.upBread242isTouched;
            this.upBread2.ingredient5.ingredientIsTouched = t.upBread252isTouched;
            
            this.upBread3.ingredient1.position.y = t.upBread312;
            this.upBread3.ingredient2.position.y = t.upBread322;
            this.upBread3.ingredient3.position.y = t.upBread332;
            this.upBread3.ingredient4.position.y = t.upBread342;
            this.upBread3.ingredient5.position.y = t.upBread352;
            this.upBread3.ingredient1.ingredientIsTouched = t.upBread312isTouched;
            this.upBread3.ingredient2.ingredientIsTouched = t.upBread322isTouched;
            this.upBread3.ingredient3.ingredientIsTouched = t.upBread332isTouched;
            this.upBread3.ingredient4.ingredientIsTouched = t.upBread342isTouched;
            this.upBread3.ingredient5.ingredientIsTouched = t.upBread352isTouched;
            
            this.upBread4.ingredient1.position.y = t.upBread412;
            this.upBread4.ingredient2.position.y = t.upBread422;
            this.upBread4.ingredient3.position.y = t.upBread432;
            this.upBread4.ingredient4.position.y = t.upBread442;
            this.upBread4.ingredient5.position.y = t.upBread452;
            this.upBread4.ingredient1.ingredientIsTouched = t.upBread412isTouched;
            this.upBread4.ingredient2.ingredientIsTouched = t.upBread422isTouched;
            this.upBread4.ingredient3.ingredientIsTouched = t.upBread432isTouched;
            this.upBread4.ingredient4.ingredientIsTouched = t.upBread442isTouched;
            this.upBread4.ingredient5.ingredientIsTouched = t.upBread452isTouched;
            
            //Load lettuce
            this.lettuce1.ingredient1.position.y = t.lettuce112;
            this.lettuce1.ingredient2.position.y = t.lettuce122;
            this.lettuce1.ingredient3.position.y = t.lettuce132;
            this.lettuce1.ingredient4.position.y = t.lettuce142;
            this.lettuce1.ingredient5.position.y = t.lettuce152;
            this.lettuce1.ingredient1.ingredientIsTouched = t.lettuce112isTouched;
            this.lettuce1.ingredient2.ingredientIsTouched = t.lettuce122isTouched;
            this.lettuce1.ingredient3.ingredientIsTouched = t.lettuce132isTouched;
            this.lettuce1.ingredient4.ingredientIsTouched = t.lettuce142isTouched;
            this.lettuce1.ingredient5.ingredientIsTouched = t.lettuce152isTouched;
            
            this.lettuce2.ingredient1.position.y = t.lettuce212;
            this.lettuce2.ingredient2.position.y = t.lettuce222;
            this.lettuce2.ingredient3.position.y = t.lettuce232;
            this.lettuce2.ingredient4.position.y = t.lettuce242;
            this.lettuce2.ingredient5.position.y = t.lettuce252;
            this.lettuce2.ingredient1.ingredientIsTouched = t.lettuce212isTouched;
            this.lettuce2.ingredient2.ingredientIsTouched = t.lettuce222isTouched;
            this.lettuce2.ingredient3.ingredientIsTouched = t.lettuce232isTouched;
            this.lettuce2.ingredient4.ingredientIsTouched = t.lettuce242isTouched;
            this.lettuce2.ingredient5.ingredientIsTouched = t.lettuce252isTouched;
            
            this.lettuce3.ingredient1.position.y = t.lettuce312;
            this.lettuce3.ingredient2.position.y = t.lettuce322;
            this.lettuce3.ingredient3.position.y = t.lettuce332;
            this.lettuce3.ingredient4.position.y = t.lettuce342;
            this.lettuce3.ingredient5.position.y = t.lettuce352;
            this.lettuce3.ingredient1.ingredientIsTouched = t.lettuce312isTouched;
            this.lettuce3.ingredient2.ingredientIsTouched = t.lettuce322isTouched;
            this.lettuce3.ingredient3.ingredientIsTouched = t.lettuce332isTouched;
            this.lettuce3.ingredient4.ingredientIsTouched = t.lettuce342isTouched;
            this.lettuce3.ingredient5.ingredientIsTouched = t.lettuce352isTouched;
            
            this.lettuce4.ingredient1.position.y = t.lettuce412;
            this.lettuce4.ingredient2.position.y = t.lettuce422;
            this.lettuce4.ingredient3.position.y = t.lettuce432;
            this.lettuce4.ingredient4.position.y = t.lettuce442;
            this.lettuce4.ingredient5.position.y = t.lettuce452;
            this.lettuce4.ingredient1.ingredientIsTouched = t.lettuce412isTouched;
            this.lettuce4.ingredient2.ingredientIsTouched = t.lettuce422isTouched;
            this.lettuce4.ingredient3.ingredientIsTouched = t.lettuce432isTouched;
            this.lettuce4.ingredient4.ingredientIsTouched = t.lettuce442isTouched;
            this.lettuce4.ingredient5.ingredientIsTouched = t.lettuce452isTouched;
            
            //Load burger
            this.burger1.ingredient1.position.y = t.burger112;
            this.burger1.ingredient2.position.y = t.burger122;
            this.burger1.ingredient3.position.y = t.burger132;
            this.burger1.ingredient4.position.y = t.burger142;
            this.burger1.ingredient5.position.y = t.burger152;
            this.burger1.ingredient1.ingredientIsTouched = t.burger112isTouched;
            this.burger1.ingredient2.ingredientIsTouched = t.burger122isTouched;
            this.burger1.ingredient3.ingredientIsTouched = t.burger132isTouched;
            this.burger1.ingredient4.ingredientIsTouched = t.burger142isTouched;
            this.burger1.ingredient5.ingredientIsTouched = t.burger152isTouched;
            
            this.burger2.ingredient1.position.y = t.burger212;
            this.burger2.ingredient2.position.y = t.burger222;
            this.burger2.ingredient3.position.y = t.burger232;
            this.burger2.ingredient4.position.y = t.burger242;
            this.burger2.ingredient5.position.y = t.burger252;
            this.burger2.ingredient1.ingredientIsTouched = t.burger212isTouched;
            this.burger2.ingredient2.ingredientIsTouched = t.burger222isTouched;
            this.burger2.ingredient3.ingredientIsTouched = t.burger232isTouched;
            this.burger2.ingredient4.ingredientIsTouched = t.burger242isTouched;
            this.burger2.ingredient5.ingredientIsTouched = t.burger252isTouched;
            
            this.burger3.ingredient1.position.y = t.burger312;
            this.burger3.ingredient2.position.y = t.burger322;
            this.burger3.ingredient3.position.y = t.burger332;
            this.burger3.ingredient4.position.y = t.burger342;
            this.burger3.ingredient5.position.y = t.burger352;
            this.burger3.ingredient1.ingredientIsTouched = t.burger312isTouched;
            this.burger3.ingredient2.ingredientIsTouched = t.burger322isTouched;
            this.burger3.ingredient3.ingredientIsTouched = t.burger332isTouched;
            this.burger3.ingredient4.ingredientIsTouched = t.burger342isTouched;
            this.burger3.ingredient5.ingredientIsTouched = t.burger352isTouched;
            
            this.burger4.ingredient1.position.y = t.burger412;
            this.burger4.ingredient2.position.y = t.burger422;
            this.burger4.ingredient3.position.y = t.burger432;
            this.burger4.ingredient4.position.y = t.burger442;
            this.burger4.ingredient5.position.y = t.burger452;
            this.burger4.ingredient1.ingredientIsTouched = t.burger412isTouched;
            this.burger4.ingredient2.ingredientIsTouched = t.burger422isTouched;
            this.burger4.ingredient3.ingredientIsTouched = t.burger432isTouched;
            this.burger4.ingredient4.ingredientIsTouched = t.burger442isTouched;
            this.burger4.ingredient5.ingredientIsTouched = t.burger452isTouched;
            
            //Load downBread
            this.downBread1.ingredient1.position.y = t.downBread112;
            this.downBread1.ingredient2.position.y = t.downBread122;
            this.downBread1.ingredient3.position.y = t.downBread132;
            this.downBread1.ingredient4.position.y = t.downBread142;
            this.downBread1.ingredient5.position.y = t.downBread152;
            this.downBread1.ingredient1.ingredientIsTouched = t.downBread11;
            this.downBread1.ingredient2.ingredientIsTouched = t.downBread12;
            this.downBread1.ingredient3.ingredientIsTouched = t.downBread13;
            this.downBread1.ingredient4.ingredientIsTouched = t.downBread14;
            this.downBread1.ingredient5.ingredientIsTouched = t.downBread15;
            
            this.downBread2.ingredient1.position.y = t.downBread212;
            this.downBread2.ingredient2.position.y = t.downBread222;
            this.downBread2.ingredient3.position.y = t.downBread232;
            this.downBread2.ingredient4.position.y = t.downBread242;
            this.downBread2.ingredient5.position.y = t.downBread252;
            this.downBread2.ingredient1.ingredientIsTouched = t.downBread212isTouched;
            this.downBread2.ingredient2.ingredientIsTouched = t.downBread222isTouched;
            this.downBread2.ingredient3.ingredientIsTouched = t.downBread232isTouched;
            this.downBread2.ingredient4.ingredientIsTouched = t.downBread242isTouched;
            this.downBread2.ingredient5.ingredientIsTouched = t.downBread252isTouched;
            
            this.downBread3.ingredient1.position.y = t.downBread312;
            this.downBread3.ingredient2.position.y = t.downBread322;
            this.downBread3.ingredient3.position.y = t.downBread332;
            this.downBread3.ingredient4.position.y = t.downBread342;
            this.downBread3.ingredient5.position.y = t.downBread352;
            this.downBread3.ingredient1.ingredientIsTouched = t.downBread312isTouched;
            this.downBread3.ingredient2.ingredientIsTouched = t.downBread322isTouched;
            this.downBread3.ingredient3.ingredientIsTouched = t.downBread332isTouched;
            this.downBread3.ingredient4.ingredientIsTouched = t.downBread342isTouched;
            this.downBread3.ingredient5.ingredientIsTouched = t.downBread352isTouched;
            
            this.downBread4.ingredient1.position.y = t.downBread412;
            this.downBread4.ingredient2.position.y = t.downBread422;
            this.downBread4.ingredient3.position.y = t.downBread432;
            this.downBread4.ingredient4.position.y = t.downBread442;
            this.downBread4.ingredient5.position.y = t.downBread452;
            this.downBread4.ingredient1.ingredientIsTouched = t.downBread412isTouched;
            this.downBread4.ingredient2.ingredientIsTouched = t.downBread422isTouched;
            this.downBread4.ingredient3.ingredientIsTouched = t.downBread432isTouched;
            this.downBread4.ingredient4.ingredientIsTouched = t.downBread442isTouched;
            this.downBread4.ingredient5.ingredientIsTouched = t.downBread452isTouched;
        }
    },
    lessLive:function(){
        this.chef.lives--;
    },
    getScore:function(){
        var t = JSON.parse(localStorage.getItem('score'));
        this.chef.points = t.s;
    },
    setScore:function(){
        var test = { 's': this.chef.points };
        localStorage.setItem('score', JSON.stringify(test));
    },
    render:function(){
        //this.powerUp.body.setSize(22, 28, 20, 16);
        //this.game.debug.body(this.powerUp);
        this.game.debug.body(this.chef);
        this.game.debug.body(this.salchicha);
        //this.game.debug.body(this.pepperThrow);
        
        //this.game.debug.body(this.upBread1.ingredient1);
        this.game.debug.body(this.lettuce2.ingredient1);
        this.game.debug.body(this.lettuce2.ingredient2);
        this.game.debug.body(this.lettuce2.ingredient3);
        this.game.debug.body(this.lettuce2.ingredient4);
        this.game.debug.body(this.lettuce2.ingredient5);
    }
};










