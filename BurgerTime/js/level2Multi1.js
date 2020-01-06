var burgertime = burgertime || {};

burgertime.level2Multi1 ={
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
        this.pButton = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        
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
        
        this.map = this.game.add.tilemap('level2');
        this.map.addTilesetImage('Map');
        
        this.floor = this.map.createLayer('Floor');
        this.map.setCollisionBetween(3,3,true,'Floor');
        
        this.collisionMap = this.map.createLayer('Collisions');
        this.map.setCollisionBetween(6,6,true,'Collisions');
        
        this.stairs = this.map.createLayer('Stairs');
        this.map.setCollisionBetween(4,5,true,'Stairs');
        
        this.background = this.map.createLayer('Background');
        
        this.enemies = 3;
        
        this.chef = new burgertime.chef_prefab(this.game,this.game.world.centerX+150,this.game.world.centerY + 100,gameOptions.heroSpeed,gameOptions.heroSpeed,this);
        this.chef.frame = 7;
        
        this.salchicha = new burgertime.enemy_prefab(this.game,this.game.world.centerX - 70,this.game.world.centerY,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
        this.salchicha.body.allowGravity = false;
        
        this.salchicha2 = new burgertime.enemy_prefab(this.game,3000,3000,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
        this.salchicha2.body.allowGravity = false;
        
        this.salchicha3 = new burgertime.enemy_prefab(this.game,2000,2000,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
        this.salchicha3.body.allowGravity = false;
        
        //this.breadUp = new burgertime.ingredient_prefab(this.game,100,100,this,'BreadUp1');
        
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
        
        this.stair1 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*1,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair2 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*3,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair3 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*5,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair4 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*7,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*18,'TileTransparente');
        this.stair5 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*9,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*22.5,'TileTransparente');
        this.stair6 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*11,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*18,'TileTransparente');
        this.stair7 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*13,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair8 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*15,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair9 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*17,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair10 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*19,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair11 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*30,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*7.5,'TileTransparente');
        
        this.changeDir1 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*1+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.changeDir2 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*3+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.changeDir3 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*5+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.changeDir4 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*7+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*18,'TileTransparente');
        this.changeDir5 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*9+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*22.5,'TileTransparente');
        this.changeDir6 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*11+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*18,'TileTransparente');
        this.changeDir7 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*13+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.changeDir8 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*15+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.changeDir9 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*19+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.changeDir10 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*17+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*10,'TileTransparente');
        
        
        /*this.timer1 = this.game.time.events.loop(Phaser.Timer.SECOND*2,this.activatePowerUp,this);
        this.timer2 = this.game.time.events.loop(Phaser.Timer.SECOND*3,this.deactivatePowerUp,this);*/
        
        this.timerStairs = this.game.time.events.loop(Phaser.Timer.SECOND,this.activateStairs,this);
        
        this.upBread1 = new burgertime.ingredient_prefab(this.game,75+60, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        this.upBread2 = new burgertime.ingredient_prefab(this.game,315+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        this.upBread3 = new burgertime.ingredient_prefab(this.game,555+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        this.upBread4 = new burgertime.ingredient_prefab(this.game,800+60,0+145,'BreadUp1','BreadUp2','BreadUp3', this.chef,this);
        
        this.lettuce1 = new burgertime.ingredient_prefab(this.game,75+60, 60+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        this.lettuce2 = new burgertime.ingredient_prefab(this.game,315+60,60+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        this.lettuce3 = new burgertime.ingredient_prefab(this.game,555+60,300+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        this.lettuce4 = new burgertime.ingredient_prefab(this.game,800+60,120+145,'Lettuce1','Lettuce2','Lettuce3', this.chef,this);
        
        this.burger1 = new burgertime.ingredient_prefab(this.game,75+60, 120+145,'Cheese1','Cheese2','Cheese3', this.chef,this);
        this.burger2 = new burgertime.ingredient_prefab(this.game,315+60,180+145,'Cheese1','Cheese2','Cheese3', this.chef,this);
        this.burger3 = new burgertime.ingredient_prefab(this.game,555+60,420+145,'Cheese1','Cheese2','Cheese3', this.chef,this);
        this.burger4 = new burgertime.ingredient_prefab(this.game,800+60,180+145,'Cheese1','Cheese2','Cheese3', this.chef,this);
        
        this.downBread1 = new burgertime.ingredient_prefab(this.game,75+60, 240+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        this.downBread2 = new burgertime.ingredient_prefab(this.game,315+60,480+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        this.downBread3 = new burgertime.ingredient_prefab(this.game,555+60,480+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        this.downBread4 = new burgertime.ingredient_prefab(this.game,800+60,240+145,'BreadDown1','BreadDown2','BreadDown3', this.chef,this);
        
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
        this.score.puntos=0; 
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
        
        this.player1Text = this.game.add.text(this.game.width/4 - 50, this.game.height/20,'PLAYER1');
        this.player1Text.anchor.setTo(1,0);
        this.player1Text.font = 'aracde';
        this.player1Text.fill = '#FFFFFF';
        this.player1Text.fontSize = 40;
        
        var h = this.loadData();
    },
    musicChange:function(){
        this.music.play();
    },
    update:function(){          
        
        if(this.chef.lives == 0)
        {
            this.music.pause();
            this.complete.play();
            var h = this.saveData();
            if(gameOptions.level2Multi3Completed){
                this.state.start('menu');
            }
            else{
                this.state.start(gameOptions.levelPlayer2);
            }
        }
        
        if(this.upBread1.isDone &&
           this.upBread2.isDone &&
           this.upBread3.isDone &&
           this.upBread4.isDone) {
            this.levelCompleted = true;
        }
        
        var c = this.ingredientColisions();
        
        //this.game.physics.arcade.collide(this.chef,this.stairs,this.stairTouch, null, this);
        
        this.game.physics.arcade.collide(this.chef,this.floor,this.platformTouch, null, this);
        this.game.physics.arcade.collide(this.chef, this.collisionMap);
        
        //_________________________________________________________________________________________________________________
        //_________________________________________________________________________________________________________________
        
        if (this.game.physics.arcade.overlap(this.salchicha, this.changeDir1) || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir2)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir3)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir4)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir5)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir6)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir7)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir8)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir9)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir10))
            {   this.salchichaOverlaps = true; } else {
                this.salchichaOverlaps = false;
            }
        
        if (this.game.physics.arcade.overlap(this.salchicha2, this.changeDir1) || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir2)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir3)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir4)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir5)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir6)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir7)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir8)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir9)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir10))
            {   this.salchicha2Overlaps = true; } else {
                this.salchicha2Overlaps = false;
            }
        
        if (this.game.physics.arcade.overlap(this.salchicha3, this.changeDir1) || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir2)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir3)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir4)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir5)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir6)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir7)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir8)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir9)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir10))
            {   this.salchicha3Overlaps = true; } else {
                this.salchicha3Overlaps = false;
            }
        
        
        //_________________________________________________________________________________________________________________
        //_________________________________________________________________________________________________________________
        
        
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
        
        
         //_________________________________________________________________________________________________________________
        //_________________________________________________________________________________________________________________
        
        if((this.salchichaOverlaps) && ((this.salchicha.y - this.chef.y <= -120) || (this.salchicha.y - this.chef.y >= 40))) // Enemigo en una escalera y fuera de la altura del player
           {
                    this.salchicha.goStairs();   
           } 
        
        
        else 
           {
               if(this.salchicha.camesFromUnder && this.salchicha.y - this.chef.y > -60) // Si viene por debajo del player pero llega a la altura a la que debe girar para saltar bache misterioso
               {
                   this.salchicha.direcc = 1;
               }
               else // No viene por debajo del player || Llega a la altura a la que debe girar para saltar bache misterioso
               {
                  this.salchicha.camesFromUnder = false;
                  if(this.salchicha.upDown == true && this.chef.dead == false) // (El player está vivo) && (El enemigo no está en una escalera || Ha detectado al jugador a su altura)
                    {
                        this.salchicha.body.allowGravity = true;
                        this.salchicha.upDown = false;
                        this.salchicha.timeToSwitchSides -= this.game.time.physicsElapsed;
                        if(this.chef.body.position.x > this.salchicha.body.position.x)
                        {
                            this.salchicha.direction = 2;
                        }
                        else
                        {
                            this.salchicha.direction = -2;
                        }
                        if(this.salchicha.timeToSwitchSides <= 0)
                        {
                            this.salchicha.direction = this.salchicha.direction * (-1);
                            this.salchicha.timeToSwitchSides = 5;
                        }
                    }
                    else if(this.chef.dead && this.salchichaOverlaps) // Player muerto y enemigo en una escalera
                    {
                        this.salchicha.goStairs(); 
                    }
                    
               }
            }
        
        //----------------------------------------------------------
        
        if((this.salchicha2Overlaps) && ((this.salchicha2.y - this.chef.y <= -120) || (this.salchicha2.y - this.chef.y >= 40))) // Enemigo en una escalera y fuera de la altura del player
           {
                    this.salchicha2.goStairs();
           } 
        
        
        else 
           {
               if(this.salchicha2.camesFromUnder && this.salchicha2.y - this.chef.y > -60) // Si viene por debajo del player pero llega a la altura a la que debe girar para saltar bache misterioso
               {
                   this.salchicha2.direcc = 1;
               }
               else // No viene por debajo del player || Llega a la altura a la que debe girar para saltar bache misterioso
               {
                  this.salchicha2.camesFromUnder = false;
                  if(this.salchicha2.upDown == true && this.chef.dead == false) // (El player está vivo) && (El enemigo no está en una escalera || Ha detectado al jugador a su altura)
                    {
                        this.salchicha2.body.allowGravity = true;
                        this.salchicha2.upDown = false;
                        this.salchicha2.timeToSwitchSides -= this.game.time.physicsElapsed;
                        if(this.chef.body.position.x > this.salchicha2.body.position.x)
                        {
                            this.salchicha2.direction = 2;
                        }
                        else
                        {
                            this.salchicha2.direction = -2;
                        }
                        if(this.salchicha2.timeToSwitchSides <= 0)
                        {
                            this.salchicha2.direction = this.salchicha2.direction * (-1);
                            this.salchicha2.timeToSwitchSides = 5;
                        }
                    }
                    else if(this.chef.dead && this.salchicha2Overlaps) // Player muerto y enemigo en una escalera
                    {
                        this.salchicha2.goStairs(); 
                    }
                    
               }
            }
        

        
        //__________________________________________________________
        
        if((this.salchicha3Overlaps) && ((this.salchicha3.y - this.chef.y <= -120) || (this.salchicha3.y - this.chef.y >= 40))) // Enemigo en una escalera y fuera de la altura del player
           {
                    this.salchicha3.goStairs();   
           } 
       
        
        else 
           {
               if(this.salchicha3.camesFromUnder && this.salchicha3.y - this.chef.y > -60) // Si viene por debajo del player pero llega a la altura a la que debe girar para saltar bache misterioso
               {
                   this.salchicha3.direcc = 1;
               }
               else // No viene por debajo del player || Llega a la altura a la que debe girar para saltar bache misterioso
               {
                  this.salchicha3.camesFromUnder = false;
                  if(this.salchicha3.upDown == true && this.chef.dead == false) // (El player está vivo) && (El enemigo no está en una escalera || Ha detectado al jugador a su altura)
                    {
                        this.salchicha3.body.allowGravity = true;
                        this.salchicha3.upDown = false;
                        this.salchicha3.timeToSwitchSides -= this.game.time.physicsElapsed;
                        if(this.chef.body.position.x > this.salchicha3.body.position.x)
                        {
                            this.salchicha3.direction = 2;
                        }
                        else
                        {
                            this.salchicha3.direction = -2;
                        }
                        if(this.salchicha3.timeToSwitchSides <= 0)
                        {
                            this.salchicha3.direction = this.salchicha3.direction * (-1);
                            this.salchicha3.timeToSwitchSides = 5;
                        }
                    }
                    else if(this.chef.dead && this.salchicha3Overlaps) // Player muerto y enemigo en una escalera
                    {
                        this.salchicha3.goStairs(); 
                    }
                    
               }
            }
        
        
        //_________________________________________________________________________________________________________________
        //_________________________________________________________________________________________________________________
        
        this.game.physics.arcade.collide(this.chef,this.salchicha,this.killChef,null,this); 
        this.game.physics.arcade.collide(this.chef,this.salchicha2,this.killChef,null,this); 
        this.game.physics.arcade.collide(this.chef,this.salchicha3,this.killChef,null,this);
        
        
        this.score.text=this.chef.points;
        this.peppersText.text=this.chef.pepper;
        this.lifesText.text=this.chef.lives;
        
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
       
        //this.activatePowerUp();
        //console.log(this.isPowerUp);
        
        if(this.cursors.left.isDown && this.chef.canMove == true && this.chef.dead == false){
            this.chef.body.velocity.x = -this.chef.speedX;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('walk');
            this.chef.scale.x = 2.5
            this.chef.lastMove = 'L';
            ;
        }
        else if(this.cursors.right.isDown && this.chef.canMove == true && this.chef.dead == false){
            this.chef.body.velocity.x = this.chef.speedX;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('walk');
            this.chef.scale.x = -2.5;
            this.chef.lastMove = 'R';
        }
        else if(this.cursors.up.isDown && this.chef.canMove == true && this.chef.dead == false){
            this.chef.body.velocity.y = -this.chef.speedY;
            this.chef.body.velocity.x = 0;
            this.chef.animations.play('up');
            this.chef.lastMove = 'U';
        }
        else if(this.cursors.down.isDown && this.chef.canMove == true && this.chef.dead == false){
            this.chef.body.velocity.y = this.chef.speedY;
            this.chef.body.velocity.x = 0;
            this.chef.animations.play('down');
            this.chef.lastMove = 'D';
            
        }else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            
        }
        
        if(this.espacio.downDuration(1)){        // Lanzamiento de Pimienta
            
          if(this.chef.pepper > 0 && this.chef.dead == false) {
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
                    
                    //this.salchicha = new burgertime.enemy_prefab(this.game,this.game.world.centerX - 70,this.game.world.centerY,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
                    this.salchicha.recolocate();
                    this.salchicha.body.allowGravity = false;
                    
                    //this.salchicha2 = new burgertime.enemy_prefab(this.game,50,146,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
                    this.salchicha2.recolocate();
                    this.salchicha2.body.allowGravity = false;
                    
                    //this.salchicha3 = new burgertime.enemy_prefab(this.game,gameOptions.level1Width-60,508,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
                    this.salchicha3.recolocate();
                    this.salchicha3.body.allowGravity = false;
                    
                    
                    this.chef.frame = 3;
                    this.chef.body.enable = true;
                    this.chef.position.x = this.chef.initPosX;
                    this.chef.position.y = this.chef.initPosY-90;
                    
                    var w = this.saveData();
                    
                    if(gameOptions.level2Multi3Completed){
                        this.state.start(gameOptions.levelPlayer1);
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
            //this.state.start('level2');
        }
        
        if(this.levelCompleted){
            this.music.pause();
            this.complete.play();
            var w = this.saveData();
            this.levelCompleted = false;
            //next level
            this.state.start('level3Multi1');
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
        this.salchicha3 = new burgertime.enemy_prefab(this.game,gameOptions.level1Width-60,308,gameOptions.heroSpeed-50,gameOptions.heroSpeed-50,this);
        this.salchicha.body.allowGravity = false;
    },
    killChef:function(){
        //console.log('les go');
        this.chef.body.enable = false;
        this.chef.dead = true;
    },
    collideBreadPlayer:function(_bread,_player){
        if(_bread.canBeHit)
        {
            _bread.position.y += 10;
            _bread.canBeHit = false;
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
            //t.score1 = 0;
            t.lives1 = 3;
            t.pepper1 = 3;
        }else{
           t.score1 = this.chef.points; 
           t.lives1 = this.chef.lives;
           t.pepper1 = this.chef.pepper;
            t.level = 'level2Multi1';
            
            //Save upBread
           t.upBread1121 = this.upBread1.ingredient1.body.position.y;
           t.upBread1221 = this.upBread1.ingredient2.body.position.y;
           t.upBread1321 = this.upBread1.ingredient3.body.position.y;
           t.upBread1421 = this.upBread1.ingredient4.body.position.y;
           t.upBread1521 = this.upBread1.ingredient5.body.position.y;
           t.upBread1121isTouched = this.upBread1.ingredient1.ingredientIsTouched;
           t.upBread1221isTouched = this.upBread1.ingredient2.ingredientIsTouched;
           t.upBread1321isTouched = this.upBread1.ingredient3.ingredientIsTouched;
           t.upBread1421isTouched = this.upBread1.ingredient4.ingredientIsTouched;
           t.upBread1521isTouched = this.upBread1.ingredient5.ingredientIsTouched;
            t.upBread1521isTouched = this.upBread1.ingredient5.ingredientIsTouched;
           t.upBread1121isDone = this.upBread1.isDone;
           t.upBread1221isDone = this.upBread2.isDone;
           t.upBread1321isDone = this.upBread3.isDone;
           t.upBread1421isDone = this.upBread4.isDone;
            
            t.upBread2121 = this.upBread2.ingredient1.body.position.y;
           t.upBread2221 = this.upBread2.ingredient2.body.position.y;
           t.upBread2321 = this.upBread2.ingredient3.body.position.y;
           t.upBread2421 = this.upBread2.ingredient4.body.position.y;
           t.upBread2521 = this.upBread2.ingredient5.body.position.y;
           t.upBread2121isTouched = this.upBread2.ingredient1.ingredientIsTouched;
           t.upBread2221isTouched = this.upBread2.ingredient2.ingredientIsTouched;
           t.upBread2321isTouched = this.upBread2.ingredient3.ingredientIsTouched;
           t.upBread2421isTouched = this.upBread2.ingredient4.ingredientIsTouched;
           t.upBread2521isTouched = this.upBread2.ingredient5.ingredientIsTouched;
            
            t.upBread3121 = this.upBread3.ingredient1.body.position.y;
           t.upBread3221 = this.upBread3.ingredient2.body.position.y;
           t.upBread3321 = this.upBread3.ingredient3.body.position.y;
           t.upBread3421 = this.upBread3.ingredient4.body.position.y;
           t.upBread3521 = this.upBread3.ingredient5.body.position.y;
           t.upBread3121isTouched = this.upBread3.ingredient1.ingredientIsTouched;
           t.upBread3221isTouched = this.upBread3.ingredient2.ingredientIsTouched;
           t.upBread3321isTouched = this.upBread3.ingredient3.ingredientIsTouched;
           t.upBread3421isTouched = this.upBread3.ingredient4.ingredientIsTouched;
           t.upBread3521isTouched = this.upBread3.ingredient5.ingredientIsTouched;
            
            t.upBread4121 = this.upBread4.ingredient1.body.position.y;
           t.upBread4221 = this.upBread4.ingredient2.body.position.y;
           t.upBread4321 = this.upBread4.ingredient3.body.position.y;
           t.upBread4421 = this.upBread4.ingredient4.body.position.y;
           t.upBread4521 = this.upBread4.ingredient5.body.position.y;
           t.upBread4121isTouched = this.upBread4.ingredient1.ingredientIsTouched;
           t.upBread4221isTouched = this.upBread4.ingredient2.ingredientIsTouched;
           t.upBread4321isTouched = this.upBread4.ingredient3.ingredientIsTouched;
           t.upBread4421isTouched = this.upBread4.ingredient4.ingredientIsTouched;
           t.upBread4521isTouched = this.upBread4.ingredient5.ingredientIsTouched;
            
            //Save lettuce
            t.lettuce1121 = this.lettuce1.ingredient1.position.y;
            t.lettuce1221 = this.lettuce1.ingredient2.position.y;
            t.lettuce1321 = this.lettuce1.ingredient3.position.y;
            t.lettuce1421 = this.lettuce1.ingredient4.position.y;
            t.lettuce1521 = this.lettuce1.ingredient5.position.y;
            t.lettuce1121isTouched = this.lettuce1.ingredient1.ingredientIsTouched;
            t.lettuce1221isTouched = this.lettuce1.ingredient2.ingredientIsTouched;
            t.lettuce1321isTouched = this.lettuce1.ingredient3.ingredientIsTouched;
            t.lettuce1421isTouched = this.lettuce1.ingredient4.ingredientIsTouched;
            t.lettuce1521isTouched = this.lettuce1.ingredient5.ingredientIsTouched;
            
            t.lettuce2121 = this.lettuce2.ingredient1.position.y;
            t.lettuce2221 = this.lettuce2.ingredient2.position.y;
            t.lettuce2321 = this.lettuce2.ingredient3.position.y;
            t.lettuce2421 = this.lettuce2.ingredient4.position.y;
            t.lettuce2521 = this.lettuce2.ingredient5.position.y;
            t.lettuce2121isTouched = this.lettuce2.ingredient1.ingredientIsTouched;
            t.lettuce2221isTouched = this.lettuce2.ingredient2.ingredientIsTouched;
            t.lettuce2321isTouched = this.lettuce2.ingredient3.ingredientIsTouched;
            t.lettuce2421isTouched = this.lettuce2.ingredient4.ingredientIsTouched;
            t.lettuce2521isTouched = this.lettuce2.ingredient5.ingredientIsTouched;
            
            t.lettuce3121 = this.lettuce3.ingredient1.position.y;
            t.lettuce3221 = this.lettuce3.ingredient2.position.y;
            t.lettuce3321 = this.lettuce3.ingredient3.position.y;
            t.lettuce3421 = this.lettuce3.ingredient4.position.y;
            t.lettuce3521 = this.lettuce3.ingredient5.position.y;
            t.lettuce3121isTouched = this.lettuce3.ingredient1.ingredientIsTouched;
            t.lettuce3221isTouched = this.lettuce3.ingredient2.ingredientIsTouched;
            t.lettuce3321isTouched = this.lettuce3.ingredient3.ingredientIsTouched;
            t.lettuce3421isTouched = this.lettuce3.ingredient4.ingredientIsTouched;
            t.lettuce3521isTouched = this.lettuce3.ingredient5.ingredientIsTouched;
            
            t.lettuce4121 = this.lettuce4.ingredient1.position.y;
            t.lettuce4221 = this.lettuce4.ingredient2.position.y;
            t.lettuce4321 = this.lettuce4.ingredient3.position.y;
            t.lettuce4421 = this.lettuce4.ingredient4.position.y;
            t.lettuce4521 = this.lettuce4.ingredient5.position.y;
            t.lettuce4121isTouched = this.lettuce4.ingredient1.ingredientIsTouched;
            t.lettuce4221isTouched = this.lettuce4.ingredient2.ingredientIsTouched;
            t.lettuce4321isTouched = this.lettuce4.ingredient3.ingredientIsTouched;
            t.lettuce4421isTouched = this.lettuce4.ingredient4.ingredientIsTouched;
            t.lettuce4521isTouched = this.lettuce4.ingredient5.ingredientIsTouched;
            
            //Save burger
            t.burger1121 = this.burger1.ingredient1.position.y;
            t.burger1221 = this.burger1.ingredient2.position.y;
            t.burger1321 = this.burger1.ingredient3.position.y;
            t.burger1421 = this.burger1.ingredient4.position.y;
            t.burger1521 = this.burger1.ingredient5.position.y;
            t.burger1121isTouched = this.burger1.ingredient1.ingredientIsTouched;
            t.burger1221isTouched = this.burger1.ingredient2.ingredientIsTouched;
            t.burger1321isTouched = this.burger1.ingredient3.ingredientIsTouched;
            t.burger1421isTouched = this.burger1.ingredient4.ingredientIsTouched;
            t.burger1521isTouched = this.burger1.ingredient5.ingredientIsTouched;
            
            t.burger2121 = this.burger2.ingredient1.position.y;
            t.burger2221 = this.burger2.ingredient2.position.y;
            t.burger2321 = this.burger2.ingredient3.position.y;
            t.burger2421 = this.burger2.ingredient4.position.y;
            t.burger2521 = this.burger2.ingredient5.position.y;
            t.burger2121isTouched = this.burger2.ingredient1.ingredientIsTouched;
            t.burger2221isTouched = this.burger2.ingredient2.ingredientIsTouched;
            t.burger2321isTouched = this.burger2.ingredient3.ingredientIsTouched;
            t.burger2421isTouched = this.burger2.ingredient4.ingredientIsTouched;
            t.burger2521isTouched = this.burger2.ingredient5.ingredientIsTouched;
            
            t.burger3121 = this.burger3.ingredient1.position.y;
            t.burger3221 = this.burger3.ingredient2.position.y;
            t.burger3321 = this.burger3.ingredient3.position.y;
            t.burger3421 = this.burger3.ingredient4.position.y;
            t.burger3521 = this.burger3.ingredient5.position.y;
            t.burger3121isTouched = this.burger3.ingredient1.ingredientIsTouched;
            t.burger3221isTouched = this.burger3.ingredient2.ingredientIsTouched;
            t.burger3321isTouched = this.burger3.ingredient3.ingredientIsTouched;
            t.burger3421isTouched = this.burger3.ingredient4.ingredientIsTouched;
            t.burger3521isTouched = this.burger3.ingredient5.ingredientIsTouched;
            
            t.burger4121 = this.burger4.ingredient1.position.y;
            t.burger4221 = this.burger4.ingredient2.position.y;
            t.burger4321 = this.burger4.ingredient3.position.y;
            t.burger4421 = this.burger4.ingredient4.position.y;
            t.burger4521 = this.burger4.ingredient5.position.y;
            t.burger4121isTouched = this.burger4.ingredient1.ingredientIsTouched;
            t.burger4221isTouched = this.burger4.ingredient2.ingredientIsTouched;
            t.burger4321isTouched = this.burger4.ingredient3.ingredientIsTouched;
            t.burger4421isTouched = this.burger4.ingredient4.ingredientIsTouched;
            t.burger4521isTouched = this.burger4.ingredient5.ingredientIsTouched;
            
            //Save downBread
            t.downBread1121 = this.downBread1.ingredient1.position.y;
            t.downBread1221 = this.downBread1.ingredient2.position.y;
            t.downBread1321 = this.downBread1.ingredient3.position.y;
            t.downBread1421 = this.downBread1.ingredient4.position.y;
            t.downBread1521 = this.downBread1.ingredient5.position.y;
            t.downBread1121isTouched = this.downBread1.ingredient1.ingredientIsTouched;
            t.downBread1221isTouched = this.downBread1.ingredient2.ingredientIsTouched;
            t.downBread1321isTouched = this.downBread1.ingredient3.ingredientIsTouched;
            t.downBread1421isTouched = this.downBread1.ingredient4.ingredientIsTouched;
            t.downBread1521isTouched = this.downBread1.ingredient5.ingredientIsTouched;
            
            t.downBread2121 = this.downBread2.ingredient1.position.y;
            t.downBread2221 = this.downBread2.ingredient2.position.y;
            t.downBread2321 = this.downBread2.ingredient3.position.y;
            t.downBread2421 = this.downBread2.ingredient4.position.y;
            t.downBread2521 = this.downBread2.ingredient5.position.y;
            t.downBread2121isTouched = this.downBread2.ingredient1.ingredientIsTouched;
            t.downBread2221isTouched = this.downBread2.ingredient2.ingredientIsTouched;
            t.downBread2321isTouched = this.downBread2.ingredient3.ingredientIsTouched;
            t.downBread2421isTouched = this.downBread2.ingredient4.ingredientIsTouched;
            t.downBread2521isTouched = this.downBread2.ingredient5.ingredientIsTouched;
            
            t.downBread3121 = this.downBread3.ingredient1.position.y;
            t.downBread3221 = this.downBread3.ingredient2.position.y;
            t.downBread3321 = this.downBread3.ingredient3.position.y;
            t.downBread3421 = this.downBread3.ingredient4.position.y;
            t.downBread3521 = this.downBread3.ingredient5.position.y;
            t.downBread3121isTouched = this.downBread3.ingredient1.ingredientIsTouched;
            t.downBread3221isTouched = this.downBread3.ingredient2.ingredientIsTouched;
            t.downBread3321isTouched = this.downBread3.ingredient3.ingredientIsTouched;
            t.downBread3421isTouched = this.downBread3.ingredient4.ingredientIsTouched;
            t.downBread3521isTouched = this.downBread3.ingredient5.ingredientIsTouched;
            
            t.downBread4121 = this.downBread4.ingredient1.position.y;
            t.downBread4221 = this.downBread4.ingredient2.position.y;
            t.downBread4321 = this.downBread4.ingredient3.position.y;
            t.downBread4421 = this.downBread4.ingredient4.position.y;
            t.downBread4521 = this.downBread4.ingredient5.position.y;
            t.downBread4121isTouched = this.downBread4.ingredient1.ingredientIsTouched;
            t.downBread4221isTouched = this.downBread4.ingredient2.ingredientIsTouched;
            t.downBread4321isTouched = this.downBread4.ingredient3.ingredientIsTouched;
            t.downBread4421isTouched = this.downBread4.ingredient4.ingredientIsTouched;
            t.downBread4521isTouched = this.downBread4.ingredient5.ingredientIsTouched;
        }
        localStorage.setItem('actualUser', JSON.stringify(t));
        
        localStorage.setItem('user' + t.username, JSON.stringify(t));
        
    },
    loadData:function(){
        var t = JSON.parse(localStorage.getItem('actualUser'));
        console.log(t.highScore);
        if(gameOptions.firstTime21 == 1){
            this.chef.points = t.score1;
            this.chef.lives = t.lives1;
            this.chef.pepper = t.pepper1;
            gameOptions.levelPlayer1 = 'level2Multi1';
            gameOptions.firstTime21++;
        }else{
           //this.scoreHI.text = t.highScore;
            this.chef.points = t.score1;
            this.chef.lives = t.lives1; 
            this.chef.pepper = t.pepper1;
            gameOptions.levelPlayer1 = t.level;
            
            //Load upBread
            this.upBread1.ingredient1.position.y = t.upBread1121;
            this.upBread1.ingredient2.position.y = t.upBread1221;
            this.upBread1.ingredient3.position.y = t.upBread1321;
            this.upBread1.ingredient4.position.y = t.upBread1421;
            this.upBread1.ingredient5.position.y = t.upBread1521;
            this.upBread1.ingredient1.ingredientIsTouched = t.upBread1121isTouched;
            this.upBread1.ingredient2.ingredientIsTouched = t.upBread1221isTouched;
            this.upBread1.ingredient3.ingredientIsTouched = t.upBread1321isTouched;
            this.upBread1.ingredient4.ingredientIsTouched = t.upBread1421isTouched;
            this.upBread1.ingredient5.ingredientIsTouched = t.upBread1521isTouched;
            this.upBread1.isDone = t.upBread1121isDone;
            this.upBread2.isDone = t.upBread1221isDone;
            this.upBread3.isDone = t.upBread1321isDone;
            this.upBread4.isDone = t.upBread1421isDone;
            
            this.upBread2.ingredient1.position.y = t.upBread2121;
            this.upBread2.ingredient2.position.y = t.upBread2221;
            this.upBread2.ingredient3.position.y = t.upBread2321;
            this.upBread2.ingredient4.position.y = t.upBread2421;
            this.upBread2.ingredient5.position.y = t.upBread2521;
            this.upBread2.ingredient1.ingredientIsTouched = t.upBread2121isTouched;
            this.upBread2.ingredient2.ingredientIsTouched = t.upBread2221isTouched;
            this.upBread2.ingredient3.ingredientIsTouched = t.upBread2321isTouched;
            this.upBread2.ingredient4.ingredientIsTouched = t.upBread2421isTouched;
            this.upBread2.ingredient5.ingredientIsTouched = t.upBread2521isTouched;
            
            this.upBread3.ingredient1.position.y = t.upBread3121;
            this.upBread3.ingredient2.position.y = t.upBread3221;
            this.upBread3.ingredient3.position.y = t.upBread3321;
            this.upBread3.ingredient4.position.y = t.upBread3421;
            this.upBread3.ingredient5.position.y = t.upBread3521;
            this.upBread3.ingredient1.ingredientIsTouched = t.upBread3121isTouched;
            this.upBread3.ingredient2.ingredientIsTouched = t.upBread3221isTouched;
            this.upBread3.ingredient3.ingredientIsTouched = t.upBread3321isTouched;
            this.upBread3.ingredient4.ingredientIsTouched = t.upBread3421isTouched;
            this.upBread3.ingredient5.ingredientIsTouched = t.upBread3521isTouched;
            
            this.upBread4.ingredient1.position.y = t.upBread4121;
            this.upBread4.ingredient2.position.y = t.upBread4221;
            this.upBread4.ingredient3.position.y = t.upBread4321;
            this.upBread4.ingredient4.position.y = t.upBread4421;
            this.upBread4.ingredient5.position.y = t.upBread4521;
            this.upBread4.ingredient1.ingredientIsTouched = t.upBread4121isTouched;
            this.upBread4.ingredient2.ingredientIsTouched = t.upBread4221isTouched;
            this.upBread4.ingredient3.ingredientIsTouched = t.upBread4321isTouched;
            this.upBread4.ingredient4.ingredientIsTouched = t.upBread4421isTouched;
            this.upBread4.ingredient5.ingredientIsTouched = t.upBread4521isTouched;
            
            //Load lettuce
            this.lettuce1.ingredient1.position.y = t.lettuce1121;
            this.lettuce1.ingredient2.position.y = t.lettuce1221;
            this.lettuce1.ingredient3.position.y = t.lettuce1321;
            this.lettuce1.ingredient4.position.y = t.lettuce1421;
            this.lettuce1.ingredient5.position.y = t.lettuce1521;
            this.lettuce1.ingredient1.ingredientIsTouched = t.lettuce1121isTouched;
            this.lettuce1.ingredient2.ingredientIsTouched = t.lettuce1221isTouched;
            this.lettuce1.ingredient3.ingredientIsTouched = t.lettuce1321isTouched;
            this.lettuce1.ingredient4.ingredientIsTouched = t.lettuce1421isTouched;
            this.lettuce1.ingredient5.ingredientIsTouched = t.lettuce1521isTouched;
            
            this.lettuce2.ingredient1.position.y = t.lettuce2121;
            this.lettuce2.ingredient2.position.y = t.lettuce2221;
            this.lettuce2.ingredient3.position.y = t.lettuce2321;
            this.lettuce2.ingredient4.position.y = t.lettuce2421;
            this.lettuce2.ingredient5.position.y = t.lettuce2521;
            this.lettuce2.ingredient1.ingredientIsTouched = t.lettuce2121isTouched;
            this.lettuce2.ingredient2.ingredientIsTouched = t.lettuce2221isTouched;
            this.lettuce2.ingredient3.ingredientIsTouched = t.lettuce2321isTouched;
            this.lettuce2.ingredient4.ingredientIsTouched = t.lettuce2421isTouched;
            this.lettuce2.ingredient5.ingredientIsTouched = t.lettuce2521isTouched;
            
            this.lettuce3.ingredient1.position.y = t.lettuce3121;
            this.lettuce3.ingredient2.position.y = t.lettuce3221;
            this.lettuce3.ingredient3.position.y = t.lettuce3321;
            this.lettuce3.ingredient4.position.y = t.lettuce3421;
            this.lettuce3.ingredient5.position.y = t.lettuce3521;
            this.lettuce3.ingredient1.ingredientIsTouched = t.lettuce3121isTouched;
            this.lettuce3.ingredient2.ingredientIsTouched = t.lettuce3221isTouched;
            this.lettuce3.ingredient3.ingredientIsTouched = t.lettuce3321isTouched;
            this.lettuce3.ingredient4.ingredientIsTouched = t.lettuce3421isTouched;
            this.lettuce3.ingredient5.ingredientIsTouched = t.lettuce3521isTouched;
            
            this.lettuce4.ingredient1.position.y = t.lettuce4121;
            this.lettuce4.ingredient2.position.y = t.lettuce4221;
            this.lettuce4.ingredient3.position.y = t.lettuce4321;
            this.lettuce4.ingredient4.position.y = t.lettuce4421;
            this.lettuce4.ingredient5.position.y = t.lettuce4521;
            this.lettuce4.ingredient1.ingredientIsTouched = t.lettuce4121isTouched;
            this.lettuce4.ingredient2.ingredientIsTouched = t.lettuce4221isTouched;
            this.lettuce4.ingredient3.ingredientIsTouched = t.lettuce4321isTouched;
            this.lettuce4.ingredient4.ingredientIsTouched = t.lettuce4421isTouched;
            this.lettuce4.ingredient5.ingredientIsTouched = t.lettuce4521isTouched;
            
            //Load burger
            this.burger1.ingredient1.position.y = t.burger1121;
            this.burger1.ingredient2.position.y = t.burger1221;
            this.burger1.ingredient3.position.y = t.burger1321;
            this.burger1.ingredient4.position.y = t.burger1421;
            this.burger1.ingredient5.position.y = t.burger1521;
            this.burger1.ingredient1.ingredientIsTouched = t.burger1121isTouched;
            this.burger1.ingredient2.ingredientIsTouched = t.burger1221isTouched;
            this.burger1.ingredient3.ingredientIsTouched = t.burger1321isTouched;
            this.burger1.ingredient4.ingredientIsTouched = t.burger1421isTouched;
            this.burger1.ingredient5.ingredientIsTouched = t.burger1521isTouched;
            
            this.burger2.ingredient1.position.y = t.burger2121;
            this.burger2.ingredient2.position.y = t.burger2221;
            this.burger2.ingredient3.position.y = t.burger2321;
            this.burger2.ingredient4.position.y = t.burger2421;
            this.burger2.ingredient5.position.y = t.burger2521;
            this.burger2.ingredient1.ingredientIsTouched = t.burger2121isTouched;
            this.burger2.ingredient2.ingredientIsTouched = t.burger2221isTouched;
            this.burger2.ingredient3.ingredientIsTouched = t.burger2321isTouched;
            this.burger2.ingredient4.ingredientIsTouched = t.burger2421isTouched;
            this.burger2.ingredient5.ingredientIsTouched = t.burger2521isTouched;
            
            this.burger3.ingredient1.position.y = t.burger3121;
            this.burger3.ingredient2.position.y = t.burger3221;
            this.burger3.ingredient3.position.y = t.burger3321;
            this.burger3.ingredient4.position.y = t.burger3421;
            this.burger3.ingredient5.position.y = t.burger3521;
            this.burger3.ingredient1.ingredientIsTouched = t.burger3121isTouched;
            this.burger3.ingredient2.ingredientIsTouched = t.burger3221isTouched;
            this.burger3.ingredient3.ingredientIsTouched = t.burger3321isTouched;
            this.burger3.ingredient4.ingredientIsTouched = t.burger3421isTouched;
            this.burger3.ingredient5.ingredientIsTouched = t.burger3521isTouched;
            
            this.burger4.ingredient1.position.y = t.burger4121;
            this.burger4.ingredient2.position.y = t.burger4221;
            this.burger4.ingredient3.position.y = t.burger4321;
            this.burger4.ingredient4.position.y = t.burger4421;
            this.burger4.ingredient5.position.y = t.burger4521;
            this.burger4.ingredient1.ingredientIsTouched = t.burger4121isTouched;
            this.burger4.ingredient2.ingredientIsTouched = t.burger4221isTouched;
            this.burger4.ingredient3.ingredientIsTouched = t.burger4321isTouched;
            this.burger4.ingredient4.ingredientIsTouched = t.burger4421isTouched;
            this.burger4.ingredient5.ingredientIsTouched = t.burger4521isTouched;
            
            //Load downBread
            this.downBread1.ingredient1.position.y = t.downBread1121;
            this.downBread1.ingredient2.position.y = t.downBread1221;
            this.downBread1.ingredient3.position.y = t.downBread1321;
            this.downBread1.ingredient4.position.y = t.downBread1421;
            this.downBread1.ingredient5.position.y = t.downBread1521;
            this.downBread1.ingredient1.ingredientIsTouched = t.downBread1121isTouched;
            this.downBread1.ingredient2.ingredientIsTouched = t.downBread1221isTouched;
            this.downBread1.ingredient3.ingredientIsTouched = t.downBread1321isTouched;
            this.downBread1.ingredient4.ingredientIsTouched = t.downBread1421isTouched;
            this.downBread1.ingredient5.ingredientIsTouched = t.downBread1521isTouched;
            
            this.downBread2.ingredient1.position.y = t.downBread2121;
            this.downBread2.ingredient2.position.y = t.downBread2221;
            this.downBread2.ingredient3.position.y = t.downBread2321;
            this.downBread2.ingredient4.position.y = t.downBread2421;
            this.downBread2.ingredient5.position.y = t.downBread2521;
            this.downBread2.ingredient1.ingredientIsTouched = t.downBread2121isTouched;
            this.downBread2.ingredient2.ingredientIsTouched = t.downBread2221isTouched;
            this.downBread2.ingredient3.ingredientIsTouched = t.downBread2321isTouched;
            this.downBread2.ingredient4.ingredientIsTouched = t.downBread2421isTouched;
            this.downBread2.ingredient5.ingredientIsTouched = t.downBread2521isTouched;
            
            this.downBread3.ingredient1.position.y = t.downBread3121;
            this.downBread3.ingredient2.position.y = t.downBread3221;
            this.downBread3.ingredient3.position.y = t.downBread3321;
            this.downBread3.ingredient4.position.y = t.downBread3421;
            this.downBread3.ingredient5.position.y = t.downBread3521;
            this.downBread3.ingredient1.ingredientIsTouched = t.downBread3121isTouched;
            this.downBread3.ingredient2.ingredientIsTouched = t.downBread3221isTouched;
            this.downBread3.ingredient3.ingredientIsTouched = t.downBread3321isTouched;
            this.downBread3.ingredient4.ingredientIsTouched = t.downBread3421isTouched;
            this.downBread3.ingredient5.ingredientIsTouched = t.downBread3521isTouched;
            
            this.downBread4.ingredient1.position.y = t.downBread4121;
            this.downBread4.ingredient2.position.y = t.downBread4221;
            this.downBread4.ingredient3.position.y = t.downBread4321;
            this.downBread4.ingredient4.position.y = t.downBread4421;
            this.downBread4.ingredient5.position.y = t.downBread4521;
            this.downBread4.ingredient1.ingredientIsTouched = t.downBread4121isTouched;
            this.downBread4.ingredient2.ingredientIsTouched = t.downBread4221isTouched;
            this.downBread4.ingredient3.ingredientIsTouched = t.downBread4321isTouched;
            this.downBread4.ingredient4.ingredientIsTouched = t.downBread4421isTouched;
            this.downBread4.ingredient5.ingredientIsTouched = t.downBread4521isTouched;
        }
    },
    lessLive:function(){
        this.chef.lives--;
    },
    loadPeppers:function(){
        this.peppers = this.add.group();
        this.peppers.enableBody = true;
    },
    enableEnemyStairs:function(_enemy){
        _enemy.canChangeDirec = true;
    },
    render:function(){
        //this.powerUp.body.setSize(22, 28, 20, 16);
        //this.game.debug.body(this.powerUp);
        this.game.debug.body(this.chef);
    }
};
