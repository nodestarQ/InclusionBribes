// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.26;


contract AntiCensorShipBriber {
    constructor() {

    }

    function createHoneyPot(address contractAddress ) public {
        
    }

    function callFunction(bytes calldata funcCalldata) public {
        //TODO 
        (bool succes, bytes memory returnData) = address(this).call(funcCalldata);
    }

}
