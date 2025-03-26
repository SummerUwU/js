class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });

        // Put global variable here
    }

    preload() {

        this.load.image('MeowMission', 'assets/MeowMission.jpg');

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        this.load.spritesheet('gen', 'assets/spritesheet_maid64px.png', { frameWidth: 64, frameHeight: 64 });

    }

    create() {

        console.log('*** main scene');

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //this.music.play()
        //window.music = this.music


        // Add image and detect spacebar keypress
        this.add.image(-1, -50, 'MeowMission').setOrigin(0.005, 0.005).setScale(0.36);


        
this.anims.create({
    key: "gen-up",
    frames: this.anims.generateFrameNumbers("gen", { start: 3, end: 5 }),
    frameRate: 5,
    repeat: -1,
  });
  
  this.anims.create({
    key: "gen-left",
    frames: this.anims.generateFrameNumbers("gen", { start: 9, end: 11 }),
    frameRate: 5,
    repeat: -1,
  });
  
  this.anims.create({
    key: "gen-down",
    frames: this.anims.generateFrameNumbers("gen", { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1,
  });
  
  this.anims.create({
    key: "gen-right",
    frames: this.anims.generateFrameNumbers("gen", { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1,
  });

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        let key1 = this.input.keyboard.addKey(49);
        let key2 = this.input.keyboard.addKey(50);
        let key3 = this.input.keyboard.addKey(51);
        

        key1.on('down', function(){
            this.scene.start("world");
            }, this );
            
        key2.on('down', function(){
            this.scene.start("level2");
            }, this );
         
        key3.on('down', function(){
            this.scene.start("level3");
            }, this );   

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to story');

            this.scene.start('story',
                // Optional parameters
                {

                }
            );
        }, this);


        // // Add any text in the main page
        // // this.add.text(15, 15, 'Press spacebar to continue', {
        // //     font: '30px Courier',You're a staff member at a cat cafe, and one day you get up and get ready to start work and you realise that the door to the cat cafe is left open and all the cats in the cafe have run out! You need to find the cats back.
        // //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}