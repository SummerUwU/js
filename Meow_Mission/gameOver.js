class gameOver extends Phaser.Scene {
    constructor() {
      super("gameOver");
    }
  
  preload() {
    this.load.image("gameOverImg", "assets/GameOver.jpg");
  
  }
  
  create() {
    console.log("*** gameover scene");
     this.scene.bringToTop("gameOver");
  
    // Add image and detect spacebar keypress
    const howplay = this.add.image(0, 0, "gameOverImg");

    const scaleX = this.game.config.width / howplay.width;
    const scaleY = this.game.config.height / howplay.height;
    howplay.setScale(scaleX, scaleY);

    howplay.setOrigin(0.5);
    howplay.setPosition(
      this.game.config.width / 2,
      this.game.config.height / 2
    );
  
    // Check for spacebar or any key here
    let enterDown = this.input.keyboard.addKey("ENTER");
  
    // On spacebar event, call the world scene
    enterDown.on("down", function () {
    console.log("Jump to tutorial scene");
    window.heart = 3;
    window.key = 0;
    
    this.scene.start("world");
      },
      this
    );
    
    }
  
  }