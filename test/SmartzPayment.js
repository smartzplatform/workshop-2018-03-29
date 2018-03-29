'use strict';

const SmartzPayment = artifacts.require('SmartzPayment.sol');
const Oracle = artifacts.require('SmartzDeliveryOracle.sol');

const expectThrow = async promise => {
  try {
    await promise;
  } catch (error) {
    // TODO: Check jump destination to destinguish between a throw
    //       and an actual invalid jump.
    const invalidOpcode = error.message.search('invalid opcode') >= 0;
    // TODO: When we contract A calls contract B, and B throws, instead
    //       of an 'invalid jump', we get an 'out of gas' error. How do
    //       we distinguish this from an actual out of gas event? (The
    //       testrpc log actually show an 'invalid jump' event.)
    const outOfGas = error.message.search('out of gas') >= 0;
    const revert = error.message.search('revert') >= 0;
    assert(
      invalidOpcode || outOfGas || revert,
      'Expected throw, got \'' + error + '\' instead',
    );
    return;
  }
  assert.fail('Expected throw not received');
};


contract('SmartzPayment', async (accounts) => {

    const roles = {
        owner: accounts[0],
        customer: accounts[1]
    };

    it('simple test', async () => {
        let payments = await SmartzPayment.new(1000, 0, {from: roles.owner});

        await payments.set_price(999, {from: roles.owner});
        assert.equal(999, await payments.item_price());
    });

    it('test oracle', async () => {
        let oracle = await Oracle.new(roles.customer, {from: roles.owner});
        let payments = await SmartzPayment.new(1000, oracle.address, {from: roles.owner});


        await payments.sendTransaction({value: 1000, from: roles.customer});
        assert.equal(1000, await web3.eth.getBalance(payments.address));

        await expectThrow(payments.withdraw_final(1000, {from: roles.owner}));

        await oracle.setDelivered({from: roles.customer});

        const { logs } = await payments.withdraw_final(1000, {from: roles.owner});
        assert.equal(0, await web3.eth.getBalance(payments.address));

        assert.equal(logs.length, 1);
        assert.equal(logs[0].event, 'Withdraw');
        assert.equal(logs[0].args.to, roles.owner);
        assert(logs[0].args.amount.eq(1000));
    });

});
