var game = new Phaser.Game(
  480, 320, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
  }
);

var filter;

function preload () {
  game.load.image('testLevelBW', 'testLevelBW.png');
  game.load.image('testLevel', 'testLevel.png');
  game.load.script('lightSource', 'js/filters/lightSource.js');
  game.load.text('light-frag', 'js/filters/lightSource.frag');
  game.time.advancedTiming = true;
}

function create () {
  var level = game.add.sprite(
    game.world.centerX,
    game.world.centerY,
    'testLevel'
  );
  level.anchor.setTo(0.5, 0.5);

  var light = game.add.sprite(
    game.world.centerX,
    game.world.centerY,
    'testLevelBW'
  );
  light.anchor.setTo(0.5, 0.5);
  light.blendMode = PIXI.blendModes.ADD;

  filter = game.add.filter(
    'LightSource', 480, 320, game.cache.getText('light-frag')
  );

  filter.radius = 100;
  filter.position = {x: 480/2.0, y: 320/2.0};

  light.filters = [filter];
}

function update() {
  filter.position = {
    x: game.input.mousePointer.x,
    y: 320 - game.input.mousePointer.y
  };
}

function render () {
  game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
}
