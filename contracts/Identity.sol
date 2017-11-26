pragma solidity ^0.4.11;

import "./Identitoken.sol";


contract Identity is Identitoken (100000) {


    mapping (address => uint) public identityFundBalance;
    mapping (address => mapping (address => bool)) public approvedConnections;
    mapping (address => mapping (address => bool)) public verifiedConnections;
    uint standardDeposit = 100;


    function Identity () {
        
    }

    function makeConnection (address target) returns (bool) {
        approvedConnections[msg.sender][target] = true;
        return true;
    }

    function verify (address user1, address user2) returns (bool) {
        require ((approvedConnections[user1][user2]) && (approvedConnections[user2][user1]));
        require ((!isFrozen[user1]) && (!isFrozen[user2]));
        require (balances[user1] > standardDeposit);
        require (balances[user2] > standardDeposit);
        balances[user1] -= standardDeposit;
        balances[user2] -= standardDeposit;
        identityFundBalance[user1] += standardDeposit;
        identityFundBalance[user2] += standardDeposit;
        verifiedConnections[user1][user2] = true;
        verifiedConnections[user2][user1] = true;
        return true;
    }

    function getIdentityFundBalance (address addr) returns (uint) {
        return identityFundBalance[addr];
    }

    function getConnectionStatus (address user1, address user2) returns (bool) {
        return approvedConnections[user1][user2];
    }
}