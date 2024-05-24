// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./AntiCensorShipBriber.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract DepositContractTest {
    // This event is triggered whenever a new drop is deployed
    event Message(string  message1,string  message2);

    AntiCensorShipBriber antiCensorShipBriber;

    function deposit(string calldata message1,string calldata  message2) public payable {
        emit Message(message1,  message2);
    }

    function setUp() public {
       antiCensorShipBriber = new AntiCensorShipBriber();
    }

    function test_DepositMockContract() {
        bytes inputCalldata = 0x7a9b486d0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086d6573736167653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086d65737361676532000000000000000000000000000000000000000000000000;
        antiCensorShipBriber.callFunction(inputCalldata);

    }
}