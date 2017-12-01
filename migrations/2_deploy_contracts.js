var Vouch = artifacts.require("./Vouch.sol");
var Voucher = artifacts.require("./Voucher.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")

module.exports = function(deployer) {
  deployer.deploy(Vouch);
  deployer.deploy(Voucher);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0xc2ffd7b3cb789b7644f5a25518fc11c2de805118");
};
