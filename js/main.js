'use strict';

var game = new Phaser.Game(480, 320, Phaser.AUTO, 'City Lights', {
  preload: function () {
    // Load entities
    this.load.image('lamp', 'assets/lamp.png');
    this.load.script('lightSource', 'js/filters/lightSource.js');
    this.load.text('light-frag', 'js/filters/lightSource.frag');
    this.load.script('Lamp', 'js/entities/lamp.js');
    this.load.script('Level', 'js/entities/level.js');

    // Load States
    this.load.script('MenuState', 'js/states/menuState.js');
    this.load.script('TestLevelState', 'js/states/testLevelState.js');

    this.time.advancedTiming = true;
  },

  create: function () {
    // Attach states
    this.state.add('MenuState', MenuState);
    this.state.add('TestLevelState', TestLevelState);

    this.state.start('TestLevelState');
  },

  update: function () {
  },

  render: function () {
  }
});
