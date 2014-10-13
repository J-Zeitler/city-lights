'use strict';

var Level2State = function (game) { };

Level2State.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('level2', 'assets/levels/level2.png');
  },

  create: function () {
    var self = this;

    this.state.add('Level3State', Level3State);
    this.scoreKeeper = new ScoreKeeper(this, 'level2', {
      winThreshold: 100
    });


    this.level = new Level(this, 'level2', {
      lampsLimit: 2,
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

Level2State.prototype.finish = function () {
  self.game.state.start('Level3State');
};

/**
 * Checkpoints
 */
Level2State.prototype.checkpoint0 = function () {
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

Level2State.prototype.checkpoint1 = function () {
  this.level.sprite.events.onInputDown.remove(this.checkpoint1, this);
  this.dBox.box.destroy(true);
  this.scoreKeeper.start();

  this.dBox = new DialogueBox(
    this,
    "I've upgraded your lamps with my best reflectors, use them to change focus of a lamp."
  );
  this.dBox.reveal();
};
