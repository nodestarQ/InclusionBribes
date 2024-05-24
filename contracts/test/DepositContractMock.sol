// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract DepositContractMock {
    event Message(string  message1,string  message2);


    constructor() {
    }

    function deposit(string calldata message1, string calldata  message2) public payable {
        emit Message(message1,  message2);
    }

    }