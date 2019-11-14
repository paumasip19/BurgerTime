var burgertime = burgertime || {};

burgertime.menu ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        this.load.image('bg1', ruta+'MenuPrincipal_1.png');
        this.load.image('bg2', ruta+'MenuPrincipal_2.png');
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;    
        
        this.bg2 = this.game.add.sprite(200,0,'bg2',0);
        this.bg2.scale.setTo(1.5);
        this.bg1 = this.game.add.sprite(200,0,'bg1',0);
        this.bg1.scale.setTo(1.5);
    },
    update:function(){
      if(this.cursors.up.isDown){
        this.bg2.position.y = -600;
        this.bg1.position.y = 0;
      }
      else if(this.cursors.down.isDown)
      {
        this.bg2.position.y = 0;
        this.bg1.position.y = -600;  
      }
    }
};