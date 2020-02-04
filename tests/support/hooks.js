var conf = require('../../conf');
var homePage = require('../pages/HomePage');
var applicationUrl = conf.config.params.website.baseUrl;
console.log(applicationUrl);
var hooks = function () {
    this.registerHandler('BeforeFeature', function(feature){
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        browser.get(applicationUrl);
    });

    this.registerHandler('AfterFeature', function(feature, callback){
        browser.wait(EC.visibilityOf(element(homePage.userFullName)), settings.config.ULTIMATELONGWAITTIME).then(function () {
            browser.findElement(homePage.userFullName).click().then(function () {
                browser.wait(EC.visibilityOf(element(homePage.logout)), settings.config.ULTIMATELONGWAITTIME).then(function () {
                    browser.findElement(homePage.logout).click().then(function () {
                        callback();
                    });
                });
            });
        });
    });
};

module.exports = hooks;
