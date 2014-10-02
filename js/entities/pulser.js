'use strict';

/**
 * Pulser module, creates a pulsing marker.
 * @param {State}  state  Phaser state object
 * @param {Point}  pos    spawn position
 */
var Pulser = function (state, pos) {
  var self = this;

  this.sprite = state.add.sprite(
    state.world.centerX,
    state.world.centerY,
    'pulser'
  );

  this.sprite.animations.add('pulse');
  this.sprite.animations.play('pulse', 15, true);
  this.sprite.anchor.setTo(0.5, 0.5);
}
