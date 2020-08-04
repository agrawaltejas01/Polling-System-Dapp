const router = require('express').Router();
let user = require('../schema/user-schema');

router.route('/').get((req, res) => {
    user.find()
        .then(users => res.json(users))
        .catch(err => {
            console.log("Error in /user/ " + err);
            res.status(400).json('Error : ' + err);
        });
});

router.route('/find').post((req, res) => {
    user.findById(req.body.id)
        .then(user => res.json(user))
        .catch(err => {
            console.log("Error in /user/find " + err);
            res.status(400).json('Error in /user/find : ' + err)
        });
})

module.exports = router;