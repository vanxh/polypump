// SPDX-License-Identifier: UNLICENSED
// SPDX-FileCopyrightText: © 2024 PolyPump <hello@vanxh.dev>
pragma solidity ^0.8.19;

import "./PolyPumpCoin.sol";

contract PolyPumpFactory {
    struct PolyPumpRequest {
        string name;
        string symbol;
        uint256 initialSupply;
        address owner;
        bool isDeployed;
        address polyPumpCoinAddress;
    }

    mapping(uint256 => PolyPumpRequest) public polyPumpRequests;
    uint256 public polyPumpRequestCount;
    uint256 public fee = 5 * 1e18;

    event PolyPumpRequested(uint256 indexed id, string name, string symbol, uint256 initialSupply, address indexed owner);
    event PolyPumpDeployed(uint256 indexed id, address indexed contractAddress);

    function requestPolyPump(string memory name, string memory symbol, uint256 initialSupply) external payable {
        require(msg.value == fee, "Incorrect fee amount");

        polyPumpRequests[polyPumpRequestCount] = PolyPumpRequest({
            name: name,
            symbol: symbol,
            initialSupply: initialSupply,
            owner: msg.sender,
            isDeployed: false,
            polyPumpCoinAddress: address(0)
        });

        emit PolyPumpRequested(polyPumpRequestCount, name, symbol, initialSupply, msg.sender);
        polyPumpRequestCount++;
    }

    function deployPolyPump(uint256 id) external {
        PolyPumpRequest storage polyPumpRequest = polyPumpRequests[id];
        require(polyPumpRequest.owner == msg.sender, "Not the owner");
        require(!polyPumpRequest.isDeployed, "Already deployed");

        PolyPumpCoin newPolyPumpCoin = new PolyPumpCoin(polyPumpRequest.name, polyPumpRequest.symbol, polyPumpRequest.initialSupply, polyPumpRequest.owner);
        polyPumpRequest.polyPumpCoinAddress = address(newPolyPumpCoin);
        polyPumpRequest.isDeployed = true;

        emit PolyPumpDeployed(id, polyPumpRequest.polyPumpCoinAddress);
    }

    function withdraw() external {
        // TODO
    }
}
