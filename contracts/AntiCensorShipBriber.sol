// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

pragma solidity ^0.8.26;

struct PendingCalldata {
    bytes funcCalldata;
    uint256 value;
    uint32 gasLimit;
    bytes32 salt;
}

contract AntiCensorShipBriber is Initializable {

    address public  censoredContractAddress;

    mapping(bytes32 => PendingCalldata ) public pendingCallDataStorage;
    mapping (bytes32 => bool) pendingCallDataBools;

    address public rewardToken;
    uint256 public rewardPerCall;

    //TODO gasgolf tightpacking
    mapping(bytes4 => bool) public eligibleFuncSelectors;

    //TODO also register manditory arguments
    function initialize(address _contractAddress, bytes4[] calldata _funcSelectors, address _rewardToken, uint256 _rewardPerCall) public initializer {
        censoredContractAddress = _contractAddress;
        rewardToken = _rewardToken;
        rewardPerCall = _rewardPerCall;

        for (uint256 index = 0; index < _funcSelectors.length; index++) {
            eligibleFuncSelectors[_funcSelectors[index]] = true;
        }
    }

    //TODO check gaslimit data type
    //TODO can salt be smaller
    function callFunction(bytes calldata _funcCalldata, uint32 gasLimit, bytes32 salt ) public payable {
        //check contract and function selector
        require(eligibleFuncSelectors[bytes4(_funcCalldata[:4])], "function in call data is not eligible");

    

        // create unique identifier for calldata
        bytes32 pendingCallDataHash = keccak256(abi.encodePacked(_funcCalldata, msg.value, gasLimit, salt));
        
        //TODO maybe remove pendingCallDataStorage to save gas

        //store calldata
        PendingCalldata memory pendingCalldata = PendingCalldata(_funcCalldata, msg.value, gasLimit, salt );
        pendingCallDataStorage[pendingCallDataHash] = pendingCalldata;
        pendingCallDataBools[pendingCallDataHash] = true;
    }




    function sweepReward(bytes32 pendingCallDataHash) public {
        require(pendingCallDataBools[pendingCallDataHash]);
        pendingCallDataBools[pendingCallDataHash] = false;
        PendingCalldata memory pendingCallData = pendingCallDataStorage[pendingCallDataHash];

        (bool succes, bytes memory returnData) = address(censoredContractAddress).call{
            gas: pendingCallData.gasLimit, value: pendingCallData.value
            } (pendingCallData.funcCalldata);
        require(succes);

        _sendReward(msg.sender);

    }

    function _sendReward(address receiptient) private {
        IERC20(rewardToken).transfer(receiptient, rewardPerCall);
    }
}
