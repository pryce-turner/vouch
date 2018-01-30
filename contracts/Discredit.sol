pragma solidity ^0.4.18;

import "./Vouch.sol";

contract Discredit is Vouch {


    struct Count {
        uint voteReal;
        uint voteFake;
    }
    
    mapping (address => Count) public count;
    mapping (address => uint) public voteType;
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
//        require (voteType[msg.sender] == 0);
        if (voteType == 2) {//2 here meaning "Real" account.
        count[upForVote].voteReal++;
        voteType[msg.sender] = 2;
        }
        if (voteType == 1) {//1 here meaning "Fake" acount.
        count[upForVote].voteFake++;
        voteType[msg.sender] = 1;
        }
        voteInProgress[msg.sender] = true;
    }

    function executeOutcomes () { //rewrite all of this to fit new voters mapping
//        require (block.number >= endTime);
        bool outcome = ((count[upForVote].voteReal) > (count[upForVote].voteFake));
        if ((voteType[msg.sender] == 1) && (outcome == false)) { //Voted fake, account fake.
            IdentityFundBalance[upForVote] -= standardDeposit;
            IdentityFundBalance[msg.sender] -= standardDeposit;
            balances[msg.sender] += (standardDeposit * 2); //Receives fake account's deposit and his own is returned.
            approvedConnections[msg.sender][upForVote] = false;
            approvedConnections[upForVote][msg.sender] = false;
        } else if ((voteType[msg.sender] == 2) && (outcome == false) || (voteType[msg.sender] == 0) && (outcome == false)) { //Voted real or abstained, account fake.
            IdentityFundBalance[upForVote] -= standardDeposit;
            IdentityFundBalance[msg.sender] -= standardDeposit;
            balances[this] += (standardDeposit * 2);
            approvedConnections[msg.sender][upForVote] = false;
            approvedConnections[upForVote][msg.sender] = false;                
            isFrozen[upForVote] = true;
            blacklist[msg.sender] = true;
        } else if ((voteType[msg.sender] == 1) && (outcome == true)) { //Voted fake, account real.
            IdentityFundBalance[msg.sender] -= standardDeposit;
            balances[upForVote] += standardDeposit;
            approvedConnections[msg.sender][upForVote] = false;
            approvedConnections[upForVote][msg.sender] = false;            
        } else if ((voteType[msg.sender] == 0) && (outcome == true)) { //Voter abstained, account real.
            disconnect(upForVote, msg.sender);
        } else {} //Voted real, account real.    
    }

    function getVoteType (address target) view returns (uint8) {
        return voteType[target];
    }

    function getVoteCount (uint8 voteType) view returns (uint) {
        if (voteType == 2)
        return count[upForVote].voteReal;
        if (voteType == 1)
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