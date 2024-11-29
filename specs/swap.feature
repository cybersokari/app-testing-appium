Feature: Token Swap

  Background:
    Given I am logged into the application

  Scenario Outline: Cannot swap <token> to Naira with low balance
    Given  I initiate a <token> swap
    And I enter an amount greater than my current balance
    Then I should see an error toast message
    And I should not see the swap confirmation screen
    Examples:
    |token|
    |USDT |
    |USDC |

  @critical
  Scenario Outline: Can swap <token> to Naira
    Given I initiate a <token> swap
    And my available <token> balance is not below <amount>
    When I enter <amount> as amount to swap
    Then I should be able to complete the swap
    Examples:
      | token | amount |
      | USDT |  1|
      | USDC |  1|




