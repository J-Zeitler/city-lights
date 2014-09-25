'use strict';

/**
 * Level module, creates a new Level to put lamps/lights into.
 * @param {Game}   game     Phaser game object
 * @param {String} texture  Name of the texture to use as level background
 */
var Level = function (game, texture) {
  var self = this;
  this.lamps = [];
  this.game = game;

  this.sprite = game.add.sprite(
    game.world.centerX,
    game.world.centerY,
    texture
  );

  this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.inputEnabled = true;

  this.sprite.events.onInputDown.add(function () {
    self.lamps.push(new Lamp(self.game));
  });
}

/**
 * Update all lamps for this level
 */
Level.prototype.update = function () {
  var self = this;
  this.lamps.forEach(function (l) {
    l.update(self.game);
  });
}
