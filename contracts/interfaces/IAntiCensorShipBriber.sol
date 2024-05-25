// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


struct PendingCalldata {
    bytes funcCalldata;
    uint256 value;
    uint32 gasLimit;
    bytes32 salt;
}

interface IAntiCensorShipBriber {
    function callFunction(bytes calldata _funcCalldata, uint32 gasLimit, bytes32 salt ) external payable;

    function sweepReward(bytes32 pendingCallDataHash) external;

    
    //function eligibleFuncSelectors(bytes4) external returns (bool);
    //function censoredContractAddress() external returns(address);

    //function pendingCallDataStorage(bytes32) external returns(PendingCalldata calldata);


    //function pendingCallDataBools(bytes32) external returns(bool);

    //function rewardrewardTokenPerCall() external returns(address) ;
    //function rewardPerCall() external returns(uint256);

}
