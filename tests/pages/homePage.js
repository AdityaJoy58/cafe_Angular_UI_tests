/**
 * Created by Aditya
 */

var homePage = {

    // Home page elements
    greetings: by.id("greetings"),
    logoutButton: by.css("p[ng-click='logout()']"),

    // Search
    searchName: by.id("employee-list"),
    skillList: element.all(by.css("ul[id='employee-list'] li")),

    // Create
    create: by.id("bAdd"),
    firstName: by.model("selectedEmployee.firstName"),
    lastName: by.model("selectedEmployee.lastName"),
    startDate: by.model("selectedEmployee.startDate"),
    email: by.model("selectedEmployee.email"),
    add: by.css("div[class='formFooter'] button:nth-child(2)"),

    // Edit
    edit: by.id("bEdit"),
    backButton: by.css("a[ng-click='browseToOverview()']"),
    update: by.css("div[class='formFooter'] button:nth-child(1)"),

    // Delete
    delete: by.id("bDelete"),
    deleteInEdit: by.css("p[ng-click='deleteEmployee()']"),
};
module.exports = homePage;
