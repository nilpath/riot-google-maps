module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'sinon'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-browserify',
      'karma-sinon'
    ],
    files: [
      'node_modules/expect.js/index.js',
      'test/helpers/*.js',
      'src/**/*.tag',
      'src/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.tag': ['browserify'],
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },
    
    // browserify configuration
    browserify: {
      debug: true,
      transform: [ 'babelify', 'riotify' ]
    },
    
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    singleRun: true
  });
};