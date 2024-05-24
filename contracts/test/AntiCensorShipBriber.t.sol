// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "../AntiCensorShipBriber.sol";
import "./DepositContractMock.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract AntiCensorShipBriberTest {
    DepositContractMock  depositContractMock;
    AntiCensorShipBriber antiCensorShipBriber;
    bytes inputCalldata;


    function setUp() public {
       antiCensorShipBriber = new AntiCensorShipBriber();
       depositContractMock = new DepositContractMock();
    }

    function test_DepositMockContract() public {
        inputCalldata = hex"7a9b486d0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086d6573736167653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086d65737361676532000000000000000000000000000000000000000000000000";
        console.logBytes(inputCalldata);
        //address(depositContractMock).call{gas: 500000000000000000} (inputCalldata);
        (bool succes, bytes memory returnData) = antiCensorShipBriber.callFunction(address(depositContractMock),inputCalldata);
        require(succes);
        console.logBytes(returnData);

    }
}