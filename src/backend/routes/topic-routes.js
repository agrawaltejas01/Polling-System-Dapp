const router = require('express').Router();
let topic = require('../schema/topic-schema');

router.route('/').get((req, res) => {
    let cutOff = new Date();
    cutOff.setDate(cutOff.getDate()-30);

    topic.find({ startingDate : { $gte : cutOff } })
        .then(users => res.json(users))
        .catch(err => {
            console.log("Error in /topic/ " + err);
            res.status(400).json('Error : ' + err);
        });
});

module.exports = router;