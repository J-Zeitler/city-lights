'use strict';

/**
 * Score gauge module, creates a gauge that subscribes to a ScoreKeeper.
 * @param {State}       state       Phaser state object
 * @param {ScoreKeeper} scoreKeeper scoreKepper to subcribe to.
 * @param {function}      winCallback function to run on user finished
 */
var ScoreGauge = function (state, scoreKeeper, winCallback) {

  this.state = state;

  this.scoreKeeper = scoreKeeper;
  this.scoreKeeper.onScoreUpdate(this.update, this);
  this.scoreKeeper.onWin(this.win, this);

  this.winCallback = winCallback;

  this.container = state.add.sprite(
    state.world.width - 10,
    10,
    'scoreGauge'
  );
  this.container.anchor.setTo(1.0, 0.5);

  this.fill = state.add.sprite(
    state.world.width - this.container.width + 4,
    10,
    'scoreGaugeFill'
  );
  this.fill.anchor.setTo(0.0, 0.5);

  this.textBox = state.add.text(
    state.world.width - this.container.width/2 - 10,
    3, "0%", {
    font: "bold 12px monospace",
    fill: "#111",
    stroke: "#ffc",
    align: "center"
  });
  this.textBox.anchor.setTo(0.5, 0.0);

  this.fill.cropEnabled = true;
  this.originalFillWidth = this.fill.width;
  this.update(0);
}

ScoreGauge.prototype.update = function (score) {
  var croptangle = new Phaser.Rectangle(0, 0, this.originalFillWidth*score/100, this.fill.height);
  this.fill.crop(croptangle);
  this.textBox.setText(score + "%");
};

ScoreGauge.prototype.win = function () {
  var self = this;

  this.textBox.setText("Go to next level ->");
  this.fill.inputEnabled = true;
  this.fill.input.useHandCursor = true;
  this.fill.events.onInputDown.add(function () {
    self.winCallback.call(self.state);
  });
};
