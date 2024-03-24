// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Storage {
    address private owner;
    string[] private data;

    constructor() { owner = msg.sender; }

    function inputData(string memory input) public {
        data.push(input);
    }

    function getData() public view returns (string[] memory) {
        return data;
    }
}
