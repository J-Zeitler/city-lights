'use strict';

/**
 * ScoreKeeper module, calculates % of a scene that is lit.
 * @param {State}   state             Phaser state object
 * @param {Texture} referenceTexture  binary alpha texture
 * @param {Object}  options           (optional) settings
 */
var ScoreKeeper = function (state, referenceTexture, options) {

  this.state = state;
  this.opts = options || {};
  this.winThreshold = this.opts.winThreshold || 100;
  this.updateFrequency = this.opts.updateFrequency || 1.0; // updates per sec.

  this.score = 0;
  this.scoreSubscribers = [];
  this.winSubscribers = [];

  this.referenceTexture = referenceTexture;
  this.refImg = state.cache.getImage(this.referenceTexture).src;

  // TODO: this is a global assume, feels dirty
  this.canvas = document.getElementsByTagName('canvas')[0];
  this.canvasImg = new Image();

  // this.diffImg = new Image();
  // document.getElementsByTagName('body')[0].appendChild(this.diffImg);
};

ScoreKeeper.prototype.start = function () {
  this.keepScore();
};

/**
 * Score calculator using a modified Resemble.js to match two images.
 */
ScoreKeeper.prototype.keepScore = function () {
  this.canvasImg.src = this.canvas.toDataURL();
  this.canvasImg.onload = this._compareAndUpdate();
};

ScoreKeeper.prototype._compareAndUpdate = function () {
  var self = this;
  resemble(this.refImg).compareTo(this.canvasImg.src).onComplete(function(data){
    var matchPercent = 100 - parseFloat(data.misMatchPercentage);
    var matchScaled = 100*matchPercent/self.winThreshold;
    self.score = Math.ceil(matchScaled);

    // var diffSrc = data.getImageDataUrl();
    // self.diffImg.src = diffSrc;

    self._notifyScoreSubscribers();
    if (self.score >= 100) {
      self._notifyWinSubscribers();
    }

    self.state.time.events.add(1000/self.updateFrequency, self.keepScore, self);
  });
};

/**
 * Observer utils
 * @param  {Function} fn  callback
 * @param  {Object}   ctx callback context
 */
ScoreKeeper.prototype.onScoreUpdate = function (fn, ctx) {
  this.scoreSubscribers.push({fn: fn, ctx: ctx});
};

ScoreKeeper.prototype._notifyScoreSubscribers = function () {
  var self = this;
  this.scoreSubscribers.forEach(function (s) {
    s.fn.call(s.ctx, self.score);
  });
};

ScoreKeeper.prototype.onWin = function (fn, ctx) {
  this.winSubscribers.push({fn: fn, ctx: ctx});
};

ScoreKeeper.prototype._notifyWinSubscribers = function () {
  var self = this;
  this.winSubscribers.forEach(function (s) {
    s.fn.call(s.ctx, self.score);
  });
};
