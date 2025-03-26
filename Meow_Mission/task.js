class task extends Phaser.Scene {

  constructor() {
    super({ key: 'task' });
  }

  preload() {
    // Images
    this.load.image("task", "assets/task.jpg");
  }

  create() {
    const howplay = this.add.image(0, 0, "task");

    const scaleX = this.game.config.width / howplay.width;
    const scaleY = this.game.config.height / howplay.height;
    howplay.setScale(scaleX, scaleY);

    howplay.setOrigin(0.5);
    howplay.setPosition(
      this.game.config.width / 2,
      this.game.config.height / 2
    );

    console.log("This is task spacebar"); //this.input.once('pointerdown', function(){

    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, go to howtoplay");
        this.scene.start("howtoplay");
      },
      this
    );
  }
}
