'use strict';

var MenuState = function (game) { };

MenuState.prototype = {
  preload: function () {
    this.load.image('lamp', 'assets/lamp.png');
  },

  create:  function () {
    this.text = game.add.text(
      game.world.centerX - 75,
      game.world.centerY - 100,
      "City Lights", {
        fill: '#c4c433'
      }
    );
    this.button = game.add.button(
      game.world.centerX - 15,
      game.world.centerY - 15,
      'lamp', this.startGame
    );
  },

  startGame: function () {
    this.game.state.start('TestLevelState');
  },

  update:  function () {}
}