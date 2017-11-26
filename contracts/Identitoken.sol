pragma solidity ^0.4.11;

import "./Owned.sol";

contract Identitoken is Owned {


    string public name;
    uint8 public decimals;
    uint public totalSupply;
    uint public buyPrice;
    uint public sellPrice;

    event Transfer (address indexed from, address indexed to, uint value);

    mapping (address => uint) public balances;
    mapping (address => bool) public isFrozen;
 
    function Identitoken (
        uint initialSupply
    ) {
        balances[this] = initialSupply;
        totalSupply = initialSupply;
        name = "Identitoken";
        buyPrice = 1;
    }

    function _transfer (address _from, address _to, uint _value) internal {
        require (balances[_from] > _value);
        require (balances[_to] + _value > balances[_to]);
        balances[_from] -= _value;
        balances[_to] += _value;
        Transfer (_from, _to, _value);
    }

    function transfer (address to, uint value) {
        _transfer(msg.sender, to, value);
    }

    function buy () payable {
        uint amount = msg.value / buyPrice;
        _transfer(this, msg.sender, amount);
    }

    function sell (uint amount) {
        require(this.balance >= amount * sellPrice);
        _transfer(msg.sender, this, amount);
        msg.sender.transfer(amount * sellPrice);
    }

    function freezeAccount (address target) onlyOwner {
        isFrozen[target] = true;
    }

    function balanceOf (address _owner) constant returns (uint balance) {
        return balances[_owner];
    }

    function totalSupply () constant returns (uint totalSupply) {
        return totalSupply;
    }
}