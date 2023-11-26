// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract SimpleStorage {
    uint number = 5;

    function getNumber() external view returns (uint) {
        return number;
    }

    function setNumber(uint _number) external {
        number = _number;
    }

    receive() external payable {} // to support receiving ETH by default

    fallback() external payable {}
}
