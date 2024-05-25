// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "../AntiCensorShipBriber.sol";
import "../AntiCensorShipBriberFactory.sol";
import "./DepositContractMock.sol";

import "./RewardToken.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract AntiCensorShipBriberTest is Test {
    RewardToken public rewardTokenMock;
    DepositContractMock depositContractMock;
    AntiCensorShipBriberFactory antiCensorShipBriberFactory;
    bytes inputCalldata;
    bytes4[] functionSelector;

    address deployedBribeAddress;

    function setUp() public {
        //set up for test_createBribe ----------------------
        rewardTokenMock = new RewardToken();

        depositContractMock = new DepositContractMock();

        antiCensorShipBriberFactory = new AntiCensorShipBriberFactory();


        //set up for test_initaiteCall ----------------------
        functionSelector = [bytes4(hex"7a9b486d")];

        vm.recordLogs();
        antiCensorShipBriberFactory.createBribe( address(depositContractMock), functionSelector, address(rewardTokenMock), uint256(1));
        Vm.Log[] memory entries = vm.getRecordedLogs();
        deployedBribeAddress = abi.decode(entries[1].data, (address));


        //set up for test_sweepReward ----------------------
        rewardTokenMock.mint(address(deployedBribeAddress), 100000000000000000);

        inputCalldata = hex"7a9b486d0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086d6573736167653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086d65737361676532000000000000000000000000000000000000000000000000";
        uint32 gasLimit = 1000000000;
        bytes32 salt = hex"25e90cfd42b110665225fe65cbb83c1d0ca5f4177c0aa28d1ac13c5db2d2fc98";

        AntiCensorShipBriber(deployedBribeAddress).callFunction(inputCalldata, gasLimit, salt);
        
       
    }

    function test_createBribe() public {
        functionSelector = [bytes4(hex"7a9b486d")];

        vm.recordLogs();
        antiCensorShipBriberFactory.createBribe( address(depositContractMock), functionSelector, address(rewardTokenMock), uint256(1));
        Vm.Log[] memory entries = vm.getRecordedLogs();
        address _deployedBribeAddress = abi.decode(entries[1].data, (address));
        rewardTokenMock.mint(address(_deployedBribeAddress), 100000000000000000);
        console.logAddress(_deployedBribeAddress);
        require(rewardTokenMock.balanceOf(_deployedBribeAddress) == 100000000000000000, "_deployedBribeAddress didnt recieve tokens");
    }

    function test_sweepReward() public {
        inputCalldata = hex"7a9b486d0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086d6573736167653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086d65737361676532000000000000000000000000000000000000000000000000";
        uint32 gasLimit = 1000000000;
        bytes32 salt = hex"30080d89d1487aea821b74afb1521c1b1f324a12a2fd9ef7dac691c0a7a8887a";

        AntiCensorShipBriber(deployedBribeAddress).callFunction(inputCalldata, gasLimit, salt);


    }


    function test_initaiteCall() public {
        inputCalldata = hex"7a9b486d0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000086d6573736167653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000086d65737361676532000000000000000000000000000000000000000000000000";
        uint32 gasLimit = 1000000000;
        bytes32 salt = hex"25e90cfd42b110665225fe65cbb83c1d0ca5f4177c0aa28d1ac13c5db2d2fc98";
        
        //calldata, msg.value, gasLimit, salt
        bytes32 pendingCallDataHash = keccak256(abi.encodePacked(inputCalldata, uint256(0), gasLimit, salt));

        AntiCensorShipBriber(deployedBribeAddress).sweepReward(pendingCallDataHash);(inputCalldata, gasLimit, salt);
        
        require(rewardTokenMock.balanceOf(address(this)) == 1);


    }

}
