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

  var opts = options || {};
  this.lampsLimit = opts.lampsLimit || false;
  this.lightRadius = opts.lightRadius || false;
  this.handlesOff = opts.handlesOff || false;
  this.lampsLocked = opts.lampsLocked || false;

  this.remainingLamps = [];

  this.sprite = state.add.sprite(
    state.world.centerX,
    state.world.centerY,
    'black'
  );

  this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.inputEnabled = true;

  this.sprite.events.onInputDown.add(this.placeLamp, this);
  this.initRemainingLamps();
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
      var lampToDestroy = this.remainingLamps[this.remainingLamps.length - 1];
      lampToDestroy.destroy(true);
      this.remainingLamps.pop();

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

Level.prototype.initRemainingLamps = function () {
  this.state.add.text(
    this.state.world.width - 75 - 20*(this.lampsLimit + 1),
    5, "Lamps left: ", {
      font: "bold 12px monospace",
      fill: "#fff",
      stroke: "#333",
      align: "left",
  });
  for (var i = 0; i < this.lampsLimit; ++i) {
    var remainingLamp = this.state.add.sprite(
      this.state.world.width - 20*(i + 1),
      12,
      'lamp'
    );
    remainingLamp.anchor.setTo(0.5, 0.5);
    this.remainingLamps.push(remainingLamp);
  }
};
