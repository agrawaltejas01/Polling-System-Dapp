var Opinion = artifacts.require("./Opinion.sol")

contract("Opinion", function (accounts) {

    // user can VoteFor for a given topic
    it('Voter can vote for a given valid topic', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.addTopic(1);
        }).then(function (recipt) {

            return opinionInstance.voteFor(1, { from: accounts[0] });
        }).then(function (recipt) {

            return opinionInstance.topicList(1);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteFor = Topic[1];
            assert.equal(id, 1, "Wrong ID was inserted in topicList");
            assert.equal(voteFor, 1, "voteFor was not incremented for topic");
        });
    });


    // User cannot VoteFor for a given topic again
    it('Voter cannot vote for a given topic again', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.voteFor(1, { from: accounts[0] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote 2nd time for same topic");
            return opinionInstance.topicList(1);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteFor = Topic[1];
            assert.equal(id, 1, "Wrong ID was inserted in topicList");
            assert.equal(voteFor, 1, "voteFor was incremented again by same user for same topic");
        });
    });

    // User cannot vote for invalid topic id
    it('Voter cannot voteFor for a topic not inserted in topicList', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.voteFor(99999, { from: accounts[0] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote for a topic with invalid id");
        });
    });

    // Complex case
    // Add a topic id = 4
    // VoteFor for id = 4 with user accounts[1]
    // Add a topic id = 8
    // VoteFor for id = 8 with user accounts[2]
    // VoteFor for id = 8 with user accounts[1]
    // VoteFor for id = 3 with user accounts[2]
    // VoteFor for id = 4 with user accounts[1]

    it('Complete case for voteFor functionality', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.addTopic(4);
        }).then(function (recipt) {

            return opinionInstance.voteFor(4, { from: accounts[1] });
        }).then(function (recipt) {

            return opinionInstance.topicList(4);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteFor = Topic[1];
            assert.equal(id, 4, "Wrong Id(4) was inserted in topicList");
            assert.equal(voteFor, 1, "VoteFor was wrongfully added in topic(4)");

            return opinionInstance.addTopic(8);
        }).then(function (recipt) {

            return opinionInstance.voteFor(8, { from : accounts[2] });
        }).then(function (recipt) {
            
            return opinionInstance.topicList(8);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteFor = Topic[1];
            assert.equal(id, 8, "Wrong Id(8) was inserted in topicList");
            assert.equal(voteFor, 1, "VoteFor was wrongfully added in topic(8)");

            return opinionInstance.voteFor(8, { from : accounts[1] });
        }).then(function (recipt) {
            
            return opinionInstance.topicList(8);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteFor = Topic[1];
            assert.equal(id, 8, "Wrong Id(8) was inserted in topicList");
            assert.equal(voteFor, 2, "VoteFor was wrongfully added in topic(8)");

            return opinionInstance.voteFor(3, { from : accounts[2] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote for a topic with invalid id(3)");

            return opinionInstance.voteFor(4, { from : accounts[1] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote 2nd time for same topic(4)");
        });
    });
})