pragma solidity ^0.4.19;

import './SmartzDeliveryOracle.sol';

contract SmartzPayment {

    address owner;
    uint256 public item_price;

    SmartzDeliveryOracle oracle;

    event Withdraw(address to, uint amount);

    
    function SmartzPayment(uint256 _start_price, address _oracle) public {
        owner = msg.sender;
        item_price = _start_price;
        oracle = SmartzDeliveryOracle(_oracle);
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
        // [WARN] if msg.value >= item_price it can lead to front-run attack from owner
        require (msg.value == item_price);

    }

    function withdraw_final(uint amount) onlyOwner public returns(bool) {
        require(oracle.delivered());
        require(amount <= address(this).balance);
        owner.transfer(amount);
        Withdraw(msg.sender, amount);
        return true;
    }

}
