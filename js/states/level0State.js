'use strict';

var Level0State = function (game) { };

Level0State.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('level0', 'assets/levels/level0.png');
  },

  create: function () {
    var self = this;

    this.state.add('TestLevelState', TestLevelState);

    this.level = new Level(this, 'level0', {
      lampsLimit: 1,
      lightRadius: 175,
      handlesOff: true,
      lampsLocked: true
    });

    this.createNextButton();
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
Level0State.prototype.checkpoint0 = function () {
  this.dBox = new DialogueBox(
      this,
      "Damnit! a total blackout. Luckily I have a backup generator. Would you start it for me?"
    );
  this.dBox.reveal();
  this.dBox.onRevealed(this.checkpoint1, this);
};

Level0State.prototype.checkpoint1 = function () {
  this.pulser = new Pulser(this);
  this.level.unlockLamps();
  this.level.sprite.events.onInputDown.add(this.checkpoint2, this);
};

Level0State.prototype.checkpoint2 = function () {
  this.pulser.sprite.destroy(true);
  this.dBox.box.destroy(true);
  this.dBox = new DialogueBox(
    this,
    "Great! See if you can find a way out."
  );
  this.dBox.reveal();
};
