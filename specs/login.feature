Feature: Authentication

  @prod
  Scenario Outline: Login with valid credentials
    Given I am on the login page
    When I enter <email> as email and <password> as password and clicks login button
    And I dismiss push notification permission request
    Then I should see the home screen
    Examples:
    | email                  | password  |
    |kparobo@finnaprotocol.io| Password1#|

  @prod
  Scenario: Logout after login
    Given I am logged into the application
    When I navigate to the profile screen
    And clicks on logout button
    Then I can see the login page

