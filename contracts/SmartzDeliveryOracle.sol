pragma solidity ^0.4.19;

contract SmartzDeliveryOracle {

    address customer;
    bool public delivered;

    function SmartzDeliveryOracle(address _customer) {
        customer = _customer;
    }

    modifier onlyCustomer {
        require(msg.sender == customer);
        _;
    }

    function setDelivered() onlyCustomer public {
        delivered = true;
    }
}
