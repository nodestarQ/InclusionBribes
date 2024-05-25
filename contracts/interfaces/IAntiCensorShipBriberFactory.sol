// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

interface IAntiCensorShipBriberFactory {
    //the address that contains the implementation of new drops
    function implementation() external view returns (address);

    // creates a new drop contract as a immuttable proxy clone with the implementation of the factory contract
    function createBribe(address _contractAddress, bytes4[] calldata _funcSelectors, address _rewardToken, uint256 _rewardPerCall) external;

    // This event is triggered whenever a new bribe is deployed
    event CreatBribe(address indexed deployerAddress, address _contractAddress);
}