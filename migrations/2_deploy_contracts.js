var Identity = artifacts.require("./Identity.sol");
var Identitoken = artifacts.require("./Identitoken.sol");
var Owned = artifacts.require("./Owned.sol");
var Discredit = artifacts.require("./Discredit.sol")

module.exports = function(deployer) {
  deployer.deploy(Identity);
  deployer.deploy(Identitoken);
  deployer.deploy(Owned);
  deployer.deploy(Discredit, "0xc1334170b3743b16ae29c47cd4a97f9c35a96ac5");
};
