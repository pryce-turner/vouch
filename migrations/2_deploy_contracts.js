var Vouch = artifacts.require("./Vouch.sol");
var Voucher = artifacts.require("./Voucher.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")
var SafeMath = artifacts.require("./SafeMath.sol")

module.exports = function(deployer) {
  deployer.deploy(Vouch);
  deployer.deploy(Voucher, 10000);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0x58d6405b7d641be95037b17cdbd51435d33c9c02");
  deployer.deploy(SafeMath);
};
