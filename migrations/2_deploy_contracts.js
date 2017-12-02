var Vouch = artifacts.require("./Vouch.sol");
var Voucher = artifacts.require("./Voucher.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")
var SafeMath = artifacts.require("./SafeMath.sol")

module.exports = function(deployer) {
  deployer.deploy(Vouch);
  deployer.deploy(Voucher);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0x46f634d5e18fc6153c0ca749c9cb496ff456b2af");
  deployer.deploy(SafeMath);
};
