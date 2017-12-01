pragma solidity ^0.4.11; 
  
contract Owned { 
    
    address public owner;

    function Owned() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner {
        owner = newOwner;
    }

    function destroy() onlyOwner {
        selfdestruct(owner);
    }
}