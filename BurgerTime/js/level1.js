var burgertime = burgertime || {};

burgertime.level1 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y = gameOptions.heroGravity;
        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
        
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        this.load.spritesheet('chef', ruta+'ChefRamsay.png', 12, 25);
        this.load.image('PowerUp1', ruta+'PowerUp1.png');
        this.load.image('PowerUp2', ruta+'PowerUp2.png');
        this.load.image('PowerUp3', ruta+'PowerUp3.png');
        
        this.load.image('Map', ruta+'SpritesheetMaps.png');    
        this.load.tilemap('level1','assets/levels/Level1.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.audio('mainTheme', 'assets/audio/main_theme.mp3');
        this.load.audio('start', 'assets/audio/game_start.mp3');
        this.load.audio('levelComplete', 'assets/audio/stage_complete.mp3');
        this.load.audio('death', 'assets/audio/death_theme.mp3');
    },
    create:function(){
        //this.game.physics.arcade.enable(this.entry);
        //this.entry.body.allowGravity = false;
        //this.entry.body.immovable = true;
        
        /*this.chef = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'chef');
        this.chef.scale.setTo(2);
        this.chef.anchor.setTo(.5);
        this.chef.animations.add('right',[0,1],10,false);
        this.chef.animations.add('left',[2,3],10,false);
        this.chef.animations.add('down',[4,5],10,false);
        this.chef.animations.add('up',[6,7],10,false);
        this.game.physics.arcade.enable(this.chef);*/
        
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('Map');
        this.stairs = this.map.createLayer('Stairs');
        this.stairs.scale.setTo(1.85);
        //this.stairs.anchor.setTo(.5);
        this.floor = this.map.createLayer('Floor');
        this.floor.scale.setTo(1.85);
        //this.floor.anchor.setTo(.5);
        this.background = this.map.createLayer('Background');
        this.background.scale.setTo(1.85);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.chef = new burgertime.chef_prefab(this.game,this.game.world.centerX,this.game.world.centerY,90,55,this);
        console.log('1');
        
        this.game.physics.arcade.enable(this.chef);
        this.espacio = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.chef.frame = 7;
        
        this.isPowerUp = false;
        
        this.music = this.game.add.audio('mainTheme');
        this.start = this.game.add.audio('start');
        this.complete = this.game.add.audio('levelComplete');
        this.death = this.game.add.audio('death');
        
        
        this.start.play();
        
        this.dead = false;
        this.startLevel = true;
        this.levelCompleted = false;
        
        this.changeMusic = this.game.time.events.add(Phaser.Timer.SECOND*3,this.musicChange,this);
        
        /*this.timer1 = this.game.time.events.loop(Phaser.Timer.SECOND*2,this.activatePowerUp,this);
        
        this.timer2 = this.game.time.events.loop(Phaser.Timer.SECOND*3,this.deactivatePowerUp,this);*/
        
        this.timeElapsedActivate = 0;
        this.timeElapsedDeactivate = 0;
        
        
    },
    musicChange:function(){
        this.music.play();
    },
    update:function(){            
       console.log(this.chef.points);
        
        if(this.isPowerUp == false){
            if(this.timeElapsedActivate > 3){
                this.activatePowerUp();
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
                    this.timeElapsedActivate = 0;
                } 
            }
        }
            
        
       
        //this.activatePowerUp();
        
        console.log(this.isPowerUp);
        
        if(this.cursors.left.isDown){
            this.chef.body.velocity.x = -this.chef.speedX;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('walk');
            //console.log(this.chef.body.velocity.x);
            //this.chef.scale.x = -1;
            this.chef.scale.x = 2;
        }/*else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            //this.chef.frame = 3;
        }*/
        else if(this.cursors.right.isDown){
            this.chef.body.velocity.x = this.chef.speedX;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('walk');
            this.chef.scale.x = -2;
        }/*else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            //this.chef.frame = 1;
        }*/
        else if(this.cursors.up.isDown){
            this.chef.body.velocity.y = -this.chef.speedY;
            this.chef.body.velocity.x = 0;
            this.chef.animations.play('up');
        }/*else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            //this.chef.frame = 7;
        }*/
        else if(this.cursors.down.isDown){
            this.chef.body.velocity.y = this.chef.speedY;
            this.chef.body.velocity.x = 0;
            this.chef.animations.play('down');
        }else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            //this.chef.frame = 5;
        }
        
        if(this.espacio.isDown){
            this.chef.points += 100;
            this.chef.lives -= 1;
            this.chef.pepper += 1;
            /*console.log(this.chef.points);
            console.log(this.chef.lives);
            console.log(this.chef.pepper);*/
        }
                
        if(this.chef.lives <= 0){
            /*this.chef.animations.play('death');
            this.music.pause();
            this.death.play();*/
            this.dead = true;
        }
        
        /*if(this.chef.points >= 1500){
            this.levelCompleted = true;
        }*/
        
        if(this.dead){
            //this.chef.animations.play('death');
            this.music.pause();
            this.death.play();
            this.chef.lives = 3;
            this.dead = false;
            //restart level
        }
        
        if(this.levelCompleted){
            this.music.pause();
            this.complete.play();
            this.chef.points = 0;
            this.levelCompleted = false;
            //next level
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
    render:function(){
        //this.powerUp.body.setSize(22, 28, 20, 16);
        //this.game.debug.body(this.powerUp);
        //this.game.debug.body(this.chef);
    }
};










