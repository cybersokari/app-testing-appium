Feature: Create new user

  @prod
  Scenario Outline: Signup with valid credentials
    Given I am on the signup screen
    When  I enter a new email and <valid password> and click continue
    And verify my account with a valid OTP sent to my email
    Then I can setup my transaction pin
    And skip Biometric setup
    And I can see the login page
    Examples:
      | valid password |
      |SuperSecretPassword1@3@|