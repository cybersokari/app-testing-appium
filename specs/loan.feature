Feature: Loan
  Background:
    Given I am logged into the application

  Scenario Outline: Apply for Naira loan
    Given I am on loan section
    When I apply for a loan of <amount>
    And I enter a valid transaction pin for the loan
    Then loan should be approved
    Examples:
      | amount |
      | 50000  |

  Scenario: Repay latest loan in full
    Given I am on loan section
    When I repay the latest loan in full
    And I enter a valid transaction pin for the loan
    Then loan repayment should be approved