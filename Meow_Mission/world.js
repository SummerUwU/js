class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  preload() {



    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("world1", "assets/Summer(Town).tmj");  

    //Load heart image
    this.load.image('Heart', 'assets/Heart.png');
    this.load.image('Cat_Collect', 'assets/Cat_Collect.png');


    // Step 2 : Preload any images here 
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");


////////////////////////map 1
    this.load.image("mapIMG", "assets/tileset.png");
    this.load.image("frence1IMG", "assets/FENCE.png");
    this.load.image("frence2IMG", "assets/FENCE2.png");
    this.load.image("bridgeIMG", "assets/BRIDGE.png");
    this.load.image("evildog", "assets/evil_dog.png");

///////////////////////cat
this.load.image("cat1", "assets/cat1.png");
this.load.image("cat2", "assets/cat2.png"); 
this.load.image("cat3", "assets/cat3.png");     
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

    let map = this.make.tilemap({ key: "world1" })

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let streetTiles = map.addTilesetImage("TOWN", "mapIMG");
    let frence1Tiles = map.addTilesetImage("FENCE1", "frence1IMG");
    let frence2Tiles = map.addTilesetImage("FENCE2", "frence2IMG");
    let bridgeTiles = map.addTilesetImage("BRIDGE", "bridgeIMG");

    // Call to update inventory items
    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });
    
    // start another scene in parallel
    this.scene.launch("showInventory");
    
    // // Call globalFunction globalHitFire on overlap
    // this.physics.add.overlap(this.player, [this.enemy1, this.enemy2], globalHitFire, null, this);
    // this.physics.add.overlap(this.player, [this.cat1, this.cat2, this.cat3], globalCollectKey, null, this);


    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];

    let tilesArray = [streetTiles, frence1Tiles, frence2Tiles, bridgeTiles];

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);

    //this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);

    //this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);

    this.ground_layer = map.createLayer("ground_layer", tilesArray, 0, 0);
    this.Design_layer = map.createLayer("Design_layer", tilesArray, 0, 0);
    this.TreeGrassBG_layer = map.createLayer("TreeGrassBG_layer", tilesArray, 0, 0);
    this.House_layer = map.createLayer("House_layer", tilesArray, 0, 0);
    this.water_layer = map.createLayer("water_layer", tilesArray, 0, 0);
    this.TreeGrassFG_layer = map.createLayer("TreeGrassFG_layer", tilesArray, 0, 0);
    this.bridge_layer = map.createLayer("bridge_layer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.ground_layer.width;
    this.physics.world.bounds.height = this.ground_layer.height;

    
    /////// Player




    // gen is the alias in preload 
    let start  = map.findObject("ObjectLayer1", (obj) => obj.name === "start");
 this.player = this.physics.add.sprite(start.x, start.y, 'gen').setScale(0.8)

// debug player

this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5)

window.player = this.player
this.player.setCollideWorldBounds(true)

// create the arrow keys
this.cursors = this.input.keyboard.createCursorKeys();

// Camera follow player 
this.cameras.main.startFollow(this.player);

  // Prevent black area of edge of the map
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

//Collision
this.House_layer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.House_layer)

this.TreeGrassFG_layer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.TreeGrassFG_layer)  

this.TreeGrassBG_layer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.TreeGrassBG_layer) 

this.Design_layer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.Design_layer) 

this.water_layer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.water_layer) 


    // Add main player here with physics.add.sprite


    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    // cat
    let cat1  = map.findObject("ObjectLayer1", (obj) => obj.name === "cat1");
    this.cat1 = this.physics.add.sprite(cat1.x, cat1.y, 'cat1')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(40, 40);

    

    let cat2  = map.findObject("ObjectLayer1", (obj) => obj.name === "cat2");
    this.cat2 = this.physics.add.sprite(cat2.x, cat2.y, 'cat2')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(40, 40);

  
    let cat3  = map.findObject("ObjectLayer1", (obj) => obj.name === "cat3");
    this.cat3 = this.physics.add.sprite(cat3.x, cat3.y, 'cat3')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(40, 40);


   this.physics.add.overlap(this.player, this.cat1, this.collectcat, null, this);
   this.physics.add.overlap(this.player, this.cat2, this.collectcat, null, this);
  this.physics.add.overlap(this.player, this.cat3, this.collectcat, null, this);

  this.cat1.body.setSize(this.cat1.width * 0.4, this.cat1.height * 0.4)
  this.cat2.body.setSize(this.cat2.width * 0.4, this.cat2.height * 0.4)
  this.cat3.body.setSize(this.cat3.width * 0.4, this.cat3.height * 0.4)

    ///evildog

    let enemy1  = map.findObject("ObjectLayer1", (obj) => obj.name === "enemy1");
    let enemy2  = map.findObject("ObjectLayer1", (obj) => obj.name === "enemy2");
    
    this.enemy1 = this.physics.add.sprite(370, 550, 'evildog').setScale(0.05).setDepth(2);
console.log(this.enemy1); 


this.tweens.add({
  targets: this.enemy1,
  x: 200,
  flipX: true,
  yoyo: true,
  duration: 900,
  repeat: -1
});

this.enemy2 = this.physics.add.sprite(130, 140, 'evildog').setScale(0.05).setDepth(2);
console.log(this.enemy1); 

this.tweens.add({
  targets: this.enemy2,
  x:70,
  flipX: true,
  yoyo: true,
  duration: 900,
  repeat: -1
});

this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this);
this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy, null, this);

this.enemy1.body.setSize(this.enemy1.width * 0.4, this.enemy1.height * 0.4)
this.enemy2.body.setSize(this.enemy2.width * 0.4, this.enemy2.height * 0.4)


  } /////////////////// end of create //////////////////////////////

  update() {let speed = 120;

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

      ///exit level
    if (
      this.player.x > 620 &&
      // this.player.x < 650 &&
      this.player.y > 290 &&
      this.player.y < 320
    ) 
    {

      console.log("jmup to level2");
      this.level2();
    }
    }} /////////////////// end of update //////////////////////////////

// Function level2
level2(player, tile) {
  console.log("Function to jump to level2 scene");
  this.scene.start("level2",);
}

    collectcat(player, cat){
      console.log("collectcat");
      
			// // play a sound
      // this.hitSnd.play();

			// shake screen
	    this.cameras.main.shake(300);    

      // disable enemy body
      cat.disableBody (true, true);
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
  


} //////////// end of class world ////////////////////////
