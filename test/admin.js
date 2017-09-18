var Identity = artifacts.require("./Identity.sol");

contract ('Identity', function (accounts) {
    it ("should freeze account 9", function () {
    
        var stat;

        return Identity.deployed().then(function (instance) {
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