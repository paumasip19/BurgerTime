var burgertime = burgertime || {};

var gameOptions={
    gameWidth:1920,
    gameHeight:1080,
    menuWidth:1140,
    menuHeight:1000,
    level1Width:1140,
    level1Height:1000,
    level2Width:1040,
    level2Height:1000,
    level3Width:1040,
    level3Height:1000,
    heroGravity:15000,
    heroSpeed:200,
    heroJump:450,
    firstTime:1,
    levelPlayer1: '',
    levelPlayer2: ''
}

burgertime.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

burgertime.game.state.add('level_selector',burgertime.level_selector);
burgertime.game.state.add('level1',burgertime.level1);
burgertime.game.state.add('level2',burgertime.level2);
burgertime.game.state.add('level3',burgertime.level3);
burgertime.game.state.add('ranking',burgertime.ranking);
burgertime.game.state.add('menu',burgertime.menu);
burgertime.game.state.add('access_screen',burgertime.access_screen);
burgertime.game.state.add('level1Multi1',burgertime.level1Multi1);
burgertime.game.state.add('level1Multi2',burgertime.level1Multi2);
burgertime.game.state.start('level2');

