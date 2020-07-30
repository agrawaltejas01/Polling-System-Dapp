var Opinion = artifacts.require("./Opinion.sol")

contract("Opinion", function (accounts) {

    var opinionInstance;

    // user can VoteAgainst for a given topic
    it('Voter can vote against a given valid topic', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.addTopic(1);
        }).then(function (recipt) {

            return opinionInstance.voteAgainst(1, { from: accounts[0] });
        }).then(function (recipt) {

            return opinionInstance.topicList(1);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteAgainst = Topic[2];
            assert.equal(id, 1, "Wrong ID was inserted in topicList");
            assert.equal(voteAgainst, 1, "voteAgainst was not incremented for topic");
        });
    });


    // User cannot VoteAgainst for a given topic again
    it('Voter cannot vote against a given topic again', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.voteAgainst(1, { from: accounts[0] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote 2nd time for same topic");
            return opinionInstance.topicList(1);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteAgainst = Topic[2];
            assert.equal(id, 1, "Wrong ID was inserted in topicList");
            assert.equal(voteAgainst, 1, "voteAgainst was incremented again by same user for same topic");
        });
    });

    // User cannot vote for invalid topic id
    it('Voter cannot voteAgainst for a topic not inserted in topicList', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.voteAgainst(99999, { from: accounts[0] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote for a topic with invalid id");
        });
    });

    // Complex case
    // Add a topic id = 4
    // VoteAgainst for id = 4 with user accounts[1]
    // Add a topic id = 8
    // VoteAgainst for id = 8 with user accounts[2]
    // VoteAgainst for id = 8 with user accounts[1]
    // VoteAgainst for id = 3 with user accounts[2]
    // VoteAgainst for id = 4 with user accounts[1]

    it('Complete case for voteAgainst functionality', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.addTopic(4);
        }).then(function (recipt) {

            return opinionInstance.voteAgainst(4, { from: accounts[1] });
        }).then(function (recipt) {

            return opinionInstance.topicList(4);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteAgainst = Topic[2];
            assert.equal(id, 4, "Wrong Id(4) was inserted in topicList");
            assert.equal(voteAgainst, 1, "VoteAgainst was wrongfully added in topic(4)");

            return opinionInstance.addTopic(8);
        }).then(function (recipt) {

            return opinionInstance.voteAgainst(8, { from : accounts[2] });
        }).then(function (recipt) {
            
            return opinionInstance.topicList(8);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteAgainst = Topic[2];
            assert.equal(id, 8, "Wrong Id(8) was inserted in topicList");
            assert.equal(voteAgainst, 1, "VoteAgainst was wrongfully added in topic(8)");

            return opinionInstance.voteAgainst(8, { from : accounts[1] });
        }).then(function (recipt) {
            
            return opinionInstance.topicList(8);
        }).then(function (Topic) {
            var id = Topic[0];
            var voteAgainst = Topic[2];
            assert.equal(id, 8, "Wrong Id(8) was inserted in topicList");
            assert.equal(voteAgainst, 2, "VoteAgainst was wrongfully added in topic(8)");

            return opinionInstance.voteAgainst(3, { from : accounts[2] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote for a topic with invalid id(3)");

            return opinionInstance.voteAgainst(4, { from : accounts[1] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Voter was able to vote 2nd time for same topic(4)");
        });
    });
})