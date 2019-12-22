var burgertime = burgertime || {};

burgertime.level_selector ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    //this.game.world.setBounds(0,0,gameOptions.menuWidth,gameOptions.menuHeight);
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        this.load.image('l1', ruta+'Level1.png');
        this.load.image('l2', ruta+'Level2.png');
        this.load.image('l3', ruta+'Level3.png');
        this.load.image('ButtonUIGoBack', ruta+'buttonBack.png');
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;  
        
        this.level1 = this.game.add.button(150, 100, 'l1', this.getLevel1, this);
        this.level2 = this.game.add.button(750, 100, 'l2', this.getLevel2, this);
        this.level3 = this.game.add.button(1350, 100, 'l3', this.getLevel3, this);
        
        this.l1Text = this.game.add.text(450,600,'LEVEL 1');
        this.l1Text.anchor.setTo(1,0);
        this.l1Text.font = 'arcade';
        this.l1Text.fill='#FFFFFF';
        this.l1Text.fontSize=40;
        
        this.l2Text = this.game.add.text(1045,600,'LEVEL 2');
        this.l2Text.anchor.setTo(1,0);
        this.l2Text.font = 'arcade';
        this.l2Text.fill='#FFFFFF';
        this.l2Text.fontSize=40;
        
        this.l3Text = this.game.add.text(1650,600,'LEVEL 3');
        this.l3Text.anchor.setTo(1,0);
        this.l3Text.font = 'arcade';
        this.l3Text.fill='#FFFFFF';
        this.l3Text.fontSize=40;
        
        this.goBackButton = this.game.add.button(670, 600, 'ButtonUIGoBack', this.return, this, 2, 1, 0);
    },
    update:function(){
      //console.log("Hola");
    },
    getLevel1:function(){
        this.state.start('level1');
    },
    getLevel2:function(){
        this.state.start('level2');
    },
    getLevel3:function(){
        this.state.start('level3');
    },
    return:function(){
        this.state.start('menu');
    }
};