// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.26;


contract AntiCensorShipBriber {


    function createHoneyPot(address contractAddress ) public {
        
    }

    function callFunction(address contractAddress, bytes calldata funcCalldata) public returns (bool) {
        //TODO 
        (bool succes, bytes memory returnData) = address(contractAddress).call(funcCalldata);
        return succes;
        //require(succes, "call failed :(");
    }

}
