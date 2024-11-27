Feature: Send Cryptocurrency

  Scenario Outline: Send USDT to a wallet address
    Given I am logged into the application
    When I navigate to the wallet section
    And I click on wallet-send-btn button
    And I select USDT as the asset
    And I enter <amount> as amount <wallet address> as address and <message> as message
    And I click send-crypto-continue-btn button and wait for loading to finish
    And I click on confirm-crypto-send-btn button
    And I enter a valid transaction pin and click Continue button
    Then I should see an error toast message
    Examples:
      | amount| wallet address                    | message   |
      | 2    | TY2SWRrd5ARYgeGKt7DFjivgMqttP21YXj| Send 2 UST|