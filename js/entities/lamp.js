'use strict';

/**
 * Lamp module, spawns a new Lamp at mouse pos or optionally specified pos
 * @param {State}               state     Phaser state object
 * @param {String}             levelBW  binary version of the level texture
 * @param {x: float, y: float} spawnPos optional spawn pos
 */
var Lamp = function (state, levelBW, spawnPos) {
  var self = this;
  this.radius = 150; // hard coded for now

  if (!spawnPos) {
    spawnPos = state.input.mousePointer;
  }

  // bulb in the middle
  this.bulb = state.add.sprite(
    spawnPos.x,
    spawnPos.y,
    'lamp'
  );
  this.bulb.anchor.setTo(0.5, 0.5);

  // handles
  this.handles = {};
  for (var i = 0; i < 2; i++) {
    this.handles[i] = state.add.sprite(
      spawnPos.x + this.radius,
      spawnPos.y,
      'lamp');
    this.handles[i].anchor.setTo(0.5, 0.5);
    this.handles[i].rotation = 0;
  };

  console.log(this.handles);
  console.log(this.bulb);


  // light filter/shader
  this.light = state.add.sprite(
    state.world.centerX,
    state.world.centerY,
    levelBW
  );
  this.light.anchor.setTo(0.5, 0.5);
  this.light.blendMode = PIXI.blendModes.ADD;

  var filter = state.add.filter(
    'LightSource', 480, 320
  );

  filter.radius = this.radius;
  filter.position = {
    x: spawnPos.x,
    y: 320 - spawnPos.y
  };

  this.light.filters = [filter];

  this._initEventListeners();
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

    this.moveHandles();
  } else if (this.handles[0].needsUpdate) {
    this.rotateHandleTowards(state.input.mousePointer, 0);
  } else if (this.handles[1].needsUpdate) {
    this.rotateHandleTowards(state.input.mousePointer, 1);
  }
}

Lamp.prototype.moveHandles = function () {
  for (var i = 0; i < 2; i++) {
    var xAxis = new Phaser.Point(this.radius, 0.0);
    var target = Phaser.Point.rotate(xAxis, 0, 0, this.handles[i].rotation);
    this.handles[i].reset(
      this.bulb.world.x + target.x,
      this.bulb.world.y + target.y
    );
  };
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

  // force handle to be on the edge
  this.handles[i].reset(
    this.bulb.world.x + centerToHandleNorm.x*this.radius,
    this.bulb.world.y + centerToHandleNorm.y*this.radius
  );

  // Angle to positive x axis determines rotation
  //                                   dot: 1.0*x + 0.0*y     determine sign
  this.handles[i].rotation = Math.acos(centerToHandleNorm.x)*(centerToHandleNorm.y < 0 ? -1 : 1);
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
    self.showHandles();
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
