var Discredit = artifacts.require("./Discredit.sol");

contract ('Discredit', function (accounts) {
    it("should register the voter correctly.", function () {

        var voteType;

        return Discredit.deployed().then(function (instance) {
            
            dis = instance;

            return dis.buy({from: accounts[1], value: 300});
        }).then(function () {
            return dis.buy({from: accounts[0], value: 300});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.register();
        }).then(function () {
            return dis.getVoteType.call(accounts[0]) 
        }).then(function (X) {
            voteType = X;

            assert.equal(voteType, 2, "Message Sender did not register.")
        });
    });
    it("should vote real.", function () {

        var voteCount;
        var expected = 1;

        return dis.castVote(0).then(function () {
            
            return dis.getVoteCount.call(0);
        
        }).then(function (num) {
            voteCount = num;

            assert.equal(voteCount, expected, "Did not vote properly.")
        });
    });
    it("should print the outcome.", function () {

        var expected = false;
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

        return Discredit.deployed().then(function (instance) {
            
            dis = instance;

            return dis.buy({from: accounts[1], value: 300});
        }).then(function () {
            return dis.buy({from: accounts[0], value: 300});
        }).then(function () {
             return dis.buy({from: accounts[2], value: 300});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[0]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.verify(accounts[1], accounts[2]);
        }).then(function () {
            return dis.verify(accounts[2], accounts[0]);
        }).then(function () {
            return dis.register();
        }).then(function () {
            return dis.register({from:accounts[2]});
        }).then(function () {
            return dis.castVote(0);
        }).then(function () {
            return dis.castVote(0, {from:accounts[2]});
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
            return dis.getIdentityFundBalance.call(accounts[1]).then(function(bal){
                IDbalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[0]).then(function(bal){
                acc0BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[2]).then(function(bal){
                acc2BalanceAfter = bal;

                assert.equal(status1and2, false, "Connection is still extablished between 1 and 2.")
                assert.equal(status1and0, false, "Connection is still extablished between 1 and 0.")
                assert.equal(IDbalanceAfter, 0, "IDFund deposit was not removed.")
                assert.equal(acc0BalanceAfter, 300, "Deposit not awarded to Acc 0")
                assert.equal(acc2BalanceAfter, 300, "Deposit not awarded to Acc 2")
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

        return Discredit.deployed().then(function (instance) {
            
            dis = instance;

            return dis.buy({from: accounts[1], value: 300});
        }).then(function () {
            return dis.buy({from: accounts[0], value: 300});
        }).then(function () {
             return dis.buy({from: accounts[2], value: 300});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[0]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.verify(accounts[1], accounts[2]);
        }).then(function () {
            return dis.verify(accounts[2], accounts[0]);
        }).then(function () {
            return dis.register();
        }).then(function () {
            return dis.register({from:accounts[2]});
        }).then(function () {
            return dis.castVote(1);
        }).then(function () {
            return dis.castVote(1, {from:accounts[2]});
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
            return dis.getIdentityFundBalance.call(accounts[1]).then(function(bal){
                IDbalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[0]).then(function(bal){
                acc0BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[2]).then(function(bal){
                acc2BalanceAfter = bal;

                assert.equal(status1and2, true, "Connection is no longer extablished between 1 and 2.")
                assert.equal(status1and0, true, "Connection is no longer extablished between 1 and 0.")
                assert.equal(IDbalanceAfter, 200, "IDFund deposit was removed.")
                assert.equal(acc0BalanceAfter, 100, "Acc 0 deposit changed")
                assert.equal(acc2BalanceAfter, 100, "Acc 2 deposit changed")
            });
        }); 
    });
});
contract ('Discredit', function (accounts) { //make this a solidity test at some point
    it("Vote real, account fake.", function () {

        var status1and2;
        var status1and0;
        var outcome;
        var IDbalanceAfter;
        var acc0BalAfter;
        var acc2BalAfter;

        return Discredit.deployed().then(function (instance) {
            
            dis = instance;

            return dis.buy({from: accounts[1], value: 300});
        }).then(function () {
            return dis.buy({from: accounts[0], value: 300});
        }).then(function () {
             return dis.buy({from: accounts[2], value: 300});
        }).then(function () {
             return dis.buy({from: accounts[3], value: 300});
        }).then(function () {
            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[1], {from:accounts[3]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[0]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[2], {from:accounts[3]});
        }).then(function () {
            return dis.makeConnection(accounts[3], {from:accounts[0]});
        }).then(function () {
            return dis.makeConnection(accounts[3], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[3], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[1]});
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[2]});
        }).then(function () {
            return dis.makeConnection(accounts[0], {from:accounts[3]});
        }).then(function () {
            return dis.verify(accounts[1], accounts[0]);
        }).then(function () {
            return dis.verify(accounts[1], accounts[2]);
        }).then(function () {
            return dis.verify(accounts[2], accounts[0]);
        }).then(function () {
            return dis.verify(accounts[2], accounts[3]);
        }).then(function () {
            return dis.verify(accounts[3], accounts[0]);
        }).then(function () {
            return dis.verify(accounts[3], accounts[1]);
        }).then(function () {
            return dis.register();
        }).then(function () {
            return dis.register({from:accounts[2]});
        }).then(function () {
            return dis.register({from:accounts[3]});
        }).then(function () {
            return dis.castVote(1);
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
            return dis.getConnectionStatus.call(accounts[1], accounts[3]).then(function(connection){
                status1and0 = connection;
            });
        }).then(function () {
            return dis.getIdentityFundBalance.call(accounts[1]).then(function(bal){
                IDbalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[0]).then(function(bal){
                acc0BalanceAfter = bal;
            });
        }).then(function () {
            return dis.balanceOf.call(accounts[2]).then(function(bal){
                acc2BalanceAfter = bal;

                assert.equal(status1and2, false, "Connection is still extablished between 1 and 2.")
                assert.equal(status1and0, false, "Connection is still extablished between 1 and 0.")
                assert.equal(IDbalanceAfter, 0, "IDFund deposit was not removed.")
                assert.equal(acc0BalanceAfter, 300, "Deposit not awarded to Acc 0")
                assert.equal(acc2BalanceAfter, 300, "Deposit not awarded to Acc 2")
            });
        }); 
    });
});