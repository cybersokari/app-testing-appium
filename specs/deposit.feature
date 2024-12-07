Feature: Deposit
  Background:
    Given I am logged into the application

  Scenario Outline: Deposit <token> to wallet
    Given I am on the deposit screen
    When when I try to deposit <token>
    Then I can copy the wallet address to device clipboard
    And share the wallet address as text
    Examples:
      |token|
      |USDT |
      |USDC |

  Scenario: Create Naira Deposit Transaction
    When I initiate a Naira deposit
    And I enter a deposit amount of 1000
    And I confirm the deposit details
    And I copy the NUBAN account number
    Then the copied account number should be available on device clipboard