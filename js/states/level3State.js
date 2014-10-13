'use strict';

var Level3State = function (game) { };

Level3State.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('level3', 'assets/levels/level3.png');
  },

  create: function () {
    this.level = new Level(this, 'level3', {
      lampsLimit: 3,
      lightRadius: 140,
      lampsLocked: true
    });
    this.scoreKeeper = new ScoreKeeper(this, 'level3');
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

Level3State.prototype.finish = function () {
  self.game.state.start('MenuState');
};

/**
 * Checkpoints
 */
Level3State.prototype.checkpoint0 = function () {
  var self = this;

  this.dBox = new DialogueBox(
    this,
    "It's dark but we're in an alley. We really need some light here!"
  );
  this.dBox.reveal();

  this.dBox.onRevealed(function () {
    self.level.unlockLamps();
    self.level.sprite.events.onInputDown.add(self.checkpoint1, self);
  });
};

Level3State.prototype.checkpoint1 = function () {
  this.level.sprite.events.onInputDown.remove(this.checkpoint1, this);
  this.dBox.box.destroy(true);
  this.scoreKeeper.start();
};
