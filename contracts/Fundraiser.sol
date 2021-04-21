pragma solidity >=0.4.21 <0.7.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Fundraiser is Ownable{
    string public name;
    string public url;
    string public imageUrl;
    string public description;
    address payable public beneficiary;
    address public custodian;

    constructor(
        string memory _name,
        string memory _url,
        string memory _imageUrl,
        string memory _description,
        address payable _beneficiary,
        address _custodian
    ) public {
        name = _name;
        url = _url;
        imageUrl = _imageUrl;
        description = _description;
        beneficiary = _beneficiary;
        transferOwnership(_custodian);
    }
}