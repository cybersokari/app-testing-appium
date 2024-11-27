Feature: Transaction Pin Management

  Scenario Outline: Attempt to change transaction pin with same pin
    Given I am logged into the application
    When I navigate to security settings
    And I initiate transaction pin change
    And I enter current pin <pin>
    And I enter new pin <pin>
    And I confirm new pin <pin>
    Then I should see an error message indicating invalid pin change
    Examples:
      |pin |
      |9999|