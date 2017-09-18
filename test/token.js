var Identity = artifacts.require("./Identity.sol");

contract ('Identity', function (accounts) {
    it ("should transfer", function () {
        
        var balance;
        var id;
        var amount = 200;

        return Identity.deployed().then(function (instance) {
            
            id = instance;

            return id.buy({from: accounts[0], value: 300});
        }).then(function () {
            return id.transfer(accounts[4], amount);
        }).then(function () {
            return id.getBalanceOf.call(accounts[4]);
        }).then(function (bal) {
            balance = bal;

            assert.equal(bal, amount, "No transfer happened.")
        });
    });
    it ("should buy correctly.", function () {  //make this more flexible

        var endingBalance;
        var amount = 500;
        var weiSent = 500;

        return Identity.deployed().then(function (instance) {
            
            id = instance;

            return id.buy({from: accounts[3], value: weiSent}); 
        }).then(function () {
            return id.getBalanceOf.call(accounts[3]);
        }).then (function (X) {
            endingBalance=X;

            assert.equal(endingBalance, amount, "Buy function did not transfer amount.")
        });
    }); 
/*    it("should sell correctly.", function () {

        var thisEndingBalance;
        var thisStartingBalance;
        var amount = 200;

        return Identity.deployed().then(function (instance) {
            
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