//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {Voltz} from "../contracts/Voltz.sol";

contract TestERC20Deroll is Test {
    Voltz voltz;

    address guest = address(1);
    address application = address(2);

    function setUp() public {
        voltz = new Voltz{salt: bytes32(abi.encode(1596))}();
    }

    function testMintWithERC20Deroll() public {
        vm.prank(application);
        voltz.mint(guest, 100);
        assertTrue(voltz.balanceOf(guest) == 100);
    }
}
