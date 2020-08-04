const express = require('express')
const bodyParser = require('body-parser')
var mongo = require('mongoose');

const userRouter = require("./routes/user-routes");
const topicRouter = require("./routes/topic-routes");

const app = express()
app.use(bodyParser.json());

var db = mongo.connect('mongodb://127.0.0.1:27017/polling-system', {useNewUrlParser : true},
    function (error, response) {
        if (error)
            console.log(error);

        else
            console.log("Successfully connected to database polling-system");
    }
)

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/user', userRouter);
app.use('/topic', topicRouter);

app.listen(8080, () => console.log("Api is running on 8080"));