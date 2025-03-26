var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 16 * 20,
    height: 16 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
     scale: {
         mode: Phaser.Scale.FIT,
         autoCenter: Phaser.Scale.CENTER_BOTH
     },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [main, world, level2, level3, story, task, showInventory, gameOver, winning, howtoplay]


    
};

let game = new Phaser.Game(config);
// Add variables here
window.heart = 3
window.key = 0
