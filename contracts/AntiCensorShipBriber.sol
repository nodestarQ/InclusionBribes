// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.26;


contract AntiCensorShipBriber {


    function createHoneyPot(address contractAddress ) public {
        
    }

    function callFunction(address contractAddress, bytes calldata funcCalldata) public payable  returns (bool, bytes memory) {
        //TODO 
        (bool succes, bytes memory returnData) = address(contractAddress).call{gas: 500000000000000000} (funcCalldata);
        return (succes, returnData);
        //require(succes, "call failed :(");
    }

}
