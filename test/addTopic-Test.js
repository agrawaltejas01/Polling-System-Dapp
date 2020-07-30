var Opinion = artifacts.require("./Opinion.sol")

contract("Opinion", function (accounts) {
    var opinionInstance;

    // Check if Topic is getting added in opinion
    it('Topic is getting added in opinonList', function () {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.addTopic(12);
        }).then(function (recipt) {

            return opinionInstance.topicList(12);
        }).then(function (Topic) {
            var id = Topic[0];
            assert.equal(id, 12, "Wrong ID was inserted");
        });
    });

    // Duplicate topic should not be added in topicList
    it('Topic isnot added if id is repeated', function() {
        return Opinion.deployed().then(function (instance) {
            opinionInstance = instance;
            return opinionInstance.addTopic(12);
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf("revert") >= 0, "Topic with duplicate id was inserted");
        })
    })
})