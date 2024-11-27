Feature: Push Notification Settings

  Background:
    Given I am on the login page
    And I enter kparobo@finnaprotocol.io as email and Password1# as password and clicks login button

  Scenario: Enable push notifications from profile settings
    Given I dismiss push notification permission request
    And wait for the home screen to be visible
    When I navigate to the profile screen
    Then the push notification toggle should be disabled
    When I enable push notifications from profile screen
    Then the push notification toggle should be enabled

  Scenario: Push notifications enabled during login
    Given I accept push notification permission request
    And wait for the home screen to be visible
    When I navigate to the profile screen
    Then the push notification toggle should be enabled