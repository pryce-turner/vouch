pragma solidity ^0.4.18;

import "./Owned.sol";
import "./SafeMath.sol";


contract Voucher is Owned {

    using SafeMath for uint256;

    string public name;
    uint8 public decimals;
    uint public totalSupply;
    uint public buyPrice;
    uint public sellPrice;
    address public contractAddress;

    event Transfer (address indexed from, address indexed to, uint value);

    mapping (address => uint) public balances;
    mapping (address => bool) public isFrozen;

    function Voucher (uint initialSupply) public {
        balances[this] = initialSupply;
        totalSupply = initialSupply;
        name = "Voucher";
        buyPrice = 1;
        contractAddress = this;
    }

    function _transfer (address _from, address _to, uint _value) internal {
        require (balances[_from] > _value);
        require (balances[_to] + _value > balances[_to]);
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer (_from, _to, _value);
    }

    function transfer (address to, uint value) public {
        _transfer(msg.sender, to, value);
    }

    function buy () public payable {
        require(!isFrozen[msg.sender]);
        uint amount = msg.value / buyPrice;
        _transfer(this, msg.sender, amount);
    }

    function sell (uint amount) public {
        require(contractAddress.balance >= amount * sellPrice);
        _transfer(msg.sender, this, amount);
        msg.sender.transfer(amount * sellPrice);
    }

    function freezeAccount (address target) public onlyOwner {
        isFrozen[target] = true;
    }

    function balanceOf (address _owner) public view returns (uint balance) {
        return balances[_owner];
    }

    function totalSupply () public view returns (uint) {
        return totalSupply;
    }
}
