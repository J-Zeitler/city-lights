'use strict';

var IntroState = function (game) { };

IntroState.prototype = {
  preload: function () {
    // Images
    this.load.image('cityBackgroundScroller', 'assets/menu/cityBackgroundScroller.png');
    this.load.image('backgroundScrollerWindows', 'assets/menu/backgroundScrollerWindows.png');
    this.load.atlasJSONHash('lightPollution', 'assets/menu/introLightPollution.png', 'assets/menu/introLightPollution.json');

    // FIlters/Shaders
    this.load.script('introLightPollution', 'js/filters/introLightPollution.js');
    this.load.text('lightPollution-frag', 'js/filters/introLightPollution.frag');
    this.load.script('introWindowFilter', 'js/filters/introWindowFilter.js');
    this.load.text('windowFilter-frag', 'js/filters/introWindowFilter.frag');
  },

  create:  function () {
    this.lightPollution = this.add.sprite(
      0,
      0,
      'lightPollution'
    );

    this.lightPollution.animations.add('lightPollution');
    this.lightPollution.animations.play('lightPollution', 10, true);
    this.lightPollution.anchor.setTo(0.0, 0.0);

    var filter = this.add.filter(
      'IntroLightPollution', 480, 320
    );
    this.lightPollution.filters = [filter];

    this.buildings = this.add.tileSprite(
      0,
      0,
      this.game.world.width,
      this.cache.getImage('cityBackgroundScroller').height,
      'cityBackgroundScroller'
    );

    this.windows = this.add.tileSprite(
      0,
      0,
      this.game.world.width,
      this.cache.getImage('backgroundScrollerWindows').height,
      'backgroundScrollerWindows'
    );
    var filter = this.add.filter(
      'IntroWindowFilter', 480, 320
    );
    this.windows.filters = [filter];
    this.litRatio = 1.0;
    this.turnOffTheLights = false;

    this.checkpoint0();
    // this.runInfinite();
  },

  showMenu: function () {
    this.game.state.start('MenuState');
  },

  update: function () {
    this.buildings.tilePosition.x -= 0.5;
    this.windows.tilePosition.x -= 0.5;
  },

  render: function () {
    if (this.turnOffTheLights && this.litRatio > 0) {
      this.litRatio -= 0.01;
      this.windows.filters[0].litRatio = this.litRatio*Math.random();
      this.lightPollution.filters[0].litRatio = this.litRatio;
    } else if (this.litRatio <= 0) {
      self.game.state.start('Level0State');
    }
  }
}

IntroState.prototype.runInfinite = function () {

}

IntroState.prototype.checkpoint0 = function () {
  this.dBox = new DialogueBox(
      this,
      "Once upon a time, there was a city. A glorious, glowing city"
    );
  this.dBox.reveal();
  this.dBox.onRevealed(function () {
    game.time.events.add(Phaser.Timer.SECOND*2, this.checkpoint1, this);
  }, this);
};

IntroState.prototype.checkpoint1 = function () {
  this.dBox.box.destroy(true);
  this.dBox = new DialogueBox(
      this,
      "This city had a problem, however. It's citizens were using way too much electrical power"
    );
  this.dBox.reveal();
  this.dBox.onRevealed(function () {
    game.time.events.add(Phaser.Timer.SECOND*2, this.checkpoint2, this);
  }, this);
};

IntroState.prototype.checkpoint2 = function () {
  this.dBox.box.destroy(true);
  this.dBox = new DialogueBox(
      this,
      "So much, in fact, that it ran out..."
    );
  this.dBox.reveal();
  this.dBox.onRevealed(function () {
    game.time.events.add(Phaser.Timer.SECOND*2, this.checkpoint3, this);
  }, this);
};

IntroState.prototype.checkpoint3 = function () {
  game.time.events.add(Phaser.Timer.SECOND*2, function () {
    this.turnOffTheLights = true;
  }, this);
};
