var Vouch = artifacts.require("./Vouch.sol");

contract ('Vouch', function (accounts) {
    it ("should transfer", function () {
        
        var balance;
        var id;
        var amount = 200;

        return Vouch.deployed().then(function (instance) {
            
            id = instance;

            return id.buy({from: accounts[0], value: 300});
        }).then(function () {
            return id.transfer(accounts[4], amount);
        }).then(function () {
            return id.balanceOf.call(accounts[4]);
        }).then(function (bal) {
            balance = bal;

            assert.equal(bal, amount, "No transfer happened.")
        });
    });
    it ("should buy correctly.", function () { 

        var endingBalance3;
        var endingBalance4;
        var amount = 2000;
        var weiSent = 2000;

        return Vouch.deployed().then(function (instance) {
            
            id = instance;

            return id.buy({from: accounts[5], value: weiSent}); //Only account 4 fails this... wtf??
        }).then(function () {   
            return id.balanceOf.call(accounts[5]);
        }).then (function (X) {
            endingBalance3=X;
/*        
        }).then(function () {
            return id.buy({from: accounts[3], value: weiSent}); 
        }).then(function () {    
            return id.balanceOf.call(accounts[3]);
        }).then (function (Y) {
            endingBalance3=Y;
*/
            assert.equal(endingBalance3, amount, "Buy function did not transfer amount to 3.")
//            assert.equal(endingBalance3, amount, "Buy function did not transfer amount to 3.")
        });
    }); 
/*    it("should sell correctly.", function () {

        var thisEndingBalance;
        var thisStartingBalance;
        var amount = 200;

        return Vouch.deployed().then(function (instance) {
            
            id = instance;

            return id.getBalanceOf.call(this);  // problem with finding deployed contract address for querying balances
        }).then(function (bal) {
            thisStartingBalance = bal;
            return id.buy({from: accounts[3], value: amount});
        }).then(function () {
            return id.sell(amount, {from: accounts[3]});
        }).then(function () {
            return id.getBalanceOf.call(accounts[3]);
        }).then(function (bal) {
            thisEndingBalance = bal; 

            assert.equal(thisStartingBalance, 1000, "Didn't sell correctly.");
        });
    }); */
});