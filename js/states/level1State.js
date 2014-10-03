'use strict';

var Level1State = function (game) { };

Level1State.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('level1', 'assets/levels/level1.png');
  },

  create: function () {
    var self = this;

    this.state.add('TestLevelState', TestLevelState);

    this.level = new Level(this, 'level1', {
      lampsLimit: 2,
      lightRadius: 140,
      handlesOff: true
    });

    this.checkpoint0();
  },

  update: function () {
    this.level.update();
  },

  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
  },

  createNextButton: function () {
    var self = this;
    this.nextButton = this.add.sprite(
      this.world.width - 100,
      this.world.height - 50
    );

    this.nextButton.width = 100;
    this.nextButton.height = 50;

    this.nextButton.inputEnabled = true;
    this.nextButton.input.useHandCursor = true;
    this.nextButton.events.onInputDown.add(function () {
      console.log("next level");
      self.game.state.start('TestLevelState');
    });
  }
};

/**
 * Checkpoints
 */
Level1State.prototype.checkpoint0 = function () {
  this.dBox = new DialogueBox(
      this,
      "We're in some kind of tunnel. Can you light it up for us?"
    );
  this.dBox.reveal();
  this.createNextButton();
};
