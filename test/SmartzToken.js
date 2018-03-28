'use strict';

const Token = artifacts.require('SmartzToken.sol');

contract('SmartzToken', async (accounts) => {

    it('simple test', async () => {
        let instance = await Token.new({from: accounts[0]});

        await instance.mint(accounts[1], 100, {from: accounts[0]});
        assert.equal(100, await instance.balanceOf(accounts[1]));

        await instance.transfer(accounts[2], 50, {from: accounts[1]});
        assert.equal(50, await instance.balanceOf(accounts[1]));
        assert.equal(50, await instance.balanceOf(accounts[2]));

        await instance.burn(50, {from: accounts[2]});
        assert.equal(0, await instance.balanceOf(accounts[2]));

        assert.equal(50, await instance.totalSupply())
    })

});