pragma solidity ^0.4.11;

import "./Identity.sol";

contract Discredit is Identity {


    struct Voter {
        uint8 voteType;
        bool voted;
    }

    struct Count {
        uint voteReal;
        uint voteFake;
    }

    Voter[] public voters;
    
    mapping (address => Count) public count;
    mapping (address => uint) public voterID;
    uint numVoters;
   
    address upForVote;
    uint startTime;
    uint endTime;

    function Discredit (address target) { //Set address in deploy_contracts as accounts[1] from testrpc.
        upForVote = target;
        startTime = block.number;
        endTime = block.number + 23600; //About a week's worth of blocks.
    }

    function register () {
//        require ((verifiedConnections[upForVote][msg.sender]) && (verifiedConnections[msg.sender][upForVote]));
        require ((startTime <= block.number) && (block.number <= endTime));
        voters.push(Voter({
            voteType: 3,
            voted: false
        }));
        voterID[msg.sender] = (voters.length) - 1;
    }

    function castVote (bool voteType) {
        require (!(voters[voterID[msg.sender]].voted));
//        require ((verifiedConnections[upForVote][msg.sender]) && (verifiedConnections[msg.sender][upForVote]));
        require ((startTime <= block.number) && (block.number <= endTime));
        if (voteType) //True here meaning "Real" account.
        count[upForVote].voteReal++;
        if (!voteType) //False here meaning "Fake" acount.
        count[upForVote].voteFake++;
        voters[voterID[msg.sender]].voted = true;
    }

    function getVoteType (address target) returns (uint) {
        return voters[voterID[target]].voteType;
    }

    function getVoteCount (bool voteType) returns (uint) {
        if (voteType)
        return count[upForVote].voteReal;
        if (!voteType)
        return count[upForVote].voteFake;
    }
}