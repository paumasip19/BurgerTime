var burgertime = burgertime || {};

var gameOptions={
    gameWidth:1920,
    gameHeight:1080,
    level1Width:1280,
    level1Height:800,
    heroGravity:10000,
    heroSpeed:200,
    heroJump:450
}

burgertime.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

burgertime.game.state.add('level1',burgertime.level1);
burgertime.game.state.add('level2',burgertime.level2);
burgertime.game.state.add('level3',burgertime.level3);
burgertime.game.state.add('ranking',burgertime.ranking);
burgertime.game.state.add('menu',burgertime.menu);
burgertime.game.state.add('access_screen',burgertime.access_screen);
burgertime.game.state.start('menu');