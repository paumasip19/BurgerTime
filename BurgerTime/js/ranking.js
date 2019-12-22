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
        this.load.image('ButtonUIGoBack', ruta+'buttonBack.png');
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;    
        
        this.hiText=this.game.add.text(1200, 100,'HIGHSCORE');
        this.hiText.anchor.setTo(1,0);
        this.hiText.font = 'arcade';
        this.hiText.fill='#FFFFFF';
        this.hiText.fontSize=80;
        
        this.goBackButton = this.game.add.button(730, 700, 'ButtonUIGoBack', this.return, this, 2, 1, 0);
        this.goBackButton.scale.setTo(0.8);
        
        var g = this.getScores();
    },
    return:function(){
        this.state.start('menu');
    },
    getScores:function(){
        var t = JSON.parse(localStorage.getItem('ranking'));
        
        this.p1=this.game.add.text(700, 300,t.player1);
        this.p1.anchor.setTo(1,0);
        this.p1.font = 'arcade';
        this.p1.fill='#FFFFFF';
        this.p1.fontSize=60;
        
        this.p2=this.game.add.text(700, 400,t.player2);
        this.p2.anchor.setTo(1,0);
        this.p2.font = 'arcade';
        this.p2.fill='#FFFFFF';
        this.p2.fontSize=60;
        
        this.p3=this.game.add.text(700, 500,t.player3);
        this.p3.anchor.setTo(1,0);
        this.p3.font = 'arcade';
        this.p3.fill='#FFFFFF';
        this.p3.fontSize=60;
        
        this.p4=this.game.add.text(700, 600,t.player4);
        this.p4.anchor.setTo(1,0);
        this.p4.font = 'arcade';
        this.p4.fill='#FFFFFF';
        this.p4.fontSize=60;
        
        this.p5=this.game.add.text(700, 700,t.player5);
        this.p5.anchor.setTo(1,0);
        this.p5.font = 'arcade';
        this.p5.fill='#FFFFFF';
        this.p5.fontSize=60;
        
        
        this.points1=this.game.add.text(1300, 300,t.points1);
        this.points1.anchor.setTo(1,0);
        this.points1.font = 'arcade';
        this.points1.fill='#FFFFFF';
        this.points1.fontSize=60;
        
        this.points2=this.game.add.text(1300, 400,t.points2);
        this.points2.anchor.setTo(1,0);
        this.points2.font = 'arcade';
        this.points2.fill='#FFFFFF';
        this.points2.fontSize=60;
        
        this.points3=this.game.add.text(1300, 500,t.points3);
        this.points3.anchor.setTo(1,0);
        this.points3.font = 'arcade';
        this.points3.fill='#FFFFFF';
        this.points3.fontSize=60;
        
        this.points4=this.game.add.text(1300, 600,t.points4);
        this.points4.anchor.setTo(1,0);
        this.points4.font = 'arcade';
        this.points4.fill='#FFFFFF';
        this.points4.fontSize=60;
        
        this.points5=this.game.add.text(1300, 700,t.points5);
        this.points5.anchor.setTo(1,0);
        this.points5.font = 'arcade';
        this.points5.fill='#FFFFFF';
        this.points5.fontSize=60;
    },
    makeScores:function(){
        var test = { 'player1': "Pau", 'player2': "Pau", 'player3': "Pau", 'player4': "Pau", 'player5': "Pau", 'points1': "100", 'points2': "200", 'points3': "100", 'points4': "100", 'points5': "100" };
        localStorage.setItem('ranking', JSON.stringify(test));
    }
};