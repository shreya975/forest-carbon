// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCredit {
    uint public credits;

    function addCredits(uint amount) public {
        credits += amount;
    }
}