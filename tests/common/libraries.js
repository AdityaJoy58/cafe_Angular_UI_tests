var settings = require('./settings');
var userName = 'Luke';
var passwordValueOriginal = 'Skywalker';
var passwordValue = '';
var bankAccountNumber = '';
var bankAccountName = '';
var cardExpiryMonthNumber = '';
var cardExpiryYearNumber = '';
var drnNickName = '';
var ivrCode = '';
var paymentAmount = '';
var numberOfPayments = '';
var random = require("random-js")(); // uses the nativeMath engine

var libraries = function () {

    this.randomString = function (length) {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
    }

    this.passwordString = function () {
        var str = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,2)+['?!@#$%^&*-5'];
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    this.waitForElement = function (selector, waitFor) {
        waitFor = waitFor || 5000;
        browser.driver.manage().timeouts().implicitlyWait(waitFor);
        browser.driver.findElement(selector);
        browser.driver.manage().timeouts().implicitlyWait(0);
    }

    this.getUserName = function(){
        return userName;
    };

    this.setUserName = function(){
        userName = "Luke";
        return userName;
    };

    this.getPasswordValue = function(){
        return passwordValue;
    };

    this.setPasswordValue = function(){
        passwordValue = "Skywalker";
        return passwordValue;
    };
}
module.exports = new libraries();
