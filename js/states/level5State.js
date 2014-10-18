'use strict';

var Level5State = function (game) { };

Level5State.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('level5', 'assets/levels/level5.png');
  },

  create: function () {
    var self = this;

    this.state.add('MenuState', MenuState);
    this.scoreKeeper = new ScoreKeeper(this, 'level5', {
      winThreshold: 100
    });


    this.level = new Level(this, 'level5', {
      lampsLimit: 3,
      lightRadius: 130,
      lampsLocked: true
    });


    this.scoreGauge = new ScoreGauge(this, this.scoreKeeper, this.finish);
    this.checkpoint0();
  },

  update: function () {
    this.level.update();
  },

  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
  }
};

Level5State.prototype.finish = function () {
  self.game.state.start('MenuState');
};

/**
 * Checkpoints
 */
Level5State.prototype.checkpoint0 = function () {
  var self = this;

  this.dBox = new DialogueBox(
    this,
    "Good Job, fresh air again. We're at the town square, I think ..."
  );
  this.dBox.reveal();

  this.dBox.onRevealed(function () {
    self.level.unlockLamps();
    self.level.sprite.events.onInputDown.add(self.checkpoint1, self);
  });
};

Level5State.prototype.checkpoint1 = function () {
  this.level.sprite.events.onInputDown.remove(this.checkpoint1, this);
  this.dBox.box.destroy(true);
  this.scoreKeeper.start();
};
