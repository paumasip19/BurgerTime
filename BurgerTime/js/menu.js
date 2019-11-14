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
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //this.space.onDown.add(function(){this.nextLevel();},this); 
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;    
        
        this.bg2 = this.game.add.sprite(200,-599,'bg2',0);
        this.bg2.scale.setTo(1.5);
        this.bg1 = this.game.add.sprite(200,-599,'bg1',0);
        this.bg1.scale.setTo(1.5);
        
        this.animacionSplash01 = this.game.add.tween(this.bg1).to({y:0},2000,Phaser.Easing.Quadratic.Out,true);
        this.animacionSplash02 = this.game.add.tween(this.bg2).to({y:0},2000,Phaser.Easing.Quadratic.Out,true);
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
        
    
      if(this.enter.isDown && (this.bg1.position.y == -600 || this.bg1.position.y == 0)){
          this.nextLevel();
      }
    },
        
    nextLevel:function(){    
        this.state.start('level1');
    }
};