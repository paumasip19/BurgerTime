var burgertime = burgertime || {};

var gameOptions={
    gameWidth:960,
    gameHeight:540,
    level1Width:1280,
    level1Height:800,
    heroGravity:1000,
    heroSpeed:200,
    heroJump:450
}

burgertime.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

burgertime.game.state.add('main',burgertime.level1);
burgertime.game.state.start('main');






