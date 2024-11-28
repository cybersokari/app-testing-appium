Feature: Deposit
  Background:
    Given I am logged into the application
  
  @allure.label.id:DEP-1
  Scenario: Deposit USDT to wallet
    When user navigate to deposit screen
    And select prefer network
    And clicks on copy address button
    And clicks on share button
    Then the wallet address should be copied to device clipboard
    And the share modal should be visible

  @allure.label.id:DEP-2
  Scenario: Create Naira Deposit Transaction
    When I initiate a Naira deposit
    And I enter a deposit amount of 1000
    And I confirm the deposit details
    And I copy the NUBAN account number
    Then the copied account number should be available on device clipboard