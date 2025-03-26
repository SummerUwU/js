class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });

    // Put global variable here
  }

  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {
    this.load.spritesheet("Man", "assets/Man_spritesheet.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    ///////////////////////cat
    this.load.image("cat7", "assets/cat7.png");
    this.load.image("cat8", "assets/cat8.png");
    this.load.image("cat9", "assets/cat9.png");

    this.load.tilemapTiledJSON("level3", "assets/Summer(Forest).tmj");

    //map
    this.load.image("TownIMG", "assets/tileset.png");
  }

  create() {
    console.log("*** level3 scene");
    let map = this.make.tilemap({ key: "level3" });

    let TownTiles = map.addTilesetImage("TOWN", "TownIMG");

    let tilesArray = [TownTiles];

    this.Ground_layer = map.createLayer("Ground_layer", tilesArray, 0, 0);
    this.water_layer = map.createLayer("water_layer", tilesArray, 0, 0);
    this.Tree1_layer = map.createLayer("Tree1_layer", tilesArray, 0, 0);
    this.grass_layer = map.createLayer("grass_layer", tilesArray, 0, 0);
    this.Tree2_layer = map.createLayer("Tree2_layer", tilesArray, 0, 0);
    this.rock_layer = map.createLayer("rock_layer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.Ground_layer.width;
    this.physics.world.bounds.height = this.Ground_layer.height;

    // Add main player here with physics.add.sprite
    var startPoint = map.findObject(
      "ObjectLayer3",
      (obj) => obj.name === "start"
    );

    /////// Man
    this.anims.create({
      key: "Man-up",
      frames: this.anims.generateFrameNumbers("Man", { start: 0, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "Man-left",
      frames: this.anims.generateFrameNumbers("Man", { start: 9, end: 17 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "Man-down",
      frames: this.anims.generateFrameNumbers("Man", { start: 18, end: 26 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "Man-right",
      frames: this.anims.generateFrameNumbers("Man", { start: 27, end: 35 }),
      frameRate: 5,
      repeat: -1,
    });

    this.player = this.physics.add
      .sprite(startPoint.x, startPoint.y, "gen")
      .setScale(0.8);

    window.player = this.player;
    this.player.setCollideWorldBounds(true);

    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    this.cameras.main.startFollow(this.player);

    // Prevent black area of edge of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // this.Ground_layer.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player, this.Ground_layer);

    this.water_layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.water_layer);

    this.Tree1_layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.Tree1_layer);

    this.grass_layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.grass_layer);

    this.Tree2_layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.Tree2_layer);

    this.rock_layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.rock_layer);

    // cat
    let cat7 = map.findObject("ObjectLayer3", (obj) => obj.name === "cat7");
    this.cat7 = this.physics.add
      .sprite(cat7.x, cat7.y, "cat7")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);
    window.cat4 = this.cat7;

    let cat8 = map.findObject("ObjectLayer3", (obj) => obj.name === "cat8");
    this.cat8 = this.physics.add
      .sprite(cat8.x, cat8.y, "cat8")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    let cat9 = map.findObject("ObjectLayer3", (obj) => obj.name === "cat9");
    this.cat9 = this.physics.add
      .sprite(cat9.x, cat9.y, "cat9")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    this.cat7.body.setSize(this.cat7.width * 0.5, this.cat7.height * 0.5);
    this.cat8.body.setSize(this.cat8.width * 0.5, this.cat8.height * 0.5);
    this.cat9.body.setSize(this.cat9.width * 0.5, this.cat9.height * 0.5);

    this.physics.add.overlap(
      this.player,
      [this.cat7, this.cat8, this.cat9],
      this.collectcat,
      null,
      this
    );

    //Man

    let Man_enemy1 = map.findObject(
      "ObjectLayer3",
      (obj) => obj.name === "Man_enemy1"
    );
    let Man_enemy2 = map.findObject(
      "ObjectLayer3",
      (obj) => obj.name === "Man_enemy2"
    );

    this.Man = this.physics.add
      .sprite(200, 118, "Man")
      .setScale(0.8)
      .setDepth(1)
      .play('Man-right')
    console.log(this.Man);

    this.Man.body.setSize(30, 40);

    this.tweens.add({
      targets: this.Man,
      x: 300,
      flipX: true,
      yoyo: true,
      duration: 700,
      repeat: -1,
    });

    this.Man2 = this.physics.add
      .sprite(290, 390, "Man")
      .setScale(0.8)
      .setDepth(1)
      .play('Man-right')
    console.log(this.Man2);

    this.Man2.body.setSize(30, 40);

    this.tweens.add({
      targets: this.Man2,
      x: 500,
      flipX: true,
      yoyo: true,
      duration: 900,
      repeat: -1,
    });

    this.physics.add.overlap(
      this.player,
      this.Man,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.Man2,
      this.hitEnemy,
      null,
      this
    );
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
      this.player.x > 300 &&
      // this.player.x < 650 &&
      this.player.y > 620 &&
      this.player.y < 700
    ) {
      console.log("jmup to winning");
      this.winning();
    }
  } /////////////////// end of update //////////////////////////////

  //////////// end of class world ////////////////////////

  // Function level3
winning(player, tile){
  console.log("Function to jump to winning scene");
  this.scene.start("winning");
}

  collectcat(player, cat) {
    console.log("collectcat");

    // play a sound
    // this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    // disable enemy body
    cat.disableBody(true, true);
  }

  hitEnemy(player, enemy) {
    console.log("hitEnemy");

    // // play a sound
    //  this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    // disable enemy body
    enemy.disableBody(true, true);
  }
}
