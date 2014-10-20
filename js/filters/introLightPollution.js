Phaser.Filter.IntroLightPollution = function (game) {
  Phaser.Filter.call(this, game);

  this.uniforms.litRatio = { type: '1f', value: 1.0 };

  fragShader = game.cache.getText('lightPollution-frag');
  this.fragmentSrc = fragShader.split('\n');
};

Phaser.Filter.IntroLightPollution.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.IntroLightPollution.prototype.constructor = Phaser.Filter.IntroLightPollution;

Phaser.Filter.IntroLightPollution.prototype.init = function (width, height) {
  this.setResolution(width, height);
}

Object.defineProperty(Phaser.Filter.IntroLightPollution.prototype, 'litRatio', {
  get: function() {
    return this.uniforms.litRatio.value;
  },
  set: function(value) {
    this.uniforms.litRatio.value = value;
  }
});