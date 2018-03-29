'use strict';

const SmartzPayments = artifacts.require('SmartzPayments.sol');

contract('SmartzPayments', async (accounts) => {

    it('simple test', async () => {
        let payments = await SmartzPayments.new(1000, {from: accounts[0]});

        await payments.set_price(999, {from: accounts[0]});
        assert.equal(999, await payments.item_price());

    })

});
