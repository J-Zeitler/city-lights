'use strict';

/**
 * DialogueBox module, creates a box that reveals text over time.
 * @param {State}  state    Phaser state object
 * @param {String} text     text to display
 * @param {Object} options  optional settings
 */
var DialogueBox = function (state, text, options) {
  var self = this;

  // dialogue text
  this.text = text;
  this.state = state

  // optionals
  this.opts = options || {};
  this.pos = this.opts.pos || {x: state.world.centerX, y: 50};
  this.width = this.opts.width || 300;
  this.speed = this.opts.speed || 20; // chars per sec.
  this.color = this.opts.color || "#ffffff";
  this.size = this.opts.size || 13; // size in px.

  this.nextChar = 0;
  this.revealed = "";

  this.box = state.add.text(
    this.pos.x,
    this.pos.y, "", {
      font: "bold " + this.size + "px monospace",
      fill: this.color,
      stroke: "#333",
      align: "left",
      wordWrap: true,
      wordWrapWidth: this.width
  });
  this.box.anchor.setTo(0.5, 0.0);

  this.subscribers = [];
};

DialogueBox.prototype.reveal = function () {
  var self = this;
  this.revealed += this.text[this.nextChar++];
  this.box.setText(this.revealed);
  if (this.nextChar < this.text.length) {
    var timer = new Phaser.Timer(this.state);
    this.state.time.events.add(1000/self.speed, self.reveal, self);
  } else {
    this._notify();
  }
};

/**
 * Observer utils
 * @param  {Function} fn  callback
 * @param  {Object}   ctx callback context
 */
DialogueBox.prototype.onRevealed = function (fn, ctx) {
  this.subscribers.push({fn: fn, ctx: ctx});
};

DialogueBox.prototype._notify = function () {
  this.subscribers.forEach(function (s) {
    s.fn.call(s.ctx);
  });
};
