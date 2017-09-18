pragma solidity ^0.4.11;

import "./Owned.sol";

contract Identitoken is Owned {


    string public name;
    uint8 public decimals;
    uint public totalSupply;
    uint public buyPrice;
    uint public sellPrice;

    event Transfer (address indexed from, address indexed to, uint value);

    mapping (address => uint) public balanceOf;
    mapping (address => bool) public isFrozen;
 
    function Identitoken (
        uint initialSupply
    ) {
        balanceOf[this] = initialSupply;
        totalSupply = initialSupply;
        name = "Identitoken";
        buyPrice = 1;
    }

    function _transfer (address _from, address _to, uint _value) internal {
        require (balanceOf[_from] > _value);
        require (balanceOf[_to] + _value > balanceOf[_to]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
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

    function getBalanceOf (address addr) returns (uint) {
        return balanceOf[addr];
    }
}