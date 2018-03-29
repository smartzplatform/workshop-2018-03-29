pragma solidity ^0.4.19;

contract SmartzDeliveryOracle {

    address owner;
    bool delivered;

    function SmartzDeliveryOracle(address _owner) {
        owner = msg.sender;
        delivered = false;       
    }


    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function set_delivered() onlyOwner public {
        delivered = true;
    }
}
