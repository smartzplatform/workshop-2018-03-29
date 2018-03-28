pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';

contract SmartzCrowdsale is MintedCrowdsale {

    function SmartzCrowdsale(
        address _wallet,
        address _token
    ) public Crowdsale(1000, _wallet, ERC20(_token)) {

    }

}