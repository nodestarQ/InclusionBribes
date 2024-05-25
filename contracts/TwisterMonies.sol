//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TwisterMonies {
    // mapping that keeps track of address and how much it can draw from the contract
    // getter to see how much can be withdrawn
    // deposit function 
    // withdraw function
    mapping(address => uint256) public userBalance;

    event Deposit(
        address indexed sender,
        uint256 amount
    );

    event Withdraw(
        address indexed sender,
        uint256 amount
    );

    constructor(){}

    function depositFunds() public payable {
        require(msg.value > 0, "No monies can be deposited");
        userBalance[msg.sender] += msg.value; 
        emit Deposit(msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _withdrawAmount) public {
        require(userBalance[msg.sender] > 0, "you did not deposit any monies previously");
        require(_withdrawAmount <= userBalance[msg.sender], "You can't withdraw that many monies");
        //decrement value 
        userBalance[msg.sender]-=_withdrawAmount;
        //withdraw money
        payable(msg.sender).transfer(_withdrawAmount);
        emit Withdraw(msg.sender, _withdrawAmount);
    }

}
