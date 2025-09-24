module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['Chrome', 'ChromeHeadless'],
    reporters: ['progress', 'coverage']
  });
};
