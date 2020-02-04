var myStepDefinitionsWrapper = function () {

    var loginPage = require('../../pages/loginPage');
    var homePage = require('../../pages/HomePage');
    var settings = require('../../common/settings');
    var libraries = require('../../common/libraries');
    var chai = require(settings.constants.CHAI);
    this.setDefaultTimeout(settings.config.STEPTIMEOUT);
    var assert = chai.assert;
    var expectedResultDictionary = {};
    var EC = protractor.ExpectedConditions;

    this.Given(/^User navigates to cafe Townsend Application$/, function (callback) {
        browser.wait(EC.visibilityOf(element(loginPage.userName)), settings.config.WAITTIME).then(function (isUserNameFieldDisplayed) {
            browser.wait(EC.visibilityOf(element(loginPage.password)), settings.config.WAITTIME).then(function (isPasswordFieldDisplayed) {
                assert.isTrue(isUserNameFieldDisplayed, "User Name field is not Displayed which is not expected");
                assert.isTrue(isPasswordFieldDisplayed, "Password field is not Displayed which is not expected");
                callback();
            });
        });
    });

    this.When(/^User enters a valid User Name$/, function (callback) {
        browser.wait(EC.visibilityOf(element(loginPage.userName)), settings.config.WAITTIME).then(function (isUserNameFieldDisplayed) {
            browser.findElement(loginPage.userName).sendKeys(libraries.getUserName()).then(function () {
                callback();
            });
        });
    });

    this.When(/^User enters a valid Password$/, function (callback) {
        browser.wait(EC.visibilityOf(element(loginPage.password)), settings.config.WAITTIME).then(function (isPasswordFieldDisplayed) {
            browser.findElement(loginPage.password).sendKeys(libraries.getPasswordValueOriginal()).then(function () {
                callback();
            });
        });
    });

    this.When(/^User clicks on Login button$/, function (callback) {
        browser.wait(EC.visibilityOf(element(loginPage.loginButton)), settings.config.WAITTIME).then(function (isLoginButtonDisplayed) {
            browser.findElement(loginPage.loginButton).click().then(function () {
                callback();
            });
        });
    });

    this.Given(/^User navigates to Gatekeeper Application with successful login$/, function (callback) {
        browser.wait(EC.visibilityOf(element(loginPage.userName)), settings.config.ULTIMATELONGWAITTIME).then(function (isUserNameFieldDisplayed) {
            browser.wait(EC.visibilityOf(element(loginPage.password)), settings.config.ULTIMATELONGWAITTIME).then(function (isPasswordFieldDisplayed) {
                browser.findElement(loginPage.userName).sendKeys(libraries.getUserName()).then(function () {
                    browser.findElement(loginPage.password).sendKeys(libraries.getPasswordValueOriginal()).then(function () {
                        browser.findElement(loginPage.loginButton).click().then(function () {
                            callback();
                        });
                    });
                });
            });
        });
    });

    this.When(/^User selects Language "([^"]*)"$/, function (language, callback) {
        if (language == "ENGLISH") {
            var languagePick = loginPage.selectEnglishLanguage;
        } else if (language == "MEXICAN SPANISH") {
            var languagePick = loginPage.selectMexicoLanguage;
        } else if (language == "CHINESE") {
            var languagePick = loginPage.selectChinaLanguage;
        } else if (language == "SPAIN SPANISH") {
            var languagePick = loginPage.selectSpainLanguage;
        } else if (language == "PORTUGUESE") {
            var languagePick = loginPage.selectPortugeseLanguage;
        }
        browser.wait(EC.visibilityOf(element(languagePick)), settings.config.ULTIMATELONGWAITTIME).then(function () {
            browser.findElement(languagePick).click().then(function () {
                browser.sleep(settings.config.WAITTIME).then(function () {
                    callback();
                });
            });
        });
    });

    this.Then(/^Verify the user logged into the application$/, function (callback) {
        browser.wait(EC.visibilityOf(element(homePage.userFullName)), settings.config.ULTIMATELONGWAITTIME).then(function (isHomePageUserNameDisplayed) {
            browser.findElement(homePage.homeLogo).isDisplayed().then(function (isHomeLogoDisplayed) {
                assert.isTrue(isHomePageUserNameDisplayed, "Home Page User Name Section on top right corner didn't show up");
                assert.isTrue(isHomeLogoDisplayed, "Home Page Logo didn't show up");
                callback();
            });
        });
    });

    this.Then(/^Verify language is "([^"]*)" and Login button is in "([^"]*)"$/, function (language, language, callback) {
        if (language == "ENGLISH") {
            localization = settings.constants.ENGLISH;
            login = settings.constants.ENGLISHLOGIN;
        } else if (language == "MEXICAN SPANISH") {
            localization = settings.constants.MEXICANSPANISH;
            login = settings.constants.MEXICANSPANISHLOGIN;
        } else if (language == "CHINESE") {
            localization = settings.constants.CHINESE;
            login = settings.constants.CHINESELOGIN;
        } else if (language == "SPAIN SPANISH") {
            localization = settings.constants.SPAINSPANISH;
            login = settings.constants.SPAINSPANISHLOGIN;
        } else if (language == "PORTUGUESE") {
            localization = settings.constants.PORTUGUESE;
            login = settings.constants.PORTUGUESELOGIN;
        }
        browser.wait(EC.visibilityOf(element(loginPage.languagePicker)), settings.config.ULTIMATELONGWAITTIME).then(function (isLanguageDisplayed) {
            browser.findElement(loginPage.languagePicker).getText().then(function (getlanguageText) {
                browser.findElement(loginPage.loginButton).getAttribute('textContent').then(function (getLoginText) {
                    assert.equal(localization, getlanguageText, "Language text is not as expected");
                    assert.equal(login, getLoginText, "Login text is not as expected");
                    callback();
                });
            });
        });
    });
};
module.exports = myStepDefinitionsWrapper;