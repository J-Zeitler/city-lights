'use strict';

/**
 * Lamp module, spawns a new Lamp at mouse pos or optionally specified pos
 * @param {State}  state    Phaser state object
 * @param {String} levelTexture  binary version of the level texture
 * @param {Object} options  optional params
 */
var Lamp = function (state, levelTexture, options) {
  var self = this;

  // console.log('lamp created, opts:', state, levelTexture, options);

  // optionals
  this.opts = options || {};
  this.radius = this.opts.radius || Math.sqrt(this.opts.area/Math.PI) || 150;
  this.area = this.opts.area || this.radius*this.radius*Math.PI;
  this.handlesOffset = this.opts.handlesOffset || 50;
  this.handlesOff = this.opts.handlesOff || false;
  this.spawnPos = this.opts.spawnPos || state.input.mousePointer;

  // bulb in the middle
  this.bulb = state.add.sprite(
    this.spawnPos.x,
    this.spawnPos.y,
    'lamp'
  );
  this.bulb.anchor.setTo(0.5, 0.5);

  // handles
  this.handles = {};
  for (var i = 0; i < 2; i++) {
    this.handles[i] = state.add.sprite(
      this.spawnPos.x + this.handlesOffset,
      this.spawnPos.y,
      'handle');
    this.handles[i].anchor.setTo(0.5, 0.5);
  };
  this.handles[0].rotation = 0;
  this.handles[1].rotation = 2*Math.PI;

  // console.log(this.handles);
  // console.log(this.bulb);


  // light filter/shader
  this.light = state.add.sprite(
    state.world.centerX,
    state.world.centerY,
    levelTexture
  );
  this.light.anchor.setTo(0.5, 0.5);
  this.light.blendMode = PIXI.blendModes.ADD;

  var filter = state.add.filter(
    'LightSource', 480, 320
  );

  filter.radius = this.radius;
  filter.position = {
    x: this.spawnPos.x,
    y: 320 - this.spawnPos.y
  };
  filter.handlesRot = {
    x: this.handles[0].rotation,
    y: this.handles[1].rotation
  }

  this.light.filters = [filter];

  this._initEventListeners();
  if (this.handlesOff) {
    this.hideHandles();
  }
}

/**
 * Update light position
 * @param  {State}               state    Phaser state object
 * @param  {x: float, y: float} movePos optional move position
 */
Lamp.prototype.update = function (state, movePos) {
  if (this.bulb.needsUpdate) {
    if (!movePos) {
      movePos = state.input.mousePointer;
    }

    this.light.filters[0].position = {
      x: movePos.x,
      y: 320 - movePos.y
    };

    this.updateHandlesPosition();
  } else if (this.handles[0].needsUpdate) {
    this.rotateHandleTowards(state.input.mousePointer, 0);
  } else if (this.handles[1].needsUpdate) {
    this.rotateHandleTowards(state.input.mousePointer, 1);
  }
}

Lamp.prototype.updateHandlesPosition = function () {
  for (var i = 0; i < 2; i++) {
    var xAxis = new Phaser.Point(this.handlesOffset, 0.0);
    var target = Phaser.Point.rotate(xAxis, 0, 0, this.handles[i].rotation);
    this.handles[i].reset(
      this.bulb.world.x + target.x,
      this.bulb.world.y + target.y
    );
  };

  // Handles are shown by "reset" above.
  // TODO: Find a better reset method
  if (this.handlesOff) {
    this.hideHandles();
  }
}

/**
 * TODO: This is not very readable
 */
Lamp.prototype.rotateHandleTowards = function (point, i) {
  var centerToHandle = Phaser.Point.subtract(
    point,
    this.bulb.world
  );
  var centerToHandleNorm = centerToHandle.normalize();

  // Angle to positive x axis determines rotation
  var iPreRot = this.handles[i].rotation;

  // dot product in two steps
  var iPostRot = Math.acos(centerToHandleNorm.x);
  if (centerToHandleNorm.y < 0) {
    iPostRot = 2*Math.PI - iPostRot;
  }

  // Handle should not pass the other handle
  var j = +!i; // 0 -> 1, 1 -> 0
  var jRot = this.handles[j].rotation;
  this.handles[i].rotation = iPostRot;

  var diff = this.handles[1].rotation - this.handles[0].rotation;
  if (diff < 0) {
    diff += 2*Math.PI;
  }

  if (diff > 2*Math.PI || diff < Math.PI*0.25) {
    this.handles[i].rotation = iPreRot;
  } else {
    // update radius
    this.radius = Math.sqrt(2*this.area/diff);
    // force handle to be on the edge
    this.handles[i].reset(
      this.bulb.world.x + centerToHandleNorm.x*50,
      this.bulb.world.y + centerToHandleNorm.y*50
    );
    // propagate to shader
    this.updateFilter();
  }
}

Lamp.prototype.updateFilter = function () {
  this.light.filters[0].handlesRot = {
    x: this.handles[0].rotation,
    y: this.handles[1].rotation
  };
  this.light.filters[0].radius = this.radius;
}

/**
 * Do not call from outside constructor
 */
Lamp.prototype._initEventListeners = function () {
  var self = this;

  // drag events bulb
  this.bulb.needsUpdate = false;
  this.bulb.inputEnabled = true;
  this.bulb.input.useHandCursor = true;
  this.bulb.input.enableDrag(true);

  this.bulb.events.onInputDown.add(function () {
    if (!(self.handlesOff)) {
      self.showHandles();
    }
  });

  this.bulb.events.onDragStart.add(function () {
    self.bulb.needsUpdate = true;
  });

  this.bulb.events.onDragStop.add(function () {
    self.bulb.needsUpdate = false;
  });

  // drag events handles
  for (var i = 0; i < 2; i++) {
    this.handles[i].needsUpdate = false;
    this.handles[i].inputEnabled = true;
    this.handles[i].input.useHandCursor = true;
    // this.handles[i].input.enableDrag(true);

    this.handles[i].events.onInputDown.add(function (handle) {
      handle.needsUpdate = true;
    });

    this.handles[i].events.onInputUp.add(function (handle) {
      handle.needsUpdate = false;
    });
  }
}

Lamp.prototype.hideHandles = function () {
  this.handles[0].visible = false;
  this.handles[1].visible = false;
}

Lamp.prototype.showHandles = function () {
  this.handles[0].visible = true;
  this.handles[1].visible = true;
}
