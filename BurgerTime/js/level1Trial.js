var burgertime = burgertime || {};

burgertime.level1Trial ={
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
        this.load.image('Map', ruta+'SpritesheetMaps.png');
        
        this.load.tilemap('level1','assets/levels/Level1.json',null,Phaser.Tilemap.TILED_JSON);
    },
    create:function(){
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('Map');
        this.stairs = this.map.createLayer('Stairs');
        this.stairs.scale.setTo(0.5);
        //this.stairs.anchor.setTo(.5);
        this.floor = this.map.createLayer('Floor');
        this.floor.scale.setTo(0.5);
        //this.floor.anchor.setTo(.5);
        this.background = this.map.createLayer('Background');
        this.background.scale.setTo(0.5);
        //this.background.anchor.setTo(.5);
        //this.map.setCollisionBetween(1,11,true,'stairs');
    },
    update:function(){
        
    }
};