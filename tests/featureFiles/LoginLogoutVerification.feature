Feature:  Cafe Townsend Functionality Verification
  As a user on navigates to Application with the following functionalities
  Login
  Create a new employee and verify employee is created
  Edit an employee and verify employee is updated
  Delete the employee and verify employee is deleted

  Scenario: Verify Login to Cafe Townsend works successfully
    Given User navigates to cafe Townsend Application
    When User enters a valid User Name
    And User enters a valid Password
    And User clicks on Login button
    Then Verify the user logged into the application

  Scenario: Create a new employee and verify employee is created
    Given User is logged into cafe Townsend Application
    When User enters create details
      | Firstname | Lastname | Startdate  | Email         |
      | Adi       | Bhavanam | 2020-01-05 | adi@gmail.com |
    And User clicks on Add
    Then Verify user is added successfully

  Scenario: Edit an employee and verify employee is updated
    Given User is logged into cafe Townsend Application
    When User edits an employee
      | Firstname | Lastname | Email            |
      | Adi       | Bhavanam | aditya@gmail.com |
    And User clicks on Update
    Then Verify user is updated successfully

  Scenario: Delete the employee and verify employee is deleted
    Given User is logged into cafe Townsend Application
    When User identifies an employee
      | Firstname | Lastname | Email            |
      | Adi       | Bhavanam | aditya@gmail.com |
    And User deletes the employee
    Then Verify user is deleted successfully