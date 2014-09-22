Phaser.Filter.LightSource = function (game) {
  Phaser.Filter.call(this, game);
  this.uniforms.radius = { type: '1f', value: 1 };
  this.uniforms.position = {type: '2f', value: { x: 100, y: 100}};
};

Phaser.Filter.LightSource.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.LightSource.prototype.constructor = Phaser.Filter.LightSource;

Phaser.Filter.LightSource.prototype.init = function (width, height, fragShader) {
  this.setResolution(width, height);
  this.fragmentSrc = fragShader.split('\n');
}

Object.defineProperty(Phaser.Filter.LightSource.prototype, 'radius', {
  get: function() {
    return this.uniforms.radius.value;
  },
  set: function(value) {
    this.uniforms.radius.value = value;
  }
});

Object.defineProperty(Phaser.Filter.LightSource.prototype, 'position', {
  get: function() {
    return this.uniforms.position.value;
  },
  set: function(value) {
    this.uniforms.position.value = value;
  }
});
