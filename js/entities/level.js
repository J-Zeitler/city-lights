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
  this.texture = texture;

  this.lampsLimit = options ? options.lampsLimit || false : false;
  this.lightRadius = options ? options.lightRadius || false : false;
  this.handlesOff = options ? options.handlesOff || false : false;
  this.lampsLocked = options ? options.lampsLocked || false : false;

  this.sprite = state.add.sprite(
    state.world.centerX,
    state.world.centerY,
    'black'
  );

  this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.inputEnabled = true;

  this.sprite.events.onInputDown.add(this.placeLamp, this);

}

/**
 * Update all lamps for this level
 */
Level.prototype.update = function () {
  var self = this;
  this.lamps.forEach(function (l) {
    l.update(self.state);
  });
};

Level.prototype.unlockLamps = function () {
  this.lampsLocked = false;
};

Level.prototype.lockLamps = function () {
  this.lampsLocked = true;
};

Level.prototype.placeLamp = function () {
  if (!this.lampsLocked) {
    this.lamps.forEach(function (l) {
      l.hideHandles();
    });

    if (this.lamps.length < this.lampsLimit) {
      this.lamps.push(new Lamp(
        this.state,
        this.texture, {
          handlesOff: this.handlesOff,
          radius: this.lightRadius,
        }
      ));
    }
  }
};
