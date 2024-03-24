// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Voltz is ERC20, ERC20Burnable, ERC20Permit {
    constructor() ERC20("Voltz", "VOLTZ") ERC20Permit("Voltz") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}