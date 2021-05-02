const fundraiserFactoryContract = artifacts.require("./FundraiserFactory.sol");

module.exports = function(deployer) {
    deployer.deploy(fundraiserFactoryContract);
}