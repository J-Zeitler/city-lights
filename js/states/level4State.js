'use strict';

var Level4State = function (game) { };

Level4State.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('level4', 'assets/levels/level4.png');
  },

  create: function () {
    var self = this;

    this.state.add('Level5State', Level5State);
    this.scoreKeeper = new ScoreKeeper(this, 'level4', {
      winThreshold: 100
    });

    this.level = new Level(this, 'level4', {
      lampsLimit: 3,
      lightRadius: 130,
    });

    this.scoreGauge = new ScoreGauge(this, this.scoreKeeper, this.finish);
    this.checkpoint0();
    this.scoreKeeper.start();
  },

  update: function () {
    this.level.update();
  },

  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
  }
};

Level4State.prototype.finish = function () {
  self.game.state.start('Level5State');
};

/**
 * Checkpoints
 */
Level4State.prototype.checkpoint0 = function () {
  this.dBox = new DialogueBox(
      this,
      "level 4"
    );
  this.dBox.reveal();
};
