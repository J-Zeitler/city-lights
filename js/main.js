'use strict';

var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {

  preload: function () {
    this.lamps = [];
    this.load.image('testLevelBW', 'assets/testLevelBW.png');
    this.load.image('testLevel', 'assets/testLevel.png');
    this.load.image('lamp', 'assets/lamp.png');
    this.load.script('lightSource', 'js/filters/lightSource.js');
    this.load.text('light-frag', 'js/filters/lightSource.frag');
    this.load.script('Lamp', 'js/entities/lamp.js');
    this.load.script('Level', 'js/entities/level.js');
    this.time.advancedTiming = true;
  },

  create: function () {
    this.level = new Level(this, 'testLevel');
  },

  update: function () {
    this.level.update();
  },

  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
  }
});
