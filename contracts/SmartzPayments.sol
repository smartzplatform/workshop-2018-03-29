pragma solidity ^0.4.19;

contract SmartzPayments {

    address owner;
    uint256 public item_price;

    
    function SmartzPayments(uint256 _start_price) public {
        owner = msg.sender;
        item_price = _start_price;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // [TODO] add checks
    function set_price(uint256 _new_price) onlyOwner public {
        item_price = _new_price;
    }

    function () public payable {
        require (msg.value >= item_price);

    }

    function withdraw(uint amount) onlyOwner public returns(bool) {
        require(amount <= address(this).balance);
        owner.transfer(amount);
        return true;
    }

}
