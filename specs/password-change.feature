Feature: Password change

  @allure.label.id:PASS-1
  Scenario Outline: Attempt to change password with invalid current password
    Given I am logged into the application
    When I navigate to change password screen
    When I enter <invalid password> as the current password
    And I enter <invalid password> as the new password
    And I enter <invalid password> as the new password confirmation and click continue
    Then I should see an error toast message

    Examples:
      |invalid password|
      |SecretPassword1#455|