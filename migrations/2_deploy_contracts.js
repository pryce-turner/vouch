var Identity = artifacts.require("./Identity.sol");
var Identitoken = artifacts.require("./Identitoken.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")

module.exports = function(deployer) {
  deployer.deploy(Identity);
  deployer.deploy(Identitoken);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0xc2ffd7b3cb789b7644f5a25518fc11c2de805118");
};
