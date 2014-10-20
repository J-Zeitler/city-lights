'use strict';

var MenuState = function (game) { };

MenuState.prototype = {
  preload: function () {
    this.load.image('menuPlayButton', 'assets/menu/menuPlayButton.png');
    this.load.image('menuBG', 'assets/menu/menuBG.png');
    this.load.atlasJSONHash('logo', 'assets/menu/logo.png', 'assets/menu/logo.json');
  },

  create:  function () {
    this.bg = this.add.sprite(
      this.world.centerX,
      this.world.centerY - 50,
      'logo'
    );
    this.bg.animations.add('mist');
    this.bg.animations.play('mist', 10, true);
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