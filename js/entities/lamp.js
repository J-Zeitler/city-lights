'use strict';

/**
 * Lamp module, spawns a new Lamp at mouse pos or optionally specified pos
 * @param {Game}               game     Phaser game object
 * @param {x: float, y: float} spawnPos optional spawn pos
 */
var Lamp = function (game, spawnPos) {
  var self = this;

  if (!spawnPos) {
    spawnPos = game.input.mousePointer;
  }

  this.bulb = game.add.sprite(
    spawnPos.x - 15,
    spawnPos.y - 15,
    'lamp'
  );

  this.light = game.add.sprite(
    game.world.centerX,
    game.world.centerY,
    'testLevelBW'
  );
  this.light.anchor.setTo(0.5, 0.5);
  this.light.blendMode = PIXI.blendModes.ADD;

  var filter = game.add.filter(
    'LightSource', 480, 320
  );

  filter.radius = 150;
  filter.position = {
    x: spawnPos.x,
    y: 320 - spawnPos.y
  };

  this.light.filters = [filter];

  this.bulb.inputEnabled = true;
  this.bulb.input.useHandCursor = true;
  this.bulb.input.enableDrag(true);

  this.bulb.events.onDragStart.add(function () {
    self.needUpdate = true;
  });

  this.bulb.events.onDragStop.add(function () {
    self.needUpdate = false;
  });

  this.needUpdate = false;
}

/**
 * Update light position
 * @param  {Game}               game    Phaser game object
 * @param  {x: float, y: float} movePos optional move position
 */
Lamp.prototype.update = function (game, movePos) {
  if (this.needUpdate) {
    if (!movePos) {
      movePos = game.input.mousePointer;
    }

    this.light.filters[0].position = {
      x: movePos.x,
      y: 320 - movePos.y
    };
  }
}
