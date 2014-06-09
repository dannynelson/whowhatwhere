var appConfig = require('../app.config.json');

module.exports = function(config){
  config.set({
    basePath : '..',

    files : appConfig.vendor.concat(appConfig.ngMock, 'client/**/!(*e2e).js'),

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    preprocessors: {
      '**/client/**/!(*spec).js': 'coverage'
    },

    coverageReporter: {
      dir: 'coverage',
    },
  });
};
