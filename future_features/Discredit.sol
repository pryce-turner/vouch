pragma solidity ^0.4.11;

import "./Identity.sol";

contract Discredit is Identity {


    struct Voter {
        uint8 voteType;
        bool voted;
        address voterAddress;
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

    modifier canVote {
        require ((approvedConnections[upForVote][msg.sender]) && (approvedConnections[msg.sender][upForVote]));
        require ((startTime <= block.number) && (block.number <= endTime));
        _;
    }

    function Discredit (address target) { //Set address in deploy_contracts as accounts[1] from testrpc.
        upForVote = target;
        startTime = block.number;
        endTime = block.number + 23600; //About a week's worth of blocks.
    }

    function register () canVote {
        voters.push(Voter({
            voteType: 2,
            voted: false,
            voterAddress: msg.sender 
        }));
        voterID[msg.sender] = (voters.length) - 1;
    }

    function castVote (uint voteType) canVote {
        require (!(voters[voterID[msg.sender]].voted));
        if (voteType == 1) {//1 here meaning "Real" account.
        count[upForVote].voteReal++;
        voters[voterID[msg.sender]].voteType = 1;
        }
        if (voteType == 0) {//0 here meaning "Fake" acount.
        count[upForVote].voteFake++;
        voters[voterID[msg.sender]].voteType = 0;
        }
        voters[voterID[msg.sender]].voted = true;
    }

    function executeOutcomes () {
//        require (block.number >= endTime);
        bool outcome = ((count[upForVote].voteReal) > (count[upForVote].voteFake));
        for (var i = 0; i<voters.length; i++) {
            if ((voters[i].voteType == 0) && (outcome == false)) { //Voted fake, account fake.
            identityFundBalance[upForVote] -= standardDeposit;
            balanceOf[voters[i].voterAddress] += standardDeposit;
            approvedConnections[upForVote][voters[i].voterAddress] = false;
            approvedConnections[voters[i].voterAddress][upForVote] = false;
            } else if ((voters[i].voteType == 1) && (outcome == false)) { //Voted real, account fake.
            identityFundBalance[upForVote] -= standardDeposit;
            identityFundBalance[voters[i].voterAddress] -= standardDeposit; //Need to send the deposit somewhere..
            approvedConnections[upForVote][voters[i].voterAddress] = false;
            approvedConnections[voters[i].voterAddress][upForVote] = false;
            isFrozen[voters[i].voterAddress] = true;
            } else if ((voters[i].voteType == 0) && (outcome == true)) { //Voted fake, account real.
            identityFundBalance[voters[i].voterAddress] -= standardDeposit;
            identityFundBalance[upForVote] += standardDeposit;
            approvedConnections[upForVote][voters[i].voterAddress] = false;
            approvedConnections[voters[i].voterAddress][upForVote] = false;
            } else {
            approvedConnections[upForVote][voters[i].voterAddress] = false;
            approvedConnections[voters[i].voterAddress][upForVote] = false;
            }
        }
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

    function getOutcome () returns (bool) {
//        require (block.number >= endTime);
        return ((count[upForVote].voteReal) > (count[upForVote].voteFake));
    }
}