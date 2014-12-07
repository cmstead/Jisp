module.exports = function(config){
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        reporters: ['progress', 'coverage'],

        browsers: ['PhantomJS'],

        files: [
            '../scripts/src/jfp.js',
            '../scripts/src/modules/*.js',
            '../scripts/src/jfp.expose.js',
            './**/*.spec.js'
        ],

        preprocessors: {
            '../scripts/src/modules/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'text-summary'
        },

        colors: true,

        autoWatch: false,
        singleRun: true
    });


}