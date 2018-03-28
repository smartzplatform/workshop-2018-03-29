'use strict';

const Token = artifacts.require('SmartzToken.sol');
const Crowdsale = artifacts.require('SmartzCrowdsale.sol');

contract('SmartzCrowdsale', async (accounts) => {

    it('simple test', async () => {
        let token = await Token.new({from: accounts[0]});
        let crowdsale = await Crowdsale.new(
            accounts[3],
            token.address,
            {from: accounts[0]}
        );

        await token.transferOwnership(crowdsale.address, {from: accounts[0]});

        await crowdsale.sendTransaction({from: accounts[5], value: 100});
        assert.equal(100000, await token.balanceOf(accounts[5]));

    })

});