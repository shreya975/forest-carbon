// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CarbonToken.sol";

contract ProjectRegistry {
    struct Project { uint id; address owner; string metadataHash; bool verified; }
    CarbonToken public token;
    uint public nextId;
    mapping(uint => Project) public projects;
    event ProjectRegistered(uint indexed id, address indexed owner);
    event CreditsIssued(uint indexed id, address to, uint amount);

    constructor(address tokenAddress) {
        token = CarbonToken(tokenAddress);
    }

    function registerProject(string calldata metadataHash) external returns (uint) {
        uint id = nextId++;
        projects[id] = Project(id, msg.sender, metadataHash, false);
        emit ProjectRegistered(id, msg.sender);
        return id;
    }

    function verifyAndIssue(uint projectId, address to, uint256 amount) external {
        require(msg.sender == token.owner(), "Not authorized");
        token.mint(to, amount);
        projects[projectId].verified = true;
        emit CreditsIssued(projectId, to, amount);
    }
}