var Discredit = artifacts.require("./Discredit.sol");

contract ('Discredit', function (accounts) {
    it("should register the voter correctly.", function () {

        var voteType;

        return Discredit.deployed().then(function (instance) {
            
            dis = instance;

            return dis.makeConnection(accounts[1]);
        }).then(function () {
            return dis.buy({from: accounts[0], value: 300});
        }).then(function () {
            return dis.buy({from: accounts[1], value: 300});
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

            assert.equal(voteType, 3, "Message Sender did not register.")
        });
    });
    it("should vote real.", function () {

        var voteCount;
        var expected = 1;

        return dis.castVote(true).then(function () {
            
            return dis.getVoteCount.call(true);
        
        }).then(function (num) {
            voteCount = num;

            assert.equal(voteCount, expected, "Did not vote properly.")
        });
    });     
}); 