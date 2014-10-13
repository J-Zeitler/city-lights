'use strict';

var MenuState = function (game) { };

MenuState.prototype = {
  preload: function () {
    this.load.image('menuPlayButton', 'assets/menu/menuPlayButton.png');
    this.load.image('menuBG', 'assets/menu/menuBG.png');
  },

  create:  function () {
    this.bg = this.add.sprite(
      this.world.centerX,
      this.world.centerY,
      'menuBG'
    );
    this.bg.anchor.setTo(0.5, 0.5);

    this.button = game.add.button(
      game.world.centerX,
      game.world.centerY + 50,
      'menuPlayButton',
      this.startGame
    );
    this.button.anchor.setTo(0.5, 0.5);
    this.button.input.useHandCursor = true;
  },

  startGame: function () {
    this.game.state.start('Level0State');
  },

  update:  function () {}
}