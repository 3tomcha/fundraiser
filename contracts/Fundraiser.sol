pragma solidity >=0.4.21 <0.7.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Fundraiser is Ownable{

    struct Donation {
        uint256 value;
        uint256 date;
    }

    mapping (address => Donation[]) private _donations;

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

    // 金を得る人はownerしか設定できない
    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    function myDonationCount() public view returns (uint256) {
        return _donations[msg.sender].length;
    }

    function donate() public payable {
        Donation memory donation = Donation({
            value: msg.value,
            date: block.timestamp
        });
        _donations[msg.sender].push(donation);
    }
}