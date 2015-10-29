module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'sinon', 'riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-browserify',
      'karma-sinon',
      'karma-riot'
    ],
    files: [
      'node_modules/expect.js/index.js',
      'test/helpers/*.js',
      'test/mocks/*.js',
      'src/index.js',
      'src/tags/*.tag',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.tag': ['riot'],
      'src/index.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },
    
    // browserify configuration
    browserify: {
      debug: true,
      extensions: ['.js'],
      transform: [ 'babelify', 'riotify' ]
    },
    
    riotPreprocessor: {
      options: {
        type: 'es6'
      }
    },
    
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    singleRun: true
  });
};