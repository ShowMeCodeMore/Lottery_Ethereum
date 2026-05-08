// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }

    function enter() external payable {
        require(msg.value == 1 ether, "Must send exactly 1 ether");
        players.push(msg.sender);
    }

    function getManager() external view returns (address) {
        return manager;
    }

    function getAllPlayers() external view returns (address[] memory) {
        return players;
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getPlayersCount() external view returns (uint) {
        return players.length;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() external onlyManager {
        require(players.length > 0, "No players in the lottery");
        uint index = random() % players.length;
        winner = players[index];
        uint amount = address(this).balance;
        (bool success, ) = winner.call{value: amount}("");
        require(success, "Transfer failed");
        players = new address[](0);
    }

    function refund() external onlyManager {
        require(players.length > 0, "No players to refund");
        for (uint i = 0; i < players.length; i++) {
            (bool success, ) = players[i].call{value: 1 ether}("");
            require(success, "Refund failed");
        }
        players = new address[](0);
    }
}
