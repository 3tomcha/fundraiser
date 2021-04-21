pragma solidity ^0.5.16;

contract Fundraiser {
    string public name;
    string public url;
    string public imageUrl;
    string public description;

    constructor(
        string memory _name,
        string memory _url,
        string memory _imageUrl,
        string memory _description
    ) public {
        name = _name;
        url = _url;
        imageUrl = _imageUrl;
        description = _description;
    }
}