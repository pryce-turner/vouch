pragma solidity ^0.4.15;

import "./Vouch.sol";

contract Discredit is Vouch {


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
    mapping (address => bool) public blacklist;
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
            voteType: 2, //2 meaning no vote
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
        for (uint32 i = 0; i<voters.length; i++) {
            if ((voters[i].voteType == 0) && (outcome == false)) { //Voted fake, account fake.
                IdentityFundBalance[upForVote] -= standardDeposit;
                IdentityFundBalance[voters[i].voterAddress] -= standardDeposit;
                balances[voters[i].voterAddress] += (standardDeposit * 2); //Receives fake account's deposit and his own is returned.
                approvedConnections[voters[i].voterAddress][upForVote] = false;
                approvedConnections[upForVote][voters[i].voterAddress] = false;
            } else if ((voters[i].voteType == 1) && (outcome == false) || (voters[i].voteType == 2) && (outcome == false)) { //Voted real or abstained, account fake.
                IdentityFundBalance[upForVote] -= standardDeposit;
                IdentityFundBalance[voters[i].voterAddress] -= standardDeposit;
                balances[this] += (standardDeposit * 2);
                approvedConnections[voters[i].voterAddress][upForVote] = false;
                approvedConnections[upForVote][voters[i].voterAddress] = false;                
                isFrozen[upForVote] = true;
                blacklist[voters[i].voterAddress] = true;
            } else if ((voters[i].voteType == 0) && (outcome == true)) { //Voted fake, account real.
                IdentityFundBalance[voters[i].voterAddress] -= standardDeposit;
                balances[upForVote] += standardDeposit;
                approvedConnections[voters[i].voterAddress][upForVote] = false;
                approvedConnections[upForVote][voters[i].voterAddress] = false;            
            } else if ((voters[i].voteType == 2) && (outcome == true)) { //Voter abstained, account real.
                disconnect(upForVote, voters[i].voterAddress);
            } else {} //Voted real, account real.
        }
    }

    function getVoteType (address target) view returns (uint) {
        return voters[voterID[target]].voteType;
    }

    function getVoteCount (uint voteType) view returns (uint) {
        if (voteType == 1)
        return count[upForVote].voteReal;
        if (voteType == 0)
        return count[upForVote].voteFake;
    }

    function getOutcome () view returns (bool) {
//        require (block.number >= endTime);
        return ((count[upForVote].voteReal) > (count[upForVote].voteFake));
    }

    function isBlacklisted (address addr) view returns (bool) {
        return blacklist[addr];
    }
}