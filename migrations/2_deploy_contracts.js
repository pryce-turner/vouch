var Identity = artifacts.require("./Identity.sol");
var Identitoken = artifacts.require("./Identitoken.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")

module.exports = function(deployer) {
  deployer.deploy(Identity);
  deployer.deploy(Identitoken);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0x1b2682de57d5d1aeb09617f415af3ddb3acde1e8");
};
