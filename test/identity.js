var Vouch = artifacts.require("./Vouch.sol");

contract ('Vouch', function (accounts) {
    it ("should make a connection properly", function () {
        
        var id;
        var verified1;
        var verified2;

        return Vouch.deployed().then(function (instance) {
            id=instance;
            return id.makeConnection(accounts[1]);
        }).then(function () {
            return id.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return id.getConnectionStatus.call(accounts[0], accounts[1]);
        }).then (function (X) {
            verified1 = X;
            return id.getConnectionStatus.call(accounts[1], accounts[0]);
        }).then(function (Y) {
            verified2 = Y;

            assert.equal(verified1, true, "Connection not made from accounts 0 to 1");
            assert.equal(verified2, true, "Connection not made from accounts 1 to 0");
        });
    });
    it ("should verify correctly", function () {

        var fund1;
        var fund0;

        return Vouch.deployed().then(function (instance) {
            id=instance;
            return id.makeConnection(accounts[1]);
        }).then(function () {
            return id.buy({from: accounts[0], value: 300});
        }).then(function () {
            return id.buy({from: accounts[1], value: 300});
        }).then(function () {
            return id.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return id.verify(accounts[1], accounts[0]);
        }).then(function () {
            return id.getIdentityFundBalance.call(accounts[1]);
        }).then(function (X) {
            fund1 = X;
            return id.getIdentityFundBalance.call(accounts[0]);
        }).then(function(Y) {
            fund0 = Y;

            assert.equal(fund1, 100, "Fund 1 did not change")
            assert.equal(fund0, 100, "Fund 0 did not change")
        });
    });
});