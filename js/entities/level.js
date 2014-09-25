'use strict';

/**
 * Level module, creates a new Level to put lamps/lights into.
 * @param {Game}   game     Phaser game object
 * @param {String} texture  Name of the texture to use as level background
 * @param {Object} options  (optional) options for this level
 */
var Level = function (state, texture, options) {
  var self = this;
  this.lamps = [];
  this.state = state;

  this.lampsLimit = options ? options.lampsLimit || false : false;

  this.sprite = state.add.sprite(
    state.world.centerX,
    state.world.centerY,
    texture
  );

  this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.inputEnabled = true;

  this.sprite.events.onInputDown.add(function () {
    self.lamps.forEach(function (l) {
      l.hideHandles();
    });

    if (self.lamps.length < self.lampsLimit)
      self.lamps.push(new Lamp(self.state, texture + 'BW'));
  });
}

/**
 * Update all lamps for this level
 */
Level.prototype.update = function () {
  var self = this;
  this.lamps.forEach(function (l) {
    l.update(self.state);
  });
}
