const simplesStorageContract = artifacts.require("SimpleStorage");
const fundraiserFactoryContract = artifacts.require("FundraiserFactory");

module.exports = function(deployer) {
    deployer.deploy(simplesStorageContract);
    deployer.deploy(fundraiserFactoryContract);
}