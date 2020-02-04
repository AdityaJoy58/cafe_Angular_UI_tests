exports.config = {
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    capabilities: {
        browserName: 'chrome', // firefox
        chromeDriver: './node_modules/webdriver-manager/selenium/chromedriver_2.36',
        seleniumAddress: 'http://localhost:4444/wd/hub',
        maxInstances: 1,
    },
    
    params: {
        website: {
            baseUrl: 'http://cafetownsend-angular-rails.herokuapp.com/login'
        }
    },

    specs: [
        'tests/featureFiles/**/LoginLogoutVerification.feature',

    ],

    cucumberOpts: {
        format: ['json:./reports/cucumber-test-results.json', 'pretty'],
        require: ['./tests/featureFiles/**/*_steps.js','./tests/support/*.js'],
        tags: [],
        ignoreUncaughtExceptions: true,
        profile: false,
        'no-source': true
    },
    ignoreUncaughtExceptions: true,
};