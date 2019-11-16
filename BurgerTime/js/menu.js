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
        this.load.image('bg1', ruta+'MenuOpcion1.png');
        this.load.image('bg2', ruta+'MenuOpcion2.png');
        this.load.image('bg3', ruta+'MenuOpcion3.png');
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //this.space.onDown.add(function(){this.nextLevel();},this); 
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;    
        
        this.bg3 = this.game.add.sprite(200,-599,'bg3',0);
        this.bg3.scale.setTo(1.5);
        this.bg2 = this.game.add.sprite(200,-599,'bg2',0);
        this.bg2.scale.setTo(1.5);
        this.bg1 = this.game.add.sprite(200,-599,'bg1',0);
        this.bg1.scale.setTo(1.5);
        
        this.animacionSplash01 = this.game.add.tween(this.bg1).to({y:0},2000,Phaser.Easing.Quadratic.Out,true);
        this.animacionSplash02 = this.game.add.tween(this.bg2).to({y:0},2000,Phaser.Easing.Quadratic.Out,true);
        this.animacionSplash03 = this.game.add.tween(this.bg3).to({y:0},2000,Phaser.Easing.Quadratic.Out,true);
        
        this.arrowCount = 0;
    },
    update:function(){
      if(this.cursors.down.isDown && this.cursors.down.downDuration(1) && this.arrowCount == 0 && this.bg1.position.y == 0){
        this.bg3.position.y = -600;
        this.bg2.position.y = 0;
        this.bg1.position.y = -600;
        this.arrowCount = 1;
      }
      else if(this.cursors.down.isDown && this.cursors.down.downDuration(1) && this.arrowCount == 1 && this.bg2.position.y == 0)
      {
        this.bg3.position.y = 0;
        this.bg2.position.y = -600;
        this.bg1.position.y = -600; 
        this.arrowCount = 2;
      }  
      else if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && this.arrowCount == 2 && this.bg3.position.y == 0)
      {
        this.bg3.position.y = -600;
        this.bg2.position.y = 0;
        this.bg1.position.y = -600; 
        this.arrowCount = 1;
      }
      else if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && this.arrowCount == 1 && this.bg2.position.y == 0)
      {
        this.bg3.position.y = -600;
        this.bg2.position.y = -600;
        this.bg1.position.y = 0; 
        this.arrowCount = 0;
      } 
        
    
      if(this.enter.isDown && this.arrowCount == 0 && this.bg1.position.y == 0){
          this.state.start('level1');
      }else if(this.enter.isDown && this.arrowCount == 1 && this.bg2.position.y == 0){
          this.state.start('level1');
      }else if(this.enter.isDown && this.arrowCount == 2 && this.bg3.position.y == 0){
          this.state.start('ranking');
      }
    }
};