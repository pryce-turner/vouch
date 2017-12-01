var Vouch = artifacts.require("./Vouch.sol");

contract ('Vouch', function (accounts) {
    it ("should freeze account 9", function () {
    
        var stat;

        return Vouch.deployed().then(function (instance) {
            id = instance;
            return id.freezeAccount(accounts[9]);
        }).then(function () {
            return id.isFrozen(accounts[9]);
        }).then(function (chilly) {
            stat = chilly;

            assert.equal(stat, true, "Account did not freeze properly.")
        });
    });
});