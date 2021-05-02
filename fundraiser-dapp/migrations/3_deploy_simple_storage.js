const simpleStorageContract = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
    deployer.deploy(simpleStorageContract);
} 