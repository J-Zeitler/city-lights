'use strict';

var Level1State = function (game) { };

Level1State.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('level1', 'assets/levels/level1.png');
  },

  create: function () {
    var self = this;

    this.state.add('Level2State', Level2State);
    this.scoreKeeper = new ScoreKeeper(this, 'level1', {
      winThreshold: 100
    });

    this.level = new Level(this, 'level1', {
      lampsLimit: 2,
      lightRadius: 130,
      handlesOff: true
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

Level1State.prototype.finish = function () {
  self.game.state.start('Level2State');
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
};
