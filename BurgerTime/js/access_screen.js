var burgertime = burgertime || {};

burgertime.access_screen ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //this.space.onDown.add(function(){this.nextLevel();},this); 
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;    
        
        this.text1 = "- phaser -\n with a sprinkle of \n pixi dust.";
        this.style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.inputText = "A";
    },
    update:function(){
        
        if(this.cursors.left.isDown)
        {
            this.inputText += "A";        
        }
        if(this.cursors.right.isDown)
        {
            this.inputText -= 1;        
        }
        
        
        this.t = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.inputText, this.style);
        
    }
};