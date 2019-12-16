var burgertime = burgertime || {};

burgertime.access_screen ={
    init:function(){
        this.game.inputPhaser = this.game.add.plugin(PhaserInput.Plugin);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        this.load.image('ButtonUIRegister', ruta+'buttonRegister.png');
        this.load.image('ButtonUILogin', ruta+'buttonLogin.png');
        this.load.image('ButtonUIGoBack', ruta+'buttonBack.png');
    },
    create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;    
        
        this.sceneState = 0;
        
        this.register = this.game.add.button(this.game.world.centerX, 400, 'ButtonUIRegister', this.registerScreen, this);
        
        this.login = this.game.add.button(this.game.world.centerX, 0, 'ButtonUILogin', this.loginScreen, this, 2, 1, 0);
        
        this.checkLogin = this.game.add.button(this.game.world.centerX, 600, 'ButtonUILogin', this.loginFunc, this, 2, 1, 0);
        
        this.registerUser = this.game.add.button(this.game.world.centerX, 600, 'ButtonUIRegister', this.registerFunc, this, 2, 1, 0);
        
        this.goBackButton = this.game.add.button(-500, -170, 'ButtonUIGoBack', this.return, this, 2, 1, 0);
        
        this.user = this.game.add.inputField(100, 0, {
        font: '40px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 300,
        height: 100,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Username',
        text:'isss',
        type: PhaserInput.InputType.text,
        zoom: true,
        });
        
        this.password = this.game.add.inputField(100, 300, {
        font: '40px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 300,
        height: 100,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Password',
        type: PhaserInput.InputType.password
        });

    },
    update:function(){
        if(this.sceneState == 0)
        {
            this.register.x = 670;
            this.login.x = 670;
            this.user.x = 2000;
            this.password.x = 2000;
            this.registerUser.x = 2000;
            this.checkLogin.x = 2000;
            this.goBackButton.x = 2000;
            
            this.user.value = "";
            this.password.value = "";
        }
        else if(this.sceneState == 1) //Register
        {
            this.register.x = 2000;
            this.login.x = 2000;
            this.user.x = 800;
            this.password.x = 800;
            this.registerUser.x = 670;
            this.goBackButton.x = 0;
        }
        else if(this.sceneState == 2) //Login
        {
            this.register.x = 2000;
            this.login.x = 2000;
            this.user.x = 800;
            this.password.x = 800;
            this.checkLogin.x = 670;
            this.goBackButton.x = 0;
            
            
        }
    },
    registerScreen:function(){
        console.log("Register");
        this.sceneState = 1;
    },
    loginScreen:function(){
        console.log("Login");
        this.sceneState = 2;
    },
    return:function(){
        this.sceneState = 0;
    },
    loginFunc:function(){
        var t = JSON.parse(localStorage.getItem('user' + this.user.value));
        if(t == null)
        {
            console.log("not exist");
        }
        else if(this.user.value == t.username)
        {
            if(this.password.value == t.password)
            {
                console.log("good password");
                this.state.start('menu');
            }
            else
            {
                console.log("bad password");
            }
        }

    },
    registerFunc:function(){
        var t = JSON.parse(localStorage.getItem('user' + this.user.value));
        if(t == null)
        {
            console.log("isNull");
            var test = { 'username': this.user.value, 'password': this.password.value};
            localStorage.setItem('user' + this.user.value, JSON.stringify(test));
            this.sceneState = 0;
        }
        else
        {
            console.log("Already exists");
        }
        
    }
};