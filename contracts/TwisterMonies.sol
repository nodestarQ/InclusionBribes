//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TwisterMonies {
    //mapping to keep track of the user balance
    mapping(address => uint256) public userBalance;

    //events
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
        require(msg.value > 0, "don't have enough to deposit");
        userBalance[msg.sender] += msg.value; 
        emit Deposit(msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _withdrawAmount) public {
        require(userBalance[msg.sender] > 0, "your balance is too low for that");
        require(_withdrawAmount <= userBalance[msg.sender], "You can't withdraw that much");
        //decrement value 
        userBalance[msg.sender]-=_withdrawAmount;
        //withdraw money
        payable(msg.sender).transfer(_withdrawAmount);
        emit Withdraw(msg.sender, _withdrawAmount);
    }

}
