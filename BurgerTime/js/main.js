var burgertime = burgertime || {};

var gameOptions={
    gameWidth:1920,
    gameHeight:1080,
    level1Width:1280,
    level1Height:800,
    heroGravity:1000,
    heroSpeed:200,
    heroJump:450
}

burgertime.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

burgertime.game.state.add('level1',burgertime.level1);
burgertime.game.state.add('ranking',burgertime.ranking);
burgertime.game.state.add('menu',burgertime.menu);
burgertime.game.state.start('level1');

//Veure levl1Trial per veure el mapa 1






