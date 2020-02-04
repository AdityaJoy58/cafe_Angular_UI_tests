/**
 * Created by Aditya
 */

var loginPage = {

    // Login page elements
    userName: by.model("user.name"),
    password: by.model("user.password"),
    loginButton: by.css("button[class='main-button']"),

};
module.exports = loginPage;
