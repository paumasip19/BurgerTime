var burgertime = burgertime || {};

burgertime.level3Multi2 ={
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
        
        this.map = this.game.add.tilemap('level3');
        this.map.addTilesetImage('Map');
        
        this.floor = this.map.createLayer('Floor');
        this.map.setCollisionBetween(3,3,true,'Floor');
        
        this.collisionMap = this.map.createLayer('Collisions');
        this.map.setCollisionBetween(6,6,true,'Collisions');
        
        this.stairs = this.map.createLayer('Stairs');
        this.map.setCollisionBetween(4,5,true,'Stairs');
        
        this.background = this.map.createLayer('Background');
        
        this.enemies = 3;
        
        this.chef = new burgertime.chef_prefab(this.game,this.game.world.centerX,this.game.world.centerY + 200,gameOptions.heroSpeed,gameOptions.heroSpeed,this);
        this.chef.frame = 7;
        
        this.salchicha = new burgertime.enemy_prefab(this.game,this.game.world.centerX-60,this.game.world.centerY-60,gameOptions.heroSpeed-100,gameOptions.heroSpeed-50,this);
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
        
        
        
        this.stair1 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*1,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*8,'TileTransparente');
        this.stair2 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*1,gameOptions.level1Height/35*19,gameOptions.level1Height/35*6,'TileTransparente');
        this.stair3 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*3,gameOptions.level1Height/35*19,gameOptions.level1Height/35*6,'TileTransparente');
        this.stair4 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*5,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*6,'TileTransparente');
        this.stair5 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*5,gameOptions.level1Height/35*11,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair6 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*5,gameOptions.level1Height/35*21.5,gameOptions.level1Height/35*8,'TileTransparente');
        this.stair7 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*7,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*3,'TileTransparente');
        this.stair8 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*7,gameOptions.level1Height/35*8.75,gameOptions.level1Height/35*8,'TileTransparente');
        this.stair9 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*7,gameOptions.level1Height/35*25.5,gameOptions.level1Height/35*4,'TileTransparente');
        this.stair10 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*9,gameOptions.level1Height/35*6.5,gameOptions.level1Height/35*10,'TileTransparente');
        this.stair11 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*11,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*3,'TileTransparente');
        this.stair12 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*11,gameOptions.level1Height/35*25.5,gameOptions.level1Height/35*4,'TileTransparente');
        this.stair13 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*13,gameOptions.level1Height/35*6.5,gameOptions.level1Height/35*6,'TileTransparente');
        this.stair14 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*13,gameOptions.level1Height/35*13,gameOptions.level1Height/35*16.5,'TileTransparente');
        this.stair15 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*17,gameOptions.level1Height/35*4.5,gameOptions.level1Height/35*8,'TileTransparente');
        this.stair16 = new burgertime.stairBox_prefab(this.game,gameOptions.level1Width/19*17,gameOptions.level1Height/35*19,gameOptions.level1Height/35*6,'TileTransparente');
        
        this.changeDir1 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*1+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*8,'TileBlanca');
        this.changeDir2 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*1+30,gameOptions.level1Height/35*18.5,gameOptions.level1Height/35*6,'TileBlanca');
        this.changeDir3 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*3+30,gameOptions.level1Height/35*18.5,gameOptions.level1Height/35*6,'TileBlanca');
        this.changeDir4 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*5+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*6,'TileBlanca');
        this.changeDir5 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*5+30,gameOptions.level1Height/35*10.5,gameOptions.level1Height/35*10,'TileBlanca');
        this.changeDir6 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*5+30,gameOptions.level1Height/35*21,gameOptions.level1Height/35*8,'TileBlanca');
        this.changeDir7 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*7+30,gameOptions.level1Height/35*4,gameOptions.level1Height/35*3,'TileBlanca');
        this.changeDir8 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*7+30,gameOptions.level1Height/35*7.75,gameOptions.level1Height/35*8,'TileBlanca');
        this.changeDir9 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*7+30,gameOptions.level1Height/35*24.5,gameOptions.level1Height/35*4,'TileBlanca');
        this.changeDir10 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*9+30,gameOptions.level1Height/35*5.5,gameOptions.level1Height/35*10,'TileBlanca');
        this.changeDir11 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*11+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*3,'TileBlanca');
        this.changeDir12 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*11+30,gameOptions.level1Height/35*24.5,gameOptions.level1Height/35*4,'TileBlanca');
        this.changeDir13 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*13+30,gameOptions.level1Height/35*5.5,gameOptions.level1Height/35*6,'TileBlanca');
        this.changeDir14 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*13+30,gameOptions.level1Height/35*12,gameOptions.level1Height/35*16.5,'TileBlanca');
        this.changeDir15 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*17+30,gameOptions.level1Height/35*3.5,gameOptions.level1Height/35*8,'TileBlanca');
        this.changeDir16 = new burgertime.direcChanger(this.game,gameOptions.level1Width/19*17+30,gameOptions.level1Height/35*18,gameOptions.level1Height/35*6,'TileBlanca');

        /*this.timer1 = this.game.time.events.loop(Phaser.Timer.SECOND*2,this.activatePowerUp,this);
        this.timer2 = this.game.time.events.loop(Phaser.Timer.SECOND*3,this.deactivatePowerUp,this);*/
        
        this.timeElapsedActivate = 0;
        this.timeElapsedDeactivate = 0;
        
        this.timerStairs = this.game.time.events.loop(Phaser.Timer.SECOND,this.activateStairs,this);
        
        this.upBread1 = new burgertime.ingredient_prefab(this.game,75+60, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread2 = new burgertime.ingredient_prefab(this.game,315+60, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread3 = new burgertime.ingredient_prefab(this.game,555+60, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread4 = new burgertime.ingredient_prefab(this.game,800+60, 145,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread5 = new burgertime.ingredient_prefab(this.game,75+60, 565,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        this.upBread6 = new burgertime.ingredient_prefab(this.game,800+60, 565,'BreadUp1','BreadUp2','BreadUp3', this.chef, this);
        
        this.burger1 = new burgertime.ingredient_prefab(this.game,75+60, 265,'Meat1','Meat2','Meat3', this.chef, this);
        this.burger2 = new burgertime.ingredient_prefab(this.game,315+60, 140+65,'Cheese1','Cheese2','Cheese3', this.chef, this);
        this.burger3 = new burgertime.ingredient_prefab(this.game,555+60, 140+65,'Meat1','Meat2','Meat3', this.chef, this);
        this.burger4 = new burgertime.ingredient_prefab(this.game,800+60, 265,'Cheese1','Cheese2','Cheese3', this.chef, this);
        this.burger5 = new burgertime.ingredient_prefab(this.game,75+60, 565+60,'Cheese1','Cheese2','Cheese3', this.chef, this);
        this.burger6 = new burgertime.ingredient_prefab(this.game,800+60, 565+60,'Meat1','Meat2','Meat3', this.chef, this);
        
        this.downBread1 = new burgertime.ingredient_prefab(this.game,75+60, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread2 = new burgertime.ingredient_prefab(this.game,315+60, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread3 = new burgertime.ingredient_prefab(this.game,555+60, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread4 = new burgertime.ingredient_prefab(this.game,800+60, 140+185,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread5 = new burgertime.ingredient_prefab(this.game,75+60, 565+120,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        this.downBread6 = new burgertime.ingredient_prefab(this.game,800+60, 565+120,'BreadDown1','BreadDown2','BreadDown3', this.chef, this);
        
        this.bandeja1 = this.game.add.sprite(65+60,470,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja1);
        this.bandeja1.body.allowGravity = false;
        this.bandeja1.body.immovable = true;
        
        this.bandeja2 = this.game.add.sprite(365,640,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja2);
        this.bandeja2.body.allowGravity = false;
        this.bandeja2.body.immovable = true;
        
        this.bandeja3 = this.game.add.sprite(605,640,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja3);
        this.bandeja3.body.allowGravity = false;
        this.bandeja3.body.immovable = true;
        
        this.bandeja4 = this.game.add.sprite(790+60,470,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja4);
        this.bandeja4.body.allowGravity = false;
        this.bandeja4.body.immovable = true;
        
        this.bandeja5 = this.game.add.sprite(65+60,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja5);
        this.bandeja5.body.allowGravity = false;
        this.bandeja5.body.immovable = true;
        
        this.bandeja6 = this.game.add.sprite(790+60,900,'Bandeja',0);
        this.game.physics.arcade.enable(this.bandeja6);
        this.bandeja6.body.allowGravity = false;
        this.bandeja6.body.immovable = true;
        
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
            this.music.pause();
            this.death.play();
            var h = this.saveData();
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
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir10)  ||
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir11)  ||
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir12)  ||
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir13)  ||
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir14)  ||
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir15)  ||
           this.game.physics.arcade.overlap(this.salchicha, this.changeDir16))
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
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir10)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir11)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir12)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir13)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir14)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir15)  || 
           this.game.physics.arcade.overlap(this.salchicha2, this.changeDir16))
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
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir10)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir11)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir12)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir13)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir14)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir15)  || 
           this.game.physics.arcade.overlap(this.salchicha3, this.changeDir16))
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
           this.game.physics.arcade.overlap(this.chef, this.stair11) ||
           this.game.physics.arcade.overlap(this.chef, this.stair12) ||
           this.game.physics.arcade.overlap(this.chef, this.stair13) ||
           this.game.physics.arcade.overlap(this.chef, this.stair14) ||
           this.game.physics.arcade.overlap(this.chef, this.stair15) ||
           this.game.physics.arcade.overlap(this.chef, this.stair16))
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
        
        
        var c = this.ingredientColisions();
        
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
                    if(gameOptions.level1Multi3Completed){
                        this.state.start(gameOptions.levelPlayer2);
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
            //this.state.start('level2');
        }
        
        if(this.levelCompleted){
            this.music.pause();
            this.complete.play();
            var w = this.saveData();
            gameOptions.level2Multi3Completed;
            this.levelCompleted = false;
            if(t.lives1 <= 0 || gameOptions.level1Multi3Complited){
                this.state.start('menu');
            }
            else{
                this.state.start(gameOptions.levelPlayer1);
            }
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
            t.level = 'level3Multi2';
            
            //Save upBread
           t.upBread1132 = this.upBread1.ingredient1.body.position.y;
           t.upBread1232 = this.upBread1.ingredient2.body.position.y;
           t.upBread1332 = this.upBread1.ingredient3.body.position.y;
           t.upBread1432 = this.upBread1.ingredient4.body.position.y;
           t.upBread1532 = this.upBread1.ingredient5.body.position.y;
           t.upBread1132isTouched = this.upBread1.ingredient1.ingredientIsTouched;
           t.upBread1232isTouched = this.upBread1.ingredient2.ingredientIsTouched;
           t.upBread1332isTouched = this.upBread1.ingredient3.ingredientIsTouched;
           t.upBread1432isTouched = this.upBread1.ingredient4.ingredientIsTouched;
           t.upBread1532isTouched = this.upBread1.ingredient5.ingredientIsTouched;
            t.upBread1132isDone = this.upBread1.isDone;
           t.upBread1232isDone = this.upBread2.isDone;
           t.upBread1332isDone = this.upBread3.isDone;
           t.upBread1432isDone = this.upBread4.isDone;
           t.upBread1532isDone = this.upBread5.isDone;
           t.upBread1632isDone = this.upBread6.isDone;
            
            t.upBread2132 = this.upBread2.ingredient1.body.position.y;
           t.upBread2232 = this.upBread2.ingredient2.body.position.y;
           t.upBread2332 = this.upBread2.ingredient3.body.position.y;
           t.upBread2432 = this.upBread2.ingredient4.body.position.y;
           t.upBread2532 = this.upBread2.ingredient5.body.position.y;
           t.upBread2132isTouched = this.upBread2.ingredient1.ingredientIsTouched;
           t.upBread2232isTouched = this.upBread2.ingredient2.ingredientIsTouched;
           t.upBread2332isTouched = this.upBread2.ingredient3.ingredientIsTouched;
           t.upBread2432isTouched = this.upBread2.ingredient4.ingredientIsTouched;
           t.upBread2532isTouched = this.upBread2.ingredient5.ingredientIsTouched;
            
            t.upBread3132 = this.upBread3.ingredient1.body.position.y;
           t.upBread3232 = this.upBread3.ingredient2.body.position.y;
           t.upBread3332 = this.upBread3.ingredient3.body.position.y;
           t.upBread3432 = this.upBread3.ingredient4.body.position.y;
           t.upBread3532 = this.upBread3.ingredient5.body.position.y;
           t.upBread3132isTouched = this.upBread3.ingredient1.ingredientIsTouched;
           t.upBread3232isTouched = this.upBread3.ingredient2.ingredientIsTouched;
           t.upBread3332isTouched = this.upBread3.ingredient3.ingredientIsTouched;
           t.upBread3432isTouched = this.upBread3.ingredient4.ingredientIsTouched;
           t.upBread3532isTouched = this.upBread3.ingredient5.ingredientIsTouched;
            
            t.upBread4132 = this.upBread4.ingredient1.body.position.y;
           t.upBread4232 = this.upBread4.ingredient2.body.position.y;
           t.upBread4332 = this.upBread4.ingredient3.body.position.y;
           t.upBread4432 = this.upBread4.ingredient4.body.position.y;
           t.upBread4532 = this.upBread4.ingredient5.body.position.y;
           t.upBread4132isTouched = this.upBread4.ingredient1.ingredientIsTouched;
           t.upBread4232isTouched = this.upBread4.ingredient2.ingredientIsTouched;
           t.upBread4332isTouched = this.upBread4.ingredient3.ingredientIsTouched;
           t.upBread4432isTouched = this.upBread4.ingredient4.ingredientIsTouched;
           t.upBread4532isTouched = this.upBread4.ingredient5.ingredientIsTouched;
            
            t.upBread5132 = this.upBread5.ingredient1.body.position.y;
           t.upBread5232 = this.upBread5.ingredient2.body.position.y;
           t.upBread5332 = this.upBread5.ingredient3.body.position.y;
           t.upBread5432 = this.upBread5.ingredient4.body.position.y;
           t.upBread5532 = this.upBread5.ingredient5.body.position.y;
           t.upBread5132isTouched = this.upBread5.ingredient1.ingredientIsTouched;
           t.upBread5232isTouched = this.upBread5.ingredient2.ingredientIsTouched;
           t.upBread5332isTouched = this.upBread5.ingredient3.ingredientIsTouched;
           t.upBread5432isTouched = this.upBread5.ingredient4.ingredientIsTouched;
           t.upBread5532isTouched = this.upBread5.ingredient5.ingredientIsTouched;
            
            t.upBread6132 = this.upBread6.ingredient1.body.position.y;
           t.upBread6232 = this.upBread6.ingredient2.body.position.y;
           t.upBread6332 = this.upBread6.ingredient3.body.position.y;
           t.upBread6432 = this.upBread6.ingredient4.body.position.y;
           t.upBread6532 = this.upBread6.ingredient5.body.position.y;
           t.upBread6132isTouched = this.upBread6.ingredient1.ingredientIsTouched;
           t.upBread6232isTouched = this.upBread6.ingredient2.ingredientIsTouched;
           t.upBread6332isTouched = this.upBread6.ingredient3.ingredientIsTouched;
           t.upBread6432isTouched = this.upBread6.ingredient4.ingredientIsTouched;
           t.upBread6532isTouched = this.upBread6.ingredient5.ingredientIsTouched;
            
            //Save burger
            t.burger1132 = this.burger1.ingredient1.position.y;
            t.burger1232 = this.burger1.ingredient2.position.y;
            t.burger1332 = this.burger1.ingredient3.position.y;
            t.burger1432 = this.burger1.ingredient4.position.y;
            t.burger1532 = this.burger1.ingredient5.position.y;
            t.burger1132isTouched = this.burger1.ingredient1.ingredientIsTouched;
            t.burger1232isTouched = this.burger1.ingredient2.ingredientIsTouched;
            t.burger1332isTouched = this.burger1.ingredient3.ingredientIsTouched;
            t.burger1432isTouched = this.burger1.ingredient4.ingredientIsTouched;
            t.burger1532isTouched = this.burger1.ingredient5.ingredientIsTouched;
            
            t.burger2132 = this.burger2.ingredient1.position.y;
            t.burger2232 = this.burger2.ingredient2.position.y;
            t.burger2332 = this.burger2.ingredient3.position.y;
            t.burger2432 = this.burger2.ingredient4.position.y;
            t.burger2532 = this.burger2.ingredient5.position.y;
            t.burger2132isTouched = this.burger2.ingredient1.ingredientIsTouched;
            t.burger2232isTouched = this.burger2.ingredient2.ingredientIsTouched;
            t.burger2332isTouched = this.burger2.ingredient3.ingredientIsTouched;
            t.burger2432isTouched = this.burger2.ingredient4.ingredientIsTouched;
            t.burger2532isTouched = this.burger2.ingredient5.ingredientIsTouched;
        
            t.burger3132 = this.burger3.ingredient1.position.y;
            t.burger3232 = this.burger3.ingredient2.position.y;
            t.burger3332 = this.burger3.ingredient3.position.y;
            t.burger3432 = this.burger3.ingredient4.position.y;
            t.burger3532 = this.burger3.ingredient5.position.y;
            t.burger3132isTouched = this.burger3.ingredient1.ingredientIsTouched;
            t.burger3232isTouched = this.burger3.ingredient2.ingredientIsTouched;
            t.burger3332isTouched = this.burger3.ingredient3.ingredientIsTouched;
            t.burger3432isTouched = this.burger3.ingredient4.ingredientIsTouched;
            t.burger3532isTouched = this.burger3.ingredient5.ingredientIsTouched;
            
            t.burger4132 = this.burger4.ingredient1.position.y;
            t.burger4232 = this.burger4.ingredient2.position.y;
            t.burger4332 = this.burger4.ingredient3.position.y;
            t.burger4432 = this.burger4.ingredient4.position.y;
            t.burger4532 = this.burger4.ingredient5.position.y;
            t.burger4132isTouched = this.burger4.ingredient1.ingredientIsTouched;
            t.burger4232isTouched = this.burger4.ingredient2.ingredientIsTouched;
            t.burger4332isTouched = this.burger4.ingredient3.ingredientIsTouched;
            t.burger4432isTouched = this.burger4.ingredient4.ingredientIsTouched;
            t.burger4532isTouched = this.burger4.ingredient5.ingredientIsTouched;
            
            t.burger5132 = this.burger5.ingredient1.position.y;
            t.burger5232 = this.burger5.ingredient2.position.y;
            t.burger5332 = this.burger5.ingredient3.position.y;
            t.burger5432 = this.burger5.ingredient4.position.y;
            t.burger5532 = this.burger5.ingredient5.position.y;
            t.burger5132isTouched = this.burger5.ingredient1.ingredientIsTouched;
            t.burger5232isTouched = this.burger5.ingredient2.ingredientIsTouched;
            t.burger5332isTouched = this.burger5.ingredient3.ingredientIsTouched;
            t.burger5432isTouched = this.burger5.ingredient4.ingredientIsTouched;
            t.burger5532isTouched = this.burger5.ingredient5.ingredientIsTouched;
            
            t.burger6132 = this.burger6.ingredient1.position.y;
            t.burger6232 = this.burger6.ingredient2.position.y;
            t.burger6332 = this.burger6.ingredient3.position.y;
            t.burger6432 = this.burger6.ingredient4.position.y;
            t.burger6532 = this.burger6.ingredient5.position.y;
            t.burger6132isTouched = this.burger6.ingredient1.ingredientIsTouched;
            t.burger6232isTouched = this.burger6.ingredient2.ingredientIsTouched;
            t.burger6332isTouched = this.burger6.ingredient3.ingredientIsTouched;
            t.burger6432isTouched = this.burger6.ingredient4.ingredientIsTouched;
            t.burger6532isTouched = this.burger6.ingredient5.ingredientIsTouched;
            
            //Save downBread
            t.downBread1132 = this.downBread1.ingredient1.position.y;
            t.downBread1232 = this.downBread1.ingredient2.position.y;
            t.downBread1332 = this.downBread1.ingredient3.position.y;
            t.downBread1432 = this.downBread1.ingredient4.position.y;
            t.downBread1532 = this.downBread1.ingredient5.position.y;
            t.downBread1132isTouched = this.downBread1.ingredient1.ingredientIsTouched;
            t.downBread1232isTouched = this.downBread1.ingredient2.ingredientIsTouched;
            t.downBread1332isTouched = this.downBread1.ingredient3.ingredientIsTouched;
            t.downBread1432isTouched = this.downBread1.ingredient4.ingredientIsTouched;
            t.downBread1532isTouched = this.downBread1.ingredient5.ingredientIsTouched;
            
            t.downBread2132 = this.downBread2.ingredient1.position.y;
            t.downBread2232 = this.downBread2.ingredient2.position.y;
            t.downBread2332 = this.downBread2.ingredient3.position.y;
            t.downBread2432 = this.downBread2.ingredient4.position.y;
            t.downBread2532 = this.downBread2.ingredient5.position.y;
            t.downBread2132isTouched = this.downBread2.ingredient1.ingredientIsTouched;
            t.downBread2232isTouched = this.downBread2.ingredient2.ingredientIsTouched;
            t.downBread2332isTouched = this.downBread2.ingredient3.ingredientIsTouched;
            t.downBread2432isTouched = this.downBread2.ingredient4.ingredientIsTouched;
            t.downBread2532isTouched = this.downBread2.ingredient5.ingredientIsTouched;
            
            t.downBread3132 = this.downBread3.ingredient1.position.y;
            t.downBread3232 = this.downBread3.ingredient2.position.y;
            t.downBread3332 = this.downBread3.ingredient3.position.y;
            t.downBread3432 = this.downBread3.ingredient4.position.y;
            t.downBread3532 = this.downBread3.ingredient5.position.y;
            t.downBread3132isTouched = this.downBread3.ingredient1.ingredientIsTouched;
            t.downBread3232isTouched = this.downBread3.ingredient2.ingredientIsTouched;
            t.downBread3332isTouched = this.downBread3.ingredient3.ingredientIsTouched;
            t.downBread3432isTouched = this.downBread3.ingredient4.ingredientIsTouched;
            t.downBread3532isTouched = this.downBread3.ingredient5.ingredientIsTouched;
            
            t.downBread4132 = this.downBread4.ingredient1.position.y;
            t.downBread4232 = this.downBread4.ingredient2.position.y;
            t.downBread4332 = this.downBread4.ingredient3.position.y;
            t.downBread4432 = this.downBread4.ingredient4.position.y;
            t.downBread4532 = this.downBread4.ingredient5.position.y;
            t.downBread4132isTouched = this.downBread4.ingredient1.ingredientIsTouched;
            t.downBread4232isTouched = this.downBread4.ingredient2.ingredientIsTouched;
            t.downBread4332isTouched = this.downBread4.ingredient3.ingredientIsTouched;
            t.downBread4432isTouched = this.downBread4.ingredient4.ingredientIsTouched;
            t.downBread4532isTouched = this.downBread4.ingredient5.ingredientIsTouched;
            
            t.downBread5132 = this.downBread5.ingredient1.position.y;
            t.downBread5232 = this.downBread5.ingredient2.position.y;
            t.downBread5332 = this.downBread5.ingredient3.position.y;
            t.downBread5432 = this.downBread5.ingredient4.position.y;
            t.downBread5532 = this.downBread5.ingredient5.position.y;
            t.downBread5132isTouched = this.downBread5.ingredient1.ingredientIsTouched;
            t.downBread5232isTouched = this.downBread5.ingredient2.ingredientIsTouched;
            t.downBread5332isTouched = this.downBread5.ingredient3.ingredientIsTouched;
            t.downBread5432isTouched = this.downBread5.ingredient4.ingredientIsTouched;
            t.downBread5532isTouched = this.downBread5.ingredient5.ingredientIsTouched;
            
            t.downBread6132 = this.downBread6.ingredient1.position.y;
            t.downBread6232 = this.downBread6.ingredient2.position.y;
            t.downBread6332 = this.downBread6.ingredient3.position.y;
            t.downBread6432 = this.downBread6.ingredient4.position.y;
            t.downBread6532 = this.downBread6.ingredient5.position.y;
            t.downBread6132isTouched = this.downBread6.ingredient1.ingredientIsTouched;
            t.downBread6232isTouched = this.downBread6.ingredient2.ingredientIsTouched;
            t.downBread6332isTouched = this.downBread6.ingredient3.ingredientIsTouched;
            t.downBread6432isTouched = this.downBread6.ingredient4.ingredientIsTouched;
            t.downBread6532isTouched = this.downBread6.ingredient5.ingredientIsTouched;
        }
        localStorage.setItem('actualUser', JSON.stringify(t));
        
        localStorage.setItem('user' + t.username, JSON.stringify(t));
        
    },
    loadData:function(){
        var t = JSON.parse(localStorage.getItem('actualUser'));
        console.log(t.highScore);
        if(gameOptions.firstTime32 == 1){
            this.chef.points = t.score1;
            this.chef.lives = t.lives1;
            this.chef.pepper = t.pepper1;
            gameOptions.levelPlayer1 = 'level3Multi2';
            gameOptions.firstTime32++;
        }else{
           //this.scoreHI.text = t.highScore;
            this.chef.points = t.score1;
            this.chef.lives = t.lives1; 
            this.chef.pepper = t.pepper1;
            gameOptions.levelPlayer1 = t.level;
            
            //Load upBread
            this.upBread1.ingredient1.position.y = t.upBread1132;
            this.upBread1.ingredient2.position.y = t.upBread1232;
            this.upBread1.ingredient3.position.y = t.upBread1332;
            this.upBread1.ingredient4.position.y = t.upBread1432;
            this.upBread1.ingredient5.position.y = t.upBread1532;
            this.upBread1.ingredient1.ingredientIsTouched = t.upBread1132isTouched;
            this.upBread1.ingredient2.ingredientIsTouched = t.upBread1232isTouched;
            this.upBread1.ingredient3.ingredientIsTouched = t.upBread1332isTouched;
            this.upBread1.ingredient4.ingredientIsTouched = t.upBread1432isTouched;
            this.upBread1.ingredient5.ingredientIsTouched = t.upBread1532isTouched;
            this.upBread1.isDone = t.upBread1132isDone;
            this.upBread2.isDone = t.upBread1232isDone;
            this.upBread3.isDone = t.upBread1332isDone;
            this.upBread4.isDone = t.upBread1432isDone;
            this.upBread5.isDone = t.upBread1532isDone;
            this.upBread6.isDone = t.upBread1632isDone;
            
            this.upBread2.ingredient1.position.y = t.upBread2132;
            this.upBread2.ingredient2.position.y = t.upBread2232;
            this.upBread2.ingredient3.position.y = t.upBread2332;
            this.upBread2.ingredient4.position.y = t.upBread2432;
            this.upBread2.ingredient5.position.y = t.upBread2532;
            this.upBread2.ingredient1.ingredientIsTouched = t.upBread2132isTouched;
            this.upBread2.ingredient2.ingredientIsTouched = t.upBread2232isTouched;
            this.upBread2.ingredient3.ingredientIsTouched = t.upBread2332isTouched;
            this.upBread2.ingredient4.ingredientIsTouched = t.upBread2432isTouched;
            this.upBread2.ingredient5.ingredientIsTouched = t.upBread2532isTouched;
            
            this.upBread3.ingredient1.position.y = t.upBread3132;
            this.upBread3.ingredient2.position.y = t.upBread3232;
            this.upBread3.ingredient3.position.y = t.upBread3332;
            this.upBread3.ingredient4.position.y = t.upBread3432;
            this.upBread3.ingredient5.position.y = t.upBread3532;
            this.upBread3.ingredient1.ingredientIsTouched = t.upBread3132isTouched;
            this.upBread3.ingredient2.ingredientIsTouched = t.upBread3232isTouched;
            this.upBread3.ingredient3.ingredientIsTouched = t.upBread3332isTouched;
            this.upBread3.ingredient4.ingredientIsTouched = t.upBread3432isTouched;
            this.upBread3.ingredient5.ingredientIsTouched = t.upBread3532isTouched;
            
            this.upBread4.ingredient1.position.y = t.upBread4132;
            this.upBread4.ingredient2.position.y = t.upBread4232;
            this.upBread4.ingredient3.position.y = t.upBread4332;
            this.upBread4.ingredient4.position.y = t.upBread4432;
            this.upBread4.ingredient5.position.y = t.upBread4532;
            this.upBread4.ingredient1.ingredientIsTouched = t.upBread4132isTouched;
            this.upBread4.ingredient2.ingredientIsTouched = t.upBread4232isTouched;
            this.upBread4.ingredient3.ingredientIsTouched = t.upBread4332isTouched;
            this.upBread4.ingredient4.ingredientIsTouched = t.upBread4432isTouched;
            this.upBread4.ingredient5.ingredientIsTouched = t.upBread4532isTouched;
            
            this.upBread5.ingredient1.position.y = t.upBread5132;
            this.upBread5.ingredient2.position.y = t.upBread5232;
            this.upBread5.ingredient3.position.y = t.upBread5332;
            this.upBread5.ingredient4.position.y = t.upBread5432;
            this.upBread5.ingredient5.position.y = t.upBread5532;
            this.upBread5.ingredient1.ingredientIsTouched = t.upBread5132isTouched;
            this.upBread5.ingredient2.ingredientIsTouched = t.upBread5232isTouched;
            this.upBread5.ingredient3.ingredientIsTouched = t.upBread5332isTouched;
            this.upBread5.ingredient4.ingredientIsTouched = t.upBread5432isTouched;
            this.upBread5.ingredient5.ingredientIsTouched = t.upBread5532isTouched;
            
            this.upBread6.ingredient1.position.y = t.upBread6132;
            this.upBread6.ingredient2.position.y = t.upBread6232;
            this.upBread6.ingredient3.position.y = t.upBread6332;
            this.upBread6.ingredient4.position.y = t.upBread6432;
            this.upBread6.ingredient5.position.y = t.upBread6532;
            this.upBread6.ingredient1.ingredientIsTouched = t.upBread6132isTouched;
            this.upBread6.ingredient2.ingredientIsTouched = t.upBread6232isTouched;
            this.upBread6.ingredient3.ingredientIsTouched = t.upBread6332isTouched;
            this.upBread6.ingredient4.ingredientIsTouched = t.upBread6432isTouched;
            this.upBread6.ingredient5.ingredientIsTouched = t.upBread6532isTouched;
            
            //Load burger
            this.burger1.ingredient1.position.y = t.burger1132;
            this.burger1.ingredient2.position.y = t.burger1232;
            this.burger1.ingredient3.position.y = t.burger1332;
            this.burger1.ingredient4.position.y = t.burger1432;
            this.burger1.ingredient5.position.y = t.burger1532;
            this.burger1.ingredient1.ingredientIsTouched = t.burger1132isTouched;
            this.burger1.ingredient2.ingredientIsTouched = t.burger1232isTouched;
            this.burger1.ingredient3.ingredientIsTouched = t.burger1332isTouched;
            this.burger1.ingredient4.ingredientIsTouched = t.burger1432isTouched;
            this.burger1.ingredient5.ingredientIsTouched = t.burger1532isTouched;
            
            this.burger2.ingredient1.position.y = t.burger2132;
            this.burger2.ingredient2.position.y = t.burger2232;
            this.burger2.ingredient3.position.y = t.burger2332;
            this.burger2.ingredient4.position.y = t.burger2432;
            this.burger2.ingredient5.position.y = t.burger2532;
            this.burger2.ingredient1.ingredientIsTouched = t.burger2132isTouched;
            this.burger2.ingredient2.ingredientIsTouched = t.burger2232isTouched;
            this.burger2.ingredient3.ingredientIsTouched = t.burger2332isTouched;
            this.burger2.ingredient4.ingredientIsTouched = t.burger2432isTouched;
            this.burger2.ingredient5.ingredientIsTouched = t.burger2532isTouched;
            
            this.burger3.ingredient1.position.y = t.burger3132;
            this.burger3.ingredient2.position.y = t.burger3232;
            this.burger3.ingredient3.position.y = t.burger3332;
            this.burger3.ingredient4.position.y = t.burger3432;
            this.burger3.ingredient5.position.y = t.burger3532;
            this.burger3.ingredient1.ingredientIsTouched = t.burger3132isTouched;
            this.burger3.ingredient2.ingredientIsTouched = t.burger3232isTouched;
            this.burger3.ingredient3.ingredientIsTouched = t.burger3332isTouched;
            this.burger3.ingredient4.ingredientIsTouched = t.burger3432isTouched;
            this.burger3.ingredient5.ingredientIsTouched = t.burger3532isTouched;
            
            this.burger4.ingredient1.position.y = t.burger4132;
            this.burger4.ingredient2.position.y = t.burger4232;
            this.burger4.ingredient3.position.y = t.burger4332;
            this.burger4.ingredient4.position.y = t.burger4432;
            this.burger4.ingredient5.position.y = t.burger4532;
            this.burger4.ingredient1.ingredientIsTouched = t.burger4132isTouched;
            this.burger4.ingredient2.ingredientIsTouched = t.burger4232isTouched;
            this.burger4.ingredient3.ingredientIsTouched = t.burger4332isTouched;
            this.burger4.ingredient4.ingredientIsTouched = t.burger4432isTouched;
            this.burger4.ingredient5.ingredientIsTouched = t.burger4532isTouched;
            
            this.burger5.ingredient1.position.y = t.burger5132;
            this.burger5.ingredient2.position.y = t.burger5232;
            this.burger5.ingredient3.position.y = t.burger5332;
            this.burger5.ingredient4.position.y = t.burger5432;
            this.burger5.ingredient5.position.y = t.burger5532;
            this.burger5.ingredient1.ingredientIsTouched = t.burger5132isTouched;
            this.burger5.ingredient2.ingredientIsTouched = t.burger5232isTouched;
            this.burger5.ingredient3.ingredientIsTouched = t.burger5332isTouched;
            this.burger5.ingredient4.ingredientIsTouched = t.burger5432isTouched;
            this.burger5.ingredient5.ingredientIsTouched = t.burger5532isTouched;
            
            this.burger6.ingredient1.position.y = t.burger6132;
            this.burger6.ingredient2.position.y = t.burger6232;
            this.burger6.ingredient3.position.y = t.burger6332;
            this.burger6.ingredient4.position.y = t.burger6432;
            this.burger6.ingredient5.position.y = t.burger6532;
            this.burger6.ingredient1.ingredientIsTouched = t.burger6132isTouched;
            this.burger6.ingredient2.ingredientIsTouched = t.burger6232isTouched;
            this.burger6.ingredient3.ingredientIsTouched = t.burger6332isTouched;
            this.burger6.ingredient4.ingredientIsTouched = t.burger6432isTouched;
            this.burger6.ingredient5.ingredientIsTouched = t.burger6532isTouched;
            
            //Load downBread
            this.downBread1.ingredient1.position.y = t.downBread1132;
            this.downBread1.ingredient2.position.y = t.downBread1232;
            this.downBread1.ingredient3.position.y = t.downBread1332;
            this.downBread1.ingredient4.position.y = t.downBread1432;
            this.downBread1.ingredient5.position.y = t.downBread1532;
            this.downBread1.ingredient1.ingredientIsTouched = t.downBread1132isTouched;
            this.downBread1.ingredient2.ingredientIsTouched = t.downBread1232isTouched;
            this.downBread1.ingredient3.ingredientIsTouched = t.downBread1332isTouched;
            this.downBread1.ingredient4.ingredientIsTouched = t.downBread1432isTouched;
            this.downBread1.ingredient5.ingredientIsTouched = t.downBread1532isTouched;
            
            this.downBread2.ingredient1.position.y = t.downBread2132;
            this.downBread2.ingredient2.position.y = t.downBread2232;
            this.downBread2.ingredient3.position.y = t.downBread2332;
            this.downBread2.ingredient4.position.y = t.downBread2432;
            this.downBread2.ingredient5.position.y = t.downBread2532;
            this.downBread2.ingredient1.ingredientIsTouched = t.downBread2132isTouched;
            this.downBread2.ingredient2.ingredientIsTouched = t.downBread2232isTouched;
            this.downBread2.ingredient3.ingredientIsTouched = t.downBread2332isTouched;
            this.downBread2.ingredient4.ingredientIsTouched = t.downBread2432isTouched;
            this.downBread2.ingredient5.ingredientIsTouched = t.downBread2532isTouched;
            
            this.downBread3.ingredient1.position.y = t.downBread3132;
            this.downBread3.ingredient2.position.y = t.downBread3232;
            this.downBread3.ingredient3.position.y = t.downBread3332;
            this.downBread3.ingredient4.position.y = t.downBread3432;
            this.downBread3.ingredient5.position.y = t.downBread3532;
            this.downBread3.ingredient1.ingredientIsTouched = t.downBread3132isTouched;
            this.downBread3.ingredient2.ingredientIsTouched = t.downBread3232isTouched;
            this.downBread3.ingredient3.ingredientIsTouched = t.downBread3332isTouched;
            this.downBread3.ingredient4.ingredientIsTouched = t.downBread3432isTouched;
            this.downBread3.ingredient5.ingredientIsTouched = t.downBread3532isTouched;
        
            this.downBread4.ingredient1.position.y = t.downBread4132;
            this.downBread4.ingredient2.position.y = t.downBread4232;
            this.downBread4.ingredient3.position.y = t.downBread4332;
            this.downBread4.ingredient4.position.y = t.downBread4432;
            this.downBread4.ingredient5.position.y = t.downBread4532;
            this.downBread4.ingredient1.ingredientIsTouched = t.downBread4132isTouched;
            this.downBread4.ingredient2.ingredientIsTouched = t.downBread4232isTouched;
            this.downBread4.ingredient3.ingredientIsTouched = t.downBread4332isTouched;
            this.downBread4.ingredient4.ingredientIsTouched = t.downBread4432isTouched;
            this.downBread4.ingredient5.ingredientIsTouched = t.downBread4532isTouched;
            
            this.downBread5.ingredient1.position.y = t.downBread5132;
            this.downBread5.ingredient2.position.y = t.downBread5232;
            this.downBread5.ingredient3.position.y = t.downBread5332;
            this.downBread5.ingredient4.position.y = t.downBread5432;
            this.downBread5.ingredient5.position.y = t.downBread5532;
            this.downBread5.ingredient1.ingredientIsTouched = t.downBread5132isTouched;
            this.downBread5.ingredient2.ingredientIsTouched = t.downBread5232isTouched;
            this.downBread5.ingredient3.ingredientIsTouched = t.downBread5332isTouched;
            this.downBread5.ingredient4.ingredientIsTouched = t.downBread5432isTouched;
            this.downBread5.ingredient5.ingredientIsTouched = t.downBread5532isTouched;
            
            this.downBread6.ingredient1.position.y = t.downBread6132;
            this.downBread6.ingredient2.position.y = t.downBread6232;
            this.downBread6.ingredient3.position.y = t.downBread6332;
            this.downBread6.ingredient4.position.y = t.downBread6432;
            this.downBread6.ingredient5.position.y = t.downBread6532;
            this.downBread6.ingredient1.ingredientIsTouched = t.downBread6132isTouched;
            this.downBread6.ingredient2.ingredientIsTouched = t.downBread6232isTouched;
            this.downBread6.ingredient3.ingredientIsTouched = t.downBread6332isTouched;
            this.downBread6.ingredient4.ingredientIsTouched = t.downBread6432isTouched;
            this.downBread6.ingredient5.ingredientIsTouched = t.downBread6532isTouched;
        }
    },
    lessLive:function(){
        this.chef.lives--;
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
    nextLevel:function(){
        this.levelCompleted = true;
    },
    stairTouch:function(_chef,_stairs){
        _chef.body.allowGravity = false;
        this.map.setCollisionBetween(4,5,false,'Stairs');
    },
    activateStairs:function(){
        this.chef.body.allowGravity = true;
        this.map.setCollisionBetween(4,5,true,'Stairs');
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
