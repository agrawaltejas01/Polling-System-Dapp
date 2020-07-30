// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Opinion
{

    struct Topic
    {
        uint id;
        uint voteFor;
        uint voteAgainst;
    }
    mapping(uint => Topic) public topicList;
    mapping(uint => bool) public topicExists;

    function addTopic(uint _id) public
    {
        topicList[_id] = Topic(_id, 0, 0);
        topicExists[_id] = true;
    }

    mapping(address => mapping(uint => bool)) public voters;

    function voteFor(uint _id) public
    {
        // Validate topic id
        require(topicExists[_id], "topic of given id Does not exists");

        // Validate if user has already voted
        require(!voters[msg.sender][_id], "User has already voted on given topic");

        // Record user vote

        voters[msg.sender][_id] = true;
        topicList[_id].voteFor++;
    }

}