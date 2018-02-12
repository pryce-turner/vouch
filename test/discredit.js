var Discredit = artifacts.require("./Discredit.sol");

contract ('Discredit', function (accounts) {
    it("should vote real.", function () {

        var voteType;
        var voteCount;
        var expected = 1;

        return Discredit.deployed().then(function (instance) {

            dis = instance;

            return dis.buy({from: accounts[1], value: 301});
        }).then(function () {
            return dis.buy({from: accounts[0], value: 301});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.castVote(2);
        }).then(function () {

            return dis.getVoteCount.call(2);

        }).then(function (num) {
            voteCount = num;

            assert.equal(voteCount, expected, "Did not vote properly.")
        });
    });
    it("should print the outcome.", function () {

        var expected = true;
        var outcome;


        return dis.getOutcome.call().then(function(result){
            outcome = result;

            assert.equal(outcome, expected, "Vote result was unexpected.")
        });
    });
});
contract ('Discredit', function (accounts) { //make this a solidity test at some point
    it("Vote fake, account fake.", function () {

        var status1and2;
        var status1and0;
        var outcome;
        var IDbalanceAfter;
        var acc0BalAfter;
        var acc2BalAfter;
        var initialBuy = 499;

        return Discredit.deployed().then(function (instance) {

            dis = instance;

            return dis.buy({from: accounts[1], value: initialBuy});
        }).then(function () {
            return dis.buy({from: accounts[0], value: initialBuy});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.castVote(0);
        }).then(function () {
            return dis.executeOutcomes();
        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[0]).then(function(connection){
                status1and0 = connection;
            });
        }).then(function () {
            return dis.getIdentityFundBalance.call(accounts[1]).then(function(bal){
                IDbalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[0]).then(function(bal){
                acc0BalanceAfter = bal;

                assert.equal(status1and0, false, "Connection is still established between 1 and 0.")
                assert.equal(IDbalanceAfter, 0, "IDFund deposit was not removed.")
                assert.equal(acc0BalanceAfter, (initialBuy+100), "Deposit not awarded to Acc 0")

            });
        });
    });
});
contract ('Discredit', function (accounts) { //make this a solidity test at some point
    it("Vote real, account real.", function () {

        var status1and2;
        var status1and0;
        var outcome;
        var IDbalanceAfter;
        var acc0BalAfter;
        var acc2BalAfter;
        var initialBuy = 499;

        return Discredit.deployed().then(function (instance) {

            dis = instance;

            return dis.buy({from: accounts[1], value: initialBuy});
        }).then(function () {
            return dis.buy({from: accounts[0], value: initialBuy});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.castVote(1);
        }).then(function () {
            return dis.executeOutcomes();
        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[0]).then(function(connection){
                status1and0 = connection;
            });
        }).then(function () {
            return dis.getIdentityFundBalance.call(accounts[1]).then(function(bal){
                IDbalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[0]).then(function(bal){
                acc0BalanceAfter = bal;

                assert.equal(status1and0, true, "Connection is still established between 1 and 0.")
                assert.equal(IDbalanceAfter, 100, "IDFund deposit was not removed.")
                assert.equal(acc0BalanceAfter, (initialBuy-100), "Deposit not awarded to Acc 0")
            });
        });
    });
});
 contract ('Discredit', function (accounts) { //make this a solidity test at some point
    it("Vote real, account fake.", function () {

        var status1and2;
        var status1and3;
        var status1and0;
        var outcome;
        var IDbalance1After;
        var IDbalance0After;
        var acc0BalAfter;
        var acc1BalAfter;
        var acc2BalAfter;
        var acc3BalAfter;
        var initialBuy = 400;

        return Discredit.deployed().then(function (instance) {

            dis = instance;

            return dis.buy({from: accounts[0], value: initialBuy});
        }).then(function () {
            return dis.buy({from: accounts[1], value: initialBuy});
        }).then(function () {
             return dis.buy({from: accounts[2], value: initialBuy});
        }).then(function () {
             return dis.buy({from: accounts[3], value: initialBuy});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[3]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[3], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.verify(accounts[1], accounts[2]);
        }).then(function () {
            return dis.verify(accounts[3], accounts[1]);
        }).then(function () {
            return dis.castVote(1); //Acc 0 is voting real on a fake account.
        }).then(function () {
            return dis.castVote(0, {from:accounts[2]});
        }).then(function () {
            return dis.castVote(0, {from:accounts[3]});
        }).then(function () {
            return dis.executeOutcomes();

        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[2]).then(function(connection){
                status1and2 = connection;
            });
        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[0]).then(function(connection){
                status1and0 = connection;
            });
        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[3]).then(function(connection){
                status1and3 = connection;
            });
        }).then(function () {
            return dis.getIdentityFundBalance.call(accounts[1]).then(function(bal){
                IDbalance1After = bal;
            });
        }).then(function () {
            return dis.getIdentityFundBalance.call(accounts[0]).then(function(bal){
                IDbalance0After = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[3]).then(function(bal){
                acc3BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[1]).then(function(bal){
                acc1BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[0]).then(function(bal){
                acc0BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[2]).then(function(bal){
                acc2BalanceAfter = bal;
            });
        }).then(function () {
            return dis.isFrozen.call(accounts[1]).then(function (freeze) {
                isFrozen = freeze;
            });
        }).then(function () {
            return dis.isBlacklisted.call(accounts[0]).then(function (black) {
                blacklistStatus = black;


                assert.equal(status1and2, false, "Connection is still established between 1 and 2.")
                assert.equal(status1and0, false, "Connection is still established between 1 and 0.")
                assert.equal(status1and3, false, "Connection is still established between 1 and 3.")
                assert.equal(IDbalance1After, 0, "IDFund deposit was not removed from Acc 1.")
                assert.equal(IDbalance0After, 0, "IDFund deposit was not removed from Acc 0.")
                assert.equal(acc3BalanceAfter, (initialBuy+100), "Deposit not awarded to Acc 3")
                assert.equal(acc2BalanceAfter, (initialBuy+100), "Deposit not awarded to Acc 2")
                assert.equal(acc1BalanceAfter, (initialBuy-300), "Deposit not removed from Acc 1")
                assert.equal(acc0BalanceAfter, (initialBuy-100), "Deposit not removed from Acc 0")
                assert.equal(blacklistStatus, true, "Account 0 not blacklisted.")
                assert.equal(isFrozen, true, "Account 1 not frozen")
            });
        });
    });
});
contract ('Discredit', function (accounts) {
    it("Vote fake, account real.", function () {

        var status1and2;
        var status1and3;
        var status1and0;
        var outcome;
        var IDbalance1After;
        var IDbalance0After;
        var acc0BalAfter;
        var acc1BalAfter;
        var acc2BalAfter;
        var acc3BalAfter;
        var initialBuy = 400;

        return Discredit.deployed().then(function (instance) {

            dis = instance;

            return dis.buy({from: accounts[0], value: initialBuy});
        }).then(function () {
            return dis.buy({from: accounts[1], value: initialBuy});
        }).then(function () {
             return dis.buy({from: accounts[2], value: initialBuy});
        }).then(function () {
             return dis.buy({from: accounts[3], value: initialBuy});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[3]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[3], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.verify(accounts[1], accounts[2]);
        }).then(function () {
            return dis.verify(accounts[3], accounts[1]);
        }).then(function () {
            return dis.castVote(0); //Acc 0 is voting fake on a real account.
        }).then(function () {
            return dis.castVote(1, {from:accounts[2]});
        }).then(function () {
            return dis.castVote(1, {from:accounts[3]});
        }).then(function () {
            return dis.executeOutcomes();

        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[2]).then(function(connection){
                status1and2 = connection;
            });
        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[0]).then(function(connection){
                status1and0 = connection;
            });
        }).then(function () {
            return dis.getConnectionStatus.call(accounts[1], accounts[3]).then(function(connection){
                status1and3 = connection;
            });
        }).then(function () {
            return dis.getIdentityFundBalance.call(accounts[1]).then(function(bal){
                IDbalance1After = bal;
            });
        }).then(function () {
            return dis.getIdentityFundBalance.call(accounts[0]).then(function(bal){
                IDbalance0After = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[3]).then(function(bal){
                acc3BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[1]).then(function(bal){
                acc1BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[0]).then(function(bal){
                acc0BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[2]).then(function(bal){
                acc2BalanceAfter = bal;
            });
        }).then(function () {
            return dis.isFrozen.call(accounts[1]).then(function (freeze) {
                isFrozen = freeze;
            });
        }).then(function () {
            return dis.isBlacklisted.call(accounts[0]).then(function (black) {
                blacklistStatus = black;


                assert.equal(status1and2, true, "Connection is not established between 1 and 2.")
                assert.equal(status1and0, false, "Connection is still established between 1 and 0.")
                assert.equal(status1and3, true, "Connection is not established between 1 and 3.")
                assert.equal(IDbalance1After, 300, "IDFund deposit was not removed from Acc 1.")
                assert.equal(IDbalance0After, 0, "IDFund deposit was not removed from Acc 0.")
                assert.equal(acc3BalanceAfter, (initialBuy-100), "Deposit not awarded to Acc 3")
                assert.equal(acc2BalanceAfter, (initialBuy-100), "Deposit not awarded to Acc 2")
                assert.equal(acc1BalanceAfter, (initialBuy-200), "Deposit not removed from Acc 1")
                assert.equal(acc0BalanceAfter, (initialBuy-100), "Deposit not removed from Acc 0")
                assert.equal(blacklistStatus, false, "Account 0 blacklisted.")
                assert.equal(isFrozen, false, "Account 1 frozen")
            });
        });
    });
});
