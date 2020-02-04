var myStepDefinitionsWrapper = function () {

    var loginPage = require('../../pages/loginPage');
    var homePage = require('../../pages/homePage');
    var settings = require('../../common/settings');
    var libraries = require('../../common/libraries');
    var chai = require(settings.constants.CHAI);
    this.setDefaultTimeout(settings.config.STEPTIMEOUT);
    var assert = chai.assert;
    var data;
    var expectedResultDictionary = {};
    var EC = protractor.ExpectedConditions;

    this.Given(/^User is logged into cafe Townsend Application$/, function (callback) {
        browser.wait(EC.visibilityOf(element(homePage.userFullName)), settings.config.WAITTIME).then(function (isHomePageUserNameDisplayed) {
            browser.findElement(homePage.homeLogo).isDisplayed().then(function (isHomeLogoDisplayed) {
                assert.isTrue(isHomePageUserNameDisplayed, "Home Page User Name Section on top right corner didn't show up");
                assert.isTrue(isHomeLogoDisplayed, "Home Page Logo didn't show up");
                callback();
            });
        });
    });

    this.When(/^User enters create details$/, function (dataTable, callback) {
        data = dataTable.hashes();
        browser.wait(EC.invisibilityOf(element(homePage.create)), settings.config.WAITTIME).then(function () {
            browser.wait(EC.visibilityOf(element(homePage.firstName)), settings.config.WAITTIME).then(function (isFirstNameDisplayed) {
                browser.findElement(homePage.firstName).sendKeys(data[0].Firstname).then(function () {
                    browser.findElement(homePage.lastName).sendKeys(data[0].Lastname).then(function () {
                        browser.findElement(homePage.startDate).sendKeys(data[0].Startdate).then(function () {
                            browser.findElement(homePage.email).sendKeys(data[0].Email).then(function () {
                                callback();
                            });
                        });
                    });
                });
            });
        });
    });

    this.When(/^User edits an employee$/, function (dataTable, callback) {
        data = dataTable.hashes();
        browser.wait(EC.visibilityOf(element(homePage.skillList)), settings.config.WAITTIME).then(function (isChangePasswordSectionDisplayed) {
            SelectRowByCellValue(element(homePage.skillList), data);
            browser.wait(EC.visibilityOf(element(homePage.edit)), settings.config.WAITTIME).then(function (isChangePasswordLinkDisplayed) {
                browser.findElement(homePage.edit).click().then(function () {
                    browser.wait(EC.invisibilityOf(element(homePage.backButton)), settings.config.WAITTIME).then(function () {
                        browser.wait(EC.visibilityOf(element(homePage.firstName)), settings.config.WAITTIME).then(function (isFirstNameDisplayed) {
                            browser.findElement(homePage.email).clear().then(function () {
                                browser.findElement(homePage.email).sendKeys(data[0].Email).then(function () {
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    this.When(/^User identifies an employee$/, function (dataTable, callback) {
        data = dataTable.hashes();
        browser.wait(EC.visibilityOf(element(homePage.skillList)), settings.config.WAITTIME).then(function (isChangePasswordSectionDisplayed) {
            SelectRowByCellValue(element(homePage.skillList), data);
            browser.findElement(homePage.delete).click().then(function () {
            });
        });
    });

    this.When(/^User clicks on Add/, function (callback) {
        browser.wait(EC.visibilityOf(element(homePage.add)), settings.config.WAITTIME).then(function (isChangePasswordLinkDisplayed) {
            browser.findElement(homePage.add).click().then(function () {
                callback();
            });
        });
    });

    this.When(/^User clicks on Update/, function (callback) {
        browser.wait(EC.visibilityOf(element(homePage.update)), settings.config.WAITTIME).then(function (isChangePasswordLinkDisplayed) {
            browser.findElement(homePage.update).click().then(function () {
                callback();
            });
        });
    });

    this.When(/^User deletes the employee/, function (callback) {
        browser.driver.switchTo().alert().accept();
    });

    this.Then(/^Verify user is added successfully$/, function (callback) {
        browser.wait(EC.visibilityOf(element(homePage.skillList)), settings.config.WAITTIME).then(function (isChangePasswordSectionDisplayed) {
            SelectRowByCellValue(element(homePage.skillList), data);
        });
    });

    this.Then(/^Verify user is updated successfully$/, function (callback) {
        browser.wait(EC.visibilityOf(element(homePage.skillList)), settings.config.WAITTIME).then(function (isChangePasswordSectionDisplayed) {
            SelectRowByCellValue(element(homePage.skillList), data);
            browser.wait(EC.visibilityOf(element(homePage.edit)), settings.config.WAITTIME).then(function (isChangePasswordLinkDisplayed) {
                browser.findElement(homePage.edit).click().then(function () {
                    browser.findElement(homePage.email).getText().then(function (getEmailText) {
                        assert.equal(data[0].Email, getEmailText, "Old Password text is not blank which is not expected");
                        callback();
                    });
                });
            });
        });
    });

    this.Then(/^Verify user is deleted successfully$/, function (callback) {
        browser.wait(EC.visibilityOf(element(homePage.skillList)), settings.config.WAITTIME).then(function (isChangePasswordSectionDisplayed) {
            assert.isFalse(SelectRowByCellValue(element(homePage.skillList), data));
        });
    });

    SelectRowByCellValue = function (Elem, Texts) {
        Elem.filter(function (element) {
            return element.getText().then(function (text) {
                if (text == data[0].Firstname + ' ' + data[0].Lastname) {
                    element.click();
                    return true;
                }
            });
        }).then(function (filteredElements) {

        });
    };

};
module.exports = myStepDefinitionsWrapper;