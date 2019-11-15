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
        this.load.spritesheet('chef', ruta+'chef.png', 26.5, 26);
        
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
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.chef = new burgertime.chef_prefab(this.game,this.game.world.centerX,this.game.world.centerY,100,this);
        console.log('1');
        this.game.physics.arcade.enable(this.chef);
        this.espacio = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.music = this.game.add.audio('mainTheme');
        this.start = this.game.add.audio('start');
        this.complete = this.game.add.audio('levelComplete');
        this.death = this.game.add.audio('death');
        
        
        this.music.play();
        
    },
    update:function(){
        //this.game.physics.arcade.collide(this.hero,this.entry);
        //this.game.physics.arcade.collide(this.hero,this.walls);
        
        
        
        
        if(this.cursors.left.isDown){
            this.chef.body.velocity.x = -this.chef.speed;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('left');
            console.log('2');
            //console.log(this.chef.body.velocity.x);
            //this.chef.scale.x = -1;
            this.chef.scale.x = 1;
        }/*else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            //this.chef.frame = 3;
        }*/
        else if(this.cursors.right.isDown){
            this.chef.body.velocity.x = this.chef.speed;
            this.chef.body.velocity.y = 0;
            this.chef.animations.play('left');
            this.chef.scale.x = -1;
        }/*else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            //this.chef.frame = 1;
        }*/
        else if(this.cursors.up.isDown){
            this.chef.body.velocity.y = -this.chef.speed;
            this.chef.body.velocity.x = 0;
            this.chef.animations.play('up');
        }/*else{
            this.chef.body.velocity.x = 0;
            this.chef.body.velocity.y = 0;
            //this.chef.frame = 7;
        }*/
        else if(this.cursors.down.isDown){
            this.chef.body.velocity.y = this.chef.speed;
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
            console.log(this.chef.points);
            console.log(this.chef.lives);
            console.log(this.chef.pepper);
        }
                
        if(this.chef.lives <= 0){
            this.chef.animations.play('death');
            this.music.pause();
            this.death.play();
        }
        
        //hacer doble/triple salto
        //if(this.cursors.up.isDown && this.cursors.up.downDuration(1)){
        //efecto canguro
        //if(this.cursors.up.isDown && this.hero.body.blocked.down){
        //if(this.cursors.up.isDown && this.hero.body.blocked.down&&this.cursors.up.downDuration(1)){
          //  this.hero.body.velocity.y = -gameOptions.heroJump;
        //}
        //if(!this.hero.body.blocked.down){
          //  this.hero.frame=6;
        //}
        
    },
    /*playDeath:function(_chef){
        _chef.animations.play('death');
        this.death.play();
    }*/
};










