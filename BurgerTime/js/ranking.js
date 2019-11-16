var burgertime = burgertime || {};

burgertime.ranking ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){
        var ruta = 'assets/sprites/';
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;    
    },
    update:function(){
      
    }
};