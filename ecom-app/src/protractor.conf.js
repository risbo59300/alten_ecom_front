// protractor.conf.js
exports.config = {
  framework: 'jasmine',
  specs: ['e2e/**/*.e2e-spec.ts'],
  directConnect: true,
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:4200/',
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  }
};
