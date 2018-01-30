var Vouch = artifacts.require("./Vouch.sol");
var Voucher = artifacts.require("./Voucher.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")
var SafeMath = artifacts.require("./SafeMath.sol")

module.exports = function(deployer) {
  deployer.deploy(Vouch);
  deployer.deploy(Voucher);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0x31c1e1aabbec3c49dbcc3ca8eca33202197567e2");
  deployer.deploy(SafeMath);
};
