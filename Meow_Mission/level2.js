class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });

    // Put global variable here
  }

  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {
    ///////////////////////cat
    this.load.image("cat4", "assets/cat4.png");
    this.load.image("cat5", "assets/cat5.png");
    this.load.image("cat6", "assets/cat6.png");

    ///car
    this.load.image("Car_Enemy1", "assets/Car_Enemy1.png");
    this.load.image("Car_Enemy2", "assets/Car_Enemy2.png");

    this.load.tilemapTiledJSON("level2", "assets/Summer(City).tmj");

    //map
    this.load.image("DesignIMG", "assets/Design.png");
    this.load.image("BuildingIMG", "assets/Building.png");
    this.load.image("CarIMG", "assets/Car.png");
    this.load.image("RoadIMG", "assets/Road.png");
  }

  create() {
    console.log("*** level2 scene");
    let map = this.make.tilemap({ key: "level2" });

    let DesignTiles = map.addTilesetImage("Design", "DesignIMG");
    let BuildingTiles = map.addTilesetImage("Building", "BuildingIMG");
    let CarTiles = map.addTilesetImage("Car", "CarIMG");
    let RoadTiles = map.addTilesetImage("Road", "RoadIMG");

    let tilesArray = [DesignTiles, BuildingTiles, CarTiles, RoadTiles];

    this.ground = map.createLayer("ground", tilesArray, 0, 0);
    this.road = map.createLayer("road", tilesArray, 0, 0);
    this.buildingNEW = map.createLayer("buildingNEW", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.ground.width;
    this.physics.world.bounds.height = this.ground.height;

    // Add main player here with physics.add.sprite
    var startPoint = map.findObject(
      "ObjectLayer2",
      (obj) => obj.name === "start"
    );

    this.player = this.physics.add
      .sprite(startPoint.x, startPoint.y, "gen")
      .setScale(0.8);
    window.player = this.player;
    this.player.setCollideWorldBounds(true)

    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    this.cameras.main.startFollow(this.player);

    // Prevent black area of edge of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //Collision
    this.buildingNEW.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.buildingNEW);

    // cat
    let cat4 = map.findObject("ObjectLayer2", (obj) => obj.name === "cat4");
    this.cat4 = this.physics.add
      .sprite(cat4.x, cat4.y, "cat4")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);
window.cat4 = this.cat4

    let cat5 = map.findObject("ObjectLayer2", (obj) => obj.name === "cat5");
    this.cat5 = this.physics.add
      .sprite(cat5.x, cat5.y, "cat5")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    let cat6 = map.findObject("ObjectLayer2", (obj) => obj.name === "cat6");
    this.cat6 = this.physics.add
      .sprite(cat6.x, cat6.y, "cat6")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    this.cat4.body.setSize(this.cat4.width * 0.5, this.cat4.height * 0.5);
    this.cat5.body.setSize(this.cat5.width * 0.5, this.cat5.height * 0.5);
    this.cat6.body.setSize(this.cat6.width * 0.5, this.cat6.height * 0.5);

    this.physics.add.overlap(this.player,[this.cat4, this.cat5, this.cat6], this.collectcat, null, this);

    ///car


    let Car_Enemy1  = map.findObject("ObjectLayer2", (obj) => obj.name === "Car_Enemy1");
    let Car_Enemy2  = map.findObject("ObjectLayer2", (obj) => obj.name === "Car_Enemy2");

    this.Car_Enemy1 = this.physics.add.sprite(299, 455, 'Car_Enemy1').setScale(1).setDepth(2);
console.log(this.Car_Enemy1); 


this.tweens.add({
  targets: this.Car_Enemy1,
  x: 500,
  flipX: true,
  yoyo: true,
  duration: 900,
  repeat: -1
});

this.Car_Enemy2 = this.physics.add.sprite(400, 220, 'Car_Enemy2').setScale(1).setDepth(2);
console.log(this.Car_Enemy2); 


this.tweens.add({
  targets: this.Car_Enemy2,
  x: 500,
  flipX: true,
  yoyo: true,
  duration: 900,
  repeat: -1
});

this.physics.add.overlap(this.player, this.Car_Enemy1, this.hitEnemy, null, this);
this.physics.add.overlap(this.player, this.Car_Enemy2, this.hitEnemy, null, this);

this.Car_Enemy1.body.setSize(this.Car_Enemy1.width * 0.4, this.Car_Enemy1.height * 0.4)
this.Car_Enemy2.body.setSize(this.Car_Enemy2.width * 0.4, this.Car_Enemy2.height * 0.4)


  }

  update() {
    let speed = 120;

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("gen-left", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play("gen-down", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }

    ///exit level
    if (
      this.player.x > 627 &&
      // this.player.x < 650 &&
      this.player.y > 320 &&
      this.player.y < 400
    ) {
      console.log("jmup to level3");
      this.level3();
    }
  }
  // Function level3
level3(player, tile){
  console.log("Function to jump to level3 scene");
  this.scene.start("level3");
}

collectcat(player, cat){
  console.log("collectcat");

  // play a sound
  // this.hitSnd.play();

  // shake screen
  this.cameras.main.shake(300);

  // disable enemy body
  cat.disableBody(true, true);
}

hitEnemy(player, enemy){
  console.log("hitEnemy");
  
  // // play a sound
  //  this.hitSnd.play();

  // shake screen
  this.cameras.main.shake(300);    

  // disable enemy body
  enemy.disableBody (true, true);
}
} /////////////////// end of update //////////////////////////////



//////////// end of class world ////////////////////////
