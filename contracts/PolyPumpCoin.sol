// SPDX-License-Identifier: UNLICENSED
// SPDX-FileCopyrightText: © 2024 PolyPump <hello@vanxh.dev>
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PolyPumpCoin is ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol, uint256 initialSupply, address _owner) ERC20(name, symbol) {
        _mint(_owner, initialSupply);
        owner = _owner;
    }
}
