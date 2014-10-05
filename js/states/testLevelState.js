'use strict';

var TestLevelState = function (game) { };

TestLevelState.prototype = {
  preload: function () {
    this.load.image('black', 'assets/levels/black.png');
    this.load.image('testLevel', 'assets/levels/testLevel.png');
  },

  create: function () {
    this.level = new Level(this, 'testLevel', {
      lampsLimit: 3
    });
    this.scoreKeeper = new ScoreKeeper(this, 'testLevel');
  },

  update: function () {
    this.level.update();
  },

  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    game.debug.text(this.scoreKeeper.score + '%' || '--', 200, 14, "#00ff00");
  }
};