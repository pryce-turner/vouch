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

        return dis.castVote(false).then(function () {
            
            return dis.getVoteCount.call(false);
        
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
    it("should dicredit accounts[1] and execute outcomes.", function () {

        var status1and2;
        var status1and0;

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
            return dis.castVote(false);
        }).then(function () {
            return dis.castVote(false, {from:accounts[2]});
        }).then(function () {
            return dis.executeOutcomes();
        }).then(function () {
            return dis.getConnectionStatus(accounts[1], accounts[2]).then(function(connection){
                status1and2 = connection;
            });
        }).then(function () {
            return dis.getConnectionStatus(accounts[1], accounts[0]).then(function(connection){
                status1and0 = connection;

                assert.equal(status1and2, false, "Connection is still extablished between 1 and 2.")
                assert.equal(status1and0, false, "Connection is still extablished between 1 and 0.")
            });
        });
    });
});