// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "../AntiCensorShipBriber.sol";
import "./DepositContractMock.sol";

import "./RewardToken.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract AntiCensorShipBriberTest {
    RewardToken public rewardTokenMock;
    DepositContractMock depositContractMock;
    AntiCensorShipBriber antiCensorShipBriber;
    bytes inputCalldata;
    bytes4[] functionSelector;

    function setUp() public {
        rewardTokenMock = new RewardToken();

        depositContractMock = new DepositContractMock();
        functionSelector = [bytes4(hex"7a9b486d")];

        antiCensorShipBriber = new AntiCensorShipBriber();
        antiCensorShipBriber.initialize(
            address(depositContractMock),
            functionSelector,
            address(rewardTokenMock),
            1
        );

        rewardTokenMock.mint(address(antiCensorShipBriber), 100000000000000000);
    }

    function test_callFunctiont() public {
        inputCalldata = hex"7a9b486d0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086d6573736167653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086d65737361676532000000000000000000000000000000000000000000000000";
        uint32 gasLimit = 1000000000;
        bytes32 salt = hex"30080d89d1487aea821b74afb1521c1b1f324a12a2fd9ef7dac691c0a7a8887a";

        console.logBytes(inputCalldata);
        //address(depositContractMock).call{gas: 500000000000000000} (inputCalldata);
        antiCensorShipBriber.callFunction(inputCalldata, gasLimit, salt);
    }

    function test_sweepReward() public {
        inputCalldata = hex"7a9b486d0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086d6573736167653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086d65737361676532000000000000000000000000000000000000000000000000";
        uint32 gasLimit = 1000000000;
        bytes32 salt = hex"30080d89d1487aea821b74afb1521c1b1f324a12a2fd9ef7dac691c0a7a8887a";

        //create call
        antiCensorShipBriber.callFunction(inputCalldata, gasLimit, salt);

        //claim reward
        bytes32 pendingCallDataHash = keccak256(abi.encodePacked(inputCalldata, uint256(0), gasLimit, salt));
        antiCensorShipBriber.sweepReward(pendingCallDataHash);
        require(rewardTokenMock.balanceOf( address(this)) == uint256(1), "didnt get the expected amount of tokens");
        console.logUint(rewardTokenMock.balanceOf( address(this)));
    }
}
