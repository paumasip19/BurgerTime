var burgertime = burgertime || {};

burgertime.level1Multi1 ={
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
        
        this.salchicha2 = new burgertime.enemy_prefab(this.game,3000,3000,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
        this.salchicha2.body.allowGravity = false;
        
        this.salchicha3 = new burgertime.enemy_prefab(this.game,2000,2000,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
        this.salchicha3.body.allowGravity = false;
        
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
        
        this.changeDir1 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*1+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*5,'TileTransparente');
        this.changeDir3 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*1+30,gameOptions.level1Height/35*12,gameOptions.level1Height/35*12,'TileTransparente');
        this.changeDir6 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*3+30,gameOptions.level1Height/35*8,gameOptions.level1Height/35*11,'TileTransparente');
        this.changeDir9 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*5+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*20,'TileTransparente');
        this.changeDir14 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*7+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*7,'TileTransparente');
        this.changeDir16 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*9+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*20,'TileTransparente');
        this.changeDir20 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*11+30,gameOptions.level1Height/35*8,gameOptions.level1Height/35*7,'TileTransparente');
        this.changeDir22 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*13+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*20,'TileTransparente');
        this.changeDir27 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*15+30,gameOptions.level1Height/35*12.5,gameOptions.level1Height/35*11.5,'TileTransparente');
        this.changeDir30 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*17+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*9,'TileTransparente');
        this.changeDir33 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*17+30,gameOptions.level1Height/35*16.5,gameOptions.level1Height/35*7.5,'TileTransparente');
        
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
    loadPeppers:function(){
        this.peppers = this.add.group();
        this.peppers.enableBody = true;
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
        
        //this.game.physics.arcade.collide(this.chef,this.stairs,this.stairTouch, null, this);
        this.game.physics.arcade.collide(this.chef,this.floor,this.platformTouch, null, this);
        this.game.physics.arcade.collide(this.chef,this.floor,this.platformTouch, null, this);
        this.game.physics.arcade.collide(this.chef, this.collisionMap);
        
        if (this.game.physics.arcade.overlap(this.salchicha, this.changeDir1)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir3)   || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir6)   || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir9)   || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir14)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir16)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir20)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir22)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir27)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir30)  || 
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir33))
            {   this.salchichaOverlaps = true; } else {
                this.salchichaOverlaps = false;
            }
        
        if (this.game.physics.arcade.overlap(this.salchicha2, this.changeDir1)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir3)   || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir6)   || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir9)   || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir14)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir16)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir20)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir22)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir27)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir30)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir33))
            {   this.salchicha2Overlaps = true; } else {
                this.salchicha2Overlaps = false;
            }
        
        if (this.game.physics.arcade.overlap(this.salchicha3, this.changeDir1)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir3)   || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir6)   || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir9)   || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir14)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir16)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir20)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir22)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir27)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir30)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir33))
            {   this.salchicha3Overlaps = true; } else {
                this.salchicha3Overlaps = false;
            }
        
        
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
        
        //this.game.physics.arcade.collide(this.chef, this.burgerColisions);
        this.game.physics.arcade.collide(this.chef,this.salchicha,this.killChef,null,this); 
        this.game.physics.arcade.collide(this.chef,this.salchicha2,this.killChef,null,this); 
        this.game.physics.arcade.collide(this.chef,this.salchicha3,this.killChef,null,this);
        
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
        console.log(gameOptions.levelPlayer1);
        console.log(gameOptions.levelPlayer2);
        console.log(gameOptions.level2Multi3Completed)
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
                    this.chef.position.x = this.game.world.centerX+150;
                    this.chef.position.y = this.game.world.centerX+100;
                    
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
            
        }
        
        if(this.levelCompleted){
            this.music.pause();
            this.complete.play();
            this.chef.points = 0;
            this.levelCompleted = false;
            var w = this.saveData(); //Guarda score para siguiente nivel
            //next level
            this.state.start('level2Multi1');
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
            t.level = 'level1Multi1';
            
            //Save upBread
           t.upBread11 = this.upBread1.ingredient1.position.y;
           t.upBread12 = this.upBread1.ingredient2.position.y;
           t.upBread13 = this.upBread1.ingredient3.position.y;
           t.upBread14 = this.upBread1.ingredient4.position.y;
           t.upBread15 = this.upBread1.ingredient5.position.y;
           t.upBread11isTouched = this.upBread1.ingredient1.ingredientIsTouched;
           t.upBread12isTouched = this.upBread1.ingredient2.ingredientIsTouched;
           t.upBread13isTouched = this.upBread1.ingredient3.ingredientIsTouched;
           t.upBread14isTouched = this.upBread1.ingredient4.ingredientIsTouched;
           t.upBread15isTouched = this.upBread1.ingredient5.ingredientIsTouched;
           t.upBread11isDone = this.upBread1.isDone;
           t.upBread12isDone = this.upBread2.isDone;
           t.upBread13isDone = this.upBread3.isDone;
           t.upBread14isDone = this.upBread4.isDone;
            
            t.upBread21 = this.upBread2.ingredient1.position.y;
           t.upBread22 = this.upBread2.ingredient2.position.y;
           t.upBread23 = this.upBread2.ingredient3.position.y;
           t.upBread24 = this.upBread2.ingredient4.position.y;
           t.upBread25 = this.upBread2.ingredient5.position.y;
           t.upBread21isTouched = this.upBread2.ingredient1.ingredientIsTouched;
           t.upBread22isTouched = this.upBread2.ingredient2.ingredientIsTouched;
           t.upBread23isTouched = this.upBread2.ingredient3.ingredientIsTouched;
           t.upBread24isTouched = this.upBread2.ingredient4.ingredientIsTouched;
           t.upBread25isTouched = this.upBread2.ingredient5.ingredientIsTouched;
            
            t.upBread31 = this.upBread3.ingredient1.position.y;
           t.upBread32 = this.upBread3.ingredient2.position.y;
           t.upBread33 = this.upBread3.ingredient3.position.y;
           t.upBread34 = this.upBread3.ingredient4.position.y;
           t.upBread35 = this.upBread3.ingredient5.position.y;
           t.upBread31isTouched = this.upBread3.ingredient1.ingredientIsTouched;
           t.upBread32isTouched = this.upBread3.ingredient2.ingredientIsTouched;
           t.upBread33isTouched = this.upBread3.ingredient3.ingredientIsTouched;
           t.upBread34isTouched = this.upBread3.ingredient4.ingredientIsTouched;
           t.upBread35isTouched = this.upBread3.ingredient5.ingredientIsTouched;
            
            t.upBread41 = this.upBread4.ingredient1.position.y;
           t.upBread42 = this.upBread4.ingredient2.position.y;
           t.upBread43 = this.upBread4.ingredient3.position.y;
           t.upBread44 = this.upBread4.ingredient4.position.y;
           t.upBread45 = this.upBread4.ingredient5.position.y;
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
            this.upBread1.isDone = t.upBread11isDone;
            this.upBread2.isDone = t.upBread12isDone;
            this.upBread3.isDone = t.upBread13isDone;
            this.upBread4.isDone = t.upBread14isDone;
            
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
    getScore:function(){
        var t = JSON.parse(localStorage.getItem('score'));
        this.chef.points = t.s;
    },
    setScore:function(){
        var test = { 's': this.chef.points };
        localStorage.setItem('score', JSON.stringify(test));
    },
    enableEnemyStairs:function(_enemy){
        _enemy.canChangeDirec = true;
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










