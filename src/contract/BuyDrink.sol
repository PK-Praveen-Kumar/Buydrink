// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Buydrink{
    struct items{
        string name;
        string message;
        uint time;
        address from;
    }
    items[] Items;
    address payable owner;
    constructor(){
        owner = payable(msg.sender); 
    }

    function Buy(string calldata name, string calldata message) external payable {
        require(msg.value > 0,"pay more the 0 ether");
        owner.transfer(msg.value);
        Items.push(items(name,message,block.timestamp,msg.sender));
    }

    function Getitems()public view returns(items[] memory) {
        return Items;
    }

}