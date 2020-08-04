var mongo = require('mongoose');
var Schema = mongo.Schema;

const topicSchema = new Schema({
    _id : { type : Number },
    userId : { type : String },
    title : { type : String },
    primaryTag : { type : String },
    secondaryTags : [
        {type : Number },
    ],
    startingDate : { type : Date },
},
{
    versionKey : false
});

const topic = mongo.model('topic', topicSchema, 'topic');
module.exports = topic;