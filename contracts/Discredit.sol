pragma solidity ^0.4.18;

import "./Vouch.sol";

contract Discredit is Vouch {


    struct Voter {
        uint8 voteType;
        bool voted;
    }

    struct Count {
        uint voteReal;
        uint voteFake;
    }
    
    mapping (address => Count) public count;
    mapping (address => Voter) public voters;
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

    function Discredit (address target) { //Set address in deploy_contracts as accounts[1] from ganache.
        upForVote = target;
        startTime = block.number;
        endTime = (block.number + 23600); //About a week's worth of blocks.
    }

    function castVote (uint voteType) canVote {
        require (!(voters[msg.sender].voted));
        if (voteType == 1) {//1 here meaning "Real" account.
        count[upForVote].voteReal++;
        voters[msg.sender].voteType = 1;
        }
        if (voteType == 0) {//0 here meaning "Fake" acount.
        count[upForVote].voteFake++;
        voters[msg.sender].voteType = 0;
        }
        voters[msg.sender].voted = true;
        voteInProgress[msg.sender] = true;
    }

    function executeOutcomes () { //rewrite all of this to fit new voters mapping
//        require (block.number >= endTime);
        bool outcome = ((count[upForVote].voteReal) > (count[upForVote].voteFake));
        if ((voters[msg.sender].voteType == 0) && (outcome == false)) { //Voted fake, account fake.
            IdentityFundBalance[upForVote] -= standardDeposit;
            IdentityFundBalance[msg.sender] -= standardDeposit;
            balances[msg.sender] += (standardDeposit * 2); //Receives fake account's deposit and his own is returned.
            approvedConnections[msg.sender][upForVote] = false;
            approvedConnections[upForVote][msg.sender] = false;
        } else if ((voters[msg.sender].voteType == 1) && (outcome == false) || (voters[msg.sender].voteType == 2) && (outcome == false)) { //Voted real or abstained, account fake.
            IdentityFundBalance[upForVote] -= standardDeposit;
            IdentityFundBalance[msg.sender] -= standardDeposit;
            balances[this] += (standardDeposit * 2);
            approvedConnections[msg.sender][upForVote] = false;
            approvedConnections[upForVote][msg.sender] = false;                
            isFrozen[upForVote] = true;
            blacklist[msg.sender] = true;
        } else if ((voters[msg.sender].voteType == 0) && (outcome == true)) { //Voted fake, account real.
            IdentityFundBalance[msg.sender] -= standardDeposit;
            balances[upForVote] += standardDeposit;
            approvedConnections[msg.sender][upForVote] = false;
            approvedConnections[upForVote][msg.sender] = false;            
        } else if ((voters[msg.sender].voteType == 2) && (outcome == true)) { //Voter abstained, account real.
            disconnect(upForVote, msg.sender);
        } else {} //Voted real, account real.    
    }

    function getVoteType (address target) view returns (uint) {
        return voters[target].voteType;
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