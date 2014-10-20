Phaser.Filter.IntroWindowFilter = function (game) {
  Phaser.Filter.call(this, game);

  this.uniforms.litRatio = { type: '1f', value: 1.0 };

  fragShader = game.cache.getText('windowFilter-frag');
  this.fragmentSrc = fragShader.split('\n');
};

Phaser.Filter.IntroWindowFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.IntroWindowFilter.prototype.constructor = Phaser.Filter.IntroWindowFilter;

Phaser.Filter.IntroWindowFilter.prototype.init = function (width, height) {
  this.setResolution(width, height);
}

Object.defineProperty(Phaser.Filter.IntroWindowFilter.prototype, 'litRatio', {
  get: function() {
    return this.uniforms.litRatio.value;
  },
  set: function(value) {
    this.uniforms.litRatio.value = value;
  }
});