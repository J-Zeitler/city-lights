'use strict';

var game = new Phaser.Game(480, 320, Phaser.WEBGL, 'City Lights', {
  preload: function () {
    this.load.script('defaultFont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    // Load assets
    this.load.image('lamp', 'assets/lamp.png');
    this.load.image('handle', 'assets/handle.png');
    this.load.atlasJSONHash('pulser', 'assets/pulser.png', 'assets/pulser.json');

    // Load filters + shaders
    this.load.script('lightSource', 'js/filters/lightSource.js');
    this.load.text('light-frag', 'js/filters/lightSource.frag');

    // Load entities
    this.load.script('Lamp', 'js/entities/lamp.js');
    this.load.script('Level', 'js/entities/level.js');
    this.load.script('Pulser', 'js/entities/pulser.js');
    this.load.script('DialogueBox', 'js/entities/dialogueBox.js');
    this.load.script('ScoreKeeper', 'js/entities/scoreKeeper.js');

    // Load states
    this.load.script('MenuState', 'js/states/menuState.js');
    this.load.script('Level0State', 'js/states/level0State.js');
    this.load.script('Level1State', 'js/states/level1State.js');
    this.load.script('TestLevelState', 'js/states/testLevelState.js');

    this.time.advancedTiming = true;
  },

  create: function () {
    // Attach states
    this.state.add('MenuState', MenuState);
    this.state.add('Level0State', Level0State);
    this.state.add('Level1State', Level1State);
    this.state.add('TestLevelState', TestLevelState);

    this.state.start('TestLevelState');
  },

  update: function () {
  },

  render: function () {
  }
});

game.preserveDrawingBuffer = true;
