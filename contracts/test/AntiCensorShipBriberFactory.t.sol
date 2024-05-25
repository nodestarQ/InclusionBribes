// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "../AntiCensorShipBriber.sol";
import "../AntiCensorShipBriberFactory.sol";
import "./DepositContractMock.sol";

import "./RewardToken.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract AntiCensorShipBriberTest {
    RewardToken public rewardTokenMock;
    DepositContractMock depositContractMock;
    AntiCensorShipBriberFactory antiCensorShipBriberFactory;
    bytes inputCalldata;
    bytes4[] functionSelector;

    function setUp() public {
        rewardTokenMock = new RewardToken();

        depositContractMock = new DepositContractMock();
        functionSelector = [bytes4(hex"7a9b486d")];

        antiCensorShipBriberFactory = new AntiCensorShipBriberFactory();
        vm.recordLogs();
        antiCensorShipBriberFactory.createBribe( address(depositContractMock), functionSelector, address(rewardTokenMock), uint256(1));
        Vm.Log[] memory entries = vm.getRecordedLogs();
        address _deployedBribeAddress = abi.decode(entries[1].data, (address));
        
        rewardTokenMock.mint(address(_deployedBribeAddress), 100000000000000000);
        
       
    }
}
