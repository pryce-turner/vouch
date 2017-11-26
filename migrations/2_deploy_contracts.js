var Identity = artifacts.require("./Identity.sol");
var Identitoken = artifacts.require("./Identitoken.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")

module.exports = function(deployer) {
  deployer.deploy(Identity);
  deployer.deploy(Identitoken);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0x7561e40473dd4708300564d04ae38bc2f3d32839");
};
